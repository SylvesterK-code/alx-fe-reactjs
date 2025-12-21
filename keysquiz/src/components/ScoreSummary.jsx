

// src/components/ScoreSummary.jsx
// This component displays the quiz results summary,
// including percentage score, detailed review,  and action buttons.

import { decode } from "../utils/helpers";

export default function ScoreSummary({ results, onRetake, onNewQuiz }) {
  // Total number of questions answered
  const total = results.length;

  // Count how many answers were correct
  const correct = results.filter((r) => r.isCorrect).length;

  // Calculate percentage score
  const percentage = ((correct / total) * 100).toFixed(0);

  return (
    /* 
      Outer wrapper:
      - Centers content horizontally
      - Adds responsive padding
      - Leaves room for fixed header if present
    */
    <div className="max-w-3xl mx-auto p-4 sm:p-6 mt-20">
      {/* 
        Card container:
        - Light & dark backgrounds
        - Rounded corners and shadow
      */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4 sm:p-6 transition-colors">
        
        {/* ================= HEADER ================= */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
          Quiz Complete
        </h2>

        {/* ================= SCORE SECTION ================= */}
        {/* 
          Layout:
          - Stack on mobile
          - Horizontal layout on larger screens
        */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          
          {/* Numeric score */}
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
            Your Score:{" "}
            <strong className="text-green-700 dark:text-green-400">
              {correct}
            </strong>{" "}
            / {total}
          </p>

          {/* Percentage badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400">
              Percentage
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold">
              {percentage}%
            </span>
          </div>
        </div>

        {/* ================= REVIEW SECTION ================= */}
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3 text-slate-800 dark:text-slate-200">
            Review
          </h3>

          {/* List of question reviews */}
          <div className="space-y-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="
                  p-4 rounded-lg border
                  bg-slate-50 dark:bg-slate-800
                  border-slate-200 dark:border-slate-700
                  hover:bg-slate-100 dark:hover:bg-slate-700
                  transition
                "
              >
                {/* Question number */}
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-1">
                  Question {i + 1}
                </div>

                {/* Question text */}
                <div className="text-sm sm:text-base font-medium mb-2 text-slate-900 dark:text-white">
                  {decode(r.question)}
                </div>

                {/* User answer */}
                <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                  Your answer:{" "}
                  <span className="font-medium">
                    {decode(r.selected || "No answer")}
                  </span>{" "}
                  {r.isCorrect ? "✅" : "❌"}
                </div>

                {/* Correct answer (only shown if wrong) */}
                {!r.isCorrect && (
                  <div className="text-sm mt-1 text-green-700 dark:text-green-400">
                    Correct answer:{" "}
                    <strong>{decode(r.correct)}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        {/* 
          Buttons:
          - Full width on mobile
          - Inline on larger screens
        */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          
          {/* Retake quiz button */}
          <button
            onClick={onRetake}
            className="
              w-full sm:w-auto px-4 py-2 rounded-lg border
              border-slate-300 dark:border-slate-600
              text-slate-700 dark:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-700
              transition
            "
          >
            Retake same quiz
          </button>

          {/* New quiz button */}
          <button
            onClick={onNewQuiz}
            className="
              w-full sm:w-auto px-4 py-2 rounded-lg
              bg-slate-800 dark:bg-blue-600
              text-white
              hover:bg-slate-900 dark:hover:bg-blue-700
              transition
            "
          >
            New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
