import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaSignInAlt,
  FaUserPlus,
  FaEnvelope,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

// Navigation links stored in an array for reusability
const navItems = [
  { to: "/", label: "Home", icon: FaHome },
  { to: "/addrecipe", label: "Add Recipe", icon: FaPlus },
  { to: "/signin", label: "Sign In", icon: FaSignInAlt },
  { to: "/signup", label: "Sign Up", icon: FaUserPlus },
  { to: "/contact", label: "Contact", icon: FaEnvelope },
  { to: "/about", label: "AboutPage", icon: FaInfoCircle },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Fixed (static) header always visible at top
    // <header className="bg-green-600 dark:bg-gray-900 shadow-md">

    <header className="fixed top-0 left-0 w-full z-50 bg-green-600 dark:bg-gray-900 shadow-md backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl">
          RecipeApp
        </Link>

        {/* Hamburger Icon - appears only on mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl md:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-1 hover:text-yellow-300 transition ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
              >
                <Icon />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-green-700 dark:bg-gray-800 px-6 py-4 space-y-4 text-white animate-slideDown">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setMenuOpen(false)} // Close menu when link is clicked
                className={({ isActive }) =>
                  `flex items-center space-x-2 py-2 hover:text-yellow-300 transition ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
              >
                <Icon />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
