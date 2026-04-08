import api from './api'

export const generateItinerary  = (data) => api.post('/ai/generate-itinerary', data)
export const predictCost        = (data) => api.post('/ai/cost-prediction', data)
export const getRecommendations = (data) => api.post('/ai/recommendations', data)
export const getWeatherInsights = (data) => api.post('/ai/weather-insights', data)
export const translateText      = (data) => api.post('/ai/translate', data)
export const optimizeBudget     = (data) => api.post('/ai/budget-optimize', data)
export const getTravelTips      = (data) => api.post('/ai/travel-tips', data)
