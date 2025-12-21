// // src/App.jsx

// import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
// import QuizStart from "./components/QuizStart";
// import QuestionCard from "./components/QuestionCard";
// import ScoreSummary from "./components/ScoreSummary";
// import History from "./components/History";
// import Footer from "./components/Footer";
// import ProgressBar from "./components/ProgressBar";

// import Performance from "./pages/Performance";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

// import { fetchQuestions } from "./services/api";

// const HISTORY_KEY = "keysquiz_history_v1";

// export default function App() {
//   const [stage, setStage] = useState("start");
//   const [quizConfig, setQuizConfig] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [qIndex, setQIndex] = useState(0);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");

//   const [history, setHistory] = useState(() => {
//     try {
//       const raw = localStorage.getItem(HISTORY_KEY);
//       return raw ? JSON.parse(raw) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
//   }, [history]);

//   function clearHistory() {
//     setHistory([]);
//   }

//   async function startQuiz(config) {
//     setQuizConfig(config);
//     setError("");
//     setStage("loading");

//     try {
//       const qs = await fetchQuestions(config);
//       setQuestions(qs);
//       setQIndex(0);
//       setResults([]);
//       setStage("quiz");
//     } catch {
//       setError("Failed to load quiz");
//       setStage("start");
//     }
//   }

//   function handleAnswer({ isCorrect, selected, correct }) {
//     const q = questions[qIndex];

//     const updatedResults = [
//       ...results,
//       { question: q.question, selected, correct, isCorrect },
//     ];

//     setResults(updatedResults);

//     if (qIndex + 1 < questions.length) {
//       setQIndex(qIndex + 1);
//     } else {
//       const score = updatedResults.filter((r) => r.isCorrect).length;

//       setHistory((prev) => [
//         {
//           date: new Date().toISOString(),
//           score,
//           total: questions.length,
//           config: quizConfig,
//         },
//         ...prev,
//       ]);

//       setStage("summary");
//     }
//   }

//   function resetQuiz() {
//     setStage("start");
//     setQuestions([]);
//     setResults([]);
//     setQuizConfig(null);
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-1 pt-16">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 {stage === "start" && (
//                   <>
//                     <QuizStart onStart={startQuiz} />
//                     <History history={history} onClear={clearHistory} />
//                   </>
//                 )}

//                 {stage === "loading" && (
//                   <div className="flex justify-center py-20 text-slate-500">
//                     Loading quiz questions…
//                   </div>
//                 )}

//                 {stage === "quiz" && (
//                   <div className="max-w-4xl mx-auto px-4">
//                     <ProgressBar current={qIndex} total={questions.length} />

//                     <QuestionCard
//                       q={questions[qIndex]}
//                       index={qIndex}
//                       total={questions.length}
//                       onAnswer={handleAnswer}
//                     />
//                   </div>
//                 )}

//                 {stage === "summary" && (
//                   <ScoreSummary results={results} onNewQuiz={resetQuiz} />
//                 )}
//               </>
//             }
//           />

//           <Route
//             path="/performance"
//             element={<Performance history={history} />}
//           />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>

//         {error && <div className="text-center text-red-600 mt-4">{error}</div>}
//       </main>

//       <Footer />
//     </div>
//   );
// }







// save history to local

// // src/App.jsx
// import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";

// // Import all major components
// import Header from "./components/Header";
// import QuizStart from "./components/QuizStart";
// import QuestionCard from "./components/QuestionCard";
// import ScoreSummary from "./components/ScoreSummary";
// import History from "./components/History";
// import Footer from "./components/Footer";
// import ProgressBar from "./components/ProgressBar";

// import Performance from "./pages/Performance";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

// // API call for fetching quiz questions
// import { fetchQuestions } from "./services/api";

// // Local storage key for storing quiz history
// const HISTORY_KEY = "keysquiz_history_v1";

// export default function App() {
//   // ===== App State =====

//   // Stage of the quiz app: start, loading, quiz, summary
//   const [stage, setStage] = useState("start");

//   // Quiz configuration selected by the user (category, difficulty, amount)
//   const [quizConfig, setQuizConfig] = useState(null);

//   // Questions fetched from API
//   const [questions, setQuestions] = useState([]);

//   // Current question index
//   const [qIndex, setQIndex] = useState(0);

//   // Store results for each question (selected answer, correctness)
//   const [results, setResults] = useState([]);

//   // Error messages for quiz loading or API issues
//   const [error, setError] = useState("");

//   // ===== History State (Persistent via localStorage) =====
//   const [history, setHistory] = useState(() => {
//     // Initialize from localStorage (only runs once)
//     try {
//       const raw = localStorage.getItem(HISTORY_KEY);
//       return raw ? JSON.parse(raw) : [];
//     } catch {
//       // In case of invalid JSON, return empty array
//       return [];
//     }
//   });

//   // Save history to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
//   }, [history]);

//   // ===== Handlers =====

//   // Clear quiz history both from state and localStorage
//   function clearHistory() {
//     setHistory([]);
//   }

//   // Start quiz: fetch questions from API based on user config
//   async function startQuiz(config) {
//     setQuizConfig(config); // Save selected quiz configuration
//     setError(""); // Reset any previous error
//     setStage("loading"); // Show loading state

