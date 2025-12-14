// src/components/QuestionCard.jsx
// import React, { useMemo, useState, useEffect } from "react";
// import { shuffleArray, decode } from "../utils/helpers";
// export default function QuestionCard({ q, index, total, onAnswer }) {
//   const [selected, setSelected] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   // Reset when new question arrives
//   useEffect(() => {
//     setSelected(null);
//     setSubmitted(false);
//   }, [q]);
//   const options = useMemo(() => {
//     const opts = [q.correct_answer, ...q.incorrect_answers];
//     return shuffleArray(opts);
//   }, [q]);
//   function handleSubmit() {
//     setSubmitted(true);
//     const isCorrect = selected === q.correct_answer;
//     onAnswer({ isCorrect, selected, correct: q.correct_answer });
//   }
//   return (
//     <div className="bg-white rounded shadow p-6 max-w-3xl mx-auto mt-10">
//       {" "}
//       <div className="mb-3 text-sm text-slate-500">
//         {" "}
//         Question {index + 1} / {total}{" "}
//       </div>{" "}
//       <h3 className="text-lg font-semibold mb-4">{decode(q.question)}</h3>{" "}
//       <div className="grid gap-3">
//         {" "}
//         {options.map((opt, idx) => {
//           const isSelected = selected === opt;
//           const isCorrect = submitted && opt === q.correct_answer;
//           const isWrongSelected =
//             submitted && isSelected && opt !== q.correct_answer;
//           let classes = "border rounded p-3 cursor-pointer";
//           if (isSelected) classes += " ring-2 ring-accent";
//           if (isCorrect) classes += " bg-green-50 border-green-400";
//           if (isWrongSelected) classes += " bg-red-50 border-red-400";
//           return (
//             <div
//               key={idx}
//               className={classes}
//               onClick={() => !submitted && setSelected(opt)}
//               role="button"
//             >
//               {" "}
//               {decode(opt)}{" "}
//             </div>
//           );
//         })}{" "}
//       </div>{" "}
//       <div className="mt-4 flex items-center justify-between">
//         {" "}
//         <div className="text-sm text-slate-500">
//           {" "}
//           Select an answer then submit{" "}
//         </div>{" "}
//         <div className="flex gap-2">
//           {" "}
//           <button
//             onClick={() => {
//               setSelected(null);
//               setSubmitted(false);
//             }}
//             className="px-3 py-1 border rounded"
//           >
//             {" "}
//             Reset{" "}
//           </button>{" "}
//           <button
//             onClick={handleSubmit}
//             disabled={selected === null || submitted}
//             className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-60"
//           >
//             {" "}
//             Submit{" "}
//           </button>{" "}
//         </div>{" "}
//       </div>{" "}
//     </div>
//   );
// }










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
