import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => api.post('/users/login', data);
export const register = (data) => api.post('/users/register', data);
export const logout = () => api.post('/users/logout');
export const getPosts = () => api.get('/posts');
export const createPost = (data) => api.post('/user-posts/add-post', data);
export const getPost = (id) => api.get(`/posts/post-detail/${id}`);
export const createComment = (data) => api.post('/comments', data);
export const getComments = (postId) => api.get(`/comments?postId=${postId}`);
export default api;