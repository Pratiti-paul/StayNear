import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api/auth",
});

export const registerUser = (userData) =>
  API.post("/register", userData);

export const loginUser = (userData) =>
  API.post("/login", userData);

export const getMe = (token) =>
  API.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });