import { useState } from "react";
import { searchRegion } from "../services/api";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await searchRegion(query);
    setResults(res.data);
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search region..."
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((r, i) => (
          <li key={i} onClick={() => onSelect(r)}>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}