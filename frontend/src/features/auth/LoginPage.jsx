import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginUser } from '../../store/authSlice'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((s) => s.auth)
  const { isAuthenticated, initialized } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  // Already logged in — go straight to dashboard
  if (initialized && isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await dispatch(loginUser(form))
    if (res.meta.requestStatus === 'fulfilled') navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back ✈</h1>
        <p className="text-sm text-gray-500 mb-6">Log in to your travel planner</p>

        {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" placeholder="you@example.com" required
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Password" type="password" placeholder="••••••••" required
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button type="submit" loading={loading} className="w-full">Log In</Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-5">
          No account? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  )
}
