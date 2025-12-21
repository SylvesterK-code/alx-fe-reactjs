# keysQuiz


## React + Vite project

npm create vite@latest keysquiz -- --template react
npm install tailwindcss @tailwindcss/vite
npm install he


npm install react-icons
npm install react-router-dom
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer


// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ✅ Add this

// https://vite.dev/config/
export default defineConfig({
    plugins: [
    react(),
    tailwindcss(),     // ✅ Add this
  ],
})




// index.css
@import "tailwindcss";      v4

@tailwind base;             v3
@tailwind components;       v3
@tailwind utilities;        v3



keysquiz/
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ QuizStart.jsx
│  │  ├─ QuestionCard.jsx
│  │  ├─ ScoreSummary.jsx
│  │  ├─ History.jsx
│  │  ├─ SearchBar.jsx
│  │  └─ Footer.jsx
│  ├─ services/
│  │  └─ api.js
│  ├─ utils/
│  │  └─ helpers.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ package.json
├─ tailwind.config.cjs
├─ postcss.config.cjs
└─ README.md





mkdr components
ni Header.jsx
ni QuizStart.jsx
ni  QuestionCard.jsx
ni ScoreSummary.jsx
ni History.jsx
ni SearchBar.jsx
ni Footer.jsx




## How It Works
1. User selects quiz options

Category

Difficulty

Number of questions

2. App fetches questions

API used:

https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple

3. Questions are displayed

Answers are shuffled using a custom shuffle helper

User selects and submits answer

4. System validates answer

Correct answer → green

Wrong answer → red

5. Final Score Summary

Total correct answers

Percentage

Review each question

6. User can

Retake same quiz

Start brand-new quiz



## 🧩 Challenges & How They Were Solved
### ⚠️ 1. React warning: “Avoid calling setState inside an effect”

Problem:
When switching questions, a useEffect manually reset state:

useEffect(() => {
  setSelected(null);
  setSubmitted(false);
}, [q]);


React warned that this can cause unnecessary renders.

Solution:
We used a dynamic key when rendering QuestionCard, which forces automatic reset:

<QuestionCard key={q.question} q={q} ... />


This lets React fully re-mount the component and eliminates the warning.
✔ Cleaner
✔ No side effects
✔ More predictable behavior

### ⚠️ 2. Options not selectable on second question

Cause:
A stale state bug where submitted was still true for the next question.

Solution:
Using the key fix above fully resolved it because the state resets on mount.

### ⚠️ 3. Category search not trimming spaces

Fix:

onChange(e.target.value.trimStart());

### ⚠️ 4. Responsiveness issues on small screens

Fix:

Applied Tailwind responsive utilities (sm:, md:, lg:)

Reduced fixed widths

Added padding adjustments

Stacked items on small screens

### ⚠️ 5. Horizontal overflow in Score Summary

Fix:
Applied:

<div className="overflow-x-hidden">


Plus responsive text sizing.

### ⚠️ 6. Percentage score missing

Added:

const percent = Math.round((correct / total) * 100);


Displayed:

Your Score: 7 / 10 (70%)




## 🌐 Deployment (Vercel)
### 1. Push project to GitHub
git add .
git commit -m "Initial commit"
git push origin main

### 2. Deploy

Go to https://vercel.com/

Click New → Project

Import GitHub repo

Select framework: Vite or CRA

Click Deploy

Vercel auto-builds and hosts your app.

## 🔮 Future Improvements

Add timer per question

Add category icons

Add progress bar indicator

Add animations between questions

Add dark mode

Save quiz history in local storage

Enable leaderboard






add dark mode to the heeder for users to toggle

make the pages resposive on all screen sizes

add hamburger icon on small screen

improve user UX with framer motion

add fa icons where needed

Save quiz history in local storage

Add animations between questions

Add animations between questions

allow user to add timer per question



// src/components/Header.jsx


