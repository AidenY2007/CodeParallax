import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import googleLogo from '../assets/google.svg.png'
import worldMapCropped from '../assets/world-map-cropped.png'

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
function WCard({ label, dot, children, width = 240 }) {
  return (
    <div
      className="rounded-2xl overflow-hidden select-none pointer-events-none"
      style={{
        background: 'rgba(4,6,12,0.96)',
        border: `1px solid rgba(255,255,255,0.11)`,
        backdropFilter: 'blur(24px)',
        boxShadow: `0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 18px #67e8f955, 0 0 56px #67e8f92e`,
        width,
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

const AUTH_NODES = [
  { x: 18,  y: 50, label: 'client',  dy: -9 },
  { x: 62,  y: 13, label: 'auth',    dy: -8 },
  { x: 107, y: 28, label: 'token',   dy: -8 },
  { x: 97,  y: 74, label: 'CA',      dy: 13 },
  { x: 35,  y: 84, label: 'session', dy: 12 },
]
const AUTH_EDGES = [[0,1],[0,2],[0,4],[1,2],[1,3],[2,3],[1,4]]
const AUTH_FLOW = [
  { from: 0, to: 1, msg: 'auth request'  },
  { from: 1, to: 3, msg: 'verify cert'   },
  { from: 3, to: 1, msg: 'cert valid'    },
  { from: 1, to: 2, msg: 'sign token'    },
  { from: 1, to: 0, msg: 'token issued'  },
  { from: 0, to: 4, msg: 'session open'  },
]
const PACKET_MS = 1050

function AuthWidget() {
  const [step, setStep] = useState(0)
  const [litNodes, setLitNodes] = useState([0])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) {
      const id = setTimeout(() => { setStep(0); setLitNodes([0]); setDone(false) }, 2200)
      return () => clearTimeout(id)
    }
    if (step >= AUTH_FLOW.length) { setDone(true); return }
    const { to } = AUTH_FLOW[step]
    const id = setTimeout(() => {
      setLitNodes(prev => [...new Set([...prev, to])])
      setStep(s => s + 1)
    }, PACKET_MS)
    return () => clearTimeout(id)
  }, [step, done])

  const curFlow = AUTH_FLOW[Math.min(step, AUTH_FLOW.length - 1)]
  const accent = done ? '#0f9b74' : '#67e8f9'

  return (
    <WCard label="Authentication" dot={accent}>
      <div className="px-3.5 py-2.5">

        {/* Network graph */}
        <div className="rounded-lg overflow-hidden mb-1.5"
          style={{ background: 'rgba(4,6,12,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <svg viewBox="0 0 125 100" width="100%" height="88" style={{ display: 'block' }}>
            <defs>
              <filter id="pglow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Edges */}
            {AUTH_EDGES.map(([a, b], i) => {
              const na = AUTH_NODES[a], nb = AUTH_NODES[b]
              const active = !done && step < AUTH_FLOW.length &&
                ((curFlow.from === a && curFlow.to === b) || (curFlow.from === b && curFlow.to === a))
              return (
                <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  strokeWidth={active ? 1.1 : 0.55}
                  animate={{ stroke: done ? 'rgba(15,155,116,0.3)' : active ? 'rgba(103,232,249,0.6)' : 'rgba(255,255,255,0.09)' }}
                  transition={{ duration: 0.2 }}
                />
              )
            })}

            {/* Traveling packet */}
            {!done && step < AUTH_FLOW.length && (
              <motion.g key={step} filter="url(#pglow)">
                <motion.circle r={4.5} fill="rgba(103,232,249,0.25)"
                  cx={AUTH_NODES[curFlow.from].x} cy={AUTH_NODES[curFlow.from].y}
                  animate={{ cx: AUTH_NODES[curFlow.to].x, cy: AUTH_NODES[curFlow.to].y }}
                  transition={{ duration: PACKET_MS / 1000 * 0.82, ease: 'easeInOut' }} />
                <motion.circle r={2.2} fill="#67e8f9"
                  cx={AUTH_NODES[curFlow.from].x} cy={AUTH_NODES[curFlow.from].y}
                  animate={{ cx: AUTH_NODES[curFlow.to].x, cy: AUTH_NODES[curFlow.to].y }}
                  transition={{ duration: PACKET_MS / 1000 * 0.82, ease: 'easeInOut' }} />
              </motion.g>
            )}

            {/* Nodes */}
            {AUTH_NODES.map((n, i) => {
              const lit = litNodes.includes(i)
              return (
                <g key={i}>
                  {lit && (
                    <motion.circle cx={n.x} cy={n.y} r={7} fill="none"
                      stroke={done ? 'rgba(15,155,116,0.25)' : 'rgba(103,232,249,0.2)'} strokeWidth={0.8}
                      animate={{ r: [5, 10, 5], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
                  )}
                  <motion.circle cx={n.x} cy={n.y} r={5} strokeWidth={1.2}
                    animate={{
                      fill: done ? 'rgba(15,155,116,0.25)' : lit ? 'rgba(103,232,249,0.15)' : 'rgba(255,255,255,0.04)',
                      stroke: done ? '#0f9b74' : lit ? '#67e8f9' : 'rgba(255,255,255,0.14)',
                    }} transition={{ duration: 0.3 }} />
                  <motion.circle cx={n.x} cy={n.y} r={2}
                    animate={{ fill: done ? '#0f9b74' : lit ? '#67e8f9' : 'rgba(255,255,255,0.18)' }}
                    transition={{ duration: 0.3 }} />
                  <text x={n.x} y={n.y + n.dy} textAnchor="middle"
                    fontSize="6.2" fontFamily="monospace"
                    fill={done ? 'rgba(15,155,116,0.7)' : lit ? 'rgba(103,232,249,0.7)' : 'rgba(148,163,184,0.4)'}>
                    {n.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Current step label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <motion.div className="w-1 h-1 rounded-full"
              animate={{ background: accent, opacity: !done ? [1, 0.3, 1] : 1 }}
              transition={{ duration: 0.5, repeat: !done ? Infinity : 0 }} />
            <AnimatePresence mode="wait">
              <motion.span key={done ? 'done' : step} className="text-[7px] font-mono"
                style={{ color: accent }}
                initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.14 }}>
                {done ? 'authenticated' : curFlow.msg}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[6px] font-mono text-slate-700">{Math.min(step, AUTH_FLOW.length)}/{AUTH_FLOW.length}</span>
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
    { label: 'NovaWorks — Pro', amount: '+$299',   color: '#34d399', ago: 'just now' },
    { label: 'BuildCo — Ent.',  amount: '+$1,200', color: '#34d399', ago: '4m' },
    { label: 'Refund issued',   amount: '−$99',    color: '#f87171', ago: '12m' },
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

// Rough continental hub positions — no geographic precision needed
// x = (lon+180)/360*390 · y = (83-lat)/138*215  (map top=83°N, bottom=55°S)
const ANALYTICS_CITIES = [
  { name: 'Los Angeles', x: 62,  y: 93,  users: '1.9K', flip: false },
  { name: 'New York',    x: 110, y: 86,  users: '2.4K', flip: false },
  { name: 'Rio de Janeiro', x: 140, y: 154, users: '890',  flip: false },
  { name: 'Amsterdam',   x: 190, y: 72,  users: '1.6K', flip: false },
  { name: 'Cape Town',   x: 205, y: 165, users: '710',  flip: false },
  { name: 'Tokyo',       x: 329, y: 94,  users: '1.5K', flip: true  },
  { name: 'Sydney',      x: 340, y: 170, users: '640',  flip: true  },
]

function AnalyticsWidget() {
  const [activeCity, setActiveCity] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveCity(c => (c + 1) % ANALYTICS_CITIES.length), 1800)
    return () => clearInterval(id)
  }, [])

  const city = ANALYTICS_CITIES[activeCity]
  const lx = city.flip ? city.x - 78 : city.x + 4
  const tx = city.flip ? city.x - 75 : city.x + 7

  return (
    <WCard label="Analytics" dot="#fb923c" width={390}>
      <div className="grid grid-cols-4 h-8 divide-x divide-white/[0.05] border-b border-white/[0.05]">
        {[
          { label: 'Sessions',  value: '24.8K',  color: '#0f9b74' },
          { label: 'Bounce',    value: '32.4%',  color: '#67e8f9' },
          { label: 'Conv rate', value: '4.2%',   color: '#a78bfa' },
          { label: 'Avg. time', value: '2m 18s', color: '#fb923c' },
        ].map(s => (
          <div key={s.label} className="px-3 flex flex-col justify-center">
            <div className="text-[6px] text-slate-600 font-mono mb-0.5">{s.label}</div>
            <div className="text-[10px] font-semibold font-mono" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden" style={{ height: 162, background: '#000' }}>
        <svg viewBox="0 0 390 215" width="100%" height="162" preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block' }}>
          <defs>
            <mask id="worldMapLandMask" maskUnits="userSpaceOnUse" x="0" y="0" width="390" height="215">
              <image href={worldMapCropped} x="0" y="0" width="390" height="215" preserveAspectRatio="none" />
            </mask>
          </defs>
          <g transform="translate(0 6)">
            <rect x="0" y="0" width="390" height="215" fill="#0f9b74" mask="url(#worldMapLandMask)" opacity="0.82" />

            {ANALYTICS_CITIES.map((c, i) => (
              <g key={c.name}>
                <motion.circle cx={c.x} cy={c.y} r={4} fill="none" stroke="#67e8f9" strokeWidth="0.7"
                  animate={activeCity === i ? { r: [3, 9, 3], opacity: [0.8, 0, 0.8] } : { r: 3, opacity: 0.12 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <circle cx={c.x} cy={c.y} r={1.8}
                  fill={activeCity === i ? '#67e8f9' : 'rgba(103,232,249,0.4)'} />
              </g>
            ))}

            <AnimatePresence mode="wait">
              <motion.g key={city.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <rect x={lx} y={city.y - 16} width={74} height={21} rx={2.5}
                  fill="rgba(4,6,12,0.92)" stroke="rgba(103,232,249,0.3)" strokeWidth="0.5" />
                <text x={tx} y={city.y - 6} fill="#67e8f9" fontSize="8" fontFamily="monospace" fontWeight="600">{city.name}</text>
                <text x={tx} y={city.y + 3} fill="rgba(148,163,184,0.65)" fontSize="7" fontFamily="monospace">{city.users} active</text>
              </motion.g>
            </AnimatePresence>
          </g>
        </svg>
      </div>

    </WCard>
  )
}

// stage: 0=empty 1=user1 2=typing1 3=ai1 4=user2 5=typing2 6=ai2 7=user3 8=typing3 9=ai3 10=reset
const AI_MESSAGES = [
  { role: 'user', text: 'Summarize Q3 revenue' },
  { role: 'ai',   text: 'Revenue grew 18% to $18.4K MRR. Signups up 32%. Churn below 2%.' },
  { role: 'user', text: "What's our top product?" },
  { role: 'ai',   text: 'Pro Dashboard — $8.5K ARR, 94% retention rate.' },
  { role: 'user', text: 'Any churn risks?' },
  { role: 'ai',   text: '2 accounts flagged. Last active 14d ago. Suggest outreach.' },
]

const AI_STAGE_DELAY = [700, 900, 1100, 700, 900, 1100, 700, 900, 1100, 2200]

function AIWidget() {
  const [stage, setStage] = useState(0)
  const ease = [0.21, 0.47, 0.32, 0.98]

  useEffect(() => {
    const id = setTimeout(() => {
      setStage(s => (s >= AI_STAGE_DELAY.length - 1 ? 0 : s + 1))
    }, AI_STAGE_DELAY[stage] ?? 700)
    return () => clearTimeout(id)
  }, [stage])

  // Which messages are visible and whether the next AI is still typing
  const visibleMessages = []
  let showTyping = false
  if (stage >= 1) visibleMessages.push(AI_MESSAGES[0])
  if (stage === 2) showTyping = true
  if (stage >= 3) visibleMessages.push(AI_MESSAGES[1])
  if (stage >= 4) visibleMessages.push(AI_MESSAGES[2])
  if (stage === 5) showTyping = true
  if (stage >= 6) visibleMessages.push(AI_MESSAGES[3])
  if (stage >= 7) visibleMessages.push(AI_MESSAGES[4])
  if (stage === 8) showTyping = true
  if (stage >= 9) visibleMessages.push(AI_MESSAGES[5])

  return (
    <WCard label="AI Agent" dot="#a78bfa">
      <div className="px-3.5 py-3">
        <div className="flex flex-col gap-2" style={{ height: 190, overflow: 'hidden' }}>
          <>
            {visibleMessages.map((msg, i) => msg.role === 'user' ? (
              <div
                key={`u${i}`}
                className="flex justify-end flex-shrink-0"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18, ease }}
                  className="bg-[#0f9b74]/12 border border-[#0f9b74]/20 rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[84%] min-h-6 flex items-center"
                >
                  <span className="text-[8.5px] leading-tight text-slate-300">{msg.text}</span>
                </motion.div>
              </div>
            ) : (
              <div
                key={`a${i}`}
                className="flex gap-2 flex-shrink-0"
              >
                <div className="w-5 h-5 rounded-full bg-[#a78bfa]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[7px] font-bold text-[#a78bfa]">AI</span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18, ease }}
                  className="bg-white/4 border border-white/8 rounded-xl rounded-tl-sm px-2.5 py-1.5 flex-1 min-h-6 flex items-center"
                >
                  <span className="text-[8.5px] leading-tight text-slate-300">{msg.text}</span>
                </motion.div>
              </div>
            ))}

            {showTyping && (
              <div
                key="typing"
                className="flex gap-2 items-center flex-shrink-0"
              >
                <div className="w-5 h-5 rounded-full bg-[#a78bfa]/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[7px] font-bold text-[#a78bfa]">AI</span>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1 h-1 rounded-full bg-[#a78bfa]/60"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.1, delay: i * 0.18, repeat: Infinity }} />
                  ))}
                </div>
              </div>
            )}
          </>
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

const DB_DOCS = [
  {
    col: 'users', id: 'usr_aBc123',
    fields: [
      { key: 'email',     type: 'string',    value: 'sarah@oakivy.co' },
      { key: 'plan',      type: 'string',    value: 'enterprise' },
      { key: 'mrr',       type: 'number',    value: '1200' },
      { key: 'createdAt', type: 'timestamp', value: 'Apr 19, 2026' },
      { key: 'metadata',  type: 'map',       value: '{ 3 fields }' },
      { key: 'roles',     type: 'array',     value: '[admin, editor]' },
    ],
  },
  {
    col: 'orders', id: 'ord_xYz789',
    fields: [
      { key: 'status',  type: 'string',    value: 'completed' },
      { key: 'total',   type: 'number',    value: '299.00' },
      { key: 'userId',  type: 'reference', value: 'users/usr_aBc123' },
      { key: 'paid',    type: 'boolean',   value: 'true' },
      { key: 'items',   type: 'array',     value: '[2 items]' },
      { key: 'created', type: 'timestamp', value: 'Apr 19, 2026' },
    ],
  },
  {
    col: 'products', id: 'prd_mNo456',
    fields: [
      { key: 'name',      type: 'string',    value: 'Pro Dashboard' },
      { key: 'price',     type: 'number',    value: '8500' },
      { key: 'active',    type: 'boolean',   value: 'true' },
      { key: 'config',    type: 'map',       value: '{ 5 fields }' },
      { key: 'tags',      type: 'array',     value: '[saas, b2b]' },
      { key: 'updatedAt', type: 'timestamp', value: 'Apr 19, 2026' },
    ],
  },
]

const DB_TYPE_COLOR = {
  string: '#34d399', number: '#fb923c', boolean: '#a78bfa',
  timestamp: '#06b6d4', map: '#fbbf24', array: '#f472b6', reference: '#67e8f9',
}

function DatabaseWidget() {
  const [activeDoc, setActiveDoc] = useState(0)
  const [highlight, setHighlight] = useState(null)
  const [count, setCount] = useState(4821)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveDoc(d => (d + 1) % DB_DOCS.length)
      setHighlight(Math.floor(Math.random() * 5))
      setCount(c => c + Math.floor(Math.random() * 3 + 1))
    }, 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (highlight === null) return
    const id = setTimeout(() => setHighlight(null), 700)
    return () => clearTimeout(id)
  }, [highlight])

  const doc = DB_DOCS[activeDoc]

  return (
    <div
      className="rounded-2xl overflow-hidden select-none pointer-events-none"
      style={{
        background: 'rgba(4,6,12,0.96)',
        border: '1px solid rgba(255,255,255,0.11)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 18px #67e8f955, 0 0 56px #67e8f92e',
        width: 390,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.06]">
        <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-slate-400">Database</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[0,1,2].map(i => (
              <motion.div key={i} className="w-[3px] rounded-full bg-[#67e8f9]/60"
                animate={{ height: [2, 7+i*2, 2] }}
                transition={{ duration: 0.75, delay: i*0.14, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#67e8f9' }} />
          <span className="text-[7.5px] text-[#67e8f9] font-mono">live</span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 px-3.5 py-1.5 bg-white/[0.02] border-b border-white/[0.04]">
        <span className="text-[7.5px] text-slate-700 font-mono">/</span>
        <span className="text-[7.5px] text-[#67e8f9] font-mono">{doc.col}</span>
        <span className="text-[7.5px] text-slate-700 font-mono">/</span>
        <motion.span key={doc.id} initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22 }}
          className="text-[7.5px] text-slate-400 font-mono"
        >
          {doc.id}
        </motion.span>
      </div>

      <div className="flex" style={{ height: 138 }}>
        {/* Collections sidebar */}
        <div className="w-[82px] flex-shrink-0 border-r border-white/[0.06] pt-1.5 pb-2">
          {DB_DOCS.map((d, i) => (
            <div key={d.col}
              className="flex items-center gap-1.5 px-2.5 py-1.5"
              style={{ background: i === activeDoc ? 'rgba(103,232,249,0.06)' : 'transparent' }}
            >
              <div className="w-1 h-1 rounded-sm flex-shrink-0"
                style={{ background: i === activeDoc ? '#67e8f9' : '#1f2937' }} />
              <span className="text-[7.5px] truncate font-mono"
                style={{ color: i === activeDoc ? '#67e8f9' : '#374151' }}>
                {d.col}
              </span>
            </div>
          ))}
          <div className="px-2.5 mt-2 pt-1.5 border-t border-white/[0.04]">
            <span className="text-[6.5px] text-slate-700 font-mono">{count.toLocaleString()} docs</span>
          </div>
        </div>

        {/* Fields panel */}
        <div className="flex-1 py-1 overflow-hidden">
          {doc.fields.map((f, i) => (
            <motion.div key={`${doc.id}-${f.key}`}
              className="flex items-center gap-1.5 px-2.5 py-[5px]"
              animate={{ background: i === highlight ? 'rgba(103,232,249,0.08)' : 'rgba(0,0,0,0)' }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[7px] font-mono text-slate-500 w-[52px] flex-shrink-0 truncate">{f.key}</span>
              <span className="text-[6px] px-1.5 py-[2px] rounded font-mono flex-shrink-0"
                style={{ background: `${DB_TYPE_COLOR[f.type]}14`, color: DB_TYPE_COLOR[f.type], border: `1px solid ${DB_TYPE_COLOR[f.type]}22` }}>
                {f.type}
              </span>
              <span className="text-[7.5px] font-mono text-slate-400 truncate flex-1">{f.value}</span>
              {i === highlight && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-[6px] text-[#67e8f9] font-mono flex-shrink-0">↑</motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3.5 py-2 border-t border-white/[0.05]">
        <span className="text-[7px] text-slate-700 font-mono">≤12ms · us-central1</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]/60" />
          <span className="text-[7px] text-slate-700 font-mono">99.9% uptime</span>
        </div>
      </div>
    </div>
  )
}

// ─── Static widget layout (xl ≥ 1280 px) ────────────────────────────────────
// All widgets stay visible at once. Side columns carry 8 widgets and the lower
// center band carries 2 widgets, keeping the hero copy area clear.
const STATIC_WIDGET_LAYOUTS = [
  { right: '234px', top: '36%', scale: 0.71 },
  { left: '134px', top: '37%', scale: 0.71 },
  { left: '36px', top: '19%', scale: 0.72 },
  { left: '48px', top: '58%', scale: 0.92 },
  { right: '36px', top: '19%', scale: 0.72 },
  { left: '234px', top: '36%', scale: 0.71 },
  { right: '48px', top: '58%', scale: 0.92 },
  { right: '316px', top: '60%', scale: 0.92 },
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
  AuthWidget, null, AIWidget, AnalyticsWidget,
  PaymentsWidget, APIWidget, DatabaseWidget,
]

// ─── Ambient background ───────────────────────────────────────────────────────
function AmbientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#080d18]" />
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
            if (!Component) return null

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
                  textShadow: '0 2px 32px rgba(13,21,48,0.9)',
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
                style={{ textShadow: '0 1px 16px rgba(13,21,48,0.9)' }}
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
