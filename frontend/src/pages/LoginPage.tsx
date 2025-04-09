import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../AuthorizeView";
import Layout from "../components/Layout";
import "./identity.css";
import "@fortawesome/fontawesome-free/css/all.css";
import logo from "../assets/HomePageLogo.png"; 
import movieCollage from "../assets/movieCollage.png"; // Placeholder for the gray image

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

      await refreshUser();
      navigate("/movies");
    } catch (error: any) {
      setError(error.message || "Error logging in.");
      console.error("Fetch attempt failed:", error);
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

            {/* Right column - Login form */}
            <div className="right-column">

              <div className="signin-section">
                <h2 className="signin-title">Sign In</h2>

                {message && (
                    <div className="alert alert-success" role="alert">
                      {message}
                    </div>
                )}

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

                  <div className="remember-me">
                    <input
                        className="remember-checkbox"
                        type="checkbox"
                        id="rememberme"
                        name="rememberme"
                        checked={rememberme}
                        onChange={handleChange}
                    />
                    <label className="remember-label" htmlFor="rememberme">
                      Remember me
                    </label>
                  </div>

                  <div className="button-group">
                    <button className="signin-button" type="submit">
                      SIGN IN
                    </button>

                    <button
                        className="register-button"
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

                  <div className="forgot-password">
                    <a href="/forgot-password">Forgot password?</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}

export default LoginPage;