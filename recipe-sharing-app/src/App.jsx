// src/App.jsx
// ------------------------------------------------------
// Main app routes. No <Router> here (it's in main.jsx)
// ------------------------------------------------------

import { Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <div className="app-container">
      <h1>🍲 Recipe Sharing App</h1>

      {/* Search bar visible on all pages */}
      <SearchBar />

      {/* Define app routes */}
      <Routes>
        {/* Home page: Add + List */}
        <Route
          path="/"
          element={
            <>
              <AddRecipeForm />
              <RecipeList />
            </>
          }
        />

        {/* Recipe details page */}
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
};

export default App;
