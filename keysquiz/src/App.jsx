// src/App.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";
import History from "./components/History";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";

import Performance from "./pages/Performance";
import About from "./pages/About";
import Contact from "./pages/Contact";

import { fetchQuestions } from "./services/api";

const HISTORY_KEY = "keysquiz_history_v1";

export default function App() {
  const [stage, setStage] = useState("start");
  const [quizConfig, setQuizConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  function clearHistory() {
    setHistory([]);
  }

  async function startQuiz(config) {
    setQuizConfig(config);
    setError("");
    setStage("loading");

    try {
      const qs = await fetchQuestions(config);
      setQuestions(qs);
      setQIndex(0);
      setResults([]);
      setStage("quiz");
    } catch {
      setError("Failed to load quiz");
      setStage("start");
    }
  }

  function handleAnswer({ isCorrect, selected, correct }) {
    const q = questions[qIndex];

    const updatedResults = [
      ...results,
      { question: q.question, selected, correct, isCorrect },
    ];

    setResults(updatedResults);

    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      const score = updatedResults.filter((r) => r.isCorrect).length;

      setHistory((prev) => [
        {
          date: new Date().toISOString(),
          score,
          total: questions.length,
          config: quizConfig,
        },
        ...prev,
      ]);

      setStage("summary");
    }
  }

  function resetQuiz() {
    setStage("start");
    setQuestions([]);
    setResults([]);
    setQuizConfig(null);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {stage === "start" && (
                  <>
                    <QuizStart onStart={startQuiz} />
                    <History history={history} onClear={clearHistory} />
                  </>
                )}

                {stage === "loading" && (
                  <div className="flex justify-center py-20 text-slate-500">
                    Loading quiz questions…
                  </div>
                )}

                {stage === "quiz" && (
                  <div className="max-w-4xl mx-auto px-4">
                    <ProgressBar current={qIndex} total={questions.length} />

                    <QuestionCard
                      q={questions[qIndex]}
                      index={qIndex}
                      total={questions.length}
                      onAnswer={handleAnswer}
                    />
                  </div>
                )}

                {stage === "summary" && (
                  <ScoreSummary results={results} onNewQuiz={resetQuiz} />
                )}
              </>
            }
          />

          <Route
            path="/performance"
            element={<Performance history={history} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {error && <div className="text-center text-red-600 mt-4">{error}</div>}
      </main>

      <Footer />
    </div>
  );
}
