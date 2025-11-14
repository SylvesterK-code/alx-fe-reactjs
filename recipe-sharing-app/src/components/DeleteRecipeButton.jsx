import useRecipeStore from "./recipeStore";
import { useNavigate } from "react-router-dom";

const DeleteRecipeButton = ({ id }) => {
  // Delete function from Zustand
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  // For redirecting after delete
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
      navigate("/"); // Return to home page
    }
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
