import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Send, CheckCircle } from 'lucide-react'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.subject.trim()) e.subject = 'Required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'contactMessages'), {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        read: false,
        createdAt: serverTimestamp(),
      })
      setForm(EMPTY)
      setErrors({})
      setSent(true)
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  function set(field) {
    return e => {
      setForm(f => ({ ...f, [field]: e.target.value }))
      setErrors(err => { const n = { ...err }; delete n[field]; return n })
    }
  }

  const inputBase =
    'w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-colors'

  return (
    <div className="min-h-screen bg-[#080d18] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">Get in touch</h1>
          <p className="text-sm text-slate-500">
            Email{' '}
            <a
              href="mailto:aiden@placeholder.com"
              className="font-semibold bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              style={{ backgroundImage: 'linear-gradient(135deg, #0f9b74, #06b6d4)' }}
            >
              aiden@placeholder.com
            </a>
            {' '}or reach us using the form below.
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <CheckCircle className="w-10 h-10 text-[#0f9b74]" />
            <p className="text-white font-semibold text-base">Message sent</p>
            <p className="text-slate-500 text-sm">Thanks for reaching out. We'll be in touch shortly.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-xs text-slate-500 hover:text-white transition-colors underline underline-offset-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name + Email row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Name</label>
                <input
                  value={form.name}
                  onChange={set('name')}
                  placeholder="John Smith"
                  className={`${inputBase} ${errors.name ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.06] focus:border-white/20'}`}
                />
                {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@company.com"
                  className={`${inputBase} ${errors.email ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.06] focus:border-white/20'}`}
                />
                {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Subject</label>
              <input
                value={form.subject}
                onChange={set('subject')}
                placeholder="What's this about?"
                className={`${inputBase} ${errors.subject ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.06] focus:border-white/20'}`}
              />
              {errors.subject && <p className="text-[11px] text-red-400">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Message</label>
              <textarea
                value={form.message}
                onChange={set('message')}
                placeholder="Tell us about your project or inquiry…"
                rows={6}
                className={`${inputBase} resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.06] focus:border-white/20'}`}
              />
              {errors.message && <p className="text-[11px] text-red-400">{errors.message}</p>}
            </div>

            {errors.submit && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0f9b74, #06b6d4)' }}
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
