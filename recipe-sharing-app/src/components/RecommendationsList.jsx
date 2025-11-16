// src/components/RecommendationList.jsx
// --------------------------------------------------
// Displays recommended recipes generated from favorites.
// Includes a button to (re)generate recommendations.
// --------------------------------------------------

import React from "react";
import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";

const RecommendationList = () => {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generateRecommendations = useRecipeStore(
    (s) => s.generateRecommendations
  );
  const clearRecommendations = useRecipeStore((s) => s.clearRecommendations);

  return (
    <div className="recommendations">
      <h2>🧠 Recommended For You</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => generateRecommendations()}>
          Generate Recommendations
        </button>
        <button
          onClick={() => clearRecommendations()}
          style={{ marginLeft: 8 }}
        >
          Clear
        </button>
      </div>

      {recommendations.length === 0 ? (
        <p>No recommendations yet. Favorite recipes to get suggestions!</p>
      ) : (
        <ul>
          {recommendations.map((r) => (
            <li key={r.id}>
              <Link to={`/recipes/${r.id}`}>{r.title}</Link>
              <p style={{ margin: 0 }}>{r.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationList;
