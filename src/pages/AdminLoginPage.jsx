import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'
const MotionDiv = motion.div

export default function AdminLoginPage() {
  const { logIn, user, isAdmin, loading: authLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (email.trim().toLowerCase() !== 'aidenyasharian@gmail.com') {
      setError('Access denied.')
      return
    }
    setLoading(true)
    try {
      await logIn(email, password)
    } catch (err) {
      const map = {
        'auth/user-not-found':     'No account found with that email.',
        'auth/wrong-password':     'Incorrect password.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/invalid-email':      'Please enter a valid email address.',
      }
      setError(map[err.code] ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080d18] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
      </div>
    )
  }

  if (user) {
    return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />
  }

  return (
    <div className="min-h-screen bg-[#080d18] flex items-center justify-center px-6">
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-md"
      >
        <div className="bg-[#0c1426] border border-white/[0.06] rounded-[28px] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.4)]">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-white">Admin login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]"
              />
            </label>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: AURORA, boxShadow: '0 10px 28px rgba(15,155,116,0.2)' }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </MotionDiv>
    </div>
  )
}
