// // Import both components from the components folder
// import AddRecipeForm from "./components/AddRecipeForm";
// import RecipeList from "./components/RecipeList";

// function App() {
//   return (
//     <div className="app-container">
//       {/* App header */}
//       <h1>🍲 Recipe Sharing App</h1>

//       {/* Form to add new recipes */}
//       <AddRecipeForm />

//       {/* Display list of all recipes */}
//       <RecipeList />
//     </div>
//   );
// }

// // Export main App component
// export default App;









// App.jsx
// -----------------------------------
// Routing logic ONLY, no <Router> here
// -----------------------------------

import { Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

const App = () => {
  return (
    <div className="app-container">
      <h1>🍲 Recipe Sharing App</h1>

      {/* Define all routes */}
      <Routes>

        {/* Home page */}
        <Route
          path="/"
          element={
            <>
              <AddRecipeForm />
              <RecipeList />
            </>
          }
        />

        {/* Dynamic route for recipe details */}
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
};

export default App;
