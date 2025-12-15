import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm, setStatus }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setStatus({ success: "User registered successfully!" });
        resetForm();
      }
    } catch (error) {
      setStatus({ error: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Formik Registration Form
      </h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Built using <span className="font-semibold">Formik & Yup</span>
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ status }) => (
          <Form className="space-y-4">
            {status?.error && (
              <p className="text-red-500 text-sm">{status.error}</p>
            )}
            {status?.success && (
              <p className="text-green-500 text-sm">{status.success}</p>
            )}

            <div>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-6 bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Advantages of Formik</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Built-in form state management</li>
          <li>Easy validation with Yup</li>
          <li>Cleaner and more scalable code</li>
          <li>Ideal for complex forms</li>
        </ul>
      </div>
    </div>
  );
};

export default FormikForm;
