
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
