// src/components/RecipeList.jsx
// ------------------------------------------------------
// Displays filtered recipes instead of full list
// ------------------------------------------------------

import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  // Use filtered recipes from Zustand
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div className="recipe-list">
      <h2>📋 Available Recipes</h2>

      {/* If no results, show a message */}
      {filteredRecipes.length === 0 && <p>No recipes found...</p>}

      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id} className="recipe-item">
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
