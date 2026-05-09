import { useState, useEffect, useRef } from "react";
import { searchRegion } from "../services/api";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(timer.current);
    if (val.trim().length < 2) { setResults([]); setOpen(false); return; }
    timer.current = setTimeout(async () => {
      try {
        const data = await searchRegion(val.trim());
        setResults(data.slice(0, 8));
        setOpen(true);
      } catch {
        setResults([]);
      }
    }, 300);
  }

  function handleSelect(name) {
    setQuery(name);
    setOpen(false);
    onSelect(name);
  }

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex items-center bg-[#eeeadf] rounded-full px-4 py-2 gap-2 shadow-sm">
        <svg width="16" height="16" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          value={query}
          onChange={handleChange}
          placeholder="Cari kabupaten / kota..."
          className="bg-transparent outline-none text-sm text-[#333] placeholder-[#aaa] w-56"
        />
      </div>
      {open && results.length > 0 && (
        <ul className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-xl border border-gray-100 z-[9999] w-full overflow-hidden">
          {results.map((r) => (
            <li
              key={r}
              onClick={() => handleSelect(r)}
              className="px-4 py-2.5 text-sm text-[#333] hover:bg-[#f5f2ea] cursor-pointer capitalize border-b border-gray-50 last:border-0"
            >
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}