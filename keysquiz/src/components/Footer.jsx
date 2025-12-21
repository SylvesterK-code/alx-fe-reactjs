// src/components/Footer.jsx

import React from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";

/**
 * Footer Component
 * ----------------
 * Features:
 * - Dark & Light mode support via ThemeContext
 * - Theme indicator (Light ☀️ / Dark 🌙)
 * - Responsive layout (mobile → desktop)
 * - Smooth color transitions
 * - Accessible social media links
 */
export default function Footer() {
  // Access global theme state
  const { dark } = useTheme();

  return (
    <footer
      className="
        mt-8 py-6 text-sm
        bg-orange-500 dark:bg-slate-800
        text-slate-800 dark:text-slate-200
        transition-colors duration-300
      "
    >
      <div
        className="
          max-w-4xl mx-auto px-4
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* ================= LEFT SECTION ================= */}
        <div className="text-center sm:text-left">
          <p className="font-medium">
            KeysQuiz • Built with React & Tailwind • Data from Open Trivia DB
          </p>

          <p className="text-xs mt-1 opacity-80">
            © {new Date().getFullYear()} KeysQuiz. All rights reserved.
          </p>

          {/* Theme indicator */}
          <p className="text-xs mt-1">
            Theme: <strong>{dark ? "Dark 🌙" : "Light ☀️"}</strong>
          </p>
        </div>

        {/* ================= SOCIAL ICONS ================= */}
        <div className="flex justify-center sm:justify-end gap-4">
          {[
            {
              href: "https://facebook.com",
              icon: <FaFacebookF />,
              label: "Facebook",
            },
            { href: "https://x.com", icon: <FaXTwitter />, label: "X" },
            {
              href: "https://linkedin.com",
              icon: <FaLinkedinIn />,
              label: "LinkedIn",
            },
            {
              href: "https://instagram.com",
              icon: <FaInstagram />,
              label: "Instagram",
            },
            { href: "https://github.com", icon: <FaGithub />, label: "GitHub" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="
                p-2 rounded-full
                hover:bg-white/20 hover:text-white
                dark:hover:bg-slate-700
                transition-colors duration-200
              "
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
