import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Performance from "./pages/Performance";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </BrowserRouter>
  );
}
