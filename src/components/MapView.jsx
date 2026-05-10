import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 7, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

const CLUSTER_COLOR = {
  0: "#E8A838", // sedang
  1: "#5E9E4B", // rendah
  2: "#B83232", // tinggi
};

// Coba berbagai property keys yang mungkin ada di GeoJSON
function getProvinceName(properties) {
  return (
    properties?.PROVINSI  ||
    properties?.Propinsi  ||
    properties?.propinsi  ||
    properties?.PROPINSI  ||
    properties?.name      ||
    properties?.NAME      ||
    properties?.Name      ||
    properties?.NAME_1    ||
    properties?.province  ||
    ""
  );
}

// Alias map (uppercase → uppercase CSV)
const GEO_ALIAS = {
  "DI ACEH"                    : "ACEH",
  "IRIAN JAYA"                 : "PAPUA",
  "IRIAN JAYA BARAT"           : "PAPUA BARAT",
  "IRIAN JAYA TIMUR"           : "PAPUA",
  "IRIAN JAYA TENGAH"          : "PAPUA",
  "DAERAH ISTIMEWA YOGYAKARTA" : "D I YOGYAKARTA",
  "DI YOGYAKARTA"              : "D I YOGYAKARTA",
  "YOGYAKARTA"                 : "D I YOGYAKARTA",
  "JAKARTA"                    : "DKI JAKARTA",
  "JAKARTA RAYA"               : "DKI JAKARTA",
  "BANGKA BELITUNG"            : "KEP. BANGKA BELITUNG",
  "KEPULAUAN BANGKA BELITUNG"  : "KEP. BANGKA BELITUNG",
  "PROBANTEN"                  : "BANTEN",
};

function resolveKey(rawName) {
  const up = (rawName || "").toUpperCase().trim();
  return GEO_ALIAS[up] || up;
}

export default function MapView({ geoData, clusterMap, onSelectRegion, flyTo }) {
  const geoRef = useRef(null);

  function styleFeature(feature) {
    const raw     = getProvinceName(feature.properties);
    const key     = resolveKey(raw);
    const entry   = clusterMap[key];
    const fill    = entry != null ? (CLUSTER_COLOR[entry.dominant] ?? "#cccccc") : "#cccccc";
    return {
      fillColor:   fill,
      fillOpacity: 0.82,
      color:       "#2d2d2d",
      weight:      1.2,
    };
  }

  function onEachFeature(feature, layer) {
    const raw = getProvinceName(feature.properties);
    layer.on({
      mouseover(e) { e.target.setStyle({ fillOpacity: 1, weight: 2.2 }); },
      mouseout(e)  { geoRef.current?.resetStyle(e.target); },
      click()      { onSelectRegion(raw); },
    });
    layer.bindTooltip(
      raw.charAt(0) + raw.slice(1).toLowerCase(),
      { permanent: false, direction: "auto", className: "pl-tooltip" }
    );
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