import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getAllUsers, deleteUser } from '../../services/adminService'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'

export default function AdminUsers() {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    getAllUsers()
      .then(({ data }) => setUsers(data.data))
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user and all their data? This cannot be undone.')) return
    setDeleting(id)
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u._id !== id))
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
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-gray-400 text-sm mt-1">{users.length} registered accounts</p>
      </div>

      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-left">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <motion.tr key={u._id}
                className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              >
                <td className="px-5 py-3 text-white font-medium">{u.name}</td>
                <td className="px-5 py-3 text-gray-300">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                    ${u.role === 'admin' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3">
                  {u.role !== 'admin' && (
                    <Button variant="danger" className="text-xs px-3 py-1"
                      loading={deleting === u._id}
                      onClick={() => handleDelete(u._id)}>
                      Delete
                    </Button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center text-gray-500 py-10">No users found.</p>
        )}
      </div>
    </div>
  )
}
