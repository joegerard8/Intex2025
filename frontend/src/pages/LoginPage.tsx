import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../AuthorizeView";
import Layout from "../components/Layout"; // Import the Layout component
import "./identity.css";
import "@fortawesome/fontawesome-free/css/all.css";
import logo from "../assets/logoForMovies.png"; // Import the logo image

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useContext(UserContext);

  const message = location.state?.message || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setRememberme(checked);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => navigate("/register");
  const handleGoHomeClick = () => navigate("/");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginUrl = rememberme
        ? "https://localhost:5000/login?useCookies=true"
        : "https://localhost:5000/login?useSessionCookies=true";

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      await refreshUser(); // 👈 Refresh user context immediately
      navigate("/movies");
    } catch (error: any) {
      setError(error.message || "Error logging in.");
      console.error("Fetch attempt failed:", error);
    }
  };

  // Wrap the existing content with the Layout component
  return (
      <Layout>
        <div className="register-page">
          <div className="content-container">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo-img" />
            </div>

            <div className="image-gallery">
              <div className="image-placeholder"></div>
              <div className="image-placeholder"></div>
              <div className="image-placeholder"></div>
              <div className="image-placeholder"></div>
              <div className="image-placeholder"></div>
            </div>

            <div className="tagline">
              Discover the films mainstream platforms don't offer. CineNiche curates cult classics, international gems, and indie treasures for true film enthusiasts.
            </div>

            <div className="register-container">
              <div className="register-card">
                <h2 className="register-title">Sign In</h2>

                {message && (
                    <div className="alert alert-success text-center" role="alert">
                      {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                        className="form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
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

                  <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberme"
                        name="rememberme"
                        checked={rememberme}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="rememberme">
                      Remember me
                    </label>
                  </div>

                  <div className="button-group">
                    <button className="register-button" type="submit">
                      SIGN IN
                    </button>

                    <button
                        className="login-button"
                        type="button"
                        onClick={handleRegisterClick}
                    >
                      GO TO REGISTER
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

export default LoginPage;