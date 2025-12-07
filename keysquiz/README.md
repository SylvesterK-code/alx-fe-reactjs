# keysQuiz


## React + Vite project

npm create vite@latest keysquiz -- --template react
npm install tailwindcss @tailwindcss/vite
npm install he

// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ✅ Add this

// https://vite.dev/config/
export default defineConfig({
    plugins: [
    react(),
    tailwindcss(),     // ✅ Add this
  ],
})




// index.css
@import "tailwindcss";      v4

@tailwind base;             v3
@tailwind components;       v3
@tailwind utilities;        v3



keysquiz/
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ QuizStart.jsx
│  │  ├─ QuestionCard.jsx
│  │  ├─ ScoreSummary.jsx
│  │  ├─ History.jsx
│  │  ├─ SearchBar.jsx
│  │  └─ Footer.jsx
│  ├─ services/
│  │  └─ api.js
│  ├─ utils/
│  │  └─ helpers.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ package.json
├─ tailwind.config.cjs
├─ postcss.config.cjs
└─ README.md





mkdr components
ni Header.jsx
ni QuizStart.jsx
ni  QuestionCard.jsx
ni ScoreSummary.jsx
ni History.jsx
ni SearchBar.jsx
ni Footer.jsx




## How It Works
1. User selects quiz options

Category

Difficulty

Number of questions

2. App fetches questions

API used:

https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple

3. Questions are displayed

Answers are shuffled using a custom shuffle helper

User selects and submits answer

4. System validates answer

Correct answer → green

Wrong answer → red

5. Final Score Summary

Total correct answers

Percentage

Review each question

6. User can

Retake same quiz

Start brand-new quiz



## 🧩 Challenges & How They Were Solved
### ⚠️ 1. React warning: “Avoid calling setState inside an effect”

Problem:
When switching questions, a useEffect manually reset state:

useEffect(() => {
  setSelected(null);
  setSubmitted(false);
}, [q]);


React warned that this can cause unnecessary renders.

Solution:
We used a dynamic key when rendering QuestionCard, which forces automatic reset:

<QuestionCard key={q.question} q={q} ... />


This lets React fully re-mount the component and eliminates the warning.
✔ Cleaner
✔ No side effects
✔ More predictable behavior

### ⚠️ 2. Options not selectable on second question

Cause:
A stale state bug where submitted was still true for the next question.

Solution:
Using the key fix above fully resolved it because the state resets on mount.

### ⚠️ 3. Category search not trimming spaces

Fix:

onChange(e.target.value.trimStart());

### ⚠️ 4. Responsiveness issues on small screens

Fix:

Applied Tailwind responsive utilities (sm:, md:, lg:)

Reduced fixed widths

Added padding adjustments

Stacked items on small screens

### ⚠️ 5. Horizontal overflow in Score Summary

Fix:
Applied:

<div className="overflow-x-hidden">


Plus responsive text sizing.

### ⚠️ 6. Percentage score missing

Added:

const percent = Math.round((correct / total) * 100);


Displayed:

Your Score: 7 / 10 (70%)




## 🌐 Deployment (Vercel)
### 1. Push project to GitHub
git add .
git commit -m "Initial commit"
git push origin main

### 2. Deploy

Go to https://vercel.com/

Click New → Project

Import GitHub repo

Select framework: Vite or CRA

Click Deploy

Vercel auto-builds and hosts your app.

## 🔮 Future Improvements

Add timer per question

Add category icons

Add progress bar indicator

Add animations between questions

Add dark mode

Save quiz history in local storage

Enable leaderboard