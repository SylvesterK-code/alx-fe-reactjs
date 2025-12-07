// arc/api/quizApi


export const fetchQuizQuestions = async (amount = 10, category, difficulty) => {
  let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;

  if (category) url += `&category=${category}`;
  if (difficulty) url += `&difficulty=${difficulty}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results.map(q => ({
    question: q.question,
    correct: q.correct_answer,
    answers: [...q.incorrect_answers, q.correct_answer]
      .sort(() => Math.random() - 0.5),
  }));
};

// Load categories (NEW)
export const fetchCategories = async () => {
  const res = await fetch(`https://opentdb.com/api_category.php`);
  const data = await res.json();
  return data.trivia_categories; // [{id: 9, name: "General Knowledge"}, ...]
};

