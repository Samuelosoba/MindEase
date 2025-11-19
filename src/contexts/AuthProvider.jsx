import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user info if any
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");
  const [loading, setLoading] = useState(true);

  // 3. Load user from token on app start
  useEffect(() => {
    if (token) {
      // Here you can fetch user data if backend supports it
      setUser({ token }); // placeholder
    }
    setLoading(false);
  }, [token]);

  // 4. Login function
  const login = (token, userData = null) => {
    localStorage.setItem("auth_token", token);
    setToken(token);
    setUser(userData || { token });
  };

  // 5. Logout function
  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6. Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);
