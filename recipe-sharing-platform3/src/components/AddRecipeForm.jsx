// src/components/AddRecipeForm.jsx


import { useState } from "react";
import Button from "./ui/Button";
import { FaPlus, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import recipesData from "../data.json";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required";
    if (!summary.trim()) newErrors.summary = "Summary is required";
    if (!image.trim()) newErrors.image = "Image URL is required";

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const list = ingredients.split("\n").filter((i) => i.trim());
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
      summary,
      image,
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
    };

    // ✅ ADD DIRECTLY TO recipesData (no localStorage)
    recipesData.push(newRecipe);

    alert("Recipe added successfully!");

    // Reset form
    setTitle("");
    setSummary("");
    setImage("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 py-8 md:py-12 bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-900 dark:to-gray-800 dark:to-green">
      <div className="mb-6">
        <Link to="/">
          <Button variant="primary" icon={FaHome}>
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto p-6 sm:p-8 bg-green-400 dark:bg-gray-900 rounded-xl shadow-xl">
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

          {/* Summary */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Summary
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 sm:p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Short description of the recipe"
            />
            {errors.summary && (
              <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 sm:p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
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

          <Button type="submit" icon={FaPlus} variant="primary">
            Add Recipe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
