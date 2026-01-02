import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password })
}

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getUserById: (id) => api.get(`/users/${id}`),
  followUser: (id) => api.post(`/users/follow/${id}`)
}

// Poem services
export const poemService = {
  getPoems: (params) => api.get('/poems', { params }),
  createPoem: (poemData) => api.post('/poems', poemData),
  getPoemById: (id) => api.get(`/poems/${id}`),
  updatePoem: (id, poemData) => api.put(`/poems/${id}`, poemData),
  deletePoem: (id) => api.delete(`/poems/${id}`),
  likePoem: (id) => api.post(`/poems/${id}/like`),
  addComment: (id, comment) => api.post(`/poems/${id}/comment`, comment)
}

export default api