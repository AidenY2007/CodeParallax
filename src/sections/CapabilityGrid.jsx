import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Lock, CreditCard, Sparkles, GitBranch, Database,
  MessageSquare, BarChart2, Layout, ArrowUpRight, Server,
} from 'lucide-react'

const CAPS = [
  {
    Icon: Database,
    title: 'Databases & Dashboards',
    description: 'Operational systems with visibility, structure, and control.',
    target: 'feature-databases',
    color: '#0f9b74',
    glow: 'rgba(15,155,116,0.12)',
    border: 'rgba(15,155,116,0.25)',
  },
  {
    Icon: Sparkles,
    title: 'AI Integration',
    description: 'AI-powered assistants, copilots, and intelligent workflows.',
    target: 'feature-ai',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.25)',
  },
  {
    Icon: BarChart2,
    title: 'Website Analytics',
    description: 'Insight into performance, user behavior, and conversion.',
    target: 'feature-analytics',
    color: '#facc15',
    glow: 'rgba(250,204,21,0.12)',
    border: 'rgba(250,204,21,0.25)',
  },
  {
    Icon: CreditCard,
    title: 'Payments & Fintech',
    description: 'Billing, subscriptions, and payment infrastructure that supports revenue.',
    target: 'feature-payments',
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.12)',
    border: 'rgba(148,163,184,0.25)',
  },
  {
    Icon: GitBranch,
    title: 'Automation Workflows',
    description: 'Trigger-based systems that replace manual, repetitive work.',
    target: 'feature-automation',
    color: '#67e8f9',
    glow: 'rgba(103,232,249,0.12)',
    border: 'rgba(103,232,249,0.25)',
  },
  {
    Icon: Lock,
    title: 'Authentication',
    description: 'Secure identity, roles, and session management for real products.',
    target: 'feature-auth',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.25)',
  },
  {
    Icon: Layout,
    title: 'UI / Design',
    description: 'Custom interfaces and design systems built to your brand at every touchpoint.',
    target: 'feature-ui',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.12)',
    border: 'rgba(244,114,182,0.25)',
  },
  {
    Icon: MessageSquare,
    title: 'Communication',
    description: 'Email and SMS systems for lifecycle messaging, alerts, and conversion.',
    target: 'feature-communication',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
  },
  {
    Icon: Server,
    title: 'Hosting & Deployment',
    description: 'Domain, cloud infrastructure, CI/CD, and monitoring — ship and stay live.',
    target: 'feature-hosting',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.25)',
  },
]

const MotionDiv = motion.div

function CapCard({ cap, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  function scrollToFeature() {
    document.getElementById(cap.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${cap.target}`)
  }

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <button
        type="button"
        onClick={scrollToFeature}
        className="group relative flex w-full flex-col h-full p-6 text-left bg-[#0c1426] border border-white/6 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
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
      </button>
    </MotionDiv>
  )
}

export default function CapabilityGrid() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="capabilities" className="pt-14 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            One platform. Complete infrastructure.
          </h2>
          <p className="mt-2 text-slate-400 max-w-md mx-auto leading-relaxed">
            Everything a modern business needs to operate beyond templates and no-code limitations.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPS.map((cap, i) => (
            <CapCard key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
