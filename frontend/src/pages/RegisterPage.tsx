import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./identity.css";
import logo from "../assets/HomePageLogo.png";
import movieCollage from "../assets/movieCollage.png";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGoHomeClick = () => {
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (password.length < 12) {
      setError("Password must be at least 12 characters.");
    } else {
      setError("");

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
      <Layout>
        <div className="login-page">
          {/* Logo center top */}
          <div className="logo-header">
            <img src={logo} alt="CineNiche" className="logo-img" />
          </div>

          {/* Two-column layout */}
          <div className="two-column-container">
            {/* Left column - Gray placeholder */}
            <div className="left-column">
              <img src={movieCollage} alt="Featured movies" className="featured-image" />
            </div>

            {/* Right column - Registration form */}
            <div className="right-column">
              <div className="signin-section">
                <h2 className="signin-title">Register</h2>

                <form onSubmit={handleSubmit} className="auth-form">
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
                    <button className="signin-button" type="submit">
                      REGISTER
                    </button>

                    <button
                        className="register-button"
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

                  {error && <p className="error-message">{error}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}

export default Register;