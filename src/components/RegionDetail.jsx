export default function RegionDetail({ data }) {
  if (!data) return <div>Select a region</div>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>{data.kab_kota}</h3>
      <p>Status: {data.cluster_label}</p>

      <h4>Education</h4>
      <p>{data.pendidikan} years</p>

      <h4>Economy</h4>
      <p>{data.pengeluaran}</p>

      <h4>Labor</h4>
      <p>Unemployment: {data.tenaga_kerja.pengangguran}</p>
      <p>TPAK: {data.tenaga_kerja.tpak}</p>

      <h4>Living Quality</h4>
      <p>Sanitation: {data.kualitas_hidup.sanitasi}</p>
      <p>Water: {data.kualitas_hidup.air_minum}</p>

      <h4>Recommendation (simple logic)</h4>
      <p>
        {data.cluster_id === 2
          ? "Focus on education & job creation"
          : data.cluster_id === 0
          ? "Improve infrastructure"
          : "Maintain stability"}
      </p>
    </div>
  );
}