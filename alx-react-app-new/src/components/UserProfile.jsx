// src/components/UserProfile.jsx

const UserProfile = (props) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "15px",
        margin: "15px",
        backgroundColor: "#f9f9f9",
        fontFamily: "Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "blue", marginBottom: "10px" }}>{props.name}</h2>
      <p>
        Age:{" "}
        <span style={{ fontWeight: "bold", color: "#333" }}>{props.age}</span>
      </p>
      <p style={{ fontStyle: "italic" }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
