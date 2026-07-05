import { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (!value.trim()) return;
    onSearch(value);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Enter city"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}