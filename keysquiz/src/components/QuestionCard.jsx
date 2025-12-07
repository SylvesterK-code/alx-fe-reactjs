import React, { useMemo, useState, useEffect } from "react";
import { shuffleArray, decode } from "../utils/helpers";

export default function QuestionCard({ q, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Reset when new question arrives
  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
  }, [q]);

  const options = useMemo(() => {
    const opts = [q.correct_answer, ...q.incorrect_answers];
    return shuffleArray(opts);
  }, [q]);

  function handleSubmit() {
    setSubmitted(true);
    const isCorrect = selected === q.correct_answer;
    onAnswer({ isCorrect, selected, correct: q.correct_answer });
  }

  return (
    <div className="bg-white rounded shadow p-6 max-w-3xl mx-auto">
      <div className="mb-3 text-sm text-slate-500">
        Question {index + 1} / {total}
      </div>
      <h3 className="text-lg font-semibold mb-4">{decode(q.question)}</h3>

      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === opt;
          const isCorrect = submitted && opt === q.correct_answer;
          const isWrongSelected =
            submitted && isSelected && opt !== q.correct_answer;

          let classes = "border rounded p-3 cursor-pointer";
          if (isSelected) classes += " ring-2 ring-accent";
          if (isCorrect) classes += " bg-green-50 border-green-400";
          if (isWrongSelected) classes += " bg-red-50 border-red-400";

          return (
            <div
              key={idx}
              className={classes}
              onClick={() => !submitted && setSelected(opt)}
              role="button"
            >
              {decode(opt)}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Select an answer then submit
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
            }}
            className="px-3 py-1 border rounded"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={selected === null || submitted}
            className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-60"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
