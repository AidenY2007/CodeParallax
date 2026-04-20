import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import googleLogo from '../assets/google.svg.png'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

const WORDS = ['automation', 'artificial intelligence', 'security', 'analytics', 'interface design', 'data infrastructure']

// ─── Unique enter/exit transitions per widget ────────────────────────────────
const TX = {
  fromLeft:   { initial: { opacity: 0, x: -36, scale: 0.94 }, exit: { opacity: 0, x: 28, scale: 0.96 } },
  fromRight:  { initial: { opacity: 0, x: 36, scale: 0.94 },  exit: { opacity: 0, x: -28, scale: 0.96 } },
  fromTop:    { initial: { opacity: 0, y: -32, scale: 0.94 }, exit: { opacity: 0, y: 24, scale: 0.96 } },
  fromBottom: { initial: { opacity: 0, y: 32, scale: 0.94 },  exit: { opacity: 0, y: -24, scale: 0.96 } },
  blurScale:  { initial: { opacity: 0, scale: 0.85, filter: 'blur(10px)' }, exit: { opacity: 0, scale: 1.08, filter: 'blur(8px)' } },
  rotatePop:  { initial: { opacity: 0, scale: 0.82, rotate: -5 }, exit: { opacity: 0, scale: 0.88, rotate: 4 } },
  diag:       { initial: { opacity: 0, x: -22, y: -22, rotate: -3 }, exit: { opacity: 0, x: 18, y: 18, rotate: 2 } },
}
const ANIMATE_REST = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }
const TX_DUR = { duration: 0.34, ease: [0.21, 0.47, 0.32, 0.98] }

// ─── Widget wrapper ───────────────────────────────────────────────────────────
function WCard({ label, dot, children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden select-none pointer-events-none"
      style={{
        background: 'rgba(10,15,30,0.85)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
        width: 240,
      }}
    >
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.06]">
        <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-slate-400">{label}</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: dot }} />
        </div>
      </div>
      {children}
    </div>
  )
}

// ─── 10 Detailed Widgets ──────────────────────────────────────────────────────

function AuthWidget() {
  const users = [
    { email: 'sarah@oakivy.co',    provider: 'Google', ago: '2m',  active: true },
    { email: 'marcus@graze.co',    provider: 'Email',  ago: '18m', active: true },
    { email: 'priya@vero.io',      provider: 'GitHub', ago: '1h',  active: false },
  ]
  return (
    <WCard label="Authentication" dot="#0f9b74">
      <div>
        {users.map(u => (
          <div key={u.email} className="flex items-center gap-2.5 px-3.5 py-2 border-b border-white/[0.04] last:border-0">
            <div className="w-6 h-6 rounded-full bg-[#0f9b74]/15 flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-bold text-[#0f9b74]">{u.email[0].toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] text-slate-200 truncate">{u.email}</div>
              <div className="text-[7.5px] text-slate-600">{u.provider} · {u.ago} ago</div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: u.active ? '#0f9b74' : '#374151' }} />
          </div>
        ))}
        <div className="px-3.5 py-2 flex gap-1.5">
          {['admin', 'editor', 'viewer', 'MFA'].map(r => (
            <span key={r} className="text-[7px] px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-slate-500">{r}</span>
          ))}
        </div>
      </div>
    </WCard>
  )
}

function UIWidget() {
  return (
    <WCard label="UI System" dot="#8b5cf6">
      <div className="px-3.5 py-3 space-y-2.5">
        <div className="flex gap-2">
          <div className="flex-1 h-7 rounded-lg flex items-center justify-center text-[8px] font-bold text-white"
            style={{ background: AURORA }}>Primary</div>
          <div className="flex-1 h-7 rounded-lg flex items-center justify-center text-[8px] font-semibold text-slate-400 bg-white/5 border border-white/10">Ghost</div>
        </div>
        <div className="h-7 bg-white/4 border border-white/8 rounded-lg px-2.5 flex items-center gap-1.5">
          <span className="text-[8px] text-slate-600">Search components…</span>
          <div className="ml-auto w-px h-3 bg-[#8b5cf6] animate-blink" />
        </div>
        <div className="flex gap-1.5">
          {['#0f9b74','#06b6d4','#8b5cf6','#34d399','#0c1426'].map(c => (
            <div key={c} className="w-5 h-5 rounded-md border border-white/10" style={{ background: c }} />
          ))}
          <span className="text-[7px] text-slate-600 self-center ml-1">+195</span>
        </div>
        <div className="text-[7.5px] text-slate-600 font-mono">48 components · 200+ tokens</div>
      </div>
    </WCard>
  )
}

function EmailWidget() {
  const rows = [
    { name: 'Welcome series',  sent: '847',  open: '42%', color: '#0f9b74' },
    { name: 'Feature update',  sent: '1.2K', open: '38%', color: '#06b6d4' },
    { name: 'Re-engagement',   sent: '320',  open: '22%', color: '#8b5cf6' },
  ]
  return (
    <WCard label="Email System" dot="#06b6d4">
      <div>
        {rows.map(r => (
          <div key={r.name} className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-white/[0.04] last:border-0">
            <div className="flex-1 min-w-0">
              <div className="text-[9px] text-slate-200 truncate">{r.name}</div>
              <div className="text-[7.5px] text-slate-600">{r.sent} sent</div>
            </div>
            <span className="text-[8px] font-mono font-semibold" style={{ color: r.color }}>{r.open} open</span>
          </div>
        ))}
        <div className="px-3.5 py-2 flex items-center justify-between">
          <span className="text-[7.5px] text-slate-600">via Resend</span>
          <span className="text-[7.5px] text-[#0f9b74] font-mono">↑ 6% this week</span>
        </div>
      </div>
    </WCard>
  )
}

function PaymentsWidget() {
  const txns = [
    { label: 'Acme Corp — Pro',  amount: '+$299',   color: '#34d399', ago: 'just now' },
    { label: 'BuildCo — Ent.',   amount: '+$1,200', color: '#34d399', ago: '4m' },
    { label: 'Refund issued',    amount: '−$99',    color: '#f87171', ago: '12m' },
  ]
  return (
    <WCard label="Payments" dot="#34d399">
      <div className="px-3.5 pt-3 pb-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-slate-500">MRR</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/20">↑ 12%</span>
        </div>
        <div className="text-xl font-extrabold text-white mb-2">$18,400</div>
        <svg viewBox="0 0 200 32" className="w-full h-6 mb-2">
          <defs>
            <linearGradient id="mrr" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,30 L25,24 L50,26 L75,18 L100,20 L125,12 L150,7 L175,3 L200,1"
            fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0,30 L25,24 L50,26 L75,18 L100,20 L125,12 L150,7 L175,3 L200,1 L200,32 L0,32 Z"
            fill="url(#mrr)"/>
        </svg>
      </div>
      <div className="border-t border-white/[0.05]">
        {txns.map(t => (
          <div key={t.label} className="flex items-center gap-2 px-3.5 py-1.5 border-b border-white/[0.04] last:border-0">
            <div className="flex-1 min-w-0">
              <div className="text-[8.5px] text-slate-300 truncate">{t.label}</div>
              <div className="text-[7px] text-slate-600">{t.ago} ago</div>
            </div>
            <span className="text-[8.5px] font-mono font-bold" style={{ color: t.color }}>{t.amount}</span>
          </div>
        ))}
      </div>
    </WCard>
  )
}

function APIWidget() {
  const endpoints = [
    { method: 'POST', path: '/api/checkout',  ms: 42,  status: 200 },
    { method: 'GET',  path: '/api/users',     ms: 18,  status: 200 },
    { method: 'POST', path: '/api/webhook',   ms: 28,  status: 200 },
    { method: 'GET',  path: '/api/analytics', ms: 61,  status: 200 },
  ]
  const methodColor = { GET: '#34d399', POST: '#06b6d4', PUT: '#fbbf24', DELETE: '#f87171' }
  return (
    <WCard label="API Gateway" dot="#06b6d4">
      <div>
        {endpoints.map(e => (
          <div key={e.path} className="flex items-center gap-2 px-3.5 py-1.5 border-b border-white/[0.04] last:border-0">
            <span className="text-[7.5px] font-bold font-mono w-8 flex-shrink-0" style={{ color: methodColor[e.method] }}>{e.method}</span>
            <span className="text-[8px] text-slate-400 flex-1 truncate font-mono">{e.path}</span>
            <span className="text-[7.5px] font-mono text-slate-600 flex-shrink-0">{e.ms}ms</span>
            <span className="text-[7px] font-bold text-[#34d399] w-7 text-right flex-shrink-0">{e.status}</span>
          </div>
        ))}
        <div className="px-3.5 py-2 flex gap-1.5 flex-wrap">
          {['Stripe','Twilio','OpenAI','Firebase'].map(s => (
            <span key={s} className="text-[7px] px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-slate-500">{s}</span>
          ))}
        </div>
      </div>
    </WCard>
  )
}

function AnalyticsWidget() {
  return (
    <WCard label="Analytics" dot="#fb923c">
      <div className="px-3.5 py-2.5">
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          {[
            { label: 'Visitors',  value: '12.4K', delta: '+18%', c: '#0f9b74' },
            { label: 'Conv.',     value: '3.8%',  delta: '+0.4%', c: '#06b6d4' },
            { label: 'Bounce',    value: '32%',   delta: '−4%',  c: '#a78bfa' },
          ].map(k => (
            <div key={k.label} className="bg-white/4 border border-white/6 rounded-lg p-1.5 text-center">
              <div className="text-[8px] text-slate-500">{k.label}</div>
              <div className="text-[10px] font-bold text-white">{k.value}</div>
              <div className="text-[7px] font-semibold" style={{ color: k.c }}>{k.delta}</div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 200 48" className="w-full h-10">
          <defs>
            <linearGradient id="ang" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f9b74" stopOpacity="0.22"/>
              <stop offset="100%" stopColor="#0f9b74" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,45 L18,38 L36,40 L54,32 L72,34 L90,26 L108,20 L126,14 L144,10 L162,5 L180,3 L200,1"
            fill="none" stroke="#0f9b74" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0,45 L18,38 L36,40 L54,32 L72,34 L90,26 L108,20 L126,14 L144,10 L162,5 L180,3 L200,1 L200,48 L0,48 Z"
            fill="url(#ang)"/>
          <path d="M0,45 L25,42 L50,40 L75,38 L100,35 L125,32 L150,29 L175,26 L200,23"
            fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
        </svg>
        <div className="flex justify-between mt-1">
          <span className="text-[7px] text-slate-700">Oct</span>
          <span className="text-[7px] text-slate-700">Nov</span>
          <span className="text-[7px] text-slate-700">Dec</span>
        </div>
      </div>
    </WCard>
  )
}

function AIWidget() {
  return (
    <WCard label="AI Copilot" dot="#a78bfa">
      <div className="px-3.5 py-3 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[7.5px] text-slate-600 font-mono">gpt-4-turbo</span>
          <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[#a78bfa]/12 text-[#a78bfa] border border-[#a78bfa]/20">Active</span>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#0f9b74]/12 border border-[#0f9b74]/20 rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[80%]">
            <span className="text-[8.5px] text-slate-300">Summarize Q3 revenue</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-[#a78bfa]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[7px] font-bold text-[#a78bfa]">AI</span>
          </div>
          <div className="bg-white/4 border border-white/8 rounded-xl rounded-tl-sm px-2.5 py-1.5">
            <span className="text-[8.5px] text-slate-300 leading-relaxed">Revenue grew 18% to $18.4K MRR. Signups up 32%. Churn below 2%.</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-[#a78bfa]/15 flex items-center justify-center flex-shrink-0">
            <span className="text-[7px] font-bold text-[#a78bfa]">AI</span>
          </div>
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <motion.div key={i} className="w-1 h-1 rounded-full bg-[#a78bfa]/60"
                animate={{ opacity: [0.3,1,0.3] }}
                transition={{ duration: 1.1, delay: i*0.18, repeat: Infinity }}/>
            ))}
          </div>
        </div>
      </div>
    </WCard>
  )
}

function AutomationWidget() {
  const steps = [
    { label: 'New signup',        icon: '⚡', color: '#0f9b74' },
    { label: 'Filter: plan=pro',  icon: '⊙', color: '#06b6d4' },
    { label: 'Send welcome email',icon: '✉', color: '#8b5cf6' },
    { label: 'Slack notify team', icon: '→', color: '#34d399' },
  ]
  return (
    <WCard label="Automation" dot="#06b6d4">
      <div className="px-3.5 py-2.5 space-y-1">
        {steps.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <span className="text-[9px] flex-shrink-0" style={{ color: s.color }}>{s.icon}</span>
              <span className="text-[8.5px] text-slate-300 flex-1">{s.label}</span>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: s.color }}/>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center my-0.5">
                <div className="w-px h-2" style={{ background: `${s.color}30` }} />
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.05]">
          <span className="text-[7.5px] text-slate-600">847 runs today</span>
          <span className="text-[7.5px] text-[#34d399] font-mono">100% success</span>
        </div>
      </div>
    </WCard>
  )
}

function SMSWidget() {
  const msgs = [
    { text: 'Invoice #1094 is ready — pay here: pay.co/1094', out: true,  time: '9:41 AM' },
    { text: 'On it, paying now!',                              out: false, time: '9:44 AM' },
    { text: 'Payment confirmed ✓ Thanks, Sarah!',             out: true,  time: '9:44 AM' },
  ]
  return (
    <WCard label="SMS" dot="#34d399">
      <div className="px-3.5 py-3 space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-[#34d399]/15 flex items-center justify-center">
            <span className="text-[7px] font-bold text-[#34d399]">P</span>
          </div>
          <span className="text-[8px] text-slate-400">Parallax · +1 (555) 012-3456</span>
          <span className="text-[7px] text-[#34d399] ml-auto">Twilio</span>
        </div>
        {msgs.map((m, i) => (
          <div key={i} className={`px-2.5 py-1.5 rounded-2xl text-[8px] leading-relaxed max-w-[88%] ${m.out ? 'ml-auto rounded-tr-sm' : 'rounded-tl-sm'}`}
            style={m.out
              ? { background: 'rgba(15,155,116,0.15)', border: '1px solid rgba(15,155,116,0.2)', color: '#a7f3d0' }
              : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: '#94a3b8' }
            }>
            {m.text}
            <div className="text-[6.5px] text-slate-700 mt-0.5">{m.time}</div>
          </div>
        ))}
        <div className="text-[7.5px] text-[#34d399] font-mono text-right">98% delivered</div>
      </div>
    </WCard>
  )
}

function DatabaseWidget() {
  const rows = [
    { id: '001', name: 'Acme Corp', plan: 'Enterprise', status: 'Active',  c: '#34d399' },
    { id: '002', name: 'BuildCo',   plan: 'Pro',        status: 'Active',  c: '#34d399' },
    { id: '003', name: 'SkyTech',   plan: 'Starter',    status: 'Trial',   c: '#fbbf24' },
    { id: '004', name: 'DataFlow',  plan: 'Enterprise', status: 'Active',  c: '#34d399' },
  ]
  return (
    <WCard label="Database" dot="#67e8f9">
      <div>
        <div className="grid grid-cols-4 gap-1 px-3.5 py-1.5 border-b border-white/[0.06]">
          {['ID','Name','Plan','Status'].map(h => (
            <span key={h} className="text-[6.5px] font-bold text-slate-600 uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {rows.map(r => (
          <div key={r.id} className="grid grid-cols-4 gap-1 px-3.5 py-1.5 border-b border-white/[0.04] last:border-0">
            <span className="text-[7.5px] font-mono text-slate-600">{r.id}</span>
            <span className="text-[7.5px] text-slate-300">{r.name}</span>
            <span className="text-[7.5px] text-slate-500">{r.plan}</span>
            <span className="text-[7.5px] font-semibold" style={{ color: r.c }}>{r.status}</span>
          </div>
        ))}
        <div className="flex items-center justify-between px-3.5 py-2">
          <span className="text-[7px] text-slate-600 font-mono">2.1M records</span>
          <span className="text-[7px] text-[#67e8f9] font-mono">≤12ms avg</span>
        </div>
      </div>
    </WCard>
  )
}

// ─── Static widget layout (xl ≥ 1280 px) ────────────────────────────────────
// All widgets stay visible at once. Side columns carry 8 widgets and the lower
// center band carries 2 widgets, keeping the hero copy area clear.
const STATIC_WIDGET_LAYOUTS = [
  { left: '44px', top: '18%', scale: 0.72 },
  { left: '86px', top: '37%', scale: 0.71 },
  { left: '58px', top: '56%', scale: 0.73 },
  { left: '102px', top: '74%', scale: 0.7 },
  { right: '52px', top: '19%', scale: 0.72 },
  { right: '96px', top: '40%', scale: 0.71 },
  { right: '64px', top: '59%', scale: 0.73 },
  { right: '108px', top: '76%', scale: 0.7 },
  { left: 'calc(50% - 262px)', top: '64%', scale: 0.75 },
  { left: 'calc(50% + 26px)', top: '73%', scale: 0.74 },
]

const FLOATS = [
  { x:[0,6,-3,0], y:[0,-5,3,0], r:[0,-0.3,0.2,0], dur:9   },
  { x:[0,5,-7,0], y:[0,-4,5,0], r:[0,0.3,-0.4,0], dur:11  },
  { x:[0,7,-4,0], y:[0,5,-4,0], r:[0,-0.4,0.3,0], dur:9.5 },
  { x:[0,-6,4,0], y:[0,-5,6,0], r:[0,0.4,-0.3,0], dur:10  },
  { x:[0,-5,7,0], y:[0,-7,4,0], r:[0,0.5,-0.4,0], dur:8.5 },
]

const WIDGETS = [
  AuthWidget, PaymentsWidget, AIWidget, AnalyticsWidget,
  EmailWidget, APIWidget, SMSWidget, DatabaseWidget,
]

// ─── Ambient background ───────────────────────────────────────────────────────
function AmbientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#080d18]" />
      <div className="absolute inset-0 opacity-[0.018]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}/>
      <div className="absolute rounded-full blur-[160px] animate-glow-pulse-slow"
        style={{ width:700, height:700, top:'-20%', left:'0%', background:'radial-gradient(circle, rgba(15,155,116,0.10), transparent 70%)' }}/>
      <div className="absolute rounded-full blur-[130px] animate-glow-pulse-slow"
        style={{ width:600, height:600, bottom:'-10%', right:'-5%', background:'radial-gradient(circle, rgba(139,92,246,0.09), transparent 70%)', animationDelay:'2.5s' }}/>
      <div className="absolute rounded-full blur-[110px] animate-glow-pulse-slow"
        style={{ width:440, height:440, top:'35%', right:'28%', background:'radial-gradient(circle, rgba(6,182,212,0.07), transparent 70%)', animationDelay:'4s' }}/>
    </div>
  )
}

