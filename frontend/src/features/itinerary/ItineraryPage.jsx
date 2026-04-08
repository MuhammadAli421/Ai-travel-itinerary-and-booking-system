import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { fetchItineraries, createItinerary, deleteItinerary } from '../../store/itinerarySlice'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import SkeletonCard from '../../components/common/SkeletonCard'

const EMPTY = { title: '', destination: '', startDate: '', endDate: '', totalBudget: '', currency: 'USD', notes: '' }

export default function ItineraryPage() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((s) => s.itinerary)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => { dispatch(fetchItineraries()) }, [dispatch])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleCreate = async (e) => {
    e.preventDefault()
    setSaving(true)
    await dispatch(createItinerary(form))
    setSaving(false)
    setOpen(false)
    setForm(EMPTY)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Itineraries</h1>
          <p className="text-sm text-gray-500 mt-1">Plan and manage your trips</p>
        </div>
        <Button onClick={() => setOpen(true)}>+ New Itinerary</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-3">🗺️</p>
          <p className="font-medium">No itineraries yet</p>
          <p className="text-sm mt-1">Click "New Itinerary" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div key={item._id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                {item.isAiGenerated && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">AI</span>}
              </div>
              <p className="text-sm text-gray-500 mb-1">📍 {item.destination}</p>
              <p className="text-xs text-gray-400 mb-3">
                {new Date(item.startDate).toLocaleDateString()} → {new Date(item.endDate).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full font-medium
                  ${item.status === 'planned' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-600'}`}>
                  {item.status}
                </span>
                <Button variant="danger" className="text-xs px-3 py-1"
                  onClick={() => dispatch(deleteItinerary(item._id))}>
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="New Itinerary">
        <form onSubmit={handleCreate} className="space-y-3">
          <Input label="Title" required value={form.title} onChange={set('title')} placeholder="e.g. Tokyo Adventure" />
          <Input label="Destination" required value={form.destination} onChange={set('destination')} placeholder="e.g. Tokyo, Japan" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" type="date" required value={form.startDate} onChange={set('startDate')} />
            <Input label="End Date"   type="date" required value={form.endDate}   onChange={set('endDate')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Budget" type="number" value={form.totalBudget} onChange={set('totalBudget')} placeholder="0" />
            <Input label="Currency" value={form.currency} onChange={set('currency')} placeholder="USD" />
          </div>
          <Input label="Notes" value={form.notes} onChange={set('notes')} placeholder="Optional notes..." />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
