import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Spinner from './Spinner'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initialized } = useAuth()

  // Wait for fetchMe to complete before making any routing decision
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    )
  }

  // fetchMe done — if no user, go to login (no redirect loop since /login is public)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
