import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <button
        onClick={handleGoHome}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
        }}
      >
        Go Back to Home
      </button>
    </div>
  );
}

export default Unauthorized;
