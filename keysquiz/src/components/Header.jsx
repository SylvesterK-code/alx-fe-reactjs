// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";


/**
 * Header component with responsive navigation and dark mode toggle.
 *
 * Props:
 * - dark: boolean (current dark mode state)
 * - setDark: function (setter to toggle dark mode)
 */
// export default function Header({ dark, setDark }) {
export default function Header() {
  const { dark, setDark } = useTheme();

  const [open, setOpen] = useState(false); // Mobile menu toggle

  // Navigation links
  const links = [
    { to: "/", label: "Quiz" },
    { to: "/performance", label: "Performance" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    // Header wrapper: fixed top, full width, background changes with dark mode
    <header className="fixed top-0 w-full bg-orange-500 dark:bg-slate-900 z-50 shadow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-950 dark:text-white">
          Keys A<sup>+</sup> Quiz
        </h1>

        {/* Desktop Navigation (hidden on small screens) */}
        <nav className="hidden md:flex gap-6 items-center text-sm sm:text-base font-medium">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `hover:underline ${isActive ? "underline" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}

          {/* Dark mode toggle button */}
          <button
            onClick={() => setDark(!dark)}
            className="ml-2 p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-orange-500 dark:bg-slate-900 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="hover:underline"
                >
                  {l.label}
                </NavLink>
              ))}

              {/* Mobile dark mode toggle */}
              <button
                onClick={() => setDark(!dark)}
                className="mt-2 py-2 px-3 bg-slate-200 dark:bg-slate-700 rounded text-sm sm:text-base"
              >
                {dark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
