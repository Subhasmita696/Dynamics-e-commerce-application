import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
});

// Products
export const getAllProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const getProductsByCategory = (categoryId) => API.get(`/products/category/${categoryId}`);
export const searchProducts = (keyword) => API.get(`/products/search?keyword=${keyword}`);

// Orders
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getOrdersByUser = (userId) => API.get(`/orders/user/${userId}`);
export const getOrderById = (id) => API.get(`/orders/${id}`);

// Users
export const registerUser = (userData) => API.post('/users/register', userData);
export const getUserById = (id) => API.get(`/users/${id}`);

export default API;
