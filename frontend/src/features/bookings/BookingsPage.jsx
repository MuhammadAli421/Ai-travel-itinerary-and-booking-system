import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { fetchBookings, createBooking, deleteBooking } from '../../store/bookingSlice'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import SkeletonCard from '../../components/common/SkeletonCard'

const TYPES = ['flight', 'hotel', 'activity', 'transport', 'other']
const EMPTY = { title: '', type: 'flight', provider: '', confirmationNumber: '', startDate: '', cost: { amount: '', currency: 'USD' }, notes: '' }

const typeIcon = { flight: '✈️', hotel: '🏨', activity: '🎯', transport: '🚗', other: '📦' }

export default function BookingsPage() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((s) => s.booking)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => { dispatch(fetchBookings()) }, [dispatch])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const setCost = (k) => (e) => setForm((f) => ({ ...f, cost: { ...f.cost, [k]: e.target.value } }))

  const handleCreate = async (e) => {
    e.preventDefault()
    setSaving(true)
    await dispatch(createBooking(form))
    setSaving(false)
    setOpen(false)
    setForm(EMPTY)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">Track flights, hotels, and activities</p>
        </div>
        <Button onClick={() => setOpen(true)}>+ Add Booking</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-3">📋</p>
          <p className="font-medium">No bookings yet</p>
          <p className="text-sm mt-1">Click "Add Booking" to track your reservations</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((b, i) => (
            <motion.div key={b._id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{typeIcon[b.type]}</span>
                <h3 className="font-semibold text-gray-800 truncate">{b.title}</h3>
              </div>
              {b.provider && <p className="text-sm text-gray-500 mb-1">🏢 {b.provider}</p>}
              <p className="text-xs text-gray-400 mb-1">{new Date(b.startDate).toLocaleDateString()}</p>
              {b.confirmationNumber && <p className="text-xs text-gray-400 mb-3">Ref: {b.confirmationNumber}</p>}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-600">{b.cost?.currency} {b.cost?.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'}`}>
                    {b.status}
                  </span>
                </div>
                <Button variant="danger" className="text-xs px-3 py-1"
                  onClick={() => dispatch(deleteBooking(b._id))}>
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Booking">
        <form onSubmit={handleCreate} className="space-y-3">
          <Input label="Title" required value={form.title} onChange={set('title')} placeholder="e.g. Flight to Tokyo" />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <select className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              value={form.type} onChange={set('type')}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <Input label="Provider" value={form.provider} onChange={set('provider')} placeholder="e.g. Emirates" />
          <Input label="Confirmation #" value={form.confirmationNumber} onChange={set('confirmationNumber')} placeholder="e.g. ABC123" />
          <Input label="Date" type="date" required value={form.startDate} onChange={set('startDate')} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Amount" type="number" required value={form.cost.amount} onChange={setCost('amount')} placeholder="0" />
            <Input label="Currency" value={form.cost.currency} onChange={setCost('currency')} placeholder="USD" />
          </div>
          <Input label="Notes" value={form.notes} onChange={set('notes')} placeholder="Optional..." />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
