const BASE = "http://127.0.0.1:8000";

export async function fetchMapData() {
  const res = await fetch(`${BASE}/map`);
  if (!res.ok) throw new Error("Failed to fetch map data");
  return res.json();
}

export async function fetchRegion(name) {
  const res = await fetch(`${BASE}/region?name=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Failed to fetch region");
  return res.json();
}

export async function searchRegion(q) {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}