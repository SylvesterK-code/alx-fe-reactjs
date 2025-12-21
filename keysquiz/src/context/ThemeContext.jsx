import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * ThemeContext
 * -------------
 * Provides global dark/light theme state across the app.
 */
const ThemeContext = createContext();

/**
 * Detect system preference (dark/light)
 */
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }) {
  /**
   * Theme state:
   * - null means "not yet decided"
   * - true = dark
   * - false = light
   */
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return getSystemTheme(); // fallback to OS preference
  });

  /**
   * Sync theme with <html> and localStorage
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

  /**
   * Listen to SYSTEM theme changes (real-time)
   */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e) => {
      // Only auto-switch if user hasn't explicitly chosen
      if (!localStorage.getItem("theme")) {
        setDark(e.matches);
      }
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook for consuming theme
 */
export function useTheme() {
  return useContext(ThemeContext);
}
