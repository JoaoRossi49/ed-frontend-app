import axios from "axios";


const api = axios.create({
  baseURL: process.env.REACT_APP_DJANGO_URL,
});

const refreshTokenUrl = `${api.defaults.baseURL}/token/refresh/`;

api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
      const expiresAt = tokenDecoded.exp * 1000;

      if (expiresAt - Date.now() < 300000) {
        try {
          const response = await axios.post(refreshTokenUrl, {
            refresh: refreshToken,
          });

          const newToken = response.data.access;
          localStorage.setItem('accessToken', newToken);

          config.headers['Authorization'] = `Bearer ${newToken}`;
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;