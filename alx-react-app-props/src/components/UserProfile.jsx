// // src/components/UserProfile.jsx

// const UserProfile = (props) => {
//   return (
//     <div>
//       <h2>{props.name}</h2>
//       <p>Age: {props.age}</p>
//       <p>Bio: {props.bio}</p>
//     </div>
//   );
// }

// export default UserProfile;






import React, { useContext } from "react";
import UserContext from "./UserContext";

function UserProfile() {
  const userData = useContext(UserContext); // consume context

  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "15px",
        margin: "150px",
        backgroundColor: "#f9f9f9",
        
      }}
    >
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