// ─── Entrance ─────────────────────────────────────────────────────────────────
const entrance = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } },
  item: { hidden: { opacity:0, y:22 }, show: { opacity:1, y:0, transition:{ duration:0.8, ease:[0.21,0.47,0.32,0.98] } } },
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0])
  const contentY       = useTransform(scrollYProgress, [0, 0.38], [0, -56])
  const bgScale        = useTransform(scrollYProgress, [0, 0.7],  [1, 1.04])
  const veilOpacity    = useTransform(scrollYProgress, [0.2, 0.55], [0, 1])
  const hintOpacity    = useTransform(scrollYProgress, [0, 0.09], [1, 0])

  // Word typewriter cycling
  const [wordIndex, setWordIndex] = useState(0)
  const [typedWord, setTypedWord] = useState('')
  const [deleting, setDeleting]   = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    const target = WORDS[wordIndex]
    let id
    if (!deleting && typedWord !== target) {
      id = setTimeout(() => setTypedWord(target.slice(0, typedWord.length + 1)), 38)
    } else if (!deleting && typedWord === target) {
      id = setTimeout(() => setDeleting(true), 2600)
    } else if (deleting && typedWord.length > 0) {
      id = setTimeout(() => setTypedWord(target.slice(0, typedWord.length - 1)), 22)
    } else {
      id = setTimeout(() => { setDeleting(false); setWordIndex(i => (i + 1) % WORDS.length) }, 200)
    }
    return () => clearTimeout(id)
  }, [typedWord, wordIndex, deleting])

  useEffect(() => {
    if (!loginOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLoginOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [loginOpen])

  return (
    <div ref={containerRef} style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background */}
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <AmbientBg />
        </motion.div>

        {/* Scroll veil */}
        <motion.div className="absolute inset-0 bg-[#080d18] pointer-events-none z-20" style={{ opacity: veilOpacity }} />

        {/* Permanent widget layout on desktop widths */}
        <div className="absolute inset-0 z-10 hidden xl:block pointer-events-none">
          {WIDGETS.map((Component, index) => {
            const float = FLOATS[index % FLOATS.length]
            const layout = STATIC_WIDGET_LAYOUTS[index]

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: layout.left,
                  right: layout.right,
                  top: layout.top,
                  transform: `scale(${layout.scale})`,
                  transformOrigin: layout.right ? 'top right' : 'top left',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1, x: float.x, y: float.y, rotate: float.r }}
                  transition={{
                    opacity: TX_DUR,
                    scale: TX_DUR,
                    x: { duration: float.dur, repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: float.dur + 0.5, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: float.dur + 1, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <Component />
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Hero text */}
        <motion.div
          className="relative z-30 h-full flex flex-col items-center px-6 pt-28"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.div
            variants={entrance.container}
            initial="hidden"
            animate="show"
            className="w-full max-w-2xl flex flex-col items-center gap-6"
          >
            <motion.div variants={entrance.item} className="text-center">
              <h1
                className="font-extrabold tracking-tight leading-[1.12] text-white"
                style={{
                  fontSize: 'clamp(1.6rem, 3.2vw, 3rem)',
                  textShadow: '0 2px 32px rgba(8,13,24,1), 0 0 80px rgba(8,13,24,0.95)',
                }}
              >
                <span className="block">Elevate your business to the</span>
                <span className="block">highest standard of</span>
                <span className="block mt-1 h-[1.18em]">
                  <span
                    className="italic bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #7cf6d8 0%, #38e0c8 24%, #32d6ff 52%, #5ea8ff 76%, #9b74ff 100%)',
                    }}
                  >
                    {typedWord}
                  </span>
                  <motion.span
                    aria-hidden
                    className="inline-block align-baseline w-[0.07em] h-[0.85em] rounded-sm ml-0.5"
                    style={{ background: AURORA }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.div variants={entrance.item} className="flex items-center justify-center gap-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: AURORA, boxShadow: '0 8px 24px rgba(15,155,116,0.22)' }}
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
              >
                Log in
              </button>
            </motion.div>

            <motion.div variants={entrance.item}>
              <p
                className="text-center text-[1.1rem] font-semibold text-slate-300 leading-relaxed max-w-xl"
                style={{ textShadow: '0 1px 16px rgba(8,13,24,1)' }}
              >
                Crafting next-generation software tailored to the unique operations of our clients.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[10px] text-slate-600 tracking-[0.22em] uppercase">Scroll</span>
          <motion.div animate={{ y:[0,5,0] }} transition={{ duration:1.7, repeat:Infinity, ease:'easeInOut' }}>
            <ChevronDown className="w-4 h-4 text-slate-600" />
          </motion.div>
        </motion.div>

        {loginOpen && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center px-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hero-login-title"
            onClick={() => setLoginOpen(false)}
          >
            <div className="absolute inset-0 bg-[#050912]/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#0b1120]/96 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            >
              <button
                type="button"
                aria-label="Close login dialog"
                onClick={() => setLoginOpen(false)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
              >
                ×
              </button>

              <div className="mb-6">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Client Access</p>
                <h2 id="hero-login-title" className="text-2xl font-bold text-white">
                  Log in to Parallax
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Enter your credentials or continue with Google.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ background: AURORA, boxShadow: '0 10px 28px rgba(15,155,116,0.2)' }}
                >
                  Log in
                </button>
              </form>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/8" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">or</span>
                <div className="h-px flex-1 bg-white/8" />
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/[0.07]"
              >
                <img src={googleLogo} alt="" className="h-5 w-5 object-contain" />
                Sign in with Google
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  )
}
