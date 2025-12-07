// src/pages/Performance

import { useEffect, useState } from "react";

export default function Performance() {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    bestScore: 0,
    averageScore: 0,
  });

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

    if (history.length === 0) return;

    const totalQuizzes = history.length;
    const bestScore = Math.max(...history.map((h) => h.score));
    const averageScore =
      history.reduce((sum, h) => sum + h.score, 0) / history.length;

    setStats({
      totalQuizzes,
      bestScore,
      averageScore: averageScore.toFixed(1),
    });
  }, []);

  return (
    <div className="min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Performance Stats</h1>

      <div className="space-y-4 max-w-md">
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">Total Quizzes Taken:</p>
          <p>{stats.totalQuizzes}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">Best Score:</p>
          <p>{stats.bestScore}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">Average Score:</p>
          <p>{stats.averageScore}</p>
        </div>
      </div>
    </div>
  );
}
