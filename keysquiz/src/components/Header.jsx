import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-orange-500 z-50 shadow">
      <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Keys A<sup>+</sup> Quiz
        </h1>

        <nav className="flex gap-4 text-sm font-medium">
          <NavLink to="/" className="hover:underline">
            Quiz
          </NavLink>
          <NavLink to="/performance" className="hover:underline "
          >
            Performance
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
