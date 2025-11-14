import { useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  // Get recipe ID from URL
  const { id } = useParams();

  // Convert ID from string → number
  const recipeId = Number(id);

  // Find the recipe in Zustand store
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h3>Edit Recipe</h3>
      <EditRecipeForm recipe={recipe} />

      <DeleteRecipeButton id={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
