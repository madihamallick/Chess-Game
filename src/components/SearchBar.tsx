import React from "react";

function SearchBar({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
      <input
        type="text"
        placeholder="Search by player or opening..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-4 py-2 rounded w-full md:w-64"
      />
    );
  }

  export default SearchBar;
