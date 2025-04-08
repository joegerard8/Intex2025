import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../AuthorizeView";
import "./identity.css";
import "@fortawesome/fontawesome-free/css/all.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext);

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

  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3 ">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
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
                  Remember password
                </label>
              </div>

              <div className="d-grid mb-2">
                <button className="btn btn-primary fw-bold" type="submit">
                  Sign in
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-secondary fw-bold"
                  type="button"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button
                  className="btn btn-outline-primary fw-bold"
                  type="button"
                  onClick={handleGoHomeClick}
                >
                  Home Page
                </button>
              </div>
              {error && <p className="error text-danger mt-3">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
