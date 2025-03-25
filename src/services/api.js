import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // Ensures cookies (JWT) are included
});

export const register = (userData) => API.post("/users/register", userData);
export const login = (userData) => API.post("/users/login", userData);
export const getPublicPosts = () => API.get("/posts");

export default API;