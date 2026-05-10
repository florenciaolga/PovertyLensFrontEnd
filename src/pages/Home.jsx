import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import MapView from "../components/MapView";
import RegionDetail from "../components/RegionDetail";
import Legend from "../components/Legend";
import SearchBar from "../components/SearchBar";
import { searchRegion } from "../services/api";

// ── GeoJSON name → CSV province name (uppercase) ──────────────────────────────
// GeoJSON pakai uppercase BPS, CSV juga uppercase → mostly direct match
// Special cases saja yang perlu alias
const GEO_ALIAS = {
  "DI ACEH"                     : "ACEH",
  "IRIAN JAYA"                  : "PAPUA",
  "IRIAN JAYA BARAT"            : "PAPUA BARAT",
  "IRIAN JAYA TIMUR"            : "PAPUA",
  "IRIAN JAYA TENGAH"           : "PAPUA",
  "DAERAH ISTIMEWA YOGYAKARTA"  : "D I YOGYAKARTA",
  "DI YOGYAKARTA"               : "D I YOGYAKARTA",
  "YOGYAKARTA"                  : "D I YOGYAKARTA",
  "JAKARTA"                     : "DKI JAKARTA",
  "JAKARTA RAYA"                : "DKI JAKARTA",
  "BANGKA BELITUNG"             : "KEP. BANGKA BELITUNG",
  "KEPULAUAN BANGKA BELITUNG"   : "KEP. BANGKA BELITUNG",
  "PROBANTEN"                   : "BANTEN",
};

function resolveProvince(rawGeoName) {
  const up = (rawGeoName || "").toUpperCase().trim();
  return GEO_ALIAS[up] || up;
}

// ── Home ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [geoData,        setGeoData]        = useState(null);
  // provinceData: { "ACEH": { dominant: 0, kab_kota: [{kab_kota, cluster}] }, ... }
  const [provinceData,   setProvinceData]   = useState({});
  // clusterMap untuk MapView: { "ACEH": { dominant: 0 }, ... }
  const [clusterMap,     setClusterMap]     = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null); // nama provinsi (uppercase CSV)

  // Load GeoJSON provinsi — pakai gadm yang akurat & up-to-date
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
    ).catch(() => {});

    // Pakai provinsi GeoJSON dari eppofahmi yang punya nama BPS uppercase
    fetch("https://raw.githubusercontent.com/eppofahmi/geojson-indonesia/master/provinsi/all_prov.geojson")
      .then((r) => r.json())
      .then(setGeoData)
      .catch(() => {
        // Fallback: coba source lain
        fetch("https://raw.githubusercontent.com/ans-4175/peta-indonesia-geojson/master/indonesia-prov.geojson")
          .then(r => r.json())
          .then(setGeoData)
          .catch(console.error);
      });
  }, []);

  // Load province_data.json (static asset dari public/)
  useEffect(() => {
    fetch("/province_data.json")
      .then((r) => r.json())
      .then((data) => {
        setProvinceData(data);
        // Build clusterMap untuk MapView
        const cm = {};
        Object.entries(data).forEach(([prov, val]) => {
          cm[prov] = { dominant: val.dominant };
        });
        setClusterMap(cm);
      })
      .catch(console.error);
  }, []);

  // Klik provinsi di peta
  function handleMapSelect(rawGeoName) {
    const resolved = resolveProvince(rawGeoName);
    console.log("[MapClick]", rawGeoName, "→", resolved, "| found:", !!provinceData[resolved]);
    setSelectedRegion(resolved);
  }

  // Pilih dari SearchBar → cari kab/kota di provinsi mana
  async function handleSearchSelect(kabName) {
    // Cari provinsi yang mengandung kab/kota ini
    const kabLower = kabName.toLowerCase();
    const found = Object.entries(provinceData).find(([, val]) =>
      val.kab_kota.some(k => k.kab_kota.toLowerCase() === kabLower)
    );
    if (found) {
      setSelectedRegion(found[0]);
    } else {
      // Fallback: langsung set dan biarkan RegionDetail handle
      try {
        const results = await searchRegion(kabName);
        if (results?.length) setSelectedRegion(kabName);
      } catch {}
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar center={<SearchBar onSelect={handleSearchSelect} />} />

      <main className="flex flex-1 overflow-hidden">
        <RegionDetail
          selectedProvince={selectedRegion}
          provinceData={provinceData[selectedRegion]}
          onClose={() => setSelectedRegion(null)}
        />

        <div className="relative flex-1">
          <MapView
            geoData={geoData}
            clusterMap={clusterMap}
            onSelectRegion={handleMapSelect}
          />
          <div className="absolute top-4 right-4 z-[1000]">
            <Legend />
          </div>
        </div>
      </main>
    </div>
  );
}