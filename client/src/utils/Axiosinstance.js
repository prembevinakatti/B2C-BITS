import axios from 'axios';

// Create an axios instance with custom configuration
const axiosInstance = axios.create({
  baseURL: 'https://b2c-bits-server.onrender.com/api', // Backend base URL
  timeout: 8000, // Request timeout
  withCredentials: true, // Ensure credentials (cookies) are sent with the request
  headers: {
    'Content-Type': 'application/json', // Set content type for JSON
  },
});

export default axiosInstance;
