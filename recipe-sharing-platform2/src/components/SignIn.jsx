import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form is valid. Logging in...");
      // Add backend login logic here
    }
  };

  // GOOGLE LOGIN FUNCTION
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in successfully with Google!");
    } catch (error) {
      console.error(error);
      alert("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center sm:px-6 py-8 md:py-12 bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl max-w-md w-full p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
              Email
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3">
              <FaEnvelope className="text-green-600 dark:text-green-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none dark:text-white"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3">
              <FaLock className="text-green-600 dark:text-green-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-transparent outline-none dark:text-white"
              />
              <button
                type="button"
                className="text-gray-500 dark:text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Forgot password?
            </Link>
          </div>

          {/* SIGN IN BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="mx-3 text-gray-500 dark:text-gray-300">or</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* GOOGLE LOGIN BUTTON */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition shadow-lg flex items-center justify-center space-x-3"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt="Google"
            className="w-5"
          />
          <span>Continue with Google</span>
        </button>

        {/* Bottom text */}
        <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
