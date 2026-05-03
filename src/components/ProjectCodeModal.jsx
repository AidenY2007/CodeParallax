import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

export default function ProjectCodeModal() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    const handler = () => { if (user) { setOpen(true); setCode(''); setError(''); setSuccess(null) } }
    window.addEventListener('open-project-code', handler)
    return () => window.removeEventListener('open-project-code', handler)
  }, [user])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return

    setLoading(true)
    setError('')

    try {
      const codeRef = doc(db, 'projectCodes', trimmed)
      const snap = await getDoc(codeRef)

      if (!snap.exists()) {
        setError('Invalid project code. Please check with your Parallax contact.')
        setLoading(false)
        return
      }

      const projectData = snap.data()

      // Write project to user's subcollection
      const projectRef = doc(db, 'users', user.uid, 'projects', trimmed)
      const existing = await getDoc(projectRef)

      if (existing.exists()) {
        setError('This project is already linked to your account.')
        setLoading(false)
        return
      }

      await setDoc(projectRef, {
        ...projectData,
        code: trimmed,
        linkedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      })

      await updateDoc(codeRef, {
        clientName: user.displayName ?? user.email ?? '',
        clientUid: user.uid,
        clientEmail: user.email ?? '',
      })

      setSuccess(projectData.name ?? 'Your project')
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleDone() {
    setOpen(false)
    navigate('/dashboard')
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-code-title"
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="absolute inset-0 bg-[#050912]/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#0b1120]/96 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {success ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(15,155,116,0.15)', border: '1px solid rgba(15,155,116,0.25)' }}>
                  <CheckCircle className="w-7 h-7 text-[#0f9b74]" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Project linked</h2>
                <p className="text-slate-400 text-sm mb-7">
                  <span className="text-white font-semibold">{success}</span> has been added to your dashboard.
                </p>
                <button
                  onClick={handleDone}
                  className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: AURORA, boxShadow: '0 10px 28px rgba(15,155,116,0.2)' }}
                >
                  Go to dashboard
                </button>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h2 id="project-code-title" className="text-2xl font-bold text-white">Enter your project code</h2>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    Enter the project code provided by your Parallax contact below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={code}
                    onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
                    placeholder="6 digit code"
                    autoFocus
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400/60 focus:bg-white/[0.06]"
                  />

                  {error && (
                    <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !code.trim()}
                    className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: AURORA, boxShadow: '0 10px 28px rgba(15,155,116,0.2)' }}
                  >
                    {loading ? 'Verifying…' : 'Add project'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
