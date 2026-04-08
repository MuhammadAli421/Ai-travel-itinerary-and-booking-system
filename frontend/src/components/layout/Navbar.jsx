import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../store/authSlice'
import Button from '../common/Button'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((s) => s.auth.user)

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
      <span className="text-indigo-600 font-bold text-lg tracking-tight">✈ TravelAI</span>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Hi, {user?.name?.split(' ')[0]}</span>
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  )
}
