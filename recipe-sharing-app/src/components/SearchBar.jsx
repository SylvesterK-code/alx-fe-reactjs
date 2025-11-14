// src/components/SearchBar.jsx
// ------------------------------------------------------
// Search input that updates Zustand store searchTerm
// ------------------------------------------------------

import React from "react";
import useRecipeStore from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Every time the user types, update search term and trigger filtering
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterRecipes();
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
