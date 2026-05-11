import { useState, useEffect } from "react";
import { fetchRegion } from "../services/api";

const CLUSTER_INFO = {
  0: { label: "Sedang", zone: "Kuning", color: "#E8A838" },
  1: { label: "Rendah", zone: "Hijau",  color: "#5E9E4B" },
  2: { label: "Tinggi", zone: "Merah",  color: "#B83232" },
};

const POLICY_MAP = {
  0: [
    "Meningkatkan akses pendidikan dan pelatihan vokasional",
    "Memperluas program bantuan sosial bagi keluarga rentan",
    "Mendorong investasi lokal dan pengembangan UMKM",
  ],
  1: [
    "Mempertahankan dan menjaga pertumbuhan ekonomi yang stabil",
    "Mengurangi kesenjangan sosial dan ekonomi secara berkelanjutan",
    "Meningkatkan kualitas tenaga kerja melalui inovasi dan pendidikan lanjutan",
  ],
  2: [
    "Prioritaskan intervensi langsung pengentasan kemiskinan ekstrem",
    "Tingkatkan akses layanan dasar: air bersih, sanitasi, dan kesehatan",
    "Bangun infrastruktur dan konektivitas wilayah terpencil",
  ],
};


function ClusterDot({ cluster }) {
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full shrink-0 mt-0.5"
      style={{ background: CLUSTER_INFO[cluster]?.color }}
    />
  );
}

function StatBadge({ label, value }) {
  return (
    <div className="bg-white/20 rounded-xl px-3 py-2">
      <div className="text-white/60 text-[10px]">{label}</div>
      <div className="font-semibold text-sm text-white">{value}</div>
    </div>
  );
}

// provinsi view

