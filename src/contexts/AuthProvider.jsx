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
    const tokenFromStorage = localStorage.getItem("auth_token");
    const userFromStorage = localStorage.getItem("auth_user");

    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      try {
        if (userFromStorage) {
          setUser(JSON.parse(userFromStorage));
        }
      } catch (err) {
        console.warn("Invalid JSON in localStorage, clearing...");
        localStorage.removeItem("auth_user");
      }
    }

    setLoading(false);
  }, []);

  // 4. Login function
  const login = (token, userDTO) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(userDTO));

    setToken(token);
    setUser(userDTO);
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
