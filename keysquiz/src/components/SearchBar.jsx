
// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search categories...",
}) {
  // Trims the value automatically
  const handleInput = (e) => {
    const trimmed = e.target.value.trimStart();
    onChange(trimmed);
  };

  const handleBlur = () => {
    // Trim fully on blur
    onChange(value.trim());
  };

  return (
    <div className="w-full">
      <input
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        className="
          w-full 
          rounded-md 
          border 
          px-3 py-3      /* bigger touch target */
          shadow-sm 
          text-lg sm:text-base
          focus:outline-none 
          focus:ring-2 
          focus:ring-orange-300 
          transition
        "
        placeholder={placeholder}
      />
    </div>
  );
}
