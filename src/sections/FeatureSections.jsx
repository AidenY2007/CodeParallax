import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Layout } from 'lucide-react'

function AuthVisual() {
  return (
    <div className="bg-[#0c1426] border border-white/8 rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm mx-auto">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-mono">auth.parallax.io</span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Secure
        </span>
      </div>
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <div className="bg-white/4 border border-white/6 rounded-lg px-4 py-2.5 text-sm text-slate-400 font-mono">
            user@company.com
          </div>
          <div className="bg-white/4 border border-white/6 rounded-lg px-4 py-2.5 text-sm text-slate-600 font-mono tracking-widest">
            ••••••••••••
          </div>
        </div>
        <div className="rounded-lg px-4 py-2.5 text-sm text-white font-semibold text-center"
          style={{ background: 'linear-gradient(135deg, #0f9b74, #06b6d4, #8b5cf6)' }}>
          Continue →
        </div>
        <div className="border-t border-white/5 pt-3">
          <p className="text-xs text-slate-600 mb-2">Access roles</p>
          <div className="flex gap-2">
            {['admin', 'editor', 'viewer'].map((role, i) => (
              <span
                key={role}
                className="px-2.5 py-1 rounded-lg text-xs font-mono"
                style={{
                  background: ['rgba(15,155,116,0.15)', 'rgba(139,92,246,0.15)', 'rgba(100,116,139,0.15)'][i],
                  color: ['#0f9b74', '#a78bfa', '#64748b'][i],
                  border: `1px solid ${['rgba(15,155,116,0.25)', 'rgba(139,92,246,0.25)', 'rgba(100,116,139,0.25)'][i]}`,
                }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentsVisual() {
  const invoices = [
    { num: '#1094', amount: '$2,400', status: 'paid', date: 'Nov 12', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    { num: '#1095', amount: '$1,800', status: 'due', date: 'Dec 01', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    { num: '#1096', amount: '$3,600', status: 'draft', date: 'Dec 15', color: '#64748b', bg: 'rgba(100,116,139,0.12)' },
  ]
  return (
    <div className="space-y-3 w-full max-w-sm mx-auto">
      <div className="bg-[#0c1426] border border-white/8 rounded-xl p-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">Total billed</span>
        <span className="text-lg font-bold text-white font-mono">$7,800</span>
      </div>
      {invoices.map((inv) => (
        <div
          key={inv.num}
          className="flex items-center justify-between px-4 py-3.5 bg-[#0c1426] border border-white/6 rounded-xl"
        >
          <div>
            <div className="text-sm font-semibold text-white font-mono">{inv.num}</div>
            <div className="text-xs text-slate-600 mt-0.5">{inv.date}</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white">{inv.amount}</span>
            <span
              className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
              style={{ color: inv.color, background: inv.bg }}
            >
              {inv.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function AIVisual() {
  return (
    <div className="bg-[#0c1426] border border-white/8 rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm mx-auto">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
        <span className="text-xs text-slate-400 font-semibold">Parallax AI Assistant</span>
        <span className="ml-auto text-xs text-slate-600 font-mono">gpt-4-turbo</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-end">
          <div className="rounded-xl rounded-tr-sm px-3.5 py-2.5 text-xs max-w-[80%]" style={{ background: 'rgba(15,155,116,0.15)', border: '1px solid rgba(15,155,116,0.2)', color: '#6ee7b7' }}>
            Summarize Q3 performance data
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[9px] text-violet-400 font-bold">AI</span>
          </div>
          <div className="bg-white/4 border border-white/6 rounded-xl rounded-tl-sm px-3.5 py-2.5 text-xs text-slate-300 max-w-[85%] leading-relaxed">
            Q3 revenue grew 24% YoY to $2.4M. Conversion rate up 12%. Top channel: organic search at 38%.
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[9px] text-violet-400 font-bold">AI</span>
          </div>
          <div className="bg-white/4 border border-white/6 rounded-xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 h-3 bg-violet-500/60 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500">Generating…</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AutomationVisual() {
  const nodes = [
    { label: 'New sign-up', color: '#0f9b74', x: 0 },
    { label: 'Send email', color: '#8b5cf6', x: 1 },
    { label: 'Wait 2 days', color: '#06b6d4', x: 2 },
    { label: 'Qualify lead', color: '#10b981', x: 3 },
  ]
  return (
    <div className="bg-[#0c1426] border border-white/8 rounded-2xl p-5 w-full max-w-sm mx-auto">
      <p className="text-xs text-slate-600 mb-4 font-mono">Onboarding workflow</p>
      <div className="space-y-2">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: `${node.color}20`, color: node.color, border: `1px solid ${node.color}30` }}
            >
              {i + 1}
            </div>
            <div className="flex-1 h-9 bg-white/4 border border-white/5 rounded-lg flex items-center px-3">
              <span className="text-xs text-slate-400">{node.label}</span>
              {i < nodes.length - 1 && (
                <span
                  className="ml-auto text-[10px] px-1.5 py-0.5 rounded font-mono"
                  style={{ color: node.color, background: `${node.color}15` }}
                >
                  trigger →
                </span>
              )}
              {i === nodes.length - 1 && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded font-mono text-emerald-400 bg-emerald-400/10">
                  complete ✓
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-600 border-t border-white/5 pt-3">
        <span className="font-mono">24 runs today</span>
        <span className="text-emerald-400 font-mono">100% success</span>
      </div>
    </div>
  )
}

function DatabaseVisual() {
  return (
    <div className="space-y-3 w-full max-w-sm mx-auto">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Active users', value: '2,847', delta: '+12%', color: '#0f9b74' },
          { label: 'Revenue MRR', value: '$18.4K', delta: '+8%', color: '#10b981' },
          { label: 'Requests/min', value: '1,204', delta: '+3%', color: '#8b5cf6' },
          { label: 'Uptime', value: '99.99%', delta: '30 days', color: '#06b6d4' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#0c1426] border border-white/6 rounded-xl p-3.5">
            <div className="text-[11px] text-slate-600 mb-1">{kpi.label}</div>
            <div className="text-base font-bold text-white">{kpi.value}</div>
            <div className="text-[11px] mt-0.5" style={{ color: kpi.color }}>{kpi.delta}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#0c1426] border border-white/6 rounded-xl p-3.5">
        <div className="flex items-end justify-between h-12 gap-1.5">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: `linear-gradient(to top, #0f9b74, #8b5cf6)`,
                opacity: 0.6 + i * 0.04,
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-700 font-mono">
          <span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </div>
    </div>
  )
}

function APIVisual() {
  return (
    <div className="bg-[#0c1426] border border-white/8 rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm mx-auto">
      <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
          POST
        </span>
        <span className="text-xs text-slate-400 font-mono">/api/v2/process</span>
      </div>
      <div className="p-4 font-mono text-xs space-y-0.5">
        <div className="text-slate-600">{'{'}</div>
        <div className="pl-4"><span className="text-teal-400">"event"</span><span className="text-slate-500">:</span> <span className="text-emerald-400">"payment.success"</span><span className="text-slate-500">,</span></div>
        <div className="pl-4"><span className="text-teal-400">"amount"</span><span className="text-slate-500">:</span> <span className="text-violet-400">2400</span><span className="text-slate-500">,</span></div>
        <div className="pl-4"><span className="text-teal-400">"currency"</span><span className="text-slate-500">:</span> <span className="text-emerald-400">"usd"</span></div>
        <div className="text-slate-600">{'}'}</div>
      </div>
      <div className="px-4 pb-4 pt-1 border-t border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">200</span>
          <span className="text-xs text-slate-500">Response · 42ms</span>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          <span className="text-teal-400">"status"</span>: <span className="text-emerald-400">"processed"</span>
        </div>
      </div>
      <div className="px-4 pb-4 flex gap-2 flex-wrap">
        {['Stripe', 'Twilio', 'Firebase', 'OpenAI'].map((svc) => (
          <span key={svc} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/8 text-slate-400">
            {svc}
          </span>
        ))}
      </div>
    </div>
  )
}

function CommunicationVisual() {
  const sequence = [
    { step: 1, name: 'Welcome email',     status: 'sent',    delay: 'Immediately', color: '#10b981' },
    { step: 2, name: 'Feature highlight', status: 'sent',    delay: 'Day 3',       color: '#10b981' },
    { step: 3, name: 'Case study',        status: 'pending', delay: 'Day 7',       color: '#f59e0b' },
    { step: 4, name: 'Offer',             status: 'draft',   delay: 'Day 14',      color: '#64748b' },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
      {/* Email sequence */}
      <div className="bg-[#0c1426] border border-white/8 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-400 font-semibold">Onboarding sequence</p>
          <span className="text-xs text-[#06b6d4] font-mono">4 emails</span>
        </div>
        <div className="space-y-2">
          {sequence.map((email) => (
            <div key={email.step} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/3 border border-white/5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: `${email.color}20`, color: email.color }}
              >
                {email.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-300 truncate">{email.name}</div>
                <div className="text-[10px] text-slate-600">{email.delay}</div>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ color: email.color, background: `${email.color}18` }}
              >
                {email.status}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/5 flex justify-between text-xs text-slate-600">
          <span>847 enrolled</span>
          <span className="text-[#0f9b74]">42% open rate</span>
        </div>
      </div>
      {/* SMS */}
      <div className="bg-[#0c1426] border border-white/8 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-[#0f9b74]/20 border border-[#0f9b74]/30 flex items-center justify-center">
            <span className="text-[10px] text-[#0f9b74] font-bold">P</span>
          </div>
          <div>
            <div className="text-xs text-white font-semibold">Parallax SMS</div>
            <div className="text-[10px] text-slate-600">Notifications</div>
          </div>
        </div>
        <div className="space-y-2.5">
          {[
            { text: 'Invoice #1094 is ready. Pay here: pay.parallax.io/1094', time: '9:41 AM', out: false },
            { text: 'Payment confirmed. $2,400 received. Thanks!',           time: '2:15 PM', out: false },
            { text: 'New project milestone reached. View update →',          time: '4:30 PM', out: true  },
          ].map((msg, i) => (
            <div
              key={i}
              className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed max-w-[90%] ${
                msg.out
                  ? 'ml-auto rounded-br-sm'
                  : 'rounded-bl-sm'
              }`}
              style={msg.out
                ? { background: 'rgba(15,155,116,0.15)', border: '1px solid rgba(15,155,116,0.20)', color: '#6ee7b7' }
                : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', color: '#94a3b8' }
              }
            >
              {msg.text}
              <div className="text-[10px] text-slate-600 mt-1">{msg.time}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/5 text-xs text-[#06b6d4]">
          98% delivery rate
        </div>
      </div>
    </div>
  )
}

function UIVisual() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <div className="bg-[#0c1426] border border-white/8 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400 font-semibold">Component Library</p>
          <span className="text-xs text-[#8b5cf6] font-mono">v2.4.0</span>
        </div>
        {/* Buttons */}
        <div className="flex gap-2">
          <div className="flex-1 h-9 rounded-xl text-xs font-bold text-white flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0f9b74, #06b6d4, #8b5cf6)' }}>
            Primary
          </div>
          <div className="flex-1 h-9 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center bg-white/5 border border-white/10">
            Secondary
          </div>
          <div className="flex-1 h-9 rounded-xl text-xs font-semibold flex items-center justify-center border"
            style={{ color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.35)', background: 'rgba(139,92,246,0.08)' }}>
            Ghost
          </div>
        </div>
        {/* Input */}
        <div className="h-9 bg-white/4 border border-white/8 rounded-xl px-3 flex items-center gap-2">
          <span className="text-xs text-slate-500">Search components...</span>
          <div className="ml-auto w-px h-4 bg-[#0f9b74] animate-blink" />
        </div>
        {/* Color palette */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 mr-1">Palette</span>
          {['#0f9b74','#06b6d4','#8b5cf6','#34d399','#a78bfa'].map(c => (
            <div key={c} className="w-6 h-6 rounded-lg border border-white/10 shadow-lg"
              style={{ background: c }} />
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Components', value: '48+',    color: '#8b5cf6' },
          { label: 'Screens',    value: '120+',   color: '#06b6d4' },
          { label: 'Tokens',     value: '200+',   color: '#0f9b74' },
        ].map(s => (
          <div key={s.label} className="bg-[#0c1426] border border-white/6 rounded-xl p-3 text-center">
            <div className="text-xs font-bold text-white">{s.value}</div>
            <div className="text-[10px] text-slate-600 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsVisual() {
  const points = [30, 45, 38, 60, 52, 75, 65, 82, 70, 90, 78, 95]
  const max = 95
  const svgH = 80
  const svgW = 280

  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * svgW
      const y = svgH - (p / max) * svgH
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const areaD = `${pathD} L ${svgW} ${svgH} L 0 ${svgH} Z`

  return (
    <div className="space-y-3 w-full max-w-sm mx-auto">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Visitors', value: '12.4K', delta: '+18%', color: '#0f9b74' },
          { label: 'Conversion', value: '3.8%', delta: '+0.4%', color: '#10b981' },
          { label: 'Bounce', value: '34%', delta: '-5%', color: '#8b5cf6' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0c1426] border border-white/6 rounded-xl p-3">
            <div className="text-[10px] text-slate-600 mb-1">{stat.label}</div>
            <div className="text-sm font-bold text-white">{stat.value}</div>
            <div className="text-[10px] mt-0.5" style={{ color: stat.color }}>{stat.delta}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#0c1426] border border-white/6 rounded-xl p-4">
        <div className="flex justify-between mb-3">
          <span className="text-xs text-slate-500">Traffic (30 days)</span>
          <span className="text-xs text-teal-400 font-mono">+18%</span>
        </div>
        <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none" className="h-16">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f9b74" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0f9b74" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#areaGrad)" />
          <path d={pathD} fill="none" stroke="#0f9b74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    id: 'auth',
    tag: 'Authentication',
    headline: 'Secure account systems built for real products and real teams.',
    description:
      'Identity, access control, and session management — engineered to production standards with role-based permissions, multi-factor authentication, and social login.',
    href: '/features/authentication',
    color: '#0f9b74',
    Visual: AuthVisual,
  },
  {
    id: 'payments',
    tag: 'Payments & Fintech',
    headline: 'Billing, subscriptions, and payment infrastructure that supports revenue.',
    description:
      'Stripe-powered checkout, subscription management, invoice generation, and payment lifecycle tracking — built to handle real money movement.',
    href: '/features/payments',
    color: '#10b981',
    Visual: PaymentsVisual,
  },
  {
    id: 'ai',
    tag: 'AI Integration',
    headline: 'AI-powered assistants, copilots, and intelligent workflows.',
    description:
      'Embed GPT-4 and other models into your product — conversational interfaces, intelligent routing, document analysis, and automated decision systems.',
    href: '/features/ai',
    color: '#8b5cf6',
    Visual: AIVisual,
  },
  {
    id: 'automation',
    tag: 'Automation Workflows',
    headline: 'Trigger-based systems that replace manual work.',
    description:
      'Event-driven workflows with conditional branching, multi-step actions, and real-time execution — operations that run while your team focuses on what matters.',
    href: '/features/automation',
    color: '#06b6d4',
    Visual: AutomationVisual,
  },
  {
    id: 'databases',
    tag: 'Databases & Dashboards',
    headline: 'Operational systems with visibility, structure, and control.',
    description:
      'Scalable databases with admin panels, KPI dashboards, and real-time data feeds — giving your team the clarity they need to operate at speed.',
    href: '/features/databases-dashboards',
    color: '#0f9b74',
    Visual: DatabaseVisual,
  },
  {
    id: 'api',
    tag: 'API Integrations',
    headline: 'Connect your business to every tool and service it depends on.',
    description:
      'Clean API layers that bridge your systems with third-party services — Stripe, Twilio, OpenAI, Firebase, and beyond — with typed contracts and error handling.',
    href: '/features/api-integrations',
    color: '#8b5cf6',
    Visual: APIVisual,
  },
  {
    id: 'communication',
    tag: 'Communication',
    headline: 'Email and SMS systems built for the full customer lifecycle.',
    description:
      'Transactional emails, drip sequences, SMS alerts, and two-way messaging — all integrated with your business logic and built on Resend, SendGrid, and Twilio.',
    href: '/features/communication',
    color: '#06b6d4',
    Visual: CommunicationVisual,
  },
  {
    id: 'ui',
    tag: 'UI / Design',
    headline: 'Custom interfaces that make your product impossible to forget.',
    description:
      'Pixel-perfect design systems, component libraries, and user interfaces built to reflect your brand — from landing pages to complex dashboards.',
    href: '/features/ui-design',
    color: '#8b5cf6',
    Visual: UIVisual,
  },
  {
    id: 'analytics',
    tag: 'Website Analytics',
    headline: 'Clarity into performance, user behavior, and conversion.',
    description:
      'Real-time traffic dashboards, funnel analysis, custom event tracking, and conversion reporting — data that actually informs decisions.',
    href: '/features/analytics',
    color: '#f59e0b',
    Visual: AnalyticsVisual,
  },
]

function FeatureBlock({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            isEven ? '' : 'lg:grid-flow-dense'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={isEven ? '' : 'lg:col-start-2'}
          >
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: feature.color }}
            >
              {feature.tag}
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {feature.headline}
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">{feature.description}</p>
            <Link
              to={feature.href}
              className="group inline-flex items-center gap-2 mt-6 text-sm font-semibold transition-colors duration-200"
              style={{ color: feature.color }}
            >
              Explore {feature.tag}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`relative ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
          >
            <div
              className="absolute inset-0 -z-10 rounded-3xl blur-3xl opacity-15"
              style={{ background: `radial-gradient(ellipse, ${feature.color}, transparent 70%)` }}
            />
            <feature.Visual />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function FeatureSections() {
  return (
    <section id="features">
      {FEATURES.map((feature, i) => (
        <FeatureBlock key={feature.id} feature={feature} index={i} />
      ))}
    </section>
  )
}
