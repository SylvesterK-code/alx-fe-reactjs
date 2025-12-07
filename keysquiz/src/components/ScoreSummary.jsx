// does not display percentage score


// // import React from "react";
// import { decode } from "../utils/helpers";

// export default function ScoreSummary({ results, onRetake, onNewQuiz }) {
//   const total = results.length;
//   const correct = results.filter((r) => r.isCorrect).length;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white rounded shadow p-6">
//         <h2 className="text-2xl font-semibold mb-2">Quiz Complete</h2>
//         <p className="mb-4">
//           Your Score: <strong>{correct}</strong> / {total}
//         </p>

//         <div className="mb-4">
//           <h3 className="font-medium mb-2">Review</h3>
//           <div className="space-y-3">
//             {results.map((r, i) => (
//               <div key={i} className="p-3 border rounded bg-slate-50">
//                 <div className="text-sm text-slate-600">Q{i + 1}</div>
//                 <div className="font-medium">{decode(r.question)}</div>
//                 <div className="mt-1 text-sm">
//                   Your answer: {decode(r.selected || "No answer")}{" "}
//                   {r.isCorrect ? "✅" : "❌"}
//                 </div>
//                 {!r.isCorrect && (
//                   <div className="text-sm text-green-700">
//                     Correct: {decode(r.correct)}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex gap-3 justify-end">
//           <button onClick={onRetake} className="px-4 py-2 border rounded">
//             Retake same quiz
//           </button>
//           <button
//             onClick={onNewQuiz}
//             className="px-4 py-2 bg-slate-800 text-white rounded"
//           >
//             New Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }









// ------------------ display percntage score to the below the score

// import { decode } from "../utils/helpers";

// export default function ScoreSummary({ results, onRetake, onNewQuiz }) {
//   const total = results.length;
//   const correct = results.filter((r) => r.isCorrect).length;

//   const percentage = ((correct / total) * 100).toFixed(1); // 1 decimal

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="bg-white rounded-lg shadow p-4 sm:p-6 lg:p-8">
//         <h2 className="text-xl sm:text-2xl font-semibold mb-2">
//           Quiz Complete
//         </h2>

//         {/* Score Overview */}
//         <p className="mb-4 text-base sm:text-lg">
//           Your Score: <strong className="text-slate-800">{correct}</strong> /{" "}
//           {total}
//         </p>

//         <div className="mb-6">
//           <div className="text-lg font-medium">
//             Percentage:{" "}
//             <span
//               className={`font-bold ${
//                 percentage >= 70
//                   ? "text-green-600"
//                   : percentage >= 40
//                     ? "text-yellow-600"
//                     : "text-red-600"
//               }`}
//             >
//               {percentage}%
//             </span>
//           </div>
//         </div>

//         {/* Review Section */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-lg mb-3">Review Answers</h3>

//           <div className="space-y-4">
//             {results.map((r, i) => (
//               <div
//                 key={i}
//                 className="p-4 border rounded-lg bg-slate-50 shadow-sm"
//               >
//                 <div className="text-xs text-slate-500 mb-1">
//                   Question {i + 1}
//                 </div>

//                 <div className="font-medium text-sm sm:text-base">
//                   {decode(r.question)}
//                 </div>

//                 <div className="mt-2 text-sm sm:text-base">
//                   <span className="font-medium">Your answer:</span>{" "}
//                   {decode(r.selected || "No answer")}{" "}
//                   {r.isCorrect ? (
//                     <span className="text-green-600">✔ Correct</span>
//                   ) : (
//                     <span className="text-red-600">✘ Incorrect</span>
//                   )}
//                 </div>

//                 {!r.isCorrect && (
//                   <div className="mt-1 text-sm text-green-700">
//                     Correct: {decode(r.correct)}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 justify-end">
//           <button
//             onClick={onRetake}
//             className="px-4 py-2 border rounded hover:bg-slate-100 transition"
//           >
//             Retake same quiz
//           </button>

//           <button
//             onClick={onNewQuiz}
//             className="px-4 py-2 bg-slate-800 text-white rounded hover:opacity-90 transition"
//           >
//             New Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }














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
            className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition"
          >
            Retake same quiz
          </button>

          <button
            onClick={onNewQuiz}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:opacity-90 transition"
          >
            New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
