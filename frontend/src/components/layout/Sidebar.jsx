import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard',   label: 'Dashboard',   icon: '🏠' },
  { to: '/itineraries', label: 'Itineraries',  icon: '🗺️' },
  { to: '/bookings',    label: 'Bookings',     icon: '📋' },
  { to: '/ai',          label: 'AI Planner',   icon: '🤖' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col py-6 px-3 gap-1">
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
            ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`
          }
        >
          <span>{icon}</span> {label}
        </NavLink>
      ))}
    </aside>
  )
}
