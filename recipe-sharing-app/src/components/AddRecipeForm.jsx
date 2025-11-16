// src/components/AddRecipeForm.jsx
import { useState } from "react";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((s) => s.addRecipe);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addRecipe({ id: Date.now(), title, description });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
