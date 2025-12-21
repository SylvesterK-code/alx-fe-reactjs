import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    } else if (formData.fullname.length < 3) {
      newErrors.fullname = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ fullname: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
          Contact Us
        </h1>
        <p className="text-blue-950 text-lg">
          Have questions, feedback, or suggestions? We’d love to hear from you.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          <h2 className="text-2xl font-semibold text-blue-950 mb-6">
            Send Us a Message
          </h2>

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
              ✅ Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <div
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 focus-within:ring-2 ${
                  errors.fullname
                    ? "border-red-500 focus-within:ring-red-400"
                    : "focus-within:ring-orange-500"
                }`}
              >
                <FaUser className="text-blue-950" />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full outline-none"
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <div
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 focus-within:ring-2 ${
                  errors.email
                    ? "border-red-500 focus-within:ring-red-400"
                    : "focus-within:ring-orange-500"
                }`}
              >
                <FaEnvelope className="text-blue-950" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 ${
                  errors.message
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-orange-500"
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-blue-950 py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-blue-950"
        >
          {[
            {
              icon: <FaMapMarkerAlt />,
              title: "Our Location",
              text: "Aflukakpoe-Juapong, Ghana",
            },
            {
              icon: <FaPhone />,
              title: "Call Us",
              text: "+233 24 763 8213",
            },
            {
              icon: <FaEnvelope />,
              title: "Email",
              text: "support@keysquiz.com — We respond within 24 hours.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-orange-500 text-white rounded-2xl p-6 flex items-start gap-4 shadow-lg"
            >
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="opacity-90">{item.text}</p>
              </div>
            </div>
          ))}

          <div className="rounded-2xl overflow-hidden shadow-lg h-64">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Ghana&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
