import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterPage.module.css";
import validator from "validator";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!validator.isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    setError("");

    const userData = { name, email, password, role };

    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("User registered successfully:", response.data);
      alert("Registration successful!");

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        {/* Name Field */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Role Field */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="role">
            Role:
          </label>
          <select
            id="role"
            className={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
