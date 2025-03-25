import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: '/api', // This works with the proxy you've set in Vite config
  withCredentials: true, // Important for sending cookies with requests
  headers: {
    'Content-Type': 'application/json', // Set default content type to JSON
  },
});

// You can add interceptors or other configuration here if needed
// For example, adding a request interceptor:
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom logic or headers before the request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
