// src/components/QuizStart.jsx
import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";
import SearchBar from "./SearchBar";
import { useDarkMode } from "../hooks/useDarkMode";
import { motion, AnimatePresence } from "framer-motion";

/**
 * QuizStart Component
 * -------------------
 * Handles quiz setup:
 * - Category selection
 * - Difficulty
 * - Question count
 * - Timer
 *
 * Enhancements:
 * ✅ Proper Framer Motion animations
 * ✅ Smooth entry / exit transitions
 * ✅ Responsive on all screen sizes
 * ✅ Dark & light mode support
 */
export default function QuizStart({ onStart }) {
  // ===== Dark mode state =====
  const [dark] = useDarkMode();

  // ===== Component state =====
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(null);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ===== Fetch categories once =====
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

  // ===== Filter categories on search =====
  useEffect(() => {
    setFiltered(
      categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, categories]);

  // ===== Start quiz handler =====
  function handleStart() {
    onStart({
      amount: Number(amount),
      category,
      difficulty,
      timer: Number(timer),
    });
  }

  // ===== Total quiz time calculation =====
  const totalSeconds = amount * timer;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div
      className={`min-h-screen flex justify-center py-2 sm:py-10 transition-colors duration-300 ${
        dark ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="w-full max-w-4xl px-4 sm:px-6">
        {/* AnimatePresence controls mount/unmount animations */}
        <AnimatePresence mode="wait">
          {/* Animated Card */}
          <motion.div
            key="quiz-start-card"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`rounded-xl shadow-xl p-5 sm:p-8 ${
              dark ? "bg-slate-800" : "bg-white"
            }`}
          >
            {/* Header */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              Create a Quiz
            </h2>

            {/* Error */}
            {err && (
              <div className="mb-4 rounded bg-red-100 dark:bg-red-900 p-3 text-sm text-red-700 dark:text-red-300">
                {err}
              </div>
            )}

            {/* Loading */}
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-slate-500"
              >
                Loading quiz categories…
              </motion.div>
            ) : (
              <>
                {/* Layout grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Search Category
                    </label>

                    <SearchBar value={search} onChange={setSearch} />

                    <div
                      className={`mt-3 max-h-52 overflow-auto border rounded-lg p-3 ${
                        dark
                          ? "bg-slate-700 border-slate-600"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      {filtered.length === 0 ? (
                        <p className="text-sm text-slate-500">
                          No categories found.
                        </p>
                      ) : (
                        filtered.map((c) => (
                          <label
                            key={c.id}
                            className="flex items-center gap-2 py-1 cursor-pointer hover:opacity-80"
                          >
                            <input
                              type="radio"
                              checked={category === c.id}
                              onChange={() => setCategory(c.id)}
                            />
                            {c.name}
                          </label>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Settings */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Settings
                    </label>

                    {/* Question count */}
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full mb-3 rounded border px-3 py-2"
                    />

                    {/* Difficulty */}
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full mb-3 rounded border px-3 py-2"
                    >
                      <option value="">Any</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>

                    {/* Timer */}
                    <input
                      type="number"
                      min="5"
                      max="300"
                      value={timer}
                      onChange={(e) => setTimer(e.target.value)}
                      className="w-full rounded border px-3 py-2"
                    />

                    {/* Total time */}
                    <p className="mt-4 font-medium text-sm sm:text-base pt-5">
                      Total Time:{" "}
                      <span className="text-blue-600 dark:text-blue-400 transition-colors">
                        {hours.toString().padStart(2, "0")}h
                      </span>
                      {" : "}
                      <span className="text-amber-600 dark:text-amber-400 transition-colors">
                        {minutes.toString().padStart(2, "0")}m
                      </span>
                      {" : "}
                      <span className="text-red-600 dark:text-red-400 transition-colors">
                        {seconds.toString().padStart(2, "0")}s
                      </span>
                      {/* seconds to pulse when below a threshold */}
                      <span
                        className={`
                          text-red-600 dark:text-red-400 ml-30
                          ${seconds <= 10 ? "animate-pulse" : ""}
                        `}
                      >
                        {seconds.toString().padStart(2, "0")}s
                      </span>
                    </p>
                  </div>
                </div>

                {/* Start button */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStart}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      dark
                        ? "bg-indigo-600 hover:bg-indigo-500"
                        : "bg-slate-800 hover:bg-slate-700"
                    } text-white`}
                  >
                    Start Quiz
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
