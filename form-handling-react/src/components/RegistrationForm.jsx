import React, { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccess("User registered successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Controlled Registration Form
      </h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Built using React <span className="font-semibold">useState</span>
      </p>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      {/* Advantages */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Advantages of Controlled Forms</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Full control over form state</li>
          <li>Easy to debug and understand</li>
          <li>Ideal for simple and small forms</li>
          <li>No external dependencies</li>
        </ul>
      </div>
    </div>
  );
};

export default RegistrationForm;
