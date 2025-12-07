const BASE = 'https://opentdb.com';

export async function fetchCategories() {
  const res = await fetch(`${BASE}/api_category.php`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const json = await res.json();
  return json.trivia_categories || [];
}

/**
 * Fetch questions
 * @param {Object} opts {amount, category, difficulty}
 */
export async function fetchQuestions({ amount = 10, category = null, difficulty = '' } = {}) {
  const params = new URLSearchParams();
  params.set('amount', amount);
  params.set('type', 'multiple'); // multiple choice only
  if (category) params.set('category', category);
  if (difficulty) params.set('difficulty', difficulty.toLowerCase());
  const res = await fetch(`${BASE}/api.php?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  const json = await res.json();
  if (json.response_code !== 0) {
    throw new Error('No questions available for this selection');
  }
  return json.results;
}
