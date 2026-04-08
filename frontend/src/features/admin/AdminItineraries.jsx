import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getAllItineraries, deleteItinerary } from '../../services/adminService'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'

export default function AdminItineraries() {
  const [items,    setItems]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    getAllItineraries()
      .then(({ data }) => setItems(data.data))
      .catch(() => setError('Failed to load itineraries.'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this itinerary? This cannot be undone.')) return
    setDeleting(id)
    try {
      await deleteItinerary(id)
      setItems((prev) => prev.filter((i) => i._id !== id))
    } catch (e) {
      alert(e.response?.data?.message || 'Delete failed.')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) return <div className="flex justify-center pt-20"><Spinner size="lg" /></div>
  if (error)   return <p className="text-red-400">{error}</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">All Itineraries</h1>
        <p className="text-gray-400 text-sm mt-1">{items.length} total across all users</p>
      </div>

      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-left">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Destination</th>
              <th className="px-5 py-3 font-medium">Owner</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Dates</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <motion.tr key={item._id}
                className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              >
                <td className="px-5 py-3 text-white font-medium max-w-[160px] truncate">
                  {item.title}
                  {item.isAiGenerated && <span className="ml-2 text-xs bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-full">AI</span>}
                </td>
                <td className="px-5 py-3 text-gray-300">{item.destination}</td>
                <td className="px-5 py-3 text-gray-400 text-xs">
                  <p>{item.user?.name}</p>
                  <p className="text-gray-500">{item.user?.email}</p>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                    ${item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      item.status === 'planned'   ? 'bg-blue-500/20 text-blue-400' :
                      item.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400 text-xs">
                  {new Date(item.startDate).toLocaleDateString()} →{' '}
                  {new Date(item.endDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <Button variant="danger" className="text-xs px-3 py-1"
                    loading={deleting === item._id}
                    onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="text-center text-gray-500 py-10">No itineraries found.</p>
        )}
      </div>
    </div>
  )
}
