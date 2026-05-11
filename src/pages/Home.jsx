import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import MapView from "../components/MapView";
import RegionDetail from "../components/RegionDetail";
import Legend from "../components/Legend";
import SearchBar from "../components/SearchBar";
import { searchRegion } from "../services/api";

const GEO_ALIAS = {
  "DI. ACEH" :"ACEH",
  "DAERAH ISTIMEWA YOGYAKARTA":"D I YOGYAKARTA",
  "BANGKA BELITUNG":"KEP. BANGKA BELITUNG",
  "NUSATENGGARA BARAT": "NUSA TENGGARA BARAT"
};

function resolveProvince(rawGeoName) {
  const up = (rawGeoName || "").toUpperCase().trim();
  return GEO_ALIAS[up] || up;
}

export default function Home() {
  const [geoData,setGeoData] = useState(null);
  const [provinceData,setProvinceData]= useState({});
  const [clusterMap, setClusterMap] = useState({});
  const [selectedRegion,setSelectedRegion] = useState(null); // nama provinsi (uppercase CSV)
  const[selectedKab, setSelectedKab] = useState(null)

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
    ).catch(() => {});

    fetch("https://raw.githubusercontent.com/eppofahmi/geojson-indonesia/master/provinsi/all_prov.geojson")
      .then((r) => r.json())
      .then(setGeoData)
      .catch(() => {
        fetch("https://raw.githubusercontent.com/ans-4175/peta-indonesia-geojson/master/indonesia-prov.geojson")
          .then(r => r.json())
          .then(setGeoData)
          .catch(console.error);
      });
  }, []);

  useEffect(() => {
    fetch("/province_data.json")
      .then((r) => r.json())
      .then((data) => {
        setProvinceData(data);
        const cm = {};
        Object.entries(data).forEach(([prov, val]) => {
          cm[prov] = { dominant: val.dominant };
        });
        setClusterMap(cm);
      })
      .catch(console.error);
  }, []);

  function handleMapSelect(rawGeoName) {
    const resolved = resolveProvince(rawGeoName);
    console.log("[MapClick]", rawGeoName, "→", resolved, "| found:", !!provinceData[resolved]);
    setSelectedRegion(resolved);
  }

  async function handleSearchSelect(kabName) {
    const kabLower = kabName.toLowerCase();
    const found = Object.entries(provinceData).find(([, val]) =>
      val.kab_kota.some(k => k.kab_kota.toLowerCase() === kabLower)
    );
    if (found) {
      setSelectedRegion(found[0]);
      setSelectedKab(kabName)
    } else {
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
          selectedKab = {selectedKab}
          setSelectedKab = {setSelectedKab}
          onClose={() => {
            setSelectedRegion(null);
            setSelectedKab(null)}}
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