//     try {
//       const qs = await fetchQuestions(config); // API call
//       setQuestions(qs); // Save fetched questions
//       setQIndex(0); // Start at first question
//       setResults([]); // Clear previous results
//       setStage("quiz"); // Move to quiz stage
//     } catch {
//       setError("Failed to load quiz"); // Handle API failure
//       setStage("start"); // Go back to start stage
//     }
//   }

//   // Handle user answer for current question
//   function handleAnswer({ isCorrect, selected, correct }) {
//     const q = questions[qIndex];

//     // Add result for current question
//     const updatedResults = [
//       ...results,
//       { question: q.question, selected, correct, isCorrect },
//     ];

//     setResults(updatedResults);

//     // Check if there are more questions
//     if (qIndex + 1 < questions.length) {
//       setQIndex(qIndex + 1); // Move to next question
//     } else {
//       // Quiz complete: save history
//       const score = updatedResults.filter((r) => r.isCorrect).length;

//       setHistory((prev) => [
//         {
//           date: new Date().toISOString(), // Timestamp
//           score, // Number of correct answers
//           total: questions.length, // Total questions
//           config: quizConfig, // Quiz config for reference
//         },
//         ...prev, // Add to front (most recent first)
//       ]);

//       setStage("summary"); // Show summary
//     }
//   }

//   // Reset quiz to start a new one
//   function resetQuiz() {
//     setStage("start");
//     setQuestions([]);
//     setResults([]);
//     setQuizConfig(null);
//   }

//   // ===== Render =====
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header (fixed, top navigation) */}
//       <Header />

//       {/* Main content area */}
//       <main className="flex-1 pt-16">
//         <Routes>
//           {/* Main quiz route */}
//           <Route
//             path="/"
//             element={
//               <>
//                 {/* Start stage: show quiz configuration + history */}
//                 {stage === "start" && (
//                   <>
//                     <QuizStart onStart={startQuiz} />
//                     <History history={history} onClear={clearHistory} />
//                   </>
//                 )}

//                 {/* Loading stage: show spinner or text */}
//                 {stage === "loading" && (
//                   <div className="flex justify-center py-20 text-slate-500">
//                     Loading quiz questions…
//                   </div>
//                 )}

//                 {/* Quiz stage: show current question */}
//                 {stage === "quiz" && (
//                   <div className="max-w-4xl mx-auto px-4">
//                     <ProgressBar current={qIndex} total={questions.length} />
//                     <QuestionCard
//                       q={questions[qIndex]}
//                       index={qIndex}
//                       total={questions.length}
//                       onAnswer={handleAnswer}
//                     />
//                   </div>
//                 )}

//                 {/* Summary stage: show score and review */}
//                 {stage === "summary" && (
//                   <ScoreSummary results={results} onNewQuiz={resetQuiz} />
//                 )}
//               </>
//             }
//           />

//           {/* Performance route: show historical performance */}
//           <Route
//             path="/performance"
//             element={<Performance history={history} />}
//           />

//           {/* About route */}
//           <Route path="/about" element={<About />} />

//           {/* Contact route */}
//           <Route path="/contact" element={<Contact />} />
//         </Routes>

//         {/* Global error messages */}
//         {error && <div className="text-center text-red-600 mt-4">{error}</div>}
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }










// save 20 history to local

// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Import major components
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

// API call for fetching quiz questions
import { fetchQuestions } from "./services/api";

// Dark mode hook
// import { useDarkMode } from "./hooks/useDarkMode";

// Local storage key for storing quiz history
const HISTORY_KEY = "keysquiz_history_v1";

export default function App() {
  // ===== Dark Mode State =====
  // Use custom hook for global dark mode
  // const [dark, setDark] = useDarkMode();

  // ===== Quiz App State =====
  const [stage, setStage] = useState("start"); // "start" | "loading" | "quiz" | "summary"
  const [quizConfig, setQuizConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // ===== History State (Persistent) =====
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  // Limit to last 20 quiz attempts
  const MAX_HISTORY = 20;

  // ===== Handlers =====
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
      // Quiz complete: save new history entry
      const score = updatedResults.filter((r) => r.isCorrect).length;

      const newEntry = {
        date: new Date().toISOString(),
        score,
        total: questions.length,
        config: quizConfig,
      };

      setHistory((prev) => {
        // Prepend new entry and limit to MAX_HISTORY
        const updated = [newEntry, ...prev].slice(0, MAX_HISTORY);
        return updated;
      });

      setStage("summary");
    }
  }

  function resetQuiz() {
    setStage("start");
    setQuestions([]);
    setResults([]);
    setQuizConfig(null);
  }

  // ===== Render =====
   
  
  return (
    // Apply global dark/light background & text
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header receives dark mode state for toggle button */}
      {/* <Header dark={dark} setDark={setDark} /> */}
      <Header />

      {/* Main content area */}
      <main className="flex-1 pt-16 text-slate-900 dark:text-white transition-colors duration-300">
        <Routes>
          {/* Main quiz route */}
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
                  <div className="flex justify-center py-20 text-slate-500 dark:text-slate-300">
                    Loading quiz questions…
                  </div>
                )}

                {stage === "quiz" && (
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 ">
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

          {/* Other pages */}
          <Route
            path="/performance"
            element={<Performance history={history} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Global error messages */}
        {error && <div className="text-center text-red-600 mt-4">{error}</div>}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
