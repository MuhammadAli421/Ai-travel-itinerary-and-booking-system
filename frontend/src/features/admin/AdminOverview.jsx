import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getStats } from '../../services/adminService'
import Spinner from '../../components/common/Spinner'

const StatCard = ({ label, value, icon, color, delay }) => (
  <motion.div
    className={`bg-gray-900 rounded-2xl p-5 border-l-4 ${color}`}
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-white mt-1">{value ?? '—'}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </motion.div>
)

export default function AdminOverview() {
  const [stats, setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    getStats()
      .then(({ data }) => setStats(data.data))
      .catch(() => setError('Failed to load stats.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center pt-20"><Spinner size="lg" /></div>
  if (error)   return <p className="text-red-400">{error}</p>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">App-wide statistics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users"       value={stats.totalUsers}       icon="👥" color="border-indigo-500" delay={0} />
        <StatCard label="Total Itineraries" value={stats.totalItineraries} icon="🗺️" color="border-blue-500"   delay={0.05} />
        <StatCard label="Total Bookings"    value={stats.totalBookings}    icon="📋" color="border-purple-500" delay={0.1} />
        <StatCard label="Admin Accounts"    value={stats.adminCount}       icon="⚙️" color="border-yellow-500" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Itinerary breakdown */}
        <div className="bg-gray-900 rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-4">Itineraries by Status</h2>
          {stats.itineraryBreakdown.length === 0
            ? <p className="text-gray-500 text-sm">No data yet.</p>
            : stats.itineraryBreakdown.map((s) => (
              <div key={s._id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <span className="text-gray-300 text-sm capitalize">{s._id}</span>
                <span className="text-indigo-400 font-semibold">{s.count}</span>
              </div>
            ))
          }
        </div>

        {/* Booking breakdown */}
        <div className="bg-gray-900 rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-4">Bookings by Type</h2>
          {stats.bookingBreakdown.length === 0
            ? <p className="text-gray-500 text-sm">No data yet.</p>
            : stats.bookingBreakdown.map((s) => (
              <div key={s._id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <span className="text-gray-300 text-sm capitalize">{s._id}</span>
                <span className="text-indigo-400 font-semibold">{s.count}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
