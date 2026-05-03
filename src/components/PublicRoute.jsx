import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicRoute({ children }) {
  const { user, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d18] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
      </div>
    )
  }

  if (user) {
    return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />
  }

  return children
}
