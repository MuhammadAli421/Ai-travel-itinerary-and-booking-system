import api from './api'

export const getStats          = ()    => api.get('/admin/stats')
export const getAllUsers        = ()    => api.get('/admin/users')
export const deleteUser        = (id)  => api.delete(`/admin/users/${id}`)
export const getAllItineraries  = ()    => api.get('/admin/itineraries')
export const deleteItinerary   = (id)  => api.delete(`/admin/itineraries/${id}`)
