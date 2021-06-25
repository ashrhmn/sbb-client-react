import api from './api'

export const getInvoices = () => api.get('/invoices').then(response => response.data);

export const getInvoice = (id) => api.get(`/invoices/${id}`).then(response => response.data);

export const updateInvoice = (updatedData) => api.post(`/invoices/`, updatedData).then(response => response.data);

export const deleteInvoice = (id) => api.delete(`/invoices/${id}`).then(response => response.data);