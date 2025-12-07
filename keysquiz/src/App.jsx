import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";
import History from "./components/History";
import Footer from "./components/Footer";
import { fetchQuestions } from "./services/api";
// import { decode } from "./utils/helpers";

const HISTORY_KEY = "keysquiz_history_v1";

export default function App() {
  const [stage, setStage] = useState("start"); // start, quiz, summary
  const [quizConfig, setQuizConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [results, setResults] = useState([]); // {question, selected, correct, isCorrect}
  // const [loading, setLoading] = useState(false);
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

  async function startQuiz(config) {
    setQuizConfig(config);
    setError("");
    // setLoading(true);
    setStage("loading");
    try {
      const qs = await fetchQuestions(config);
      // attach decoded question texts to keep things simpler in summary
      const annotated = qs.map((q) => ({
        ...q,
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
      }));
      setQuestions(annotated);
      setQIndex(0);
      setResults([]);
      setStage("quiz");
    } catch (e) {
      setError(e.message || "Failed to start quiz");
      setStage("start");
    } finally {
      // setLoading(false);
    }
  }

  function handleAnswer({ isCorrect, selected, correct }) {
    const q = questions[qIndex];
    setResults((r) => [
      ...r,
      {
        question: q.question,
        selected,
        correct,
        isCorrect,
      },
    ]);
    // next
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      // finished — save history and go to summary
      const total = questions.length;
      const score = [
        ...results,
        { question: q.question, selected, correct, isCorrect },
      ].filter((x) => x.isCorrect).length;
      const entry = {
        date: new Date().toISOString(),
        score,
        total,
        categoryName:
          quizConfig && quizConfig.category
            ? `Category ${quizConfig.category}`
            : "Mixed",
        config: quizConfig,
      };
      const newHist = [entry, ...history].slice(0, 50);
      setHistory(newHist);
      setStage("summary");
    }
  }

  function handleRetake() {
    if (!quizConfig) return setStage("start");
    startQuiz(quizConfig);
  }

  function handleNewQuiz() {
    setStage("start");
    setQuestions([]);
    setResults([]);
    setQuizConfig(null);
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        {stage === "start" && (
          <>
            <QuizStart onStart={startQuiz} />
            <History history={history} onClear={clearHistory} />
          </>
        )}

        {stage === "loading" && (
          <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded shadow p-6 text-center">
              Loading quiz...
            </div>
          </div>
        )}

        {stage === "quiz" && questions.length > 0 && (
          <>
            <div className="max-w-4xl mx-auto p-4">
              <QuestionCard
                q={questions[qIndex]}
                index={qIndex}
                total={questions.length}
                onAnswer={handleAnswer}
              />
            </div>
          </>
        )}

        {stage === "summary" && (
          <ScoreSummary
            results={results}
            onRetake={handleRetake}
            onNewQuiz={handleNewQuiz}
          />
        )}

        {error && (
          <div className="max-w-3xl mx-auto p-4">
            <div className="text-red-600">{error}</div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