function ProvinceView({ provinceName, provinceData, onSelectKab, onClose }) {
  const dominant = provinceData.dominant;
  const info     = CLUSTER_INFO[dominant];
  const policies = POLICY_MAP[dominant];
  const kabList  = provinceData.kab_kota ?? [];
  const counts   = { 0: 0, 1: 0, 2: 0 };
  kabList.forEach(k => counts[k.cluster]++);

  const tc = str => str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

  return (
    <aside className="w-72 bg-[#6b7c4a] text-white flex flex-col overflow-hidden shrink-0 font-[Poppins]">

      <div className="p-5 pb-4 border-b border-white/20 shrink-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h2 className="font-bold text-base leading-tight">{tc(provinceName)}</h2>
            <span
              className="inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ background: info.color }}
            >
              {info.label} · Zona {info.zone}
            </span>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white text-2xl leading-none shrink-0">×</button>
        </div>

        <div className="flex gap-2 mt-3">
          {[1, 0, 2].map(c => (
            <div key={c} className="flex-1 bg-white/15 rounded-xl px-2 py-2 text-center">
              <div className="text-lg font-bold">{counts[c]}</div>
              <div className="text-[10px] text-white/70">{CLUSTER_INFO[c].label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 border-b border-white/20 shrink-0">
        <h3 className="font-bold text-sm mb-3">Rekomendasi Kebijakan</h3>
        <ol className="space-y-2">
          {policies.map((p, i) => (
            <li key={i} className="flex gap-2 text-xs text-white/85 leading-relaxed">
              <span className="font-bold shrink-0">{i + 1}.</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col overflow-hidden flex-1">
        <div className="px-5 pt-4 pb-2 shrink-0">
          <h3 className="font-bold text-sm">
            Kabupaten / Kota
            <span className="text-white/50 font-normal ml-1">({kabList.length})</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">Klik untuk detail lengkap</p>
        </div>
        <div className="overflow-y-auto flex-1 px-5 pb-4 space-y-0.5">
          {kabList.map((k, i) => {
            const ci = CLUSTER_INFO[k.cluster];
            return (
              <button
                key={i}
                onClick={() => onSelectKab(k.kab_kota)}
                className="w-full flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-white/15 transition-colors text-left border-b border-white/10 last:border-0"
              >
                <ClusterDot cluster={k.cluster} />
                <span className="text-xs text-white/90 flex-1 leading-tight">{tc(k.kab_kota)}</span>
                <span
                  className="text-[10px] shrink-0 px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: ci.color + "33", color: ci.color }}
                >
                  {ci.label}
                </span>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 shrink-0" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

// detail kota/kab

function KabDetail({ kabName, onBack }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    fetchRegion(kabName)
      .then(d => {
        if (d?.error) setError("Data tidak ditemukan.");
        else setData(d);
        setLoading(false);
      })
      .catch(() => { setError("Gagal memuat data."); setLoading(false); });
  }, [kabName]);

  const tc      = str => (str || "").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  const cluster = data ? (data.cluster_id ?? 0) : null;
  const info    = cluster !== null ? CLUSTER_INFO[cluster] : null;
  const policies = cluster !== null ? POLICY_MAP[cluster] : [];

  const fmtScore = v => v == null ? "-" : (v >= 0 ? `+${v.toFixed(2)}` : v.toFixed(2));

  return (
    <aside className="w-72 bg-[#6b7c4a] text-white flex flex-col overflow-y-auto shrink-0 font-[Poppins]">

      <div className="p-5 pb-4 border-b border-white/20 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-3 transition-colors"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Kembali ke provinsi
        </button>

        {loading && (
          <div className="space-y-2">
            <div className="h-5 bg-white/20 rounded animate-pulse w-2/3" />
            <div className="h-3 bg-white/10 rounded animate-pulse w-1/2" />
          </div>
        )}

        {data && (
          <>
            <h2 className="font-bold text-base leading-tight">{tc(data.kab_kota)}</h2>
            <p className="text-xs text-white/60 mt-0.5">{tc(data.provinsi)}</p>
            {info && (
              <span
                className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ background: info.color }}
              >
                {info.label} · Zona {info.zone}
              </span>
            )}

            <div className="mt-3 grid grid-cols-2 gap-2">
              <StatBadge
                label="Tingkat Kemiskinan"
                value={`${data.kemiskinan?.toFixed(2)}%`}
              />
              <StatBadge
                label="Skor IPM"
                value={fmtScore(data.ipm)}
              />
              <StatBadge
                label="Skor Pengangguran"
                value={fmtScore(data.pengangguran)}
              />
              <StatBadge
                label="Skor TPAK"
                value={fmtScore(data.tenaga_kerja.tpak)}
              />
            </div>
            <p className="text-[10px] text-white/40 mt-2 leading-relaxed">
              Skor: Nilai z-score relatif terhadap rata-rata nasional
            </p>
            <p className="text-[10px] text-white/40 mt-2 leading-relaxed">
              IPM: Indeks Pembangunan Manusia
            </p>
            <p className="text-[10px] text-white/40 mt-2 leading-relaxed">
              TPAK: Tingkat Partisipasi Angkatan Kerja
            </p>
          </>
        )}

        {error && (
          <p className="text-red-300 text-xs bg-red-900/30 rounded-lg px-3 py-2">{error}</p>
        )}
      </div>

      {data && (
        <div className="p-5">
          <h3 className="font-bold text-sm mb-3">Rekomendasi Kebijakan</h3>
          <ol className="space-y-2">
            {policies.map((p, i) => (
              <li key={i} className="flex gap-2 text-xs text-white/85 leading-relaxed">
                <span className="font-bold shrink-0">{i + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {loading && (
        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </aside>
  );
}


export default function RegionDetail({ selectedProvince, provinceData, onClose, selectedKab, setSelectedKab}) {

  if (!selectedProvince) {
    return (
      <aside className="w-72 bg-[#6b7c4a] flex flex-col items-center justify-center p-8 text-center shrink-0">
        <div className="text-5xl mb-4 opacity-60">🗺️</div>
        <p className="text-white/70 text-sm leading-relaxed font-[Poppins]">
          Klik wilayah pada peta untuk melihat detail dan rekomendasi kebijakan.
        </p>
      </aside>
    );
  }

  if (!provinceData) {
    return (
      <aside className="w-72 bg-[#6b7c4a] flex flex-col p-5 shrink-0 font-[Poppins]">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-white text-base">{selectedProvince}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white text-2xl">×</button>
        </div>
        <p className="text-white/60 text-xs mt-2">Data wilayah tidak ditemukan.</p>
      </aside>
    );
  }

  if (selectedKab) {
    return <KabDetail kabName={selectedKab} onBack={() => setSelectedKab(null)} />;
  }

  return (
    <ProvinceView
      provinceName={selectedProvince}
      provinceData={provinceData}
      onSelectKab={setSelectedKab}
      onClose={onClose}
    />
  );
}