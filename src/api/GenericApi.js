import api from './api'

export const getAll = (endpoint) => api.get(`/${endpoint}`).then(response => response.data);

export const getOne = (id, endpoint) => api.get(`/${endpoint}/${id}`).then(response => response.data);

export const update = (endpoint, updatedData) => api.post(`/${endpoint}`, updatedData).then(response => response.data);

export const remove = (id, endpoint) => api.delete(`/${endpoint}/${id}`).then(response => response.data);