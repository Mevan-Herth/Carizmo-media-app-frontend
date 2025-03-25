import React, { useState } from "react";
import axiosInstance from "../config/axios";
import { Link, useNavigate } from "react-router-dom";
import LoginView from "./pages/LoginView "; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <LoginView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;