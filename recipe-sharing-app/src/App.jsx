// Import both components from the components folder
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";

function App() {
  return (
    <div className="app-container">
      {/* App header */}
      <h1>🍲 Recipe Sharing App</h1>

      {/* Form to add new recipes */}
      <AddRecipeForm />

      {/* Display list of all recipes */}
      <RecipeList />
    </div>
  );
}

// Export main App component
export default App;
