import React, { useState } from "react";
import axiosInstance from "../config/axios";
import { useNavigate } from "react-router-dom";
import RegisterView from "./pages/RegisterView"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/users/register", {
        username,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <RegisterView
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;