import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true, // send session cookie on every request
})

// Global response interceptor — only redirect on 401 for non-auth endpoints
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || ''
    const is401 = err.response?.status === 401
    const isAuthEndpoint = url.includes('/auth/')

    // Don't redirect if it's an auth endpoint (e.g. /auth/me on page load)
    if (is401 && !isAuthEndpoint) {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
