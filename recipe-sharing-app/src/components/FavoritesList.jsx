// src/components/FavoritesList.jsx
// --------------------------------------------------
// Displays the user's favorite recipes.
// Allows removing a recipe from favorites.
// --------------------------------------------------

import React from "react";
import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";

const FavoritesList = () => {
  // Get favorites ids and recipe list & removeFavorite action
  const favorites = useRecipeStore((s) => s.favorites);
  const recipes = useRecipeStore((s) => s.recipes);
  const removeFavorite = useRecipeStore((s) => s.removeFavorite);
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

  // Map favorite ids to actual recipe objects, filter out missing recipes
  const favoriteRecipes = favorites
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  if (favoriteRecipes.length === 0)
    return (
      <div className="favorites-list">
        <h2>⭐ My Favorites</h2>
        <p>No favorites yet. Add some recipes to your favorites!</p>
      </div>
    );

  return (
    <div className="favorites-list">
      <h2>⭐ My Favorites</h2>
      <ul>
        {favoriteRecipes.map((recipe) => (
          <li key={recipe.id} className="favorite-item">
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            <div style={{ display: "inline-block", marginLeft: 12 }}>
              <button
                onClick={() => removeFavorite(recipe.id)}
                aria-label={`Remove ${recipe.title} from favorites`}
              >
                Remove
              </button>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                aria-label={`Toggle favorite ${recipe.title}`}
                style={{ marginLeft: 8 }}
              >
                Toggle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