import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-orange-500 z-50 shadow">
      <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-950">
          Keys A<sup>+</sup> Quiz
        </h1>

        <nav className="flex gap-4 text-sm font-medium">
          <NavLink to="/" className="hover:underline">
            Quiz
          </NavLink>
          <NavLink to="/performance" className="hover:underline ">
            Performance
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}




// src/components/Header.jsx


import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-orange-500 z-50 shadow">
      <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-950">
          Keys A<sup>+</sup> Quiz
        </h1>

        <nav className="flex gap-4 text-sm font-medium">
          <NavLink to="/" className="hover:underline">
            Quiz
          </NavLink>
          <NavLink to="/performance" className="hover:underline ">
            Performance
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}




// src/components/History.jsx

export default function History({ history, onClear }) {
  if (!history || history.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white p-4 rounded shadow text-sm text-slate-500">
          No quiz history yet.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Quiz History</h3>
          <button onClick={onClear} className="text-sm text-red-600 hover:underline">
            Clear history
          </button>
        </div>

        <div className="space-y-2">
          {history.map((h, idx) => (
            <div key={idx} className="p-3 border rounded">
              <div className="text-sm text-slate-600">
                {new Date(h.date).toLocaleString()}
              </div>
              <div>
                <strong>{h.score}</strong> / {h.total} —{" "}
                {h.categoryName || "Category"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




//src/components/QuestionCard.jsx
import React, { useMemo, useState, useEffect } from "react";
import { shuffleArray, decode } from "../utils/helpers";

export default function QuestionCard({ q, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
  }, [q]);

  const options = useMemo(() => {
    return shuffleArray([q.correct_answer, ...q.incorrect_answers]);
  }, [q]);

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    onAnswer({
      isCorrect: selected === q.correct_answer,
      selected,
      correct: q.correct_answer,
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        {decode(q.question)}
      </h3>

      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === opt;
          const isCorrect = submitted && opt === q.correct_answer;
          const isWrong = submitted && isSelected && !isCorrect;

          let cls = "border rounded-lg p-3 sm:p-4 cursor-pointer transition";

          if (!submitted) cls += " hover:bg-slate-100";
          if (isSelected) cls += " ring-2 ring-slate-800";
          if (isCorrect) cls += " bg-green-50 border-green-500";
          if (isWrong) cls += " bg-red-50 border-red-500";
          if (submitted && !isCorrect && !isWrong) cls += " opacity-60";

          return (
            <div
              key={idx}
              className={cls}
              onClick={() => !submitted && setSelected(opt)}
            >
              {decode(opt)}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-slate-500 text-center sm:text-left">
          Select an answer and submit
        </p>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
            }}
            className="flex-1 sm:flex-none px-4 py-2 border rounded-lg text-sm"
            disabled={submitted}
          >
            Reset
          </button>

          <button
            onClick={handleSubmit}
            disabled={selected === null || submitted}
            className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 text-white rounded-lg text-sm disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}




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




// src/components/ScoreSummary.jsx
// display percentage score to the left of the score

import { decode } from "../utils/helpers";

export default function ScoreSummary({ results, onRetake, onNewQuiz }) {
  const total = results.length;
  const correct = results.filter((r) => r.isCorrect).length;

  const percentage = ((correct / total) * 100).toFixed(0);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          Quiz Complete
        </h2>

        {/* Score section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <p className="text-base sm:text-lg">
            Your Score: <strong className="text-green-700">{correct}</strong> /{" "}
            {total}
          </p>
          <p className="text-base sm:text-lg font-semibold text-blue-600 mt-1 sm:mt-0">
            {percentage}%
          </p>
        </div>

        {/* Review */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-lg">Review</h3>
          <div className="space-y-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg bg-slate-50 hover:bg-slate-100 transition"
              >
                <div className="text-xs sm:text-sm text-slate-500 mb-1">
                  Question {i + 1}
                </div>
                <div className="text-sm sm:text-base font-medium mb-2">
                  {decode(r.question)}
                </div>

                <div className="text-sm sm:text-base">
                  Your answer:{" "}
                  <span className="font-medium">
                    {decode(r.selected || "No answer")}
                  </span>{" "}
                  {r.isCorrect ? "✅" : "❌"}
                </div>

                {!r.isCorrect && (
                  <div className="text-sm text-green-700 mt-1">
                    Correct answer: <strong>{decode(r.correct)}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onRetake}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg"
          >
            Retake same quiz
          </button>

          <button
            onClick={onNewQuiz}
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 text-white rounded-lg"
          >
            New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}



// src/components/ScoreSummary.jsx
// display percentage score to the left of the score

import { decode } from "../utils/helpers";

export default function ScoreSummary({ results, onRetake, onNewQuiz }) {
  const total = results.length;
  const correct = results.filter((r) => r.isCorrect).length;

  const percentage = ((correct / total) * 100).toFixed(0);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          Quiz Complete
        </h2>

        {/* Score section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <p className="text-base sm:text-lg">
            Your Score: <strong className="text-green-700">{correct}</strong> /{" "}
            {total}
          </p>
          <p className="text-base sm:text-lg font-semibold text-blue-600 mt-1 sm:mt-0">
            {percentage}%
          </p>
        </div>

        {/* Review */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-lg">Review</h3>
          <div className="space-y-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg bg-slate-50 hover:bg-slate-100 transition"
              >
                <div className="text-xs sm:text-sm text-slate-500 mb-1">
                  Question {i + 1}
                </div>
                <div className="text-sm sm:text-base font-medium mb-2">
                  {decode(r.question)}
                </div>

                <div className="text-sm sm:text-base">
                  Your answer:{" "}
                  <span className="font-medium">
                    {decode(r.selected || "No answer")}
                  </span>{" "}
                  {r.isCorrect ? "✅" : "❌"}
                </div>

                {!r.isCorrect && (
                  <div className="text-sm text-green-700 mt-1">
                    Correct answer: <strong>{decode(r.correct)}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onRetake}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg"
          >
            Retake same quiz
          </button>

          <button
            onClick={onNewQuiz}
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 text-white rounded-lg"
          >
            New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}







// src/Pages/Performance.jsx


import React from "react";

export default function Performance({ history }) {
  if (!history.length) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-semibold">Performance</h2>
        <p className="mt-4 text-slate-500">No quiz attempts yet.</p>
      </div>
    );
  }

  const avg =
    history.reduce((a, h) => a + h.score / h.total, 0) / history.length;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <p className="text-sm text-slate-500">Average Score</p>
        <p className="text-3xl font-semibold">{Math.round(avg * 100)}%</p>
      </div>

      <div className="space-y-3">
        {history.map((h, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:justify-between gap-2 bg-white p-4 rounded-lg shadow"
          >
            <span className="text-sm text-slate-500">
              {new Date(h.date).toLocaleDateString()}
            </span>

            <span className="font-semibold">
              {h.score}/{h.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}





































































merge this codes

## // display total time, countdown and remaining time in seconds for each question

// src/components/QuestionCard.jsx

import React, { useMemo, useState, useEffect } from "react";
import { shuffleArray, decode } from "../utils/helpers";
import { useDarkMode } from "../hooks/useDarkMode";

/**
 * QuestionCard Component
 * -----------------------
 * Displays a single quiz question with multiple choice options.
 *
 * Props:
 * - q: Question object with correct_answer & incorrect_answers
 * - index: Current question index
 * - total: Total number of questions
 * - onAnswer: Callback function to report answer & move to next
 * - timer: Time allowed per question in seconds (default 30)
 *
 * Features:
 * 1. Dark mode support
 * 2. Responsive layout
 * 3. Countdown timer per question
 * 4. Automatic submission when time runs out
 * 5. Visual progress bar with color-coded total, used, remaining time
 */
export default function QuestionCard({
  q,
  index,
  total,
  onAnswer,
  timer = 30,
}) {
  // ==== Dark mode hook ====
  const [dark] = useDarkMode();

  // ==== Local state ====
  const [selected, setSelected] = useState(null); // currently selected option
  const [submitted, setSubmitted] = useState(false); // answer submitted
  const [timeLeft, setTimeLeft] = useState(timer); // countdown for question

  // ==== Reset state when question changes ====
  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
    setTimeLeft(timer);
  }, [q, timer]);

  // ==== Timer countdown effect ====
  useEffect(() => {
    if (submitted) return; // stop timer if submitted
    if (timeLeft <= 0) {
      handleSubmit(); // auto-submit when time reaches 0
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval); // cleanup interval
  }, [timeLeft, submitted]);

  // ==== Shuffle options once per question ====
  const options = useMemo(() => {
    return shuffleArray([q.correct_answer, ...q.incorrect_answers]);
  }, [q]);

  // ==== Handle submit action ====
  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    onAnswer({
      isCorrect: selected === q.correct_answer,
      selected,
      correct: q.correct_answer,
    });
  }

  // ==== Timer calculations for visual display ====
  const timeUsed = timer - timeLeft; // seconds elapsed
  const totalTime = timer; // total allowed time
  const percentUsed = (timeUsed / totalTime) * 100; // % for progress bar
  const percentRemaining = (timeLeft / totalTime) * 100;

  return (
    <div
      className={`rounded-xl shadow p-5 sm:p-6 w-full max-w-4xl mx-auto ${
        dark ? "bg-slate-800 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Question number & timer */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm sm:text-base font-medium">
          Question {index + 1} of {total}
        </span>
        <span
          className={`text-sm sm:text-base font-medium ${
            timeLeft <= 5
              ? "text-red-500"
              : dark
                ? "text-white"
                : "text-slate-800"
          }`}
        >
          Time left: {timeLeft}s
        </span>
      </div>

      {/* Timer progress bar */}
      <div className="w-full h-0.5 rounded-lg overflow-hidden mb-4 bg-gray-300 dark:bg-slate-600">
        <div
          className="h-full transition-all"
          style={{
            width: `${percentUsed}%`,
            backgroundColor:
              percentUsed < 50
                ? "#34d399"
                : percentUsed < 80
                  ? "#fbbf24"
                  : "#f87171", // green -> yellow -> red
          }}
        ></div>
      </div>

      {/* Time summary */}
      <div className="mt-4 text-sm sm:text-base pt-2 pb-">
        <div className="flex justify-between">
          <span>Total Time: {totalTime}s</span>
          <span>Used: {timeUsed}s</span>
          <span>Remaining: {timeLeft}s</span>
        </div>
      </div>

      {/* Question text */}
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        {decode(q.question)}
      </h3>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === opt;
          const isCorrect = submitted && opt === q.correct_answer;
          const isWrong = submitted && isSelected && !isCorrect;

          // Base styling
          let cls = `border rounded-lg p-3 sm:p-4 cursor-pointer transition ${
            dark ? "bg-slate-700 border-slate-600" : "bg-white border-slate-300"
          }`;

          // Conditional styling
          if (!submitted)
            cls += dark ? " hover:bg-slate-600" : " hover:bg-slate-100";
          if (isSelected)
            cls += dark ? " ring-2 ring-indigo-500" : " ring-2 ring-blue-500";
          if (isCorrect)
            cls += dark
              ? " bg-green-700 border-green-500"
              : " bg-green-50 border-green-500";
          if (isWrong)
            cls += dark
              ? " bg-red-700 border-red-500"
              : " bg-red-50 border-red-500";
          if (submitted && !isCorrect && !isWrong) cls += " opacity-60";

          return (
            <div
              key={idx}
              className={cls}
              onClick={() => !submitted && setSelected(opt)}
            >
              {decode(opt)}
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p
          className={`text-sm text-center sm:text-left ${dark ? "text-slate-200" : "text-slate-500"}`}
        >
          Select an answer and submit
        </p>

        <div className="flex gap-2 w-full sm:w-auto">
          {/* Reset button */}
          <button
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
              setTimeLeft(timer); // reset timer
            }}
            className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg text-sm ${
              dark
                ? "border-slate-600 text-white"
                : "border-slate-300 text-slate-900"
            }`}
            disabled={submitted}
          >
            Reset
          </button>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={selected === null || submitted}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm text-white ${
              dark
                ? "bg-indigo-600 hover:bg-indigo-500"
                : "bg-slate-800 hover:bg-slate-700"
            } disabled:opacity-50`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}



## display total time for the entire quetion with countdown

// src/components/QuestionCard.jsx
import React, { useMemo, useState, useEffect } from "react";
import { shuffleArray, decode } from "../utils/helpers";
import { useDarkMode } from "../hooks/useDarkMode";

/**
 * QuestionCard Component
 * -----------------------
 * Displays a single quiz question with:
 * - Multiple choice options
 * - Per-question countdown timer
 * - Total quiz countdown timer
 * - Dark/light mode support
 * - Responsive layout
 *
 * Props:
 * - q: Question object (with correct_answer & incorrect_answers)
 * - index: Current question index (0-based)
 * - total: Total number of questions
 * - onAnswer: Callback function to report answer
 * - timer: Time allowed per question in seconds (default 30)
 */
export default function QuestionCard({
  q,
  index,
  total,
  onAnswer,
  timer = 30,
  totalQuizTime = 300, // total time for the quiz in seconds
}) {
  // Dark mode state
  const [dark] = useDarkMode();

  // Local state
  const [selected, setSelected] = useState(null); // selected option
  const [submitted, setSubmitted] = useState(false); // per-question submission
  const [timeLeft, setTimeLeft] = useState(timer); // per-question timer
  const [totalTimeLeft, setTotalTimeLeft] = useState(totalQuizTime); // total quiz timer

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
    setTimeLeft(timer);
  }, [q, timer]);

  // Per-question timer
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, submitted]);

  // Total quiz timer
  useEffect(() => {
    if (totalTimeLeft <= 0) return;

    const interval = setInterval(() => setTotalTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [totalTimeLeft]);

  // Shuffle options
  const options = useMemo(() => {
    return shuffleArray([q.correct_answer, ...q.incorrect_answers]);
  }, [q]);

  // Submit answer
  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    onAnswer({
      isCorrect: selected === q.correct_answer,
      selected,
      correct: q.correct_answer,
    });
  }

  // Per-question timer progress
  const percentUsed = ((timer - timeLeft) / timer) * 100;

  // Total quiz timer calculations
  const totalHours = Math.floor(totalTimeLeft / 3600);
  const totalMinutes = Math.floor((totalTimeLeft % 3600) / 60);
  const totalSeconds = totalTimeLeft % 60;

  return (
    <div
      className={`rounded-xl shadow p-5 sm:p-6 w-full max-w-4xl mx-auto mb-8 ${
        dark ? "bg-slate-800 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Question number & per-question timer */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm sm:text-base font-medium">
          Question {index + 1} of {total}
        </span>
        <span
          className={`text-sm sm:text-base font-medium ${
            timeLeft <= 5
              ? "text-red-500"
              : dark
              ? "text-white"
              : "text-slate-800"
          }`}
        >
          Time left: {timeLeft}s
        </span>
      </div>

      {/* Per-question timer progress */}
      <div className="w-full h-1 rounded-lg overflow-hidden mb-4 bg-gray-300 dark:bg-slate-600">
        <div
          className="h-full transition-all"
          style={{
            width: `${percentUsed}%`,
            backgroundColor:
              percentUsed < 50
                ? "#34d399"
                : percentUsed < 80
                ? "#fbbf24"
                : "#f87171",
          }}
        />
      </div>

      {/* Total quiz timer */}
      <p className="text-sm sm:text-base font-medium mb-4 text-center">
        Total Quiz Time Remaining:{" "}
        <span className="text-blue-500 dark:text-blue-400">
          {totalHours.toString().padStart(2, "0")}h
        </span>{" "}
        :{" "}
        <span className="text-amber-500 dark:text-amber-400">
          {totalMinutes.toString().padStart(2, "0")}m
        </span>{" "}
        :{" "}
        <span className="text-red-500 dark:text-red-400">
          {totalSeconds.toString().padStart(2, "0")}s
        </span>
      </p>

      {/* Question text */}
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        {decode(q.question)}
      </h3>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === opt;
          const isCorrect = submitted && opt === q.correct_answer;
          const isWrong = submitted && isSelected && !isCorrect;

          let cls = `border rounded-lg p-3 sm:p-4 cursor-pointer transition ${
            dark ? "bg-slate-700 border-slate-600" : "bg-white border-slate-300"
          }`;

          if (!submitted)
            cls += dark ? " hover:bg-slate-600" : " hover:bg-slate-100";
          if (isSelected)
            cls += dark ? " ring-2 ring-indigo-500" : " ring-2 ring-blue-500";
          if (isCorrect)
            cls += dark
              ? " bg-green-700 border-green-500"
              : " bg-green-50 border-green-500";
          if (isWrong)
            cls += dark
              ? " bg-red-700 border-red-500"
              : " bg-red-50 border-red-500";
          if (submitted && !isCorrect && !isWrong) cls += " opacity-60";

          return (
            <div
              key={idx}
              className={cls}
              onClick={() => !submitted && setSelected(opt)}
            >
              {decode(opt)}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p
          className={`text-sm text-center sm:text-left ${
            dark ? "text-slate-200" : "text-slate-500"
          }`}
        >
          Select an answer and submit
        </p>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
              setTimeLeft(timer);
            }}
            className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg text-sm ${
              dark
                ? "border-slate-600 text-white"
                : "border-slate-300 text-slate-900"
            }`}
            disabled={submitted}
          >
            Reset
          </button>

          <button
            onClick={handleSubmit}
            disabled={selected === null || submitted}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm text-white ${
              dark
                ? "bg-indigo-600 hover:bg-indigo-500"
                : "bg-slate-800 hover:bg-slate-700"
            } disabled:opacity-50`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}




## displays total time for each question 
## display and the total time for the entire question

// src/components/QuestionCard.jsx
import React, { useMemo, useState, useEffect } from "react";
import { shuffleArray, decode } from "../utils/helpers";
import { useDarkMode } from "../hooks/useDarkMode";

/**
 * QuestionCard Component
 * -----------------------
 * Displays a single quiz question with multiple choice options.
 * Enhancements:
 * 1. Dark/light mode support
 * 2. Countdown timer per question
 * 3. Total quiz timer across all questions
 * 4. Visual progress bars for per-question and total time
 * 5. Responsive design with Tailwind
 *
 * Props:
 * - q: Question object
 * - index: Current question index
 * - total: Total number of questions
 * - onAnswer: Callback when an answer is submitted
 * - timer: Time per question (seconds)
 * - totalQuizTime: Total time for entire quiz (seconds)
 */
export default function QuestionCard({
  q,
  index,
  total,
  onAnswer,
  timer = 30,
  totalQuizTime = 300,
}) {
  const [dark] = useDarkMode();

  // Local state
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timer); // per question timer
  const [totalTimeLeft, setTotalTimeLeft] = useState(totalQuizTime); // total quiz countdown

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
    setTimeLeft(timer);
  }, [q, timer]);

  // Timer countdown per question
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmit(); // auto-submit
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, submitted]);

  // Total quiz countdown
  useEffect(() => {
    if (totalTimeLeft <= 0) return;
    const interval = setInterval(() => setTotalTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [totalTimeLeft]);

  // Shuffle question options
  const options = useMemo(
    () => shuffleArray([q.correct_answer, ...q.incorrect_answers]),
    [q]
  );

  // Submit answer
  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    onAnswer({
      isCorrect: selected === q.correct_answer,
      selected,
      correct: q.correct_answer,
    });
  }

  // Calculations
  const timeUsed = timer - timeLeft;
  const percentUsed = (timeUsed / timer) * 100;

  const totalTimeUsed = totalQuizTime - totalTimeLeft;
  const percentTotalUsed = (totalTimeUsed / totalQuizTime) * 100;

  // Convert total time left into HH:MM:SS
  const hours = Math.floor(totalTimeLeft / 3600);
  const minutes = Math.floor((totalTimeLeft % 3600) / 60);
  const seconds = totalTimeLeft % 60;

  return (
    <div
      className={`rounded-xl shadow p-5 sm:p-6 w-full max-w-4xl mx-auto ${
        dark ? "bg-slate-800 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Question number & per-question timer */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm sm:text-base font-medium">
          Question {index + 1} of {total}
        </span>
        <span
          className={`text-sm sm:text-base font-medium ${
            timeLeft <= 5 ? "text-red-500" : dark ? "text-white" : "text-slate-800"
          }`}
        >
          Time left: {timeLeft}s
        </span>
      </div>

      {/* Per-question progress bar */}
      <div className="w-full h-1 rounded-lg overflow-hidden mb-4 bg-gray-300 dark:bg-slate-600">
        <div
          className="h-full transition-all"
          style={{
            width: `${percentUsed}%`,
            backgroundColor:
              percentUsed < 50
                ? "#34d399"
                : percentUsed < 80
                ? "#fbbf24"
                : "#f87171", // green -> yellow -> red
          }}
        ></div>
      </div>

      {/* Total quiz timer */}
      <div className="mt-2 mb-4 text-sm sm:text-base font-medium">
        <span>Total Quiz Time Left: </span>
        <span className="text-blue-500">{hours.toString().padStart(2, "0")}h</span> :
        <span className="text-amber-500">{minutes.toString().padStart(2, "0")}m</span> :
        <span className="text-red-500">{seconds.toString().padStart(2, "0")}s</span>
      </div>

      {/* Total quiz progress bar */}
      <div className="w-full h-1 rounded-lg overflow-hidden mb-4 bg-gray-300 dark:bg-slate-600">
        <div
          className="h-full transition-all"
          style={{
            width: `${percentTotalUsed}%`,
            backgroundColor:
              percentTotalUsed < 50
                ? "#34d399"
                : percentTotalUsed < 80
                ? "#fbbf24"
                : "#f87171",
          }}
        ></div>
      </div>

      {/* Question text */}
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        {decode(q.question)}
      </h3>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === opt;
          const isCorrect = submitted && opt === q.correct_answer;
          const isWrong = submitted && isSelected && !isCorrect;

          let cls = `border rounded-lg p-3 sm:p-4 cursor-pointer transition ${
            dark ? "bg-slate-700 border-slate-600" : "bg-white border-slate-300"
          }`;
          if (!submitted) cls += dark ? " hover:bg-slate-600" : " hover:bg-slate-100";
          if (isSelected) cls += dark ? " ring-2 ring-indigo-500" : " ring-2 ring-blue-500";
          if (isCorrect)
            cls += dark ? " bg-green-700 border-green-500" : " bg-green-50 border-green-500";
          if (isWrong)
            cls += dark ? " bg-red-700 border-red-500" : " bg-red-50 border-red-500";
          if (submitted && !isCorrect && !isWrong) cls += " opacity-60";

          return (
            <div key={idx} className={cls} onClick={() => !submitted && setSelected(opt)}>
              {decode(opt)}
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className={`text-sm text-center sm:text-left ${dark ? "text-slate-200" : "text-slate-500"}`}>
          Select an answer and submit
        </p>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
              setTimeLeft(timer);
            }}
            className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg text-sm ${
              dark ? "border-slate-600 text-white" : "border-slate-300 text-slate-900"
            }`}
            disabled={submitted}
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={selected === null || submitted}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm text-white ${
              dark ? "bg-indigo-600 hover:bg-indigo-500" : "bg-slate-800 hover:bg-slate-700"
            } disabled:opacity-50`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}