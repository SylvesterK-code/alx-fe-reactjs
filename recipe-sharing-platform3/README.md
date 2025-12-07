# Recipe sharing app

## Setting Up a React Application for a Recipe Sharing Platform with Tailwind CSS

npm create vite@latest recipe-sharing-platforact    v4
npm install tailwindcss @tailwindcss/vite           v4

npm install -D tailwindcss postcss autoprefixer     v4 
          
npx tailwindcss init -p     not work in tailwind v4
npx tailwindcss init       not work in tailwind v4

npm install tailwindcss

npm install framer-motion

npm install firebase  ------ to load gmail







// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ✅ Add this

// https://vite.dev/config/
export default defineConfig({
    plugins: [
    react(),
    tailwindcss(),     // ✅ Add this
  ],
})


// index.css
@import "tailwindcss";      v4

@tailwind base;             v3
@tailwind components;       v3
@tailwind utilities;        v3




// data.json
[
  {
    "id": 1,
    "title": "Spaghetti Carbonara",
    "summary": "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
    "image": "https://images.unsplash.com/photo-1574636573716-062c8c8c6179?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BhZ2hldHRpJTIwQ2FyYm9uYXJhJTIwcmVjaXBlfGVufDB8fDB8fHww"

},
  {
    "id": 2,
    "title": "Chicken Tikka Masala",
    "summary": "Chunks of grilled chicken cooked in a creamy, spiced tomato gravy.",
    "image": "https://media.istockphoto.com/id/1300080822/photo/spicy-fish-curry-kerala-style-with-hot-and-spices.jpg?s=612x612&w=0&k=20&c=Xw8545J1fjR-zVElFmJ3RHpTkd0QTkVfBEXWXEBsIgs="
  },
  {
    "id": 3,
    "title": "Vegan Buddha Bowl",
    "summary": "A colorful blend of veggies, grains, and plant proteins for a nourishing meal.",
    "image": "https://plus.unsplash.com/premium_photo-1664648119277-ce59c8ba5f43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VmVnYW4lMjBCdWRkaGElMjBCb3dsJTIwcmVjaXBlfGVufDB8fDB8fHww"
  },
  {
    "id": 4,
    "title": "Beef Stir Fry",
    "summary": "Crispy veggies and tender beef tossed in a savory Asian-inspired sauce.",
    "image": "https://plus.unsplash.com/premium_photo-1664478238082-3df93e48c491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmVlZiUyMFN0aXIlMjBGcnklMjByZWNpcGV8ZW58MHx8MHx8fDA%3D"
  }
]




// src/components/HomePage.jsx

import { useEffect, useState } from "react";

import { FaArrowRight } from "react-icons/fa";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Failed to load data", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F2] px-6 py-10">
      <Link to="/add-recipe">
        <Button variant="primary" icon={FaPlus}>
          Add New Recipe
        </Button>
      </Link>

      {/* Page Header */}
      <h1 className="text-4xl font-bold text-green-700 text-center mb-10">
        🍽️ Recipe Sharing Platform
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






// src/App.jsx:
import HomePage from "./components/HomePage";

function App() {
  return <HomePage />;
}

export default App;






## Task 2 — Recipe Detail Page (React + Tailwind CSS)
✅ Step 1: Install & Configure React Router

Run this in your project folder:

npm install react-router-dom

Update src/App.jsx

Replace with the following:

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

✅ Step 2: Update HomePage Cards to Link to Details

Modify the button inside HomePage.jsx:

Replace:

<button className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
  View Details
</button>


With:

