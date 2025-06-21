import React from "react";

function SortDropdown({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)} className="border px-4 py-2 rounded mt-2 md:mt-0">
        <option value="recent">Recent</option>
        <option value="oldest">Oldest</option>
      </select>
    );
  }

  export default SortDropdown;
