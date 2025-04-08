import { useContext } from "react";
import { UserContext } from "./AuthorizeView";

function Logout({ children }: { children: React.ReactNode }) {
  const { refreshUser } = useContext(UserContext);

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await refreshUser(); // 👈 Clear user from context
        window.location.href = "/login"; // OR use navigate('/login') if you prefer
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <a className="logout" href="#" onClick={handleLogout}>
      {children}
    </a>
  );
}

export default Logout;
