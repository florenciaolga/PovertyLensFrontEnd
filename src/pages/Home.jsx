import { useEffect, useState } from "react";
import { fetchMapData, fetchRegion } from "../services/api";
import MapView from "../components/MapView";
import RegionDetail from "../components/RegionDetail";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [mapData, setMapData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    fetchMapData().then((res) => setMapData(res.data));
  }, []);

  const handleSelectRegion = async (name) => {
    const res = await fetchRegion(name);
    setSelectedRegion(res.data);
  };

  return (
    <div>
      <h1>PovertyLens</h1>

      <SearchBar onSelect={handleSelectRegion} />

      <MapView data={mapData} onSelectRegion={handleSelectRegion} />

      <RegionDetail data={selectedRegion} />
    </div>
  );
}