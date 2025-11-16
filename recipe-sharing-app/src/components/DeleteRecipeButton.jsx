// src/components/DeleteRecipeButton.jsx
import useRecipeStore from "./recipeStore";
import { useNavigate } from "react-router-dom";

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
      navigate("/");
    }
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
