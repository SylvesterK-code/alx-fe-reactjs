// src/UserDetails.jsx
import React, { useContext } from "react";
import UserContext from "./UserContext";

function UserDetails() {
  const userData = useContext(UserContext); // Access user data from context

  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "15px",
        margin: "15px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ color: "blue" }}>User Details</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;
