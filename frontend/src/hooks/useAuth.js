import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { user, loading, initialized } = useSelector((s) => s.auth)
  return { user, loading, initialized, isAuthenticated: !!user }
}
