// src/components/Footer.jsx

import React from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-orange-500 mt-8 py-6 text-sm text-slate-700">
      <div
        className="
          max-w-4xl mx-auto px-4
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* Footer Text */}
        <div className="text-center sm:text-left">
          <p className="font-medium">
            KeysQuiz • Built with React & Tailwind • Data from Open Trivia DB
          </p>
          <p className="text-xs mt-1">
            © {new Date().getFullYear()} KeysQuiz. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center sm:justify-end gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2 rounded-full hover:bg-white/20 hover:text-white transition"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="p-2 rounded-full hover:bg-white/20 hover:text-white transition"
          >
            <FaXTwitter size={18} />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-full hover:bg-white/20 hover:text-white transition"
          >
            <FaLinkedinIn size={18} />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full hover:bg-white/20 hover:text-white transition"
          >
            <FaInstagram size={18} />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-full hover:bg-white/20 hover:text-white transition"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
