export const loadHistory = () => {
  try {
    return JSON.parse(localStorage.getItem("quizHistory")) || [];
  } catch {
    return [];
  }
};

export const saveHistory = (history) => {
  localStorage.setItem("quizHistory", JSON.stringify(history));
};

export const clearHistory = () => {
  localStorage.removeItem("quizHistory");
};
