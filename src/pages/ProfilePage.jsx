import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Pencil, Check, X, Mail, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import parallaxLogo from '../assets/ParallaxLogo.png'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

function getInitials(displayName, email) {
  const parts = (displayName ?? '').trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (email ?? '?')[0].toUpperCase()
}

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const nameParts = (user?.displayName ?? '').trim().split(/\s+/).filter(Boolean)
  const [firstName, setFirstName] = useState(nameParts[0] ?? '')
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') ?? '')

  function handleCancel() {
    const parts = (user?.displayName ?? '').trim().split(/\s+/).filter(Boolean)
    setFirstName(parts[0] ?? '')
    setLastName(parts.slice(1).join(' ') ?? '')
    setError('')
    setEditing(false)
  }

  async function handleSave() {
    if (!firstName.trim()) { setError('First name is required.'); return }
    setSaving(true)
    setError('')
    try {
      await updateUserProfile({ firstName, lastName })
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const initials = getInitials(user?.displayName, user?.email)

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Topbar */}
      <header className="border-b border-white/[0.06] bg-[#080d18]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={parallaxLogo} alt="Parallax" className="h-7 w-auto object-contain" />
            <span className="text-sm font-bold tracking-tight text-white">Parallax</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2">Account</p>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-10">Your profile</h1>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-10">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ background: AURORA }}
            >
              {initials}
            </div>
            <div>
              <div className="text-base font-bold text-white">{user?.displayName ?? '—'}</div>
              <div className="text-sm text-slate-500 mt-0.5">{user?.email}</div>
            </div>
          </div>

          {/* Info card */}
          <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
              <span className="text-sm font-semibold text-white">Personal information</span>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/5"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1 text-xs font-semibold text-white px-2.5 py-1.5 rounded-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                    style={{ background: AURORA }}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            <div className="divide-y divide-white/[0.04]">
              {/* First name */}
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-600 uppercase tracking-widest mb-1">First name</p>
                  {editing ? (
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  ) : (
                    <p className="text-sm font-medium text-white">{firstName || '—'}</p>
                  )}
                </div>
              </div>

              {/* Last name */}
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-600 uppercase tracking-widest mb-1">Last name</p>
                  {editing ? (
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  ) : (
                    <p className="text-sm font-medium text-white">{lastName || '—'}</p>
                  )}
                </div>
              </div>

              {/* Email — read only */}
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-600 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-medium text-slate-400 truncate">{user?.email ?? '—'}</p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">{error}</p>
          )}

          {saved && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xs text-[#0f9b74] bg-[#0f9b74]/10 border border-[#0f9b74]/20 rounded-xl px-4 py-2.5"
            >
              Profile updated successfully.
            </motion.p>
          )}
        </motion.div>
      </main>
    </div>
  )
}
