// Import the Zustand store
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  // Access the 'recipes' state from the store
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>

      {/* Conditional rendering:
          If no recipes exist, display a message.
          Otherwise, display the list of recipes. */}
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        // Loop through each recipe and render it
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

// Export the list component
export default RecipeList;
