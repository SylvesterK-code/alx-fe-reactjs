✅ How to Fix It (Tailwind v4 Setup for React + Vite)

Since you're working in:

alx-fe-reactjs/github-user-search


This means you're using React + Vite, so use the new Tailwind v4 setup.

✅ STEP 1 — Install Tailwind v4

Run this:

npm install tailwindcss @tailwindcss/vite

✅ STEP 2 — Add Tailwind to your Vite config

Open:

vite.config.js  OR  vite.config.ts


Add the plugin:

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});

✅ STEP 3 — Update your main CSS

Open your main stylesheet, usually:

src/index.css


Replace everything with:

@import "tailwindcss";

👉 THAT'S ALL!

Tailwind v4 does not require:

❌ No tailwind.config.js
❌ No PostCSS setup
❌ No npx tailwindcss init

Your project will now work automatically.









// basic search
import "../App.css";
import "../index.css";
import { useState } from "react";
import { combinedSearch } from "../services/githubService";

function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await combinedSearch(query);
      setResult(response);
    } catch (_) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub user"
          className="border p-2 w-full rounded"
          required
        />
      </form>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {result?.type === "single" && (
        <div className="mt-4 border p-4 rounded">
          <img
            src={result.data.avatar_url}
            className="w-16 h-16 rounded-full"
          />
          <h2 className="text-xl font-bold">{result.data.login}</h2>
          <a
            href={result.data.html_url}
            className="text-blue-500"
            target="_blank"
          >
            View Profile
          </a>
        </div>
      )}

      {result?.type === "multiple" && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Search Results:</h3>

          {result.data.map((user) => (
            <div key={user.id} className="flex items-center gap-3 mb-3">
              <img src={user.avatar_url} className="w-12 h-12 rounded-full" />
              <a href={user.html_url} target="_blank" className="text-blue-500">
                {user.login}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;











//// advance search component

import { useState } from "react";
import { searchUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const perPage = 10;

  const handleSearch = async (e, newPage = 1) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { users, total_count } = await searchUsers({
        username,
        location,
        minRepos,
        page: newPage,
        per_page: perPage,
      });

      if (newPage === 1) {
        setResults(users);
      } else {
        setResults((prev) => [...prev, ...users]);
      }

      setTotalCount(total_count);
      setPage(newPage);
    } catch (_) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    handleSearch(null, page + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <form
        onSubmit={handleSearch}
        className="grid gap-4 sm:grid-cols-3 sm:gap-2 mb-4"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Min Repos"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition col-span-full sm:col-span-3"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-20 h-20 rounded-full mb-2"
              />
              <h2 className="font-bold">{user.login}</h2>
              {user.location && <p>Location: {user.location}</p>}
              <p>Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                className="text-blue-500 underline mt-1"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}

      {results.length < totalCount && (
        <button
          onClick={handleLoadMore}
          className="mt-6 bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Search;









----------------------------------------------------------------------------------------

## make the toggle buttons look more like a modern switch/tab interface instead of plain buttons

### a modern tab interface using Tailwind CSS.

Here’s the updated Search component with modern tab toggles:


import "../App.css";
import "../index.css";
import { useState } from "react";
import { combinedSearch, searchUsers } from "../services/githubService";

function Search() {
  // ------------------------------
  // Toggle between Basic and Advanced Search
  // ------------------------------
  const [isAdvanced, setIsAdvanced] = useState(false);

  // ------------------------------
  // Basic Search State
  // ------------------------------
  const [basicQuery, setBasicQuery] = useState("");
  const [basicResult, setBasicResult] = useState(null);

  // ------------------------------
  // Advanced Search State
  // ------------------------------
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [advResults, setAdvResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  // ------------------------------
  // Shared State
  // ------------------------------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const perPage = 10;

  // ------------------------------
  // Basic Search Handler
  // ------------------------------
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBasicResult(null);

    try {
      const response = await combinedSearch(basicQuery);
      setBasicResult(response);
    } catch (_) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Advanced Search Handler with Pagination
  // ------------------------------
  const handleAdvancedSearch = async (e, newPage = 1) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { users, total_count } = await searchUsers({
        username,
        location,
        minRepos,
        page: newPage,
        per_page: perPage,
      });

      if (newPage === 1) {
        setAdvResults(users);
      } else {
        setAdvResults((prev) => [...prev, ...users]);
      }

      setTotalCount(total_count);
      setPage(newPage);
    } catch (_) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Load More Button for Advanced Search
  // ------------------------------
  const handleLoadMore = () => {
    handleAdvancedSearch(null, page + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* ------------------------------
          Modern Tab Toggle
      ------------------------------ */}
      <div className="flex justify-center mb-6 border-b border-gray-300">
        <button
          onClick={() => setIsAdvanced(false)}
          className={`px-6 py-2 font-medium transition-all ${
            !isAdvanced
              ? "border-b-4 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setIsAdvanced(true)}
          className={`px-6 py-2 font-medium transition-all ${
            isAdvanced
              ? "border-b-4 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Advanced Search
        </button>
      </div>

      {/* ------------------------------
          BASIC SEARCH SECTION
      ------------------------------ */}
      {!isAdvanced && (
        <div className="mb-10">
          <form onSubmit={handleBasicSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              value={basicQuery}
              onChange={(e) => setBasicQuery(e.target.value)}
              placeholder="Search GitHub user"
              className="border p-2 w-full rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {basicResult?.type === "single" && (
            <div className="mt-4 border p-4 rounded flex items-center gap-4">
              <img
                src={basicResult.data.avatar_url}
                alt={basicResult.data.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{basicResult.data.login}</h3>
                <a
                  href={basicResult.data.html_url}
                  className="text-blue-500 underline"
                  target="_blank"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}

          {basicResult?.type === "multiple" && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Search Results:</h3>
              {basicResult.data.map((user) => (
                <div key={user.id} className="flex items-center gap-3 mb-3">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-12 h-12 rounded-full"
                  />
                  <a href={user.html_url} target="_blank" className="text-blue-500">
                    {user.login}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------
          ADVANCED SEARCH SECTION
      ------------------------------ */}
      {isAdvanced && (
        <div>
          <form
            onSubmit={(e) => handleAdvancedSearch(e, 1)}
            className="grid gap-4 sm:grid-cols-3 sm:gap-2 mb-4"
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="Min Repos"
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition col-span-full sm:col-span-3"
            >
              Search
            </button>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {advResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advResults.map((user) => (
                <div
                  key={user.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <h2 className="font-bold">{user.login}</h2>
                  {user.location && <p>Location: {user.location}</p>}
                  <p>Repos: {user.public_repos}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    className="text-blue-500 underline mt-1"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          )}

          {advResults.length < totalCount && (
            <button
              onClick={handleLoadMore}
              className="mt-6 bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

















## make it even sleeker with a switch-style toggle like GitHub’s own tab switching, where a sliding indicator moves smoothly between “Basic” and “Advanced.”

### tabs smoothly using Tailwind CSS transitions.

import "../App.css";
import "../index.css";
import { useState } from "react";
import { combinedSearch, searchUsers } from "../services/githubService";

function Search() {
  // ------------------------------
  // Toggle between Basic and Advanced Search
  // ------------------------------
  const [isAdvanced, setIsAdvanced] = useState(false);

  // ------------------------------
  // Basic Search State
  // ------------------------------
  const [basicQuery, setBasicQuery] = useState("");
  const [basicResult, setBasicResult] = useState(null);

  // ------------------------------
  // Advanced Search State
  // ------------------------------
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [advResults, setAdvResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  // ------------------------------
  // Shared State
  // ------------------------------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const perPage = 10;

  // ------------------------------
  // Basic Search Handler
  // ------------------------------
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBasicResult(null);

    try {
      const response = await combinedSearch(basicQuery);
      setBasicResult(response);
    } catch (_) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Advanced Search Handler with Pagination
  // ------------------------------
  const handleAdvancedSearch = async (e, newPage = 1) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { users, total_count } = await searchUsers({
        username,
        location,
        minRepos,
        page: newPage,
        per_page: perPage,
      });

      if (newPage === 1) {
        setAdvResults(users);
      } else {
        setAdvResults((prev) => [...prev, ...users]);
      }

      setTotalCount(total_count);
      setPage(newPage);
    } catch (_) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Load More Button for Advanced Search
  // ------------------------------
  const handleLoadMore = () => {
    handleAdvancedSearch(null, page + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* ------------------------------
          Sleek Sliding Tab Toggle
      ------------------------------ */}
      <div className="relative flex w-full max-w-md mx-auto bg-gray-200 rounded-full p-1 mb-8">
        {/* Sliding Indicator */}
        <div
          className={`absolute top-1 left-1 h-10 w-1/2 bg-blue-600 rounded-full transition-all duration-300 ${
            isAdvanced ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>

        {/* Tabs */}
        <button
          onClick={() => setIsAdvanced(false)}
          className={`flex-1 z-10 py-2 text-center font-medium transition-colors duration-300 ${
            !isAdvanced ? "text-white" : "text-gray-700"
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setIsAdvanced(true)}
          className={`flex-1 z-10 py-2 text-center font-medium transition-colors duration-300 ${
            isAdvanced ? "text-white" : "text-gray-700"
          }`}
        >
          Advanced
        </button>
      </div>

      {/* ------------------------------
          BASIC SEARCH SECTION
      ------------------------------ */}
      {!isAdvanced && (
        <div className="mb-10">
          <form onSubmit={handleBasicSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              value={basicQuery}
              onChange={(e) => setBasicQuery(e.target.value)}
              placeholder="Search GitHub user"
              className="border p-2 w-full rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {basicResult?.type === "single" && (
            <div className="mt-4 border p-4 rounded flex items-center gap-4">
              <img
                src={basicResult.data.avatar_url}
                alt={basicResult.data.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{basicResult.data.login}</h3>
                <a
                  href={basicResult.data.html_url}
                  className="text-blue-500 underline"
                  target="_blank"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}

          {basicResult?.type === "multiple" && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Search Results:</h3>
              {basicResult.data.map((user) => (
                <div key={user.id} className="flex items-center gap-3 mb-3">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-12 h-12 rounded-full"
                  />
                  <a href={user.html_url} target="_blank" className="text-blue-500">
                    {user.login}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------
          ADVANCED SEARCH SECTION
      ------------------------------ */}
      {isAdvanced && (
        <div>
          <form
            onSubmit={(e) => handleAdvancedSearch(e, 1)}
            className="grid gap-4 sm:grid-cols-3 sm:gap-2 mb-4"
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="Min Repos"
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition col-span-full sm:col-span-3"
            >
              Search
            </button>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {advResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advResults.map((user) => (
                <div
                  key={user.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <h2 className="font-bold">{user.login}</h2>
                  {user.location && <p>Location: {user.location}</p>}
                  <p>Repos: {user.public_repos}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    className="text-blue-500 underline mt-1"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          )}

          {advResults.length < totalCount && (
            <button
              onClick={handleLoadMore}
              className="mt-6 bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;



















// Combined API Logic(Best Practice)
// Try exact user match first
// If exact match fails, fall back to keyword search
// basic service component

import axios from "axios";

const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;

const config = {
  headers: {
    Authorization: apiKey ? `token ${apiKey}` : undefined,
  },
};

// 1. Direct user lookup
export const fetchUserData = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  const response = await axios.get(url, config);
  return response.data;
};

// 2. Search for multiple users
export const searchUsers = async (query) => {
  const url = `https://api.github.com/search/users?q=${query}`;
  const response = await axios.get(url, config);
  return response.data.items;
};

// 3. Combined logic
export const combinedSearch = async (query) => {
  try {
    // Try exact user lookup
    const exactUser = await fetchUserData(query);
    return {
      type: "single",
      data: exactUser,
    };
  } catch (_) {
    // If exact match fails, use keyword search
    const users = await searchUsers(query);
    return {
      type: "multiple",
      data: users,
    };
  }
};






//// include pagination 
//// advance service component 

import axios from "axios";

const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
const config = {
  headers: { Authorization: apiKey ? `token ${apiKey}` : undefined },
};

export const searchUsers = async ({ username = "", location = "", minRepos = "", page = 1, per_page = 10 }) => {
  let query = "";
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`;
  const response = await axios.get(url, config);

  // Fetch full user details for each result
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const userDetails = await axios.get(user.url, config);
      return userDetails.data;
    })
  );

  return {
    users: detailedUsers,
    total_count: response.data.total_count,
  };
};



















# -------------------------------------------------------------------------------------
# GitHub User Search Application

A React-based web application that allows users to search for GitHub profiles using the GitHub API. Users can perform **basic searches** by username or **advanced searches** with filters like location and minimum repositories. The app includes a sleek toggle to switch between basic and advanced search modes and supports pagination for advanced results.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Tasks](#tasks)
  - [Task 0: Setup](#task-0-setup)
  - [Task 1: Basic Search](#task-1-basic-search)
  - [Task 2: Advanced Search & UI](#task-2-advanced-search--ui)
- [Usage](#usage)
- [License](#license)

---

## Project Overview

The GitHub User Search Application demonstrates API integration and state management in React. It interacts with GitHub’s public API to fetch user data and display it in a responsive, visually appealing layout.

Key functionalities include:

- Search GitHub users by username (basic search)
- Advanced search with filters: location and minimum repositories
- Pagination for large search results
- Toggle between basic and advanced search interfaces
- Responsive design using Tailwind CSS
- Deployment-ready for platforms like Vercel

---

## Features

- **Basic Search**
  - Enter a username to find exact or similar GitHub users
  - Displays avatar, username, and link to GitHub profile

- **Advanced Search**
  - Filter by username, location, and minimum repositories
  - Load more results with pagination
  - Displays detailed user information including location and repository count

- **Responsive UI**
  - Uses Tailwind CSS for modern, responsive design
  - Toggle between search modes with a sleek switch

---

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **API**: GitHub REST API v3
- **HTTP Requests**: Axios
- **Deployment**: Vercel (optional)

---

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/alx-fe-reactjs.git
cd github-user-search







Install dependencies

npm install


Run the development server

npm run dev


Open your browser at http://localhost:5173 (or the port shown in your terminal) to see the application.

Environment Variables

Create a .env file in the root directory and add:

VITE_APP_GITHUB_API_KEY=your_github_personal_access_token


Note: GitHub API allows unauthenticated requests but may rate-limit your usage. Using a personal access token increases your request limits.

Project Structure
github-user-search/
│
├─ src/
│  ├─ components/       # React components (Search.jsx)
│  ├─ services/         # API services (githubService.js)
│  ├─ App.jsx
│  ├─ index.css
│  └─ App.css
│
├─ .env                 # Environment variables
├─ package.json
└─ README.md

Tasks
Task 0: Setup

Initialize React project using Vite:

npm create vite@latest github-user-search -- --template react
cd github-user-search
npm install


Install dependencies:

npm install axios


Setup folder structure:

components/
services/
App.jsx


Setup .env for API key:

VITE_APP_GITHUB_API_KEY=your_github_token


Verify setup:

npm run dev

Task 1: Basic Search

Component: Search.jsx (Basic Search section)

Service: combinedSearch in githubService.js

Functionality:

User inputs GitHub username

Exact match lookup first

Fallback to keyword search

Display avatar, username, and profile link

Handles loading state and errors

Task 2: Advanced Search & UI

Component: Search.jsx (Advanced Search section)

Service: searchUsers in githubService.js

Functionality:

Multiple input fields: username, location, minRepos

Fetch users from GitHub API with filters

Display detailed results (avatar, location, repositories, profile link)

Pagination support: "Load More" button

Toggle between Basic and Advanced Search with modern UI

UI Enhancements:

Responsive grid layout

Tailwind CSS for styling

Sleek toggle for search mode

Hover and transition effects for cards

Usage

Launch the app:

npm run dev


Toggle between Basic and Advanced search using the switch at the top.

Basic Search: Enter a username → Press Search.

Advanced Search: Enter criteria → Press Search → Click Load More for additional results.

Click on View Profile to open GitHub profiles in a new tab.

License

This project is open source and available under the MIT License.

Author: Your Name
GitHub: https://github.com/<your-username>