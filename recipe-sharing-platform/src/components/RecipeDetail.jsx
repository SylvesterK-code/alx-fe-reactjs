import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Button from "./ui/Button";


const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((err) => console.error("Error loading recipe:", err));
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center mt-20 text-gray-600 text-xl">
        Loading recipe details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <Link
        to="/"
        className="text-blue-600 hover:underline text-lg mb-5 inline-block"
      >
        {/* ← Back to Home */}
        <Button variant="primary" icon={FaHome}>
          Home
        </Button>
      </Link>

      {/* Recipe Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {recipe.title}
        </h1>

        <p className="text-gray-700 text-lg mb-6">{recipe.summary}</p>

        {/* Ingredients Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Ingredient 1</li>
            <li>Ingredient 2</li>
            <li>Ingredient 3</li>
            <li>Ingredient 4</li>
          </ul>
        </div>

        {/* Cooking Instructions Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Step 1: Start preparing the ingredients.</li>
            <li>Step 2: Mix everything properly.</li>
            <li>Step 3: Cook on medium heat.</li>
            <li>Step 4: Serve and enjoy your meal.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
