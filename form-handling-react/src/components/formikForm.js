

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Formik Registration Form
      </h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Built with <span className="font-semibold">Formik + Yup</span>
      </p>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("Username is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Password is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }).then(() => {
            alert("User registered successfully!");
            resetForm();
          });
        }}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="username"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </Form>
      </Formik>

      {/* Advantages */}
      <div className="mt-6 bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Advantages of Formik Forms</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Automatic form state management</li>
          <li>Built-in validation with Yup</li>
          <li>Cleaner and more scalable code</li>
          <li>Best for complex and large forms</li>
        </ul>
      </div>
    </div>
  );
};

export default FormikForm;
