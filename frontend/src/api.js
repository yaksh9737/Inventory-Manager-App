// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5400/api';

// Inventory API calls
export const fetchInventory = () => axios.get(`${API_URL}/inventory`);
export const addInventory = (data) => axios.post(`${API_URL}/inventory`, data);
export const updateInventory = (id, data) => axios.put(`${API_URL}/inventory/${id}`, data);
export const deleteInventory = (id) => axios.delete(`${API_URL}/inventory/${id}`);
export const exportCSV = () => axios.get(`${API_URL}/inventory/export`, { responseType: 'blob' }); // Ensure responseType is set
export const importCSV = (data) => axios.post(`${API_URL}/inventory/import`, data, { headers: { 'Content-Type': 'multipart/form-data' }});

// Supplier API calls
export const fetchSuppliers = () => axios.get(`${API_URL}/suppliers`);
export const addSupplier = (data) => axios.post(`${API_URL}/suppliers`, data);
export const updateSupplier = (id, data) => axios.put(`${API_URL}/suppliers/${id}`, data);
export const deleteSupplier = (id) => axios.delete(`${API_URL}/suppliers/${id}`);
