import React, { useState } from "react";
import { useAuth } from "../store/AuthContext";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAuthenticated = await handleLogin(email, password);

    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
