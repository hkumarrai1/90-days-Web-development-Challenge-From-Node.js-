import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token on Load:", decodedToken);
      setUser({ email: decodedToken.email, token, role: decodedToken.role });
    }
    setLoading(false);
  }, []);

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        if (!user) {
          console.log("Unauthorized. Redirecting to /login");
          window.location.href = "/login";
        } else {
          console.log("Forbidden. Redirecting to /dashboard");
          alert("You do not have permission to access this resource.");
          window.location.href = "/dashboard";
        }
      }
      return Promise.reject(error);
    }
  );

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const { token, message } = response.data;
      localStorage.setItem("jwtToken", token);
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token on Login:", decodedToken);
      setUser({ email, token, role: decodedToken.role });
      alert(message);
      return true;
    } catch (err) {
      console.error("Login Error:", err);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    window.location.href = "/login";
  };

  if (loading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
