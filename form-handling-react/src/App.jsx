import './index.css'
// import RegistrationForm from "./components/RegistrationForm";
// import FormikForm from "./components/formikForm";

// function App() {
//   return (
//     <>
//       <RegistrationForm />
//       <hr />
//       <FormikForm />
//     </>
//   );
// }

// export default App;



import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 space-y-10">
      <RegistrationForm />
      <FormikForm />
    </div>
  );
}

export default App;

