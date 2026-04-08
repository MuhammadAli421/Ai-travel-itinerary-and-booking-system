import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchItineraries } from '../../store/itinerarySlice'
import { fetchBookings } from '../../store/bookingSlice'
import SkeletonCard from '../../components/common/SkeletonCard'

const StatCard = ({ label, value, icon, color }) => (
  <motion.div
    className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${color}`}
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </motion.div>
)

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { items: itineraries, loading: iLoad } = useSelector((s) => s.itinerary)
  const { items: bookings,    loading: bLoad } = useSelector((s) => s.booking)
  const user = useSelector((s) => s.auth.user)

  useEffect(() => {
    dispatch(fetchItineraries())
    dispatch(fetchBookings())
  }, [dispatch])

  const upcoming = itineraries.filter((i) => new Date(i.startDate) >= new Date())
  const confirmed = bookings.filter((b) => b.status === 'confirmed')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name} 👋</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Trips"      value={itineraries.length} icon="🗺️" color="border-indigo-500" />
        <StatCard label="Upcoming Trips"   value={upcoming.length}    icon="✈️" color="border-blue-500" />
        <StatCard label="Bookings"         value={bookings.length}    icon="📋" color="border-purple-500" />
        <StatCard label="Confirmed"        value={confirmed.length}   icon="✅" color="border-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Itineraries */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Recent Itineraries</h2>
            <Link to="/itineraries" className="text-xs text-indigo-600 hover:underline">View all</Link>
          </div>
          {iLoad ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}</div>
          ) : itineraries.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No itineraries yet. <Link to="/itineraries" className="text-indigo-600">Create one</Link></p>
          ) : (
            <div className="space-y-3">
              {itineraries.slice(0, 4).map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.destination} · {new Date(item.startDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium
                    ${item.status === 'planned' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Recent Bookings</h2>
            <Link to="/bookings" className="text-xs text-indigo-600 hover:underline">View all</Link>
          </div>
          {bLoad ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}</div>
          ) : bookings.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No bookings yet. <Link to="/bookings" className="text-indigo-600">Add one</Link></p>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 4).map((b) => (
                <div key={b._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{b.title}</p>
                    <p className="text-xs text-gray-400">{b.type} · {new Date(b.startDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium
                    ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
