// src/components/RecipeDetails.jsx
// ------------------------------------------------------
// Shows full recipe details, edit form and delete button.
// Also allows toggling favorite and generating recommendations.
// ------------------------------------------------------

import { useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);

  // Access recipes, favorites and actions
  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => r.id === recipeId)
  );

  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);
  const isFavorite = useRecipeStore((s) => s.favorites.includes(recipeId));
  const generateRecommendations = useRecipeStore(
    (s) => s.generateRecommendations
  );

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {/* Favorite control */}
      <div style={{ margin: "12px 0" }}>
        <button onClick={() => toggleFavorite(recipe.id)}>
          {isFavorite ? "★ Remove from favorites" : "☆ Add to favorites"}
        </button>

        <button
          onClick={() => generateRecommendations()}
          style={{ marginLeft: 8 }}
        >
          Generate Recommendations
        </button>
      </div>

      {/* Edit and Delete */}
      <h3>Edit Recipe</h3>
      <EditRecipeForm recipe={recipe} />

      <div style={{ marginTop: 10 }}>
        <DeleteRecipeButton id={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;
