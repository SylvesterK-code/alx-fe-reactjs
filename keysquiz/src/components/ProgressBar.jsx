import React from "react";

export default function ProgressBar({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="mb-6 mt-12">
      <div className="flex justify-between text-xs sm:text-sm text-slate-500 mb-1">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{percent}%</span>
      </div>

      <div className="w-full h-2 sm:h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-800 transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
