# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.









🌟 Styling, States, Rendering, Routes, and Hooks

This project builds upon the previous alx-react-app and focuses on enhancing React skills by applying inline CSS styling, managing state with React Hooks, and developing reusable and interactive components.
By the end of this project, you’ll have a deeper understanding of how React manages UI styling, state updates, and component re-rendering.

📁 Project Information

Project Name: alx-react-app-new

Repository: alx-fe-reactjs

Directory: alx-react-app-new

Framework: React (via Create React App)

Language: JavaScript (ES6)

🧩 Step 0 — Apply Inline CSS Styling to React Components
🎯 Objective

Enhance the visual appearance of React components (Header, UserProfile, MainContent, and Footer) using inline CSS styling.

🧠 Concepts Covered

Applying inline styles in React using JavaScript objects.

Understanding the camelCase property convention (e.g., backgroundColor instead of background-color).

Structuring and enhancing component UI using spacing, color, and alignment.

⚙️ Implementation Steps

Duplicate the Previous Project

cp -r alx-react-app alx-react-app-new
cd alx-react-app-new


Style the Components

Add inline styles directly inside the component JSX:

<header style={{ backgroundColor: 'navy', color: 'white', textAlign: 'center' }}>
  <h1>My Favorite Cities</h1>
</header>


Example Components Styled

Header.jsx → Navy background, centered text

UserProfile.jsx → Bordered box with padding and colored text

MainContent.jsx → Light background and centered paragraph

Footer.jsx → Dark footer with white text

Run the Application

npm start


Visit http://localhost:3000 to see your styled components.

✅ Expected Output

All components display inline styling with distinct background colors, padding, margins, and aligned text.









🔢 Step 1 — Create a Simple Counter Application Using State and Hooks
🎯 Objective

Build a counter app that can increment, decrement, and reset a number using the useState hook.

🧠 Concepts Covered

React state management with useState.

Handling button click events.

Dynamically rendering state changes in JSX.

⚙️ Implementation Steps

Create the Counter Component
File: src/components/Counter.jsx

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Simple Counter App</h2>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;


Use the Counter in App.jsx

import Counter from './components/Counter';

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;


Run the Application

npm start

✅ Expected Output

Counter starts at 0.

Clicking Increment adds +1.

Clicking Decrement subtracts -1.

Clicking Reset brings the count back to 0.

🧠 Key Learnings

Inline Styling: Helps quickly style React components using JavaScript objects.

useState Hook: Enables dynamic updates and re-rendering of components based on state changes.

Event Handling: Demonstrates how user interactions trigger UI updates in React.

📸 Example UI (Conceptual)
My Favorite Cities
------------------------------
Simple Counter App
Current Count: 0
[ Increment ] [ Decrement ] [ Reset ]
------------------------------
© 2025 My Favorite Cities

🧰 Technologies Used
Tool / Library	Purpose
React	UI framework for building components
JavaScript (ES6)	Core programming language
useState Hook	State management
Inline CSS	Styling approach
Create React App	Project scaffolding
🚀 How to Run
# Navigate into project
cd alx-react-app-new

# Install dependencies
npm install

# Start the development server
npm start


Visit: http://localhost:3000

📜 Author

Sylvester Kormla Nyadzinnor
Frontend Developer | ALX Frontend Engineer









