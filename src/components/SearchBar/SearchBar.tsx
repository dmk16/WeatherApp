import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    onSearch(value);
    setValue("");
  };

  return (
    <>
      <form className="search-bar" onSubmit={handleSearch}>
        <label htmlFor="city-search" className="visually-hidden">
          Search for a city
        </label>
        <input
          id="city-search"
          type="text"
          placeholder="Search for a city..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" aria-label="Search for weather">
          Search
        </button>
      </form>
    </>
  );
}
