import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMe } from './store/authSlice'

import ProtectedRoute  from './components/common/ProtectedRoute'
import AdminRoute      from './components/common/AdminRoute'
import AppLayout       from './components/layout/AppLayout'

import LoginPage       from './features/auth/LoginPage'
import RegisterPage    from './features/auth/RegisterPage'
import DashboardPage   from './features/dashboard/DashboardPage'
import ItineraryPage   from './features/itinerary/ItineraryPage'
import BookingsPage    from './features/bookings/BookingsPage'
import AIPlannerPage   from './features/ai/AIPlannerPage'

import AdminDashboard  from './features/admin/AdminDashboard'
import AdminOverview   from './features/admin/AdminOverview'
import AdminUsers      from './features/admin/AdminUsers'
import AdminItineraries from './features/admin/AdminItineraries'

function AppRoutes() {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(fetchMe()) }, [dispatch])

  return (
    <Routes>
      {/* Public */}
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Regular user app */}
      <Route path="/" element={
        <ProtectedRoute><AppLayout /></ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard"   element={<DashboardPage />} />
        <Route path="itineraries" element={<ItineraryPage />} />
        <Route path="bookings"    element={<BookingsPage />} />
        <Route path="ai"          element={<AIPlannerPage />} />
      </Route>

      {/* Admin panel */}
      <Route path="/admin" element={
        <AdminRoute><AdminDashboard /></AdminRoute>
      }>
        <Route index element={<Navigate to="/admin/overview" replace />} />
        <Route path="overview"    element={<AdminOverview />} />
        <Route path="users"       element={<AdminUsers />} />
        <Route path="itineraries" element={<AdminItineraries />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
