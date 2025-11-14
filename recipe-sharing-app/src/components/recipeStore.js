// // Import the 'create' function from Zustand
// import { create } from 'zustand';

// // Create a Zustand store to manage recipes
// const useRecipeStore = create((set) => ({
//   // Initial state: an empty array of recipes
//   recipes: [],

//   // Action to add a new recipe
//   // It takes a new recipe object and appends it to the existing array
//   addRecipe: (newRecipe) =>
//     set((state) => ({ recipes: [...state.recipes, newRecipe] })),

//   // Action to set or replace the entire list of recipes (useful for initialization)
//   setRecipes: (recipes) => set({ recipes }),
// }));

// // Export the store so it can be used in other components
// export default useRecipeStore;






// Import Zustand's create function
import { create } from "zustand";

// Zustand store for managing recipes globally
const useRecipeStore = create((set) => ({
  // Initial list of recipes (empty at first)
  recipes: [],

  // ACTION: Add a new recipe to the list
  addRecipe: (newRecipe) =>
    set((state) => ({
      // Spread existing recipes + add the new one
      recipes: [...state.recipes, newRecipe],
    })),

  // ACTION: Update a recipe by ID
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        // Replace only the recipe with the matching ID
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  // ACTION: Delete a recipe by ID
  deleteRecipe: (id) =>
    set((state) => ({
      // Keep only recipes whose ID does not match
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
}));

export default useRecipeStore;
