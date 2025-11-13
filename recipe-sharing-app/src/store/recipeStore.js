// Import the 'create' function from Zustand
import { create } from 'zustand';

// Create a Zustand store to manage recipes
const useRecipeStore = create((set) => ({
  // Initial state: an empty array of recipes
  recipes: [],

  // Action to add a new recipe
  // It takes a new recipe object and appends it to the existing array
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // Action to set or replace the entire list of recipes (useful for initialization)
  setRecipes: (recipes) => set({ recipes }),
}));

// Export the store so it can be used in other components
export default useRecipeStore;
