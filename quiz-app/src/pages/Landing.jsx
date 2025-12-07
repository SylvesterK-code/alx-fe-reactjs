
// src/pagess/landing.jsx

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories } from "../api/quizApi";

export default function Landing() {
  const navigate = useNavigate();

  // API Categories
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Form Inputs
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState(10);

  // History
  const [history, setHistory] = useState([]);

  // Load categories from API
  useEffect(() => {
    async function load() {
      const data = await fetchCategories();
      setCategories(data);
      setFilteredCategories(data);
    }
    load();
  }, []);

  // Load history from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(saved);
  }, []);

  // CLEAR HISTORY FUNCTION
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all quiz history?")) {
      localStorage.removeItem("quizHistory");
      setHistory([]);
    }
  };

  // Filter categories by search text
  useEffect(() => {
    if (!search.trim()) {
      setFilteredCategories(categories);
    } else {
      const results = categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCategories(results);
    }
  }, [search, categories]);

  const startQuiz = () => {
    if (!selectedCategory) return alert("Please choose a category.");
    if (!difficulty) return alert("Please choose difficulty level.");

    navigate("/quiz", {
      state: {
        category: selectedCategory,
        difficulty,
        amount,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz App</h1>
      <p className="text-gray-600 text-center mb-8">
        Choose a topic, difficulty, and number of questions to begin.
      </p>

      {/* Search Categories */}
      <input
        type="text"
        placeholder="Search categories..."
        className="px-4 py-2 border rounded-lg w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category List */}
      <div className="w-full max-w-md max-h-60 overflow-y-auto border rounded-lg p-2 mb-6">
        {filteredCategories.length === 0 ? (
          <p className="text-red-500 text-center">No categories found.</p>
        ) : (
          filteredCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`w-full p-2 mb-2 text-left 
                ${selectedCategory === c.id ? "bg-blue-600 text-white" : "bg-gray-100"}
              `}
            >
              {c.name}
            </button>
          ))
        )}
      </div>

      {/* Difficulty Selector */}
      <select
        className="w-full max-w-md border p-3 rounded-lg mb-4"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {/* Number of Questions */}
      <input
        type="number"
        min="5"
        max="50"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full max-w-md border p-3 rounded-lg mb-6"
        placeholder="Number of questions"
      />

      <button
        onClick={startQuiz}
        className="px-6 py-3 bg-blue-700 text-white rounded-lg w-full max-w-md hover:bg-blue-800"
      >
        Start Quiz
      </button>

      {/* HISTORY SECTION */}
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Quiz History</h2>

        {history.length === 0 ? (
          <p className="text-gray-500">No quizzes taken yet.</p>
        ) : (
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="p-3 border rounded-lg bg-gray-50">
                <p>
                  <strong>Score:</strong> {h.score}/{h.total}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(h.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CLEAR HISTORY BUTTON */}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg w-full max-w-md hover:bg-red-700"
        >
          Clear History
        </button>
      )}

      <button
        className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-lg"
        onClick={() => navigate("/performance")}
      >
        View Performance Stats
      </button>
    </div>
  );
}
