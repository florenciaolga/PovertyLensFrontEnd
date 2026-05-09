export default function Legend() {
  return (
    <div className="bg-white/90 backdrop-blur rounded-xl shadow-md px-4 py-3 text-xs pointer-events-none">
      <p className="font-bold text-[#333] mb-2 text-center text-sm">Index Tingkat<br />Kemiskinan</p>
      {[
        { color: "#5E9E4B", label: "Rendah" },
        { color: "#E8A838", label: "Sedang" },
        { color: "#B83232", label: "Tinggi" },
      ].map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2 mb-1">
          <span className="inline-block w-4 h-4 rounded-sm" style={{ background: color }} />
          <span className="text-[#444]">{label}</span>
        </div>
      ))}
    </div>
  );
}