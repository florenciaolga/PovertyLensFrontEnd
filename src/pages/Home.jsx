import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import MapView from "../components/MapView";
import RegionDetail from "../components/RegionDetail";
import Legend from "../components/Legend";
import SearchBar from "../components/SearchBar";
import { fetchMapData, searchRegion } from "../services/api";

function normalise(str) {
  return (str || "").toUpperCase().trim();
}

const GEOJSON_TO_CSV = {
  "ACEH": "ACEH", "DI ACEH": "ACEH",
  "BANGKA BELITUNG": "KEP. BANGKA BELITUNG",
  "BANGKA-BELITUNG": "KEP. BANGKA BELITUNG",
  "KEPULAUAN BANGKA BELITUNG": "KEP. BANGKA BELITUNG",
  "DAERAH ISTIMEWA YOGYAKARTA": "D I YOGYAKARTA",
  "DI YOGYAKARTA": "D I YOGYAKARTA",
  "YOGYAKARTA": "D I YOGYAKARTA",
  "JAKARTA": "DKI JAKARTA", "JAKARTA RAYA": "DKI JAKARTA", "DKI JAKARTA": "DKI JAKARTA",
  "KEPULAUAN RIAU": "KEPULAUAN RIAU",
  "NUSA TENGGARA BARAT": "NUSA TENGGARA BARAT",
  "NUSA TENGGARA TIMUR": "NUSA TENGGARA TIMUR",
  "MALUKU UTARA": "MALUKU UTARA",
  "KALIMANTAN BARAT": "KALIMANTAN BARAT",
  "KALIMANTAN TENGAH": "KALIMANTAN TENGAH",
  "KALIMANTAN SELATAN": "KALIMANTAN SELATAN",
  "KALIMANTAN TIMUR": "KALIMANTAN TIMUR",
  "KALIMANTAN UTARA": "KALIMANTAN UTARA",
  "SULAWESI UTARA": "SULAWESI UTARA", "SULAWESI TENGAH": "SULAWESI TENGAH",
  "SULAWESI SELATAN": "SULAWESI SELATAN", "SULAWESI TENGGARA": "SULAWESI TENGGARA",
  "SULAWESI BARAT": "SULAWESI BARAT", "GORONTALO": "GORONTALO",
  "PAPUA BARAT": "PAPUA BARAT", "PAPUA": "PAPUA",
  "SUMATERA UTARA": "SUMATERA UTARA", "SUMATERA BARAT": "SUMATERA BARAT",
  "SUMATERA SELATAN": "SUMATERA SELATAN",
  "RIAU": "RIAU", "JAMBI": "JAMBI", "BENGKULU": "BENGKULU", "LAMPUNG": "LAMPUNG",
  "BANTEN": "BANTEN", "JAWA BARAT": "JAWA BARAT", "JAWA TENGAH": "JAWA TENGAH",
  "JAWA TIMUR": "JAWA TIMUR", "BALI": "BALI", "MALUKU": "MALUKU",
};

function resolveProvince(rawName) {
  const up = normalise(rawName);
  return GEOJSON_TO_CSV[up] || up;
}

export default function Home() {
  const [geoData,        setGeoData]        = useState(null);
  const [clusterMap,     setClusterMap]     = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);

  //load GeoJSON provinsi Indonesia
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json"
    )
      .then((r) => r.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchMapData()
      .then((rows) => {
        const acc = {};
        rows.forEach(({ provinsi, cluster_id }) => {
          const key = normalise(provinsi);
          if (!acc[key]) acc[key] = { 0: 0, 1: 0, 2: 0 };
          acc[key][cluster_id] = (acc[key][cluster_id] || 0) + 1;
        });
        const result = {};
        Object.entries(acc).forEach(([prov, counts]) => {
          const dominant = Number(
            Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
          );
          result[prov] = { dominant, counts };
        });
        setClusterMap(result);
      })
      .catch(console.error);
  }, []);

  async function handleMapSelect(rawGeoName) {
    const provinceName = resolveProvince(rawGeoName);

    console.log("[MapClick] GeoJSON:", rawGeoName, "→ resolved:", provinceName);
    console.log("[ClusterMap keys]", Object.keys(clusterMap));

    try {
      const results = await searchRegion(provinceName);
      if (results && results.length > 0) {
        setSelectedRegion(results[0]);
      } else {
        const shortName = provinceName.split(" ")[0];
        const fallback  = await searchRegion(shortName);
        setSelectedRegion(fallback?.[0] ?? provinceName);
      }
    } catch {
      setSelectedRegion(provinceName);
    }
  }

  function handleSearchSelect(kabName) {
    setSelectedRegion(kabName);
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar center={<SearchBar onSelect={handleSearchSelect} />} />

      <main className="flex flex-1 overflow-hidden">
        <RegionDetail
          selectedRegion={selectedRegion}
          onClose={() => setSelectedRegion(null)}
        />

        <div className="relative flex-1">
          <MapView
            geoData={geoData}
            clusterMap={clusterMap}
            onSelectRegion={handleMapSelect}
            flyTo={null}
          />
          <div className="absolute top-4 right-4 z-[1000]">
            <Legend />
          </div>
        </div>
      </main>

    </div>
  );
}