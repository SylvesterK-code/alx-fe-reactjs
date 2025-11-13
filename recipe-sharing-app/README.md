## Steps to Complete the Task
# Initialize Recipe Sharing App with Zustand state management
1. Create a New React Project

Use Vite for a fast setup:

npm create vite@latest recipe-sharing-app -- --template react
cd recipe-sharing-app

2. Install Zustand

Install Zustand for state management:

npm install zustand

3. Create the Zustand Store

Create a file:
📁 src/store/recipeStore.js

import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;

4. Build React Components
🧾 AddRecipeForm Component

📁 src/components/AddRecipeForm.jsx

import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addRecipe({ id: Date.now(), title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        required
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;

🍲 RecipeList Component

📁 src/components/RecipeList.jsx

import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;

5. Integrate Components in App

📁 src/App.jsx

import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="app-container">
      <h1>🍲 Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;

6. Add Simple Styling

📁 src/index.css

body {
  font-family: Arial, sans-serif;
  margin: 2rem;
  background: #fafafa;
  color: #333;
}

.app-container {
  max-width: 600px;
  margin: 0 auto;
}

.recipe-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2rem;
}

.recipe-form input,
.recipe-form textarea {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.recipe-form button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.recipe-list .recipe-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.recipe-form button:hover {
  background-color: #218838;
}

🚀 Running the Application

Start the development server:

npm run dev


Then open your browser and navigate to:
👉 http://localhost:5173

📁 Project Structure
recipe-sharing-app/
│
├── src/
│   ├── components/
│   │   ├── AddRecipeForm.jsx
│   │   └── RecipeList.jsx
│   ├── store/
│   │   └── recipeStore.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── vite.config.js

✅ Deliverables
Deliverable	Description
React Project Setup	Initialized Vite React project
Zustand Store	recipeStore.js managing recipes and actions
Components	AddRecipeForm and RecipeList created and functional
Integration	Components displayed and managed within App.jsx
🧠 Key Takeaways

Zustand provides a minimal, scalable, and intuitive approach to state management.

State can be shared across multiple components without using Context or Redux.

The store can easily be extended later to include editing, deleting, and persistence features.

🪄 Next Steps (Task 1 Preview)

In the next task, you’ll:

Add persistence using localStorage (save recipes after reload).

Implement sorting and filtering.

Add edit and delete functionality for recipes.

Repository: alx-fe-reactjs

Directory: recipe-sharing-app
Author: Sylvester Kormla Nyadzinnor
Date: November 2025













