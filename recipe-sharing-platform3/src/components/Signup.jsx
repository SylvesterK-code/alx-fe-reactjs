import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const userData = {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to save user");

      alert("Signup Successful!");
      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error saving user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-500 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Join us and start sharing your recipes!
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <FaUser className="text-green-600 dark:text-green-400 mr-3" />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
            </div>
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <FaEnvelope className="text-green-600 dark:text-green-400 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <FaLock className="text-green-600 dark:text-green-400 mr-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <FaLock className="text-green-600 dark:text-green-400 mr-3" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></span>
          <span className="px-3 text-gray-500 dark:text-gray-400">OR</span>
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></span>
        </div>

        {/* Redirect */}
        <p className="text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-700 dark:text-green-400 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
