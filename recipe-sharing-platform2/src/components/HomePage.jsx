// components/HomePage.jsx

import { useEffect, useState } from "react";

import { FaArrowRight } from "react-icons/fa";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   fetch("/src/data.json")
  //     .then((res) => res.json())
  //     .then((data) => setRecipes(data))
  //     .catch((err) => console.error("Failed to load data", err));
  // }, []);

  useEffect(() => {
    const loadRecipes = async () => {
      // Load default JSON file
      const response = await fetch("/src/data.json");
      const defaultRecipes = await response.json();

      // Load localStorage recipes
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

      // Merge both
      setRecipes([...defaultRecipes, ...storedRecipes]);
    };

    loadRecipes();
  }, []);


  return (
    <div className="min-h-screen bg-[#F5F7F2] px-6 py-10">
      {/* <Link to="/add-recipe">
        <Button variant="primary" icon={FaPlus}>
          Add New Recipe
        </Button>
      </Link> */}

      {/* Page Header */}
      <h1 className="text-4xl font-bold text-green-700 text-center mb-10 pt-6">
         Recipe Sharing Platform
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow
              hover:scale-[1.02] duration-300 cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {recipe.summary}
              </p>

              {/* View More */}
              {/* <button className="mt-4 inline-block text-sm font-medium text-green-700 hover:text-green-900">
                View Recipe →
              </button> */}

              {/* route */}
              {/* <a
                href={`/recipe/${recipe.id}`}
                className="mt-4 inline-block px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                View Details →
              </a> */}

              <Link to={`/recipe/${recipe.id}`}>
                <Button icon={FaArrowRight} iconPosition="right">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
