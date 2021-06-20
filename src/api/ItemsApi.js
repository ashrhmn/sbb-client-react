import api from './api'

export const getItems = () => api.get('/items').then(response => response.data);

export const getItem = (id) => api.get(`/items/${id}`).then(response => response.data);

export const updateItem = (id, ...updatedData) => api.put(`/items/${id}`, updatedData).then(response => response.data);

export const deleteItem = (id) => api.delete(`/items/${id}`).then(response => response.data);