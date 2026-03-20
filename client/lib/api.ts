import axios from "axios";

const api = axios.create({
  baseURL: "https://vehicle-rental-system-wrjt.vercel.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
