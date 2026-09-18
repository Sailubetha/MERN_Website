import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sac_admin_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("sac_admin_token") || null;
  });

  const login = async (email, password) => {
    // Try API request first if server available, fallback to local validation
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("sac_admin_user", JSON.stringify(data.user));
        localStorage.setItem("sac_admin_token", data.token);
        return { success: true };
      }
    } catch (err) {
      console.warn("Backend API offline, evaluating mock authentication credentials...");
    }

    // Mock Fallback Authentication for Frontend Demonstration
    if (email === "admin@college.edu" && password === "admin123") {
      const mockUser = {
        id: "usr_admin_1",
        name: "SAC Super Admin",
        email: "admin@college.edu",
        role: "superadmin"
      };
      const mockToken = "mock_jwt_token_sac_2026";
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem("sac_admin_user", JSON.stringify(mockUser));
      localStorage.setItem("sac_admin_token", mockToken);
      return { success: true };
    }

    return { success: false, message: "Invalid email or password. (Hint: admin@college.edu / admin123)" };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sac_admin_user");
    localStorage.removeItem("sac_admin_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
