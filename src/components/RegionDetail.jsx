import { useEffect, useState } from "react";
import { fetchRegion } from "../services/api";

const CLUSTER_LABEL = { rendah: "Rendah", sedang: "Sedang", tinggi: "Tinggi" };
const ZONE_LABEL    = { rendah: "Hijau",  sedang: "Kuning",  tinggi: "Merah"  };

const POLICY_MAP = {
  rendah: [
    "Mempertahankan dan menjaga pertumbuhan ekonomi yang stabil",
    "Mengurangi kesenjangan sosial dan ekonomi secara berkelanjutan",
    "Meningkatkan kualitas tenaga kerja melalui inovasi dan pendidikan lanjutan",
  ],
  sedang: [
    "Meningkatkan akses pendidikan dan pelatihan vokasional",
    "Memperluas program bantuan sosial bagi keluarga rentan",
    "Mendorong investasi lokal dan pengembangan UMKM",
  ],
  tinggi: [
    "Prioritaskan intervensi langsung pengentasan kemiskinan ekstrem",
    "Tingkatkan akses layanan dasar: air bersih, sanitasi, dan kesehatan",
    "Bangun infrastruktur dan konektivitas wilayah terpencil",
  ],
};

function RingChart({ pct, color, label }) {
  const r    = 36;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(100, Math.max(0, pct)) / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="9" />
        <circle
          cx="45" cy="45" r={r}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
        <text x="45" y="50" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
          {Math.round(pct)}%
        </text>
      </svg>
      <span className="text-[11px] text-center text-white/80 leading-tight font-[Poppins]">{label}</span>
    </div>
  );
}

function StatBadge({ label, value }) {
  return (
    <div className="bg-white/20 rounded-xl px-3 py-2">
      <div className="text-white/60 text-[10px] font-[Poppins]">{label}</div>
      <div className="font-semibold text-sm text-white font-[Poppins]">{value}</div>
    </div>
  );
}

export default function RegionDetail({ selectedRegion, onClose }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!selectedRegion) { setData(null); return; }
    setLoading(true);
    setError(null);
    setData(null);

    fetchRegion(selectedRegion)
      .then((d) => {
        if (d?.error) {
          setError(`Wilayah "${selectedRegion}" tidak ditemukan. Coba klik kabupaten/kota via search.`);
        } else {
          setData(d);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data. Pastikan backend berjalan.");
        setLoading(false);
      });
  }, [selectedRegion]);

  if (!selectedRegion) {
    return (
      <aside className="w-72 bg-[#6b7c4a] flex flex-col items-center justify-center p-8 text-center shrink-0">
        <div className="text-5xl mb-4 opacity-60">🗺️</div>
        <p className="text-white/70 text-sm leading-relaxed font-[Poppins]">
          Klik wilayah pada peta untuk melihat detail dan rekomendasi kebijakan.
        </p>
      </aside>
    );
  }

  const pengangguran = data?.tenaga_kerja?.pengangguran ?? 0;
  const sanitasi     = data?.kualitas_hidup?.sanitasi   ?? 0;
  const airMinum     = data?.kualitas_hidup?.air_minum  ?? 0;
  const pendidikan   = data?.pendidikan                 ?? 0;
  const pengeluaran  = data?.pengeluaran                ?? 0;

  const policies = data ? (POLICY_MAP[data.cluster_label] ?? []) : [];

  const causes = data ? [
    {
      pct:   Math.min(100, Math.max(0, Math.round((1 - (pendidikan - 3) / 12) * 100))),
      label: "Pendidikan Rendah",
      color: null, 
    },
    {
      pct:   Math.min(100, Math.round(pengangguran * 10)),
      label: "Kurang Lowongan Pekerjaan",
      color: null,
    },
    {
      pct:   Math.min(100, Math.max(0, Math.round(100 - sanitasi))),
      label: "Sanitasi Buruk",
      color: null,
    },
  ].map((c) => ({ ...c, color: c.pct > 50 ? "#ef4444" : "#86efac" })) : [];

  return (
    <aside className="w-72 bg-[#6b7c4a] text-white flex flex-col overflow-y-auto shrink-0 font-[Poppins]">

      <div className="p-5 pb-4 border-b border-white/20">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="h-5 bg-white/20 rounded animate-pulse w-3/4 mb-2" />
            ) : (
              <h2 className="font-bold text-base leading-tight capitalize truncate">
                {data?.kab_kota ?? selectedRegion}
              </h2>
            )}
            {data && (
              <p className="text-xs text-white/75 mt-1">
                Tingkat Kemiskinan:{" "}
                <span className="font-semibold">{CLUSTER_LABEL[data.cluster_label]}</span>
                {" · "}
                <span className="font-semibold">Zona {ZONE_LABEL[data.cluster_label]}</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl leading-none shrink-0 mt-0.5 transition-colors"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        {error && (
          <p className="text-red-300 text-xs mt-3 bg-red-900/30 rounded-lg px-3 py-2 leading-relaxed">
            {error}
          </p>
        )}

        {/* stat  */}
        {data && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <StatBadge label="Rata Lama Sekolah"  value={`${pendidikan.toFixed(1)} tahun`} />
            <StatBadge label="Pengeluaran/Kapita" value={`Rp ${(pengeluaran / 1000).toFixed(0)}jt`} />
            <StatBadge label="Pengangguran"       value={`${pengangguran.toFixed(1)}%`} />
            <StatBadge label="Akses Air Layak"    value={`${airMinum.toFixed(0)}%`} />
          </div>
        )}

        {loading && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/20 rounded-xl px-3 py-2 h-12 animate-pulse" />
            ))}
          </div>
        )}
      </div>

      {data && (
        <div className="p-5 border-b border-white/20">
          <h3 className="font-bold text-sm mb-3">Rekomendasi Kebijakan</h3>
          <ol className="space-y-2.5">
            {policies.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-xs text-white/85 leading-relaxed">
                <span className="font-bold text-white shrink-0 w-4">{i + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {data && (
        <div className="p-5">
          <h3 className="font-bold text-sm mb-4">Penyebab Kemiskinan</h3>
          <div className="flex justify-around">
            {causes.map((c, i) => (
              <RingChart key={i} pct={c.pct} label={c.label} color={c.color} />
            ))}
          </div>
        </div>
      )}

      {loading && !data && (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </aside>
  );
}