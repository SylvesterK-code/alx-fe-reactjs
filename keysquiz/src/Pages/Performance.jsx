// src/Pages/Performance.jsx
// This page displays the user's quiz performance history
// It supports dark & light mode via Tailwind's `dark:` classes
// and is responsive on all screen sizes.

import React from "react";

export default function Performance({ history }) {
  /* ================= EMPTY STATE =================
     If the user has not taken any quizzes yet,
     we show a friendly message instead of the dashboard.
  */
  if (!history.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 mt-20 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
          Performance
        </h2>

        <p className="mt-4 text-slate-500 dark:text-slate-400">
          No quiz attempts yet.
        </p>
      </div>
    );
  }

  /* ================= CALCULATIONS =================
     Compute the average score across all attempts.
     Each history item has: score, total, date
  */
  const avg =
    history.reduce((a, h) => a + h.score / h.total, 0) / history.length;

  return (
    /* 
      Page wrapper:
      - Centers content
      - Adds padding for mobile
      - Adds top spacing for fixed header
    */
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
      {/* ================= PAGE TITLE ================= */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
        Performance Overview
      </h2>

      {/* ================= AVERAGE SCORE CARD ================= */}
      <div
        className="
          mb-6 p-4 sm:p-6 rounded-xl shadow
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          transition-colors
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Average Score
        </p>

        <p className="text-3xl sm:text-4xl font-semibold text-blue-700 dark:text-blue-400">
          {Math.round(avg * 100)}%
        </p>
      </div>

      {/* ================= HISTORY LIST ================= */}
      {/* 
        Uses spacing instead of borders for clean separation.
        Each item adapts layout based on screen size.
      */}
      <div className="space-y-3">
        {history.map((h, i) => (
          <div
            key={i}
            className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-2 p-4 rounded-lg shadow
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              transition
            "
          >
            {/* Quiz date */}
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {new Date(h.date).toLocaleDateString()}
            </span>

            {/* Score */}
            <span className="font-semibold text-slate-900 dark:text-white">
              {h.score}/{h.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
