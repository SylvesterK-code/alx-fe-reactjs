# alx-fe-reactjs
Fundamentals and Core Concepts of React

Tasks
# 0. Create your first React App

Create an empty repository called alx-fe-reactjs

Clone the repository and cd into that directory.

Run the command npm create vite@latest alx-react-app -- --template react where alx-react-app is the name of your react app.

To see what your app looks like, go ahead cd into the alx-react-app directory that will be created and run the command npm install.

Next, run the command npm run dev.

The app will now open in your browser on port 5173. If that doesn’t happen, then just open a browser and type in the address bar localhost:5173 and click enter.

Helpful video resource for this task: https://www.youtube.com/watch?v=agpZsCUllqc&ab_channel=ReactTailwind






# 🌟 Fundamentals and Core Concepts of React

## 📘 Project Overview
This project introduces the **fundamentals of React.js**, one of the most popular JavaScript libraries for building dynamic and interactive user interfaces.  
It focuses on understanding **React components**, **JSX**, **props**, and **ReactDOM**, while also guiding you through setting up and running your **first React app** using **Vite**.

---

## 🎯 Objectives
- Understand what React is and why it’s widely used in modern web development.
- Learn how to set up a new React application.
- Explore JSX syntax and its relationship with JavaScript.
- Create, modify, and manage React components.
- Pass and handle data between components using props.
- Integrate multiple components into a cohesive React app.

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/alx-fe-reactjs.git
cd alx-fe-reactjs
2. Create a New React App Using Vite

npm create vite@latest alx-react-app -- --template react
3. Navigate into the App Folder


cd alx-react-app
4. Install Dependencies

npm install
5. Run the Development Server

npm run dev
Then open your browser and visit:


http://localhost:5173
📁 Project Structure
pgsql
Copy code
alx-fe-reactjs/
└── alx-react-app/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
🧠 Key Concepts Learned
Concept	Description
React	A JavaScript library for building user interfaces.
JSX	Syntax extension that combines HTML with JavaScript logic.
ReactDOM	Responsible for rendering components into the DOM.
Props	Mechanism for passing data from one component to another.
Vite	A fast build tool and development server for modern web apps.

🚀 Tech Stack
React 18+

Vite

Node.js

NPM

🧩 Example Command Summary

# Create new Vite + React project
npm create vite@latest alx-react-app -- --template react

# Navigate into project directory
cd alx-react-app

# Install dependencies
npm install

# Run development server
npm run dev

💡 Tips
Make sure Node.js (v16 or higher) is installed on your system.

If the app doesn’t open automatically, visit http://localhost:5173 manually.

To stop the server, press Ctrl + C in your terminal.

📜 Author
Sylvester Kormla Nyadzinnor
📧 [Your Email Here]
💻 <a href="https://github.com/SylvesterK-code" target="_blank" rel="noopener noreferrer">GitHub: SylvesterK-code</a>

🏁 ALX Front-End Project
Project: Fundamentals and Core Concepts of React
Module: Front-End Web Development (React)
Weight: 1
Duration: Oct 27, 2025 – Nov 3, 2025









# 1. Modify JSX in a Pre-built React Component

Objective: Familiarize yourself with JSX

Create a new file called WelcomeMessage.jsx under src/components

Copy and paste the following code into the file

function WelcomeMessage() {
    return (
        <div>
            <h1>Welcome to ALX React APP!</h1>
            <p>This is a simple JSX component.</p>
        </div>
    );
}

export default WelcomeMessage;
Examine the WelcomeMessage.jsx file to understand its structure and the JSX it contains.
Change the <h1> tag text to “Hello everyone, I am learning React at ALX!”.
Add a new paragraph (<p>) tag with the custom message, "I am learning about JSX!".
Integrate this new file (component) into your app by doing the following:
Add this line to the top of your App.jsx file: import WelcomeMessage from './components/WelcomeMessage
Include the <WelcomeMessage /> component inside the return statement of the App function.
Run and Observe Changes:
Start the application using npm run dev.
Observe the changes in the browser and ensure your updated text is displayed.
Repo:

GitHub repository: alx-fe-reactjs
Directory: alx-react-app






---

## 🧩 Task 1: Modify JSX in a Pre-built React Component

### 🎯 Objective
To understand how **JSX** works in React by modifying and integrating a simple React component within the application.

---

### 🪜 Steps Implemented

#### 1. Create a New Component
A new folder named `components` was created under the `src` directory.  
Inside it, a new file named `WelcomeMessage.jsx` was added with the following JSX code:

```jsx
// src/components/WelcomeMessage.jsx

function WelcomeMessage() {
  return (
    <div>
      <h1>Hello everyone, I am learning React at ALX!</h1>
      <p>This is a simple JSX component.</p>
      <p>I am learning about JSX!</p>
    </div>
  );
}

export default WelcomeMessage;
2. Integrate the Component into App.jsx
The WelcomeMessage component was imported and rendered in the App.jsx file as shown below:


// src/App.jsx

import './App.css';
import WelcomeMessage from './components/WelcomeMessage';

function App() {
  return (
    <>
      <WelcomeMessage />
    </>
  );
}

export default App;
3. Run and Verify the Application
Start the app with the command:


npm run dev
Then open the browser and visit:


http://localhost:5173
✅ Expected Output:


Hello everyone, I am learning React at ALX!
This is a simple JSX component.
I am learning about JSX!
🧠 Key Concepts Learned
Concept	Description
JSX (JavaScript XML)	Allows HTML-like syntax inside JavaScript to define UI elements.
Functional Component	A simple JavaScript function that returns JSX.
Component Composition	Combining smaller components to form a larger UI.
Props and Reusability (Preview)	Components can be customized later using props to make them dynamic.

🏁 Summary
By completing this task, I learned how JSX bridges the gap between JavaScript and HTML, allowing developers to write UI logic directly within JavaScript.
I also practiced how to import and render custom components within a main React application.

Commit Message Example:


git add .
git commit -m "Add WelcomeMessage component and modify JSX structure"
git push origin main











---

## 🧩 Task 2: Create Specific Components in a React Application

### 🎯 Objective
To learn how to create and assemble multiple specific React components into a main application component, demonstrating React’s modular structure.

---

### 🪜 Steps Implemented

#### 1. Created Three Components under `src/components`
- **Header.jsx**
```jsx
function Header() {
  return (
    <header>
      <h1>My Favorite Cities</h1>
    </header>
  );
}

export default Header;
MainContent.jsx


function MainContent() {
  return (
    <main>
      <p>I love to visit New York, Paris, and Tokyo.</p>
    </main>
  );
}

export default MainContent;
Footer.jsx


function Footer() {
  return (
    <footer>
      <p>© 2023 City Lovers</p>
    </footer>
  );
}

export default Footer;
2. Integrated the Components into App.jsx


import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
3. Ran and Verified the Application
Run the app:


npm run dev
Expected output in the browser:


My Favorite Cities
I love to visit New York, Paris, and Tokyo.
© 2023 City Lovers
🧠 Key Concepts Learned
Concept	Description
Component-Based Architecture	React applications are built using small, reusable pieces called components.
Functional Components	Simple JavaScript functions that return JSX elements.
Composition	Combining multiple components to form a complete UI.
Reusability	Each component can be used multiple times across different parts of the app.

🏁 Summary
By completing this task, I learned how to structure a React app using multiple independent components.
This reinforced the importance of reusability and clean separation of concerns within a project.

Commit Message Example:


git add .
git commit -m "Add Header, MainContent, and Footer components and integrate into App.jsx"
git push origin main