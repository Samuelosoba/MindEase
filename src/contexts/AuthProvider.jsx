import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("auth_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, [token]);

  // FIXED: login(userData, token)
  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);

    localStorage.setItem("auth_user", JSON.stringify(userData));
    localStorage.setItem("auth_token", tokenValue);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
