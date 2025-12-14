
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
