// // Import useState for handling input fields and useRecipeStore to access the Zustand store
// import { useState } from "react";
// import useRecipeStore from "./recipeStore";

// const AddRecipeForm = () => {
//   // Extract the 'addRecipe' action from Zustand store
//   const addRecipe = useRecipeStore((state) => state.addRecipe);

//   // Local state for form inputs
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   // Function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevents page reload on form submit

//     // Avoid adding empty recipes
//     if (!title.trim() || !description.trim()) return;

//     // Add new recipe with a unique ID (using timestamp)
//     addRecipe({ id: Date.now(), title, description });

//     // Clear input fields after submission
//     setTitle("");
//     setDescription("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="recipe-form">
//       {/* Input for recipe title */}
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)} // Update title state
//         placeholder="Recipe Title"
//         required
//       />

//       {/* Textarea for recipe description */}
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)} // Update description state
//         placeholder="Recipe Description"
//         required
//       />

//       {/* Submit button */}
//       <button type="submit">Add Recipe</button>
//     </form>
//   );
// };

// // Export the form component
// export default AddRecipeForm;





import { useState } from "react";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = () => {
  // Access the addRecipe action from Zustand
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  // Local form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    // Create a new recipe object
    addRecipe({
      id: Date.now(), // unique ID
      title,
      description,
    });

    // Clear form
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
      />

      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
