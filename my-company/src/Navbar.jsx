import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    padding: "10px",
    backgroundColor: "#0077b6",
    color: "#fff",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/about" style={linkStyle}>
        About
      </Link>
      <Link to="/services" style={linkStyle}>
        Services
      </Link>
      <Link to="/contact" style={linkStyle}>
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
