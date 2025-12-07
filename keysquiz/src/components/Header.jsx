import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-orange-500 shadow-sm">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Keys A<sup>+ </sup> Quiz</h1>
        <nav className="text-sm text-slate-600">
          <span className="mr-4">Quiz & Practice</span>
        </nav>
      </div>
    </header>
  );
}
