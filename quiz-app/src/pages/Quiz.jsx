// src/components/quiz.jsx

import { useEffect, useState } from "react";
import { fetchQuizQuestions } from "../services/quizService";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useNavigate, useLocation } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  // Values coming from landing page
  const topic = state?.topic || "General Knowledge";
  const amount = state?.amount || 10;
  const difficulty = state?.difficulty || "easy";
  const category = state?.category || null; // numeric ID

  // Load quiz questions
  const loadQuiz = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchQuizQuestions(amount, category, difficulty);

      // Make API results compatible with your UI structure
      const formatted = data.map((q) => ({
        question: q.question,
        correct: q.correct_answer,
        answers: q.options,
      }));

      setQuestions(formatted);
    } catch (err) {
      setError("Failed to load quiz. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} retry={loadQuiz} />;

  const q = questions[current];

  const handleNext = () => {
    // Add score
    if (selected === q.correct) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = current + 1;

    // End of quiz
    if (nextIndex === questions.length) {
      saveHistory();
      return navigate("/results", {
        state: {
          score: selected === q.correct ? score + 1 : score,
          total: questions.length,
          topic,
        },
      });
    }

    // Move to next question
    setCurrent(nextIndex);
    setSelected(null);
  };

  const saveHistory = () => {
    const entry = {
      timestamp: Date.now(),
      score: selected === q.correct ? score + 1 : score,
      total: questions.length,
      topic,
      difficulty,
      amount,
    };

    const previous = JSON.parse(localStorage.getItem("quizHistory")) || [];
    localStorage.setItem("quizHistory", JSON.stringify([entry, ...previous]));
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">
        {topic} — Question {current + 1} of {questions.length}
      </h1>

      <p
        className="text-lg mb-6 font-medium"
        dangerouslySetInnerHTML={{ __html: q.question }}
      />

      <div className="space-y-4">
        {q.answers.map((answer) => (
          <button
            key={answer}
            onClick={() => setSelected(answer)}
            className={`w-full p-3 border rounded-lg text-left transition
              ${
                selected === answer
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white hover:bg-gray-200"
              }
            `}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>

      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg w-full disabled:bg-gray-400"
        disabled={!selected}
        onClick={handleNext}
      >
        Next Question
      </button>
    </div>
  );
}
