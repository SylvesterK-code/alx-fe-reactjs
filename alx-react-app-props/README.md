# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.











🧩 ALX React Project: Refactor Prop Drilling Using Context API
Project Overview

This project demonstrates how to refactor a React application that initially uses prop drilling by implementing the Context API.

Objective: Streamline the flow of user data across multiple components without passing props manually at every level.

By completing this project, you will learn:

How to create and use React Context (createContext and useContext)

How to eliminate unnecessary prop drilling

Best practices for cleaner and more maintainable React applications

🧭 Before vs After: Data Flow
❌ Prop Drilling (Manual Props Passing)
App
 └── ProfilePage (receives userData via props)
      └── UserInfo (receives userData via props)
           └── UserDetails (uses userData)


Problem: Every intermediate component must pass userData even if it doesn’t need it.

✅ Context API (Centralized State)
App
 ├── UserContext.Provider (provides userData)
 │
 └── ProfilePage
      └── UserInfo
           └── UserDetails (consumes userData via useContext)


Solution: Components can consume userData directly from context, eliminating unnecessary props.

🌐 Mermaid Diagram
flowchart TD
  subgraph PropDrilling["❌ Prop Drilling"]
    A[App] --> B[ProfilePage]
    B --> C[UserInfo]
    C --> D[UserDetails]
    D -->|Receives userData via props| E[(Displays user info)]
  end

  subgraph ContextAPI["✅ Using Context API"]
    F[App] --> G((UserContext.Provider))
    G --> H[ProfilePage]
    H --> I[UserInfo]
    I --> J[UserDetails]
    J -->|Consumes userData via useContext| K[(Displays user info)]
  end

🧩 Code Snippets
1. Create Context (UserContext.js)
import { createContext } from 'react';

const UserContext = createContext();
export default UserContext;

2. Provide Context in App.jsx
import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';

function App() {
  const userData = { name: 'Jane Doe', email: 'jane.doe@example.com' };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;

3. Consume Context in UserDetails.jsx
import React, { useContext } from 'react';
import UserContext from './UserContext';

function UserDetails() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;

🧠 Key Takeaways
Concept	Prop Drilling	Context API
Data Sharing	Manually via props	Automatically via context
Scalability	Hard for large apps	Clean and maintainable
Maintainability	More boilerplate	Less redundant code
React Hooks Used	None	useContext()
✅ Summary

Repository: alx-fe-reactjs

Directory: alx-react-app-props

Key Learning: Refactored prop drilling using Context API for cleaner and more maintainable state management.