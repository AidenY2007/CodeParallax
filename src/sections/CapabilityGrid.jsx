import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Lock, CreditCard, Sparkles, GitBranch, Database,
  Plug, Mail, MessageSquare, BarChart2, ArrowUpRight,
} from 'lucide-react'

const CAPS = [
  {
    Icon: Lock,
    title: 'Authentication',
    description: 'Secure identity, roles, and session management for real products.',
    href: '/features/authentication',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
  },
  {
    Icon: CreditCard,
    title: 'Payments & Fintech',
    description: 'Billing, subscriptions, and payment infrastructure that supports revenue.',
    href: '/features/payments',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    Icon: Sparkles,
    title: 'AI Integration',
    description: 'AI-powered assistants, copilots, and intelligent workflows.',
    href: '/features/ai',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.25)',
  },
  {
    Icon: GitBranch,
    title: 'Automation Workflows',
    description: 'Trigger-based systems that replace manual, repetitive work.',
    href: '/features/automation',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.25)',
  },
  {
    Icon: Database,
    title: 'Databases & Dashboards',
    description: 'Operational systems with visibility, structure, and control.',
    href: '/features/databases-dashboards',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
  },
  {
    Icon: Plug,
    title: 'API Integrations',
    description: 'Connect your business to every tool and service it depends on.',
    href: '/features/api-integrations',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.25)',
  },
  {
    Icon: Mail,
    title: 'Email Systems',
    description: 'Lifecycle email for onboarding, nurture, and conversion.',
    href: '/features/email',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.25)',
  },
  {
    Icon: MessageSquare,
    title: 'SMS Systems',
    description: 'Programmatic SMS for engagement, alerts, and automation.',
    href: '/features/sms',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    Icon: BarChart2,
    title: 'Website Analytics',
    description: 'Clarity into performance, user behavior, and conversion.',
    href: '/features/analytics',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
  },
]

function CapCard({ cap, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link
        to={cap.href}
        className="group relative flex flex-col h-full p-6 bg-[#0e0e1c] border border-white/6 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        style={{ '--cap-color': cap.color, '--cap-glow': cap.glow, '--cap-border': cap.border }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${cap.border}`, background: `radial-gradient(ellipse at top left, ${cap.glow}, transparent 60%)` }}
        />

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${cap.color}18`, color: cap.color }}
        >
          <cap.Icon className="w-5 h-5" />
        </div>

        <h3 className="text-sm font-semibold text-white mb-1.5 pr-6">{cap.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">{cap.description}</p>

        <div className="flex items-center gap-1 mt-4 text-xs text-slate-600 group-hover:text-slate-300 transition-colors duration-200">
          Learn more
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </Link>
    </motion.div>
  )
}

export default function CapabilityGrid() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="capabilities" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-blue-400 tracking-[0.2em] uppercase">Capabilities</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Nine systems. One platform.
          </h2>
          <p className="mt-4 text-slate-400 max-w-md mx-auto leading-relaxed">
            Everything a modern business needs to operate beyond templates and no-code limitations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPS.map((cap, i) => (
            <CapCard key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
