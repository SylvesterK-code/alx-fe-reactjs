import { useState } from "react";
import useRecipeStore from "./recipeStore";

const EditRecipeForm = ({ recipe }) => {
  // Extract update function
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  // Pre-fill form with existing data
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Updated recipe object
    updateRecipe({
      id: recipe.id,
      title,
      description,
    });

    alert("Recipe Updated Successfully!");
  };

  return (
    <form onSubmit={handleUpdate} className="recipe-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
