import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ data, onSelectRegion }) {
  return (
    <MapContainer center={[-2.5, 118]} zoom={5} style={{ height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item, idx) => (
        <CircleMarker
          key={idx}
          center={[-6, 106]} // ⚠️ placeholder (you NEED lat/lng later)
          radius={8}
          pathOptions={{ color: item.color }}
          eventHandlers={{
            click: () => onSelectRegion(item.kab_kota)
          }}
        >
          <Popup>
            {item.kab_kota} - {item.cluster_label}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}