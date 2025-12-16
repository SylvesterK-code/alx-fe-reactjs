import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/posts/101">View Post</Link>
      </nav>
    </div>
  );
};

export default Home;
