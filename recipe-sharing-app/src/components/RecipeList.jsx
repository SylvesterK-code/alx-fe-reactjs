// src/components/RecipeList.jsx
// ------------------------------------------------------
// Displays filtered recipes and allows toggling favorites.
// ------------------------------------------------------

import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  // Get filtered recipes (search) and favorites actions
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
  const favorites = useRecipeStore((s) => s.favorites);
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

  return (
    <div className="recipe-list">
      <h2>📋 Available Recipes</h2>

      {filteredRecipes.length === 0 && <p>No recipes found...</p>}

      <ul>
        {filteredRecipes.map((recipe) => {
          const isFav = favorites.includes(recipe.id);
          return (
            <li key={recipe.id} className="recipe-item">
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>

              {/* Favorite toggle */}
              <button
                onClick={() => toggleFavorite(recipe.id)}
                aria-pressed={isFav}
                style={{ marginLeft: 12 }}
              >
                {isFav ? "★ Favorited" : "☆ Favorite"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecipeList;
