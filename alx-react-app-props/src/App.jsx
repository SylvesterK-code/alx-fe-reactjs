// src/App.jsx

// import "./App.css";
// // import WelcomeMessage from './components/WelcomeMessage';
// import Header from "./components/Header.jsx";
// import MainContent from "./components/MainContent.jsx";
// import Footer from "./components/Footer.jsx";
// import UserProfile from "./components/UserProfile.jsx";

// function App() {
//   return (
//     <>
//       {/* <WelcomeMessage /> */}
//       <Header />
//       <MainContent />
//       <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
//       <Footer />
//     </>
//   );
// }

// export default App;





// src/App.jsx
import "./App.css";
import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';

function App() {
  const userData = { name: 'Jane Doe', email: 'jane.doe@example.com' };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
