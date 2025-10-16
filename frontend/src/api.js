import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function setToken(token) {
  if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  else delete axios.defaults.headers.common['Authorization'];
}

// Immediately set token from localStorage if exists
const token = localStorage.getItem('token');
if (token) setToken(token);

export default axios.create({ baseURL: API_URL });
