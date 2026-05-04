import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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

function HostingVisual() {
  const records = [
    { type: 'A',     name: '@',          value: '76.76.21.21',               ttl: '300' },
    { type: 'CNAME', name: 'www',        value: 'cname.vercel-dns.com',       ttl: '300' },
    { type: 'MX',    name: '@',          value: 'mail.parallax.io',           ttl: '3600' },
    { type: 'TXT',   name: '@',          value: 'v=spf1 include:sendgrid...',  ttl: '300' },
  ]
  const typeColors = { A: '#0f9b74', CNAME: '#8b5cf6', MX: '#3b82f6', TXT: '#f59e0b' }

  return (
    <div className="space-y-3 w-full max-w-sm mx-auto">
      {/* DNS Records */}
      <div className="bg-[#0c1426] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-semibold">DNS Records</span>
          <span className="text-[10px] text-[#0f9b74] font-mono">parallax.io</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {records.map((r) => (
            <div key={r.name + r.type} className="grid grid-cols-[40px_56px_1fr_36px] gap-2 px-4 py-2.5 items-center">
              <span
                className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded text-center"
                style={{ color: typeColors[r.type], background: `${typeColors[r.type]}18` }}
              >
                {r.type}
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate">{r.name}</span>
              <span className="text-[10px] text-slate-600 font-mono truncate">{r.value}</span>
              <span className="text-[10px] text-slate-700 font-mono text-right">{r.ttl}s</span>
            </div>
          ))}
        </div>
      </div>

      {/* SSL Certificate */}
      <div className="bg-[#0c1426] border border-white/8 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400 font-semibold">SSL Certificate</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0f9b74]/10 text-[#0f9b74] border border-[#0f9b74]/20 font-mono">Active</span>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Issuer',   value: "Let's Encrypt" },
            { label: 'Domain',   value: '*.parallax.io' },
            { label: 'Expires',  value: 'Mar 14, 2026' },
            { label: 'Protocol', value: 'TLS 1.3' },
          ].map((row) => (
            <div key={row.label} className="flex justify-between text-[11px]">
              <span className="text-slate-600">{row.label}</span>
              <span className="text-slate-300 font-mono">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0f9b74] animate-pulse" />
          <span className="text-[11px] text-[#0f9b74] font-mono">Auto-renews in 72 days</span>
        </div>
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
    id: 'databases',
    tag: 'Databases & Dashboards',
    headline: 'Operational systems with visibility, structure, and control.',
    description:
      'Designed to store, manage, and retrieve data efficiently, transforming it into meaningful insights for your business.',
    href: '/features/databases-dashboards',
    color: '#0f9b74',
    Visual: DatabaseVisual,
  },
  {
    id: 'ai',
    tag: 'AI Integration',
    headline: 'AI-powered assistants, copilots, and intelligent workflows.',
    description:
      'Integrate AI into your product to deliver conversational experiences, analyze data, and enable intelligent decision-making.',
    href: '/features/ai',
    color: '#8b5cf6',
    Visual: AIVisual,
  },
  {
    id: 'analytics',
    tag: 'Website Analytics',
    headline: 'Insight into performance, user behavior, and conversion.',
    description:
      'Real-time dashboards, funnel analysis, and event tracking designed to deliver precise, decision-ready data.',
    href: '/features/analytics',
    color: '#facc15',
    Visual: AnalyticsVisual,
  },
  {
    id: 'payments',
    tag: 'Payments & Fintech',
    headline: 'Payments and billing infrastructure to maximize revenue growth.',
    description:
      'Stripe-powered checkout, subscription management, invoice generation, and payment lifecycle tracking.',
    href: '/features/payments',
    color: '#94a3b8',
    Visual: PaymentsVisual,
  },
  {
    id: 'automation',
    tag: 'Automation Workflows',
    headline: 'Event driven automation to replace manual work.',
    description:
      'Designed to keep operations running seamlessly in the background, freeing your team to focus on what matters most.',
    href: '/features/automation',
    color: '#67e8f9',
    Visual: AutomationVisual,
  },
  {
    id: 'auth',
    tag: 'Authentication',
    headline: 'Production-grade account infrastructure for applications and teams',
    description:
      'Security is embedded into every layer of your product, ensuring access is controlled, identities are verified, and data remains protected at all times.',
    href: '/features/authentication',
    color: '#ef4444',
    Visual: AuthVisual,
  },
  {
    id: 'ui',
    tag: 'UI / Design',
    headline: 'Custom interfaces that make your product stand out across every touchpoint.',
    description:
      'Pixel-perfect design systems, component libraries, and user interfaces designed to reflect your brand across simple dashboards and advanced applications.',
    href: '/features/ui-design',
    color: '#f472b6',
    Visual: UIVisual,
  },
  {
    id: 'communication',
    tag: 'Communication',
    headline: 'Email and SMS designed to support every stage of the customer lifecycle.',
    description:
      'Transactional emails, drip sequences, SMS alerts, all seamlessly integrated with your business logic.',
    href: '/features/communication',
    color: '#3b82f6',
    Visual: CommunicationVisual,
  },
  {
    id: 'hosting',
    tag: 'Hosting & Deployment',
    headline: 'Deploy with confidence. Stay live without uninterrupted.',
    description:
      'Built to handle real-world demand with consistent performance and stability at scale.',
    href: '/features/hosting',
    color: '#f97316',
    Visual: HostingVisual,
  },
]

const MotionDiv = motion.div

function FeatureBlock({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            isEven ? '' : 'lg:grid-flow-dense'
          }`}
        >
          <MotionDiv
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
          </MotionDiv>

          <MotionDiv
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
          </MotionDiv>
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
