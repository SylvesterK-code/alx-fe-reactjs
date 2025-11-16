// src/store/recipeStore.js
// --------------------------------------------------
// Zustand store: recipes, search/filter, favorites,
// and simple recommendations logic.
// Default export: import useRecipeStore from '../store/recipeStore'
// --------------------------------------------------

import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  // --- State ---
  recipes: [],              // list of recipe objects {id, title, description, ...}
  searchTerm: "",           // current search input
  filteredRecipes: [],      // results after filtering (kept in sync)
  favorites: [],            // array of recipe ids favorited by the user
  recommendations: [],      // computed recommended recipes (list of recipe objects)

  // --- Actions: CRUD for recipes ---
  addRecipe: (newRecipe) =>
    set((state) => {
      const updated = [...state.recipes, newRecipe];
      return {
        recipes: updated,
        // keep filteredRecipes in sync (simple approach)
        filteredRecipes: updated.filter((r) =>
          r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updated = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return {
        recipes: updated,
        filteredRecipes: updated.filter((r) =>
          r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updated = state.recipes.filter((r) => r.id !== id);
      // Also remove from favorites if present
      const updatedFavs = state.favorites.filter((favId) => favId !== id);
      return {
        recipes: updated,
        filteredRecipes: updated.filter((r) =>
          r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
        favorites: updatedFavs,
      };
    }),

  // --- Search / Filter ---
  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      // update filtered results immediately
      filteredRecipes: state.recipes.filter((r) =>
        r.title.toLowerCase().includes(term.toLowerCase())
      ),
    })),

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((r) =>
        r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // --- Favorites ---
  addFavorite: (recipeId) =>
    set((state) => ({
      // prevent duplicates
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  toggleFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites.filter((id) => id !== recipeId)
        : [...state.favorites, recipeId],
    })),

  // helper (not strictly necessary): check if id is favorite
  isFavorite: (recipeId) => get().favorites.includes(recipeId),

  // --- Recommendations ---
  // Simple heuristic:
  // - For each favorite, grab recipes that share words in the title (excluding the favourite itself).
  // - De-duplicate and limit results.
  generateRecommendations: () =>
    set((state) => {
      const favIds = state.favorites;
      if (!favIds || favIds.length === 0) return { recommendations: [] };

      // gather words from favorite titles
      const favTitles = state.recipes
        .filter((r) => favIds.includes(r.id))
        .map((r) => r.title.toLowerCase());

      const favWords = new Set(
        favTitles.flatMap((t) =>
          t
            .replace(/[^\w\s]/g, "")
            .split(/\s+/)
            .filter(Boolean)
        )
      );

      // score non-favorite recipes by shared words
      const candidates = state.recipes
        .filter((r) => !favIds.includes(r.id))
        .map((r) => {
          const words = r.title
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .split(/\s+/)
            .filter(Boolean);
          const shared = words.filter((w) => favWords.has(w)).length;
          return { recipe: r, score: shared };
        })
        .filter((c) => c.score > 0) // only those with at least one shared word
        .sort((a, b) => b.score - a.score)
        .map((c) => c.recipe);

      // if not enough recommendations, fill with random non-favs
      const needed = 5;
      const recommended = [...new Map(candidates.map(r => [r.id, r])).values()];

      if (recommended.length < needed) {
        const nonFav = state.recipes.filter((r) => !favIds.includes(r.id) && !recommended.some(rr => rr.id === r.id));
        // pick up to (needed - recommended.length) random ones
        while (recommended.length < needed && nonFav.length > 0) {
          const idx = Math.floor(Math.random() * nonFav.length);
          recommended.push(nonFav.splice(idx, 1)[0]);
        }
      }

      return { recommendations: recommended.slice(0, needed) };
    }),

  clearRecommendations: () => set({ recommendations: [] }),
}));

export default useRecipeStore;
