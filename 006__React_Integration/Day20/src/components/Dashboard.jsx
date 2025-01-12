import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:3000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch data.");
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      // Call the backend logout endpoint
      await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear the token from localStorage
      localStorage.removeItem("jwtToken");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboardCard}>
        {userData ? (
          <>
            <h1>{userData.message}</h1>
            <h2>Role: {userData.role}</h2>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
