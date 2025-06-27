import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api", 
  // timeout: process.env.REACT_APP_MAX_API_TIMEOUT || 5000, // Maximum seconds waiting
});

export default axiosInstance;
