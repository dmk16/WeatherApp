import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (city: string) => void;
  hasError?: boolean;
}

export default function SearchBar({ onSearch, hasError }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    onSearch(value);
    setValue("");
  };

  return (
    <>
      <form
        className={`search-bar ${hasError ? "error" : ""}`}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Enter city..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
