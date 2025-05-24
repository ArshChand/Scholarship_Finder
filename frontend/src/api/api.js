import axios from 'axios';
const API = axios.create({ baseURL: 'https://scholarship-finder-xtg6.onrender.com/api' });

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
