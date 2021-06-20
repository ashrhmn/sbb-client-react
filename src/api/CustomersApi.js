import api from './api'

export const getCustomers = () => api.get('/customers').then(response => response.data);

export const getCustomer = (id) => api.get(`/customers/${id}`).then(response => response.data);

export const updateCustomer = (id, ...updatedData) => api.put(`/customers/${id}`, updatedData).then(response => response.data);

export const deleteCustomer = (id) => api.delete(`/customers/${id}`).then(response => response.data);