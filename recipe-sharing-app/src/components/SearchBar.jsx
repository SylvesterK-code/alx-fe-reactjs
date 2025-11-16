// src/components/SearchBar.jsx
import React from "react";
import useRecipeStore from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search recipes..."
      onChange={handleSearch}
      className="search-input"
    />
  );
};

export default SearchBar;
