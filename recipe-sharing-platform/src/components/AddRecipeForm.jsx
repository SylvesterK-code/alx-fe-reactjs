import { useState } from "react";
import Button from "./ui/Button";
import { FaPlus, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required";

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const list = ingredients.split("\n").filter((i) => i.trim() !== "");
      if (list.length < 2)
        newErrors.ingredients = "Please list at least two ingredients";
    }

    if (!steps.trim()) {
      newErrors.steps = "Preparation steps are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
    };

    console.log("New Recipe Submitted:", newRecipe);

    alert("Recipe added successfully!");

    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 py-8 md:py-12">
      {/* Back Home Button */}
      <div className="mb-6">
        <Link to="/">
          <Button variant="primary" icon={FaHome}>
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto p-6 sm:p-8 bg-green-300 dark:bg-gray-900 rounded-xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Add a New Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 sm:p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Spaghetti Carbonara"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ingredients (one per line)
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-3 sm:p-4 h-32 sm:h-40 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder={"e.g.\n2 eggs\n1 cup flour"}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preparation Steps (one per line)
            </label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full p-3 sm:p-4 h-32 sm:h-40 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder={"e.g.\nBoil water\nAdd pasta\nCook for 10 minutes"}
            />
            {errors.steps && (
              <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <Button type="submit" icon={FaPlus} variant="primary">
              Add Recipe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
