import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 8, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

const CLUSTER_COLOR = {
  0: "#E8A838", // sedang  
  1: "#5E9E4B", // rendah 
  2: "#B83232", // tinggi  
};

export default function MapView({ geoData, clusterMap, onSelectRegion, flyTo }) {
  const geoRef = useRef(null);

  function styleFeature(feature) {
    const rawName = feature.properties?.Propinsi || feature.properties?.name || "";
    const normName = rawName.toUpperCase().trim();
    const entry = clusterMap[normName];
    const clusterId = entry?.dominant ?? null;
    const fill = clusterId !== null ? CLUSTER_COLOR[clusterId] : "#cccccc";
    return {
      fillColor: fill,
      fillOpacity: 0.82,
      color: "#2d2d2d",
      weight: 1.2,
    };
  }

  function onEachFeature(feature, layer) {
    const rawName = feature.properties?.Propinsi || feature.properties?.name || "";
    layer.on({
      mouseover(e) {
        e.target.setStyle({ fillOpacity: 1, weight: 2.2 });
      },
      mouseout(e) {
        geoRef.current?.resetStyle(e.target);
      },
      click() {
        onSelectRegion(rawName);
      },
    });
    layer.bindTooltip(rawName, {
      permanent: false,
      direction: "auto",
      className: "pl-tooltip",
    });
  }

  return (
    <MapContainer
      center={[-2.5, 118]}
      zoom={5}
      zoomControl={false}
      style={{ height: "100%", width: "100%", background: "#f0ece3" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution=""
      />
      {geoData && (
        <GeoJSON
          ref={geoRef}
          data={geoData}
          style={styleFeature}
          onEachFeature={onEachFeature}
          key={JSON.stringify(clusterMap)}
        />
      )}
      {flyTo && <FlyTo coords={flyTo} />}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}