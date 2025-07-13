import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils";

const Home = () => {
  const navigate = useNavigate();

  // Get the logged-in user from localStorage
  const username = localStorage.getItem("loggedInUser");

  // If no token, redirect to login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="home-container">
      <h1>Welcome, {username} 👋</h1>
      <p>You are successfully logged in.</p>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
