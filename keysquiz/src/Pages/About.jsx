// src/Pages/About.jsx
import { motion } from "framer-motion";
import {
  FaBrain,
  FaChartLine,
  FaMobileAlt,
  FaUniversalAccess,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
          About Keys A+ Quiz
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          An interactive learning platform designed to help learners test,
          improve, and track their knowledge through engaging quizzes.
        </p>
      </motion.div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {[
          {
            icon: <FaBrain />,
            title: "Smart Learning",
            text: "Carefully curated questions that challenge and reinforce understanding.",
          },
          {
            icon: <FaChartLine />,
            title: "Performance Tracking",
            text: "Track progress and identify strengths and areas for improvement.",
          },
          {
            icon: <FaMobileAlt />,
            title: "Responsive Design",
            text: "Seamless experience across mobile, tablet, and desktop devices.",
          },
          {
            icon: <FaUniversalAccess />,
            title: "Accessible for All",
            text: "Designed with accessibility in mind for inclusive learning.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <div className="text-4xl text-orange-500 mb-4 mx-auto">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-blue-950 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-blue-950 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To empower learners with a fun and effective way to assess their
            knowledge, build confidence, and achieve academic excellence through
            interactive quizzes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-blue-950 mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become a trusted digital learning companion for students
            worldwide by combining technology, accessibility, and engaging
            design.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
