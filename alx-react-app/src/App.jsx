

// src/App.jsx

import './App.css';
// import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header.jsx';
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
      {/* <WelcomeMessage /> */}
    </>
  );
}

export default App;
