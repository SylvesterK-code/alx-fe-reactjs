// src/components/QuizStart.jsx

import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";

export default function QuizStart({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const cats = await fetchCategories();
        setCategories(cats);
        setFiltered(cats);
        if (cats.length) setCategory(cats[0].id);
      } catch (e) {
        setErr(e.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setFiltered(
      categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, categories]);

  function handleStart() {
    onStart({ amount: Number(amount), category, difficulty });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 mt-6 sm:mt-10 shadow-lg rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Create a Quiz
        </h2>

        {err && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        {loading ? (
          <div className="animate-pulse text-center py-10 text-slate-500">
            Loading quiz categories…
          </div>
        ) : (
          <>
            {/* Responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Category Search & List */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Search Category
                </label>

                <SearchBar value={search} onChange={setSearch} />

                <div className="mt-3 max-h-52 overflow-auto border rounded p-3 bg-slate-50 text-sm sm:text-base">
                  {filtered.length === 0 ? (
                    <div className="text-sm text-slate-500">
                      No categories found.
                    </div>
                  ) : (
                    filtered.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center py-1 gap-2 cursor-pointer"
                        onClick={() => setCategory(c.id)}
                      >
                        <input
                          id={`cat-${c.id}`}
                          type="radio"
                          name="category"
                          checked={category === c.id}
                          onChange={() => setCategory(c.id)}
                          className="w-4 h-4"
                        />
                        <label
                          htmlFor={`cat-${c.id}`}
                          className="cursor-pointer"
                        >
                          {c.name}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quiz Settings */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Settings
                </label>

                <div className="mb-4">
                  <label className="text-sm block mb-1">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="text-sm block mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
                  >
                    <option value="">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Start button */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                onClick={handleStart}
                className="w-full sm:w-auto px-6 py-3 bg-slate-800 text-white rounded-lg text-sm sm:text-base"
              >
                Start Quiz
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
