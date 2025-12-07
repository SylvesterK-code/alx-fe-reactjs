// src/services/quizService.js

export const fetchQuizQuestions = async (amount = 10, category = "", difficulty = "") => {
  // Add delay before API call (recommended)
  await new Promise((resolve) => setTimeout(resolve, 400));

  const baseUrl = "https://opentdb.com/api.php";

  const url = `${baseUrl}?amount=${amount}${
    category ? `&category=${category}` : ""
  }${difficulty ? `&difficulty=${difficulty}` : ""}&type=multiple`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Fix weird HTML entities (&quot; &amp; etc)
    const decodeHTML = (text) => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = text;
      return textarea.value;
    };

    // Normalize structure
    const formattedQuestions = data.results.map((q) => ({
      question: decodeHTML(q.question),
      correct_answer: decodeHTML(q.correct_answer),
      options: shuffleArray([
        q.correct_answer,
        ...q.incorrect_answers,
      ].map((ans) => decodeHTML(ans))),
    }));

    return formattedQuestions;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw new Error("Failed to fetch quiz questions");
  }
};

// Utility to shuffle answers
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
