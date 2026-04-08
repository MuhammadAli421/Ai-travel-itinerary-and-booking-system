import { useState } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../store/authSlice'
import { useAuth } from '../../hooks/useAuth'

const navLinks = [
  { to: '/admin/overview',     label: 'Overview',     icon: '📊' },
  { to: '/admin/users',        label: 'Users',        icon: '👥' },
  { to: '/admin/itineraries',  label: 'Itineraries',  icon: '🗺️' },
]

export default function AdminDashboard() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { user }  = useAuth()

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 flex flex-col py-6 px-3 gap-1 shrink-0">
        <div className="px-4 mb-6">
          <p className="text-indigo-400 font-bold text-lg">⚙️ Admin Panel</p>
          <p className="text-gray-500 text-xs mt-1 truncate">{user?.email}</p>
        </div>

        {navLinks.map(({ to, label, icon }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
              ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
            }>
            <span>{icon}</span>{label}
          </NavLink>
        ))}

        <div className="mt-auto px-1">
          <NavLink to="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition">
            ← Back to App
          </NavLink>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-gray-800 transition mt-1">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
