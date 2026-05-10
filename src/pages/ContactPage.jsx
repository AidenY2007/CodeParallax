import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import {
  Send, CheckCircle, ArrowRight, Mail, Phone,
  Database, Cpu, TrendingUp, CreditCard, GitBranch,
  Shield, Paintbrush, MessageCircle, Server, Plus, Bug, Megaphone,
} from 'lucide-react'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

const FEATURES = [
  { id: 'databases',    label: 'Databases & Dashboards',  icon: Database,       color: '#0f9b74' },
  { id: 'ai',           label: 'AI Integration',           icon: Cpu,            color: '#8b5cf6' },
  { id: 'analytics',    label: 'Website Analytics',        icon: TrendingUp,     color: '#facc15' },
  { id: 'payments',     label: 'Payments & Fintech',       icon: CreditCard,     color: '#94a3b8' },
  { id: 'automation',   label: 'Automation Workflows',     icon: GitBranch,      color: '#67e8f9' },
  { id: 'auth',         label: 'Authentication',           icon: Shield,         color: '#ef4444' },
  { id: 'ui',           label: 'UI / Design',              icon: Paintbrush,     color: '#f472b6' },
  { id: 'communication',label: 'Communication',            icon: MessageCircle,  color: '#3b82f6' },
  { id: 'hosting',      label: 'Hosting & Deployment',     icon: Server,         color: '#f97316' },
  { id: 'debugging',   label: 'Debugging',                icon: Bug,            color: '#fb7185' },
  { id: 'marketing',   label: 'Marketing',                icon: Megaphone,      color: '#a3e635' },
  { id: 'other',       label: 'Other',                    icon: Plus,           color: '#64748b' },
]

const EMPTY = { name: '', email: '', message: '', features: [] }

const ease = [0.21, 0.47, 0.32, 0.98]

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-slate-500 tracking-widest uppercase">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (err) =>
  `w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-colors focus:bg-white/[0.05] ${err ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.07] focus:border-white/20'}`

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  function setField(field) {
    return (v) => {
      setForm(f => ({ ...f, [field]: typeof v === 'string' ? v : v.target.value }))
      setErrors(err => { const n = { ...err }; delete n[field]; return n })
    }
  }

  function toggleFeature(id) {
    setForm(f => ({
      ...f,
      features: f.features.includes(id)
        ? f.features.filter(x => x !== id)
        : [...f.features, id],
    }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
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
        message: form.message.trim(),
        features: form.features,
        read: false,
        createdAt: serverTimestamp(),
      })
      setForm(EMPTY)
      setErrors({})
      setSent(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080d18] relative overflow-hidden flex items-center justify-center px-4 py-28">


      <div ref={ref} className="relative w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {sent ? (
            <SuccessState key="success" onReset={() => setSent(false)} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-[1fr_1.4fr] gap-6"
            >
              {/* Left panel — info */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease }}
                className="relative rounded-3xl overflow-hidden p-8 flex flex-col justify-between gap-10"
                style={{
                  background: 'linear-gradient(#0c1426, #0c1426) padding-box, linear-gradient(135deg, #0f9b74, #06b6d4, #8b5cf6) border-box',
                  border: '1px solid transparent',
                }}
              >
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,155,116,0.08) 0%, rgba(6,182,212,0.06) 50%, rgba(139,92,246,0.05) 100%)' }} />
                <div className="absolute top-0 left-1/4 right-1/4 h-px opacity-60" style={{ background: AURORA }} />
                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[90px] opacity-20 pointer-events-none" style={{ background: AURORA }} />

                <div className="relative">
                  <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15, ease }}
                    className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4"
                  >
                    Let's build{' '}
                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: AURORA }}>
                      something<br />remarkable.
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease }}
                    className="text-slate-400 text-sm leading-relaxed max-w-xs mb-4"
                  >
                    Tell us about your project and we'll respond within 24 hours with a plan to move forward.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.22, ease }}
                  >
                    <ContactLink icon={Mail} label="Email" value="codeparallaxservices@gmail.com" href="mailto:codeparallaxservices@gmail.com" />
                    <div className="mt-3">
                      <ContactLink icon={Phone} label="Phone" value="(213) 973-2714" href="tel:+12139732714" />
                    </div>
                  </motion.div>
                </div>

              </motion.div>

              {/* Right panel — form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05, ease }}
                className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-8"
              >
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Name" error={errors.name}>
                      <input value={form.name} onChange={setField('name')} placeholder="First and last" className={inputCls(errors.name)} />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input type="email" value={form.email} onChange={setField('email')} placeholder="you@company.com" className={inputCls(errors.email)} />
                    </Field>
                  </div>

                  {/* Services — multi-select */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] font-semibold text-slate-500 tracking-widest uppercase">
                      Services of interest
                      <span className="ml-1.5 normal-case tracking-normal font-normal text-slate-600">(select multiple if necessary)</span>
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {FEATURES.map(({ id, label, icon: Icon, color }) => {
                        const active = form.features.includes(id)
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => toggleFeature(id)}
                            className="relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-xs font-medium transition-all duration-200"
                            style={active ? {
                              background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.12))',
                              borderColor: 'rgba(6,182,212,0.55)',
                              color: '#7dd3fc',
                            } : {
                              background: 'rgba(255,255,255,0.02)',
                              borderColor: 'rgba(255,255,255,0.07)',
                              color: '#64748b',
                            }}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-center leading-tight">{label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <Field label="Tell us about your project" error={errors.message}>
                    <textarea
                      value={form.message}
                      onChange={setField('message')}
                      placeholder="Describe your vision, goals, budget, and any constraints…"
                      rows={5}
                      className={`${inputCls(errors.message)} resize-none overflow-hidden`}
                    />
                  </Field>

                  {errors.submit && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2"
                    >
                      {errors.submit}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    style={{ background: AURORA, boxShadow: '0 4px 28px rgba(15,155,116,0.25)' }}
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <Send className="w-4 h-4" />
                    {submitting ? 'Sending…' : 'Send message'}
                    <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ContactLink({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-center gap-3 group">
      <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:border-white/20 transition-colors">
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div>
        <p className="text-[11px] text-slate-600 font-semibold tracking-wide uppercase">{label}</p>
        <p className="text-sm font-medium text-slate-300">{value}</p>
      </div>
    </div>
  )
  if (href) return <a href={href} className="hover:opacity-80 transition-opacity">{inner}</a>
  return <div>{inner}</div>
}

function SuccessState({ onReset }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col items-center justify-center py-32 text-center gap-6 max-w-md mx-auto"
    >
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="absolute inset-0 rounded-full" style={{ background: AURORA, animation: 'ping 1s cubic-bezier(0,0,0.2,1) 1 forwards', opacity: 0 }} />
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(15,155,116,0.15), rgba(6,182,212,0.10))', border: '1px solid rgba(15,155,116,0.4)' }}
        >
          <CheckCircle className="w-9 h-9 text-[#0f9b74]" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Message received</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
          Thanks for reaching out. We'll review your project and get back to you within 24 hours.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          style={{ background: AURORA, boxShadow: '0 4px 20px rgba(15,155,116,0.2)' }}
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to home
        </Link>
        <button
          onClick={onReset}
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    </motion.div>
  )
}
