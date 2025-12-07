// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//   FaHome,
//   FaPlus,
//   FaSignInAlt,
//   FaUserPlus,
//   FaEnvelope,
//   FaInfoCircle,
//   FaBars,
//   FaTimes,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Read user session
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, []);

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   // Links when logged in
//   const loggedInLinks = [
//     { to: "/home", label: "Home", icon: FaHome },
//     { to: "/addrecipe", label: "Add Recipe", icon: FaPlus },
//     { to: "/contact", label: "Contact", icon: FaEnvelope },
//     { to: "/about", label: "About Us", icon: FaInfoCircle },
//   ];

//   // Links when logged out
//   const loggedOutLinks = [
//     { to: "/", label: "Sign In", icon: FaSignInAlt },
//     { to: "/signup", label: "Sign Up", icon: FaUserPlus },
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-green-600 dark:bg-gray-900 shadow-md backdrop-blur-lg">
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <Link to="/" className="text-white font-bold text-xl">
//           RecipeApp
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-white text-2xl md:hidden"
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-6 text-white">
//           {(user ? loggedInLinks : loggedOutLinks).map(
//             ({ to, label, icon: Icon }) => (
//               <li key={to}>
//                 <NavLink
//                   to={to}
//                   className={({ isActive }) =>
//                     `flex items-center space-x-1 hover:text-yellow-300 transition ${
//                       isActive ? "text-yellow-300 font-semibold" : ""
//                     }`
//                   }
//                 >
//                   <Icon />
//                   <span>{label}</span>
//                 </NavLink>
//               </li>
//             )
//           )}

//           {/* Logout Button */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-1 text-white hover:text-yellow-300 transition"
//             >
//               <FaSignOutAlt />
//               <span>Logout</span>
//             </button>
//           )}
//         </ul>
//       </nav>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <ul className="md:hidden bg-green-700 dark:bg-gray-800 px-6 py-4 space-y-4 text-white">
//           {(user ? loggedInLinks : loggedOutLinks).map(
//             ({ to, label, icon: Icon }) => (
//               <li key={to}>
//                 <NavLink
//                   to={to}
//                   onClick={() => setMenuOpen(false)}
//                   className="flex items-center space-x-2 py-2 hover:text-yellow-300 transition"
//                 >
//                   <Icon />
//                   <span>{label}</span>
//                 </NavLink>
//               </li>
//             )
//           )}

//           {/* Mobile logout */}
//           {user && (
//             <button
//               onClick={() => {
//                 setMenuOpen(false);
//                 handleLogout();
//               }}
//               className="flex items-center space-x-2 py-2 text-white hover:text-yellow-300"
//             >
//               <FaSignOutAlt />
//               <span>Logout</span>
//             </button>
//           )}
//         </ul>
//       )}
//     </header>
//   );
// };

// export default Header;






import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import {
  FaHome,
  FaPlus,
  FaSignInAlt,
  FaUserPlus,
  FaEnvelope,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

const Header = () => {
  // Auth context
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Links when user is logged in
  const loggedInLinks = [
    { to: "/home", label: "Home", icon: FaHome },
    { to: "/addrecipe", label: "Add Recipe", icon: FaPlus },
    { to: "/contact", label: "Contact", icon: FaEnvelope },
    { to: "/about", label: "About Us", icon: FaInfoCircle },
  ];

  // Links when user is logged out
  const loggedOutLinks = [
    { to: "/", label: "Sign In", icon: FaSignInAlt },
    { to: "/signup", label: "Sign Up", icon: FaUserPlus },
  ];

  // 🔥 Logout handler with redirect
  const handleLogout = () => {
    logout(() => navigate("/")); // redirect to Sign In page
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-green-600 shadow-md dark:bg-gray-900">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl">
          RecipeApp
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl md:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-white">
          {(user ? loggedInLinks : loggedOutLinks).map(
            ({ to, label, icon: Icon }) => (
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
            )
          )}

          {/* 🔥 Desktop Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-yellow-300 transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </ul>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="md:hidden bg-green-700 dark:bg-gray-800 px-6 py-4 space-y-4 text-white">
          {(user ? loggedInLinks : loggedOutLinks).map(
            ({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 py-2 hover:text-yellow-300"
                >
                  <Icon />
                  <span>{label}</span>
                </NavLink>
              </li>
            )
          )}

          {/* 🔥 Mobile logout */}
          {user && (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center space-x-2 py-2 hover:text-yellow-300"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </ul>
      )}
    </header>
  );
};

export default Header;