<a
  href={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  View Details
</a>


Or you can import Link from React Router:

import { Link } from "react-router-dom";


And replace with:

<Link
  to={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  View Details
</Link>

✅ Step 3: Create the RecipeDetail Component

📌 Create file:
src/components/RecipeDetail.jsx

Paste the following fully working, beautifully styled code:

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
        ← Back to Home
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

        {/* Instructions Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Cooking Instructions
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

🎨 Styling Features You Now Have

✔ Clean, professional detail page
✔ Large title with nice spacing
✔ Ingredients and steps formatted using bullet + numbered lists
✔ Responsive card layout
✔ Back button styled like modern UI
✔ Light gray background for contrast
✔ Rounded card with shadows
✔ Smooth responsive design (mobile → desktop)

🧪 Test the Page

Run the app:

npm run dev


Visit:

http://localhost:5173/recipe/1


You should now see:

Full image

Title

Summary

Ingredients section

Instructions section

Styled card layout

Everything should match ALX project quality standards.

🎯 Next Task (Task 3)

When you're ready, say:

👉 “Continue with the Recipe Submission Form Page task.”

This will include:

A responsive form for adding new recipes

Validation

State handling

Tailwind-styled form UI

Just let me know!

You said:
make this code more responsive 

<a
  href={/recipe/${recipe.id}}
  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  View Details
</a>
ChatGPT said:

Here are three improved versions of the button — all more responsive, more interactive, and more visually appealing, while still using clean Tailwind CSS.

You can choose any version, depending on the style you want.

✅ Option 1: Fully Responsive Button (Padding + Text Resize)

This version adjusts padding and font size across screen sizes:

<a
  href={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
>
  View Details
</a>

✔ Improvements:

Text grows on larger screens

Padding increases based on viewport

Smooth responsiveness

✅ Option 2: Button with Hover Scale + Shadow for Better UX
<a
  href={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-transform duration-300"
>
  View Details
</a>

✔ Improvements:

Hover scale animation

Soft shadow

Smooth 300ms animation

More modern interactive feel

✅ Option 3: Fully Responsive + Animated + Elevated Button

⭐ Best overall — professional UI component.

<a
  href={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
>
  View Details
</a>

✔ Improvements:

Larger variant on bigger screens

Elevation when hovering

Press-down active:scale-95 effect

Smooth animations

Bigger rounded corners (rounded-xl)












## make this code more responsive 

<a
  href={/recipe/${recipe.id}}
  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  View Details
</a>
ChatGPT said:

Here are three improved versions of the button — all more responsive, more interactive, and more visually appealing, while still using clean Tailwind CSS.

You can choose any version, depending on the style you want.

✅ Option 1: Fully Responsive Button (Padding + Text Resize)

This version adjusts padding and font size across screen sizes:

<a
  href={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
>
  View Details
</a>

✔ Improvements:

Text grows on larger screens

Padding increases based on viewport

Smooth responsiveness

✅ Option 2: Button with Hover Scale + Shadow for Better UX
<a
  href={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-transform duration-300"
>
  View Details
</a>

✔ Improvements:

Hover scale animation

Soft shadow

Smooth 300ms animation

More modern interactive feel

✅ Option 3: Fully Responsive + Animated + Elevated Button

⭐ Best overall — professional UI component.

<a
  href={`/recipe/${recipe.id}`}
  className="mt-4 inline-block px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
>
  View Details
</a>

✔ Improvements:

Larger variant on bigger screens

Elevation when hovering

Press-down active:scale-95 effect

Smooth animations

Bigger rounded corners (rounded-xl)

⭐ Recommended Version

Use Option 3 for the most polished and responsive user experience.

If you want, I can help you:

turn this into a reusable <Button /> component

add icons (React Icons)

create light/dark mode variants

Just tell me!









## turn this into a reusable <Button /> component, add icons (React Icons), create light/dark mode variants


Below is a fully reusable, icon-enabled, light/dark mode–aware
<Button /> React component, built with Tailwind CSS + React Icons.

This version is perfect for your Recipe Sharing Platform because it is:

✅ Reusable
✅ Responsive
✅ Clean design
✅ Supports icons (left or right)
✅ Has light & dark mode variants
✅ Easily customizable

### 📌 1. Install React Icons (if you haven’t)
npm install react-icons

### 📌 2. Create the Reusable Button Component

Create a file:

src/components/ui/Button.jsx

import React from "react";
import { IconContext } from "react-icons";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}) {
  // Size variants
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Light/Dark mode + style variants
  const variants = {
    primary:
      "bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
    outline:
      "border border-gray-400 text-gray-700 dark:text-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-medium shadow-sm
        hover:shadow-lg hover:-translate-y-0.5 active:scale-95
        transition-all duration-300
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      <IconContext.Provider value={{ size: "1.2em" }}>
        {Icon && iconPosition === "left" && <Icon />}
        {children}
        {Icon && iconPosition === "right" && <Icon />}
      </IconContext.Provider>
    </button>
  );
}

### 📌 3. How to Use the <Button /> Component
Example 1: Primary Button with Left Icon
import { FaArrowRight } from "react-icons/fa";
import Button from "./ui/Button";

<Button
  icon={FaArrowRight}
  iconPosition="right"
  onClick={() => console.log("Clicked!")}
>
  View Details
</Button>;

Example 2: Secondary Button with Left Icon
import { FaPlus } from "react-icons/fa";

<Button variant="secondary" icon={FaPlus}>
  Add Recipe
</Button>;

Example 3: Outline Button (light/dark mode)
import { FaHome } from "react-icons/fa";

<Button variant="outline" icon={FaHome}>
  Back to Home
</Button>;

Example 4: Large Size Button
<Button size="lg" variant="primary">
  Start Cooking
</Button>;

### 📌 4. Replacing Your Old Link Button

You can wrap the button inside a React Router <Link>:

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Button from "./ui/Button";

<Link to={`/recipe/${recipe.id}`}>
  <Button icon={FaArrowRight} iconPosition="right">
    View Details
  </Button>
</Link>

### 📌 5. Light/Dark Mode Notes

This button automatically adapts to:

✔ Tailwind’s dark: variants
✔ System theme or manually toggled classes
✔ Smooth hover animations

If you want, I can also help you:

🌙 Build a dark mode toggle switch
🎨 Add more variants (danger, success, ghost, link)
🧱 Create a UI folder with reusable components
🖼 Create a design system for the entire project

Just say the word!




### final add recipe form


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


### ---------------------------------------------------------------------------------

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

    const storedRecipes =
      JSON.parse(localStorage.getItem("recipes")) || recipesData;

    const newRecipe = {
      id: Date.now(),
      title,
      summary,
      image,
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
    };

    const updatedRecipes = [...storedRecipes, newRecipe];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    alert("Recipe added successfully!");

    // Reset form
    setTitle("");
    setSummary("");
    setImage("");
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

          {/* Submit Button */}
          <Button type="submit" icon={FaPlus} variant="primary">
            Add Recipe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;



### recipeDetail


import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";
import { FaHome } from "react-icons/fa";
import Button from "./ui/Button"; // assuming your Button component

const RecipeDetail = () => {
  const { id } = useParams();

  // Directly find the recipe (NO useEffect NEEDED)
  const recipe = recipesData.find((item) => item.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="text-center mt-20 text-gray-600 text-xl">
        Recipe not found...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <Link to="/">
        <Button variant="primary" icon={FaHome}>
          Back to Home
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
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Steps Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Cooking Instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;







npm install framer-motion











🔥 create a header/navbar,
🔥 Build a global dark mode toggle,
🔥 Save recipes to localStorage,
🔥 Convert the whole project into a FULL CRUD recipe app.

🔸 Editing recipes
🔸 Deleting recipes
🔸 Viewing recipe details page
🔸 Adding images upload
🔸 Adding categories
🔸 Improving UI with Tailwind + your saved design layout

🔥 Make the Footer also responsive + commented
🔥 Add a sticky bottom navigation on mobile
🔥 Add Light/Dark mode toggle inside the header

add header(navbar-home, addrecipe, signin, signup, contact, about) and footer (add social media icons)

modify the dataase to accept date from the form

add sign up and and login page

add about page 

add contact page







### load and login with email

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
👉 Get your Firebase config from console.firebase.google.com
Go to Project → Settings → Config



### backend 
npm install -g json-server
json-server --watch db.json --port 5000

Run this command in your project root:

npm install -g json-server


Then run:

json-server --watch db.json --port 5000


The data will now be available at:

Users endpoint → http://localhost:5000/users