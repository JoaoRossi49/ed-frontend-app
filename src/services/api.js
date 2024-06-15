import axios from "axios";

const api = axios.create({
    baseURL: process.env.DJANGO_URL,
  });

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      else{
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  export default api;