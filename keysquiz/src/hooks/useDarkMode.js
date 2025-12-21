// // src/hooks/useDarkMode.js
// import { useState, useEffect } from "react";

// export function useDarkMode() {
//   const [dark, setDark] = useState(() => localStorage.theme === "dark");

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.theme = "dark";
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.theme = "light";
//     }
//   }, [dark]);

//   return [dark, setDark];
// }






import { useEffect, useState } from "react";

/**
 * useDarkMode Hook
 * ----------------
 * - Manages dark mode state
 * - Persists preference in localStorage
 * - Applies `dark` class directly to <html>
 */
export function useDarkMode() {
  // Initialize state from localStorage
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  /**
   * Sync React state → HTML root element
   * This is what makes dark mode apply instantly
   */
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return [dark, setDark];
}
