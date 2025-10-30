// src/App.jsx

import "./App.css";
// import WelcomeMessage from './components/WelcomeMessage';
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  return (
    <>
      {/* <WelcomeMessage /> */}
      <Header />
      <MainContent />
      <UserProfile
        name="Sylvester Kormla"
        age="30"
        bio="Loves coding and analysing data" />
      <Footer />
    </>
  );
}

export default App;
