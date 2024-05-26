import { API_URL } from '@/config/const';
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: `${API_URL}/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
