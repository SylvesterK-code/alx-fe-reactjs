// src/components/recipeStore.js
// Zustand store for recipes + search/filter features

import { create } from "zustand";

const useRecipeStore = create((set) => ({
  // All recipes stored in the app
  recipes: [],

  // Search term from SearchBar
  searchTerm: "",

  // Filtered results
  filteredRecipes: [],

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.recipes, newRecipe], // update filtered list
    })),

  // Delete a recipe by ID
  deleteRecipe: (id) =>
    set((state) => {
      const updated = state.recipes.filter((recipe) => recipe.id !== id);
      return {
        recipes: updated,
        filteredRecipes: updated,
      };
    }),

  // Update an existing recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updated = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      return {
        recipes: updated,
        filteredRecipes: updated,
      };
    }),

  // Update ONLY the search term (no need for state here)
  setSearchTerm: (term) =>
    set({
      searchTerm: term,
    }),

  // Filter recipes using the current search term
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),
}));

export default useRecipeStore;
