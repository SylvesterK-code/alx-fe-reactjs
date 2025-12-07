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
      {/* <Link to="/">
        <Button variant="primary" icon={FaHome}>
          Back to Home
        </Button>
      </Link> */}

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
