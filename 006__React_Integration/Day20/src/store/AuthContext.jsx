import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const { token, message } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser({ email, token });
      alert(message);
      return true;
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
        alert(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        console.error(err.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error(err.message);
        alert("An error occurred while setting up the request.");
      }
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
