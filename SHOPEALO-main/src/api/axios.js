// src/api/axios.js
import axios from 'axios';

export const BASE_URL = 'https://web-production-b25d.up.railway.app/api';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
