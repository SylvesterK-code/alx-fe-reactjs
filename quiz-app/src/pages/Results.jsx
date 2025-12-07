// src/components/results.jsx

import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">
      <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>

      <p className="text-xl mb-6">
        Score: <span className="font-bold">{state.score}</span> / {state.total}
      </p>

      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
