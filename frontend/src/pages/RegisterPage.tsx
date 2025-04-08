import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./identity.css";

// Simple Header component with home link
const SimpleHeader = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="simple-header">
      <div className="header-content">
        <a className="home-link" onClick={goToHome}>
          Home
        </a>
      </div>
    </div>
  );
};

function Register() {
  // State variables for email and passwords
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // State variable for error messages
  const [error, setError] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGoHomeClick = () => {
    navigate("/");
  };

  // Handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Handle submit event for the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate email and passwords
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (password.length < 12) {
      setError("Password must be at least 12 characters.");
    } else {
      // Clear error message
      setError("");
      // Post data to the /register api
      fetch("https://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            navigate("/login", {
              state: { message: "Registration successful. Please log in." },
            });
          } else {
            setError("Error registering.");
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Error registering.");
        });
    }
  };

  return (
    <>
      <SimpleHeader />
      <div className="register-page">
        <div className="content-container">
          <div className="logo-container">
            <div className="logo-box"></div>
          </div>

          <div className="image-gallery">
            <div className="image-placeholder"></div>
            <div className="image-placeholder"></div>
            <div className="image-placeholder"></div>
            <div className="image-placeholder"></div>
            <div className="image-placeholder"></div>
          </div>

          <div className="tagline">
            Discover the films mainstream platforms don't offer. CineNiche
            curates cult classics, international gems, and indie treasures for
            true film enthusiasts.
          </div>

          <div className="register-container">
            <div className="register-card">
              <h2 className="register-title">Register</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="hudson@test.com"
                  />
                </div>

                <div className="form-group">
                  <div className="password-label">
                    Password (must be 12 or more characters)
                  </div>
                  <input
                    className="form-input"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="•••••••••••••"
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-input"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="button-group">
                  <button className="register-button" type="submit">
                    REGISTER
                  </button>

                  <button
                    className="login-button"
                    type="button"
                    onClick={handleLoginClick}
                  >
                    GO TO LOGIN
                  </button>

                  <button
                    className="home-button"
                    type="button"
                    onClick={handleGoHomeClick}
                  >
                    HOME PAGE
                  </button>
                </div>
              </form>

              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
