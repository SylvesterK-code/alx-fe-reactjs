// src/components/Counter.jsx
import React, { useState } from "react";

function Counter() {
  // Initialize state with 0
  const [count, setCount] = useState(0);

  // Inline styles for better presentation
  const containerStyle = {
    textAlign: "center",
    marginTop: "10px",
    fontFamily: "Arial, sans-serif",
  };

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <h2>Simple Counter App</h2>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
        Current Count: {count}
      </p>

      <div>
        <button
          style={{ ...buttonStyle, backgroundColor: "green" }}
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "red" }}
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "gray" }}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
