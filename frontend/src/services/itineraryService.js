import api from './api'

export const getItineraries = ()       => api.get('/itineraries')
export const getItinerary   = (id)     => api.get(`/itineraries/${id}`)
export const createItinerary = (data)  => api.post('/itineraries', data)
export const updateItinerary = (id, data) => api.put(`/itineraries/${id}`, data)
export const deleteItinerary = (id)    => api.delete(`/itineraries/${id}`)
