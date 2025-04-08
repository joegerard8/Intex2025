import React, { useState, useEffect, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";

export interface User {
  email: string;
  roles: string[];
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  authorized: boolean;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  authorized: false,
  refreshUser: async () => {},
});

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({ email: "", roles: [] });

  const refreshUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://localhost:5000/pingauth", {
        method: "GET",
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format");
      }

      const data = await response.json();

      if (data.email && data.roles) {
        setUser({ email: data.email, roles: data.roles });
        setAuthorized(true);
      } else {
        throw new Error("Invalid user");
      }
    } catch {
      setUser({ email: "", roles: [] });
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: authorized ? user : null,
        loading,
        authorized,
        refreshUser,
      }}
    >
      {loading ? <p>Loading...</p> : props.children}
    </UserContext.Provider>
  );
}

export function AuthorizedUser(props: { value: string }) {
  const { user } = useContext(UserContext);
  if (!user) return null;
  return props.value === "email" ? <>{user.email}</> : null;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useContext(UserContext);
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

export function RequireRole({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const { user, loading } = useContext(UserContext);
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (!user.roles.includes(role)) return <Navigate to="/unauthorized" />;
  return <>{children}</>;
}

export default AuthorizeView;
