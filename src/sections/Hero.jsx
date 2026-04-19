import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion, AnimatePresence,
  useScroll, useTransform,
  useMotionValue, useSpring,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ChevronDown,
  Lock, CreditCard, Sparkles, GitBranch,
  BarChart2, Plug, MessageSquare, Database, Layout,
} from 'lucide-react'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

// ─── Feature graphics ─────────────────────────────────────────────────────────

function AuthGraphic() {
  return (
    <div className="flex items-center justify-center h-full p-6 min-h-[260px]">
      <div className="w-full max-w-[210px] space-y-2.5">
        <div className="bg-[#080d18] border border-white/10 rounded-2xl p-5">
          <div className="text-center mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#0f9b74]/15 flex items-center justify-center mx-auto mb-2">
              <Lock className="w-4 h-4 text-[#0f9b74]" />
            </div>
            <div className="text-[11px] font-bold text-white">Welcome back</div>
            <div className="text-[9px] text-slate-600 mt-0.5">Sign in to your account</div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="h-7 bg-white/4 border border-white/8 rounded-lg px-2.5 flex items-center">
              <span className="text-[9px] text-slate-500">email@company.com</span>
            </div>
            <div className="h-7 bg-white/4 border border-white/8 rounded-lg px-2.5 flex items-center justify-between">
              <span className="text-[9px] text-slate-600">••••••••</span>
              <span className="text-[8px] text-[#0f9b74]">Show</span>
            </div>
          </div>
          <div className="h-7 rounded-lg flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: AURORA }}>
            Sign In
          </div>
          <div className="flex gap-1.5 mt-2.5">
            <div className="flex-1 h-6 bg-white/4 border border-white/6 rounded-lg flex items-center justify-center text-[8px] text-slate-500">Google</div>
            <div className="flex-1 h-6 bg-white/4 border border-white/6 rounded-lg flex items-center justify-center text-[8px] text-slate-500">GitHub</div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-[#0f9b74]/8 border border-[#0f9b74]/20 rounded-xl px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0f9b74] animate-pulse" />
            <span className="text-[9px] text-[#0f9b74] font-mono">2,847 active sessions</span>
          </div>
          <span className="text-[9px] text-[#34d399] font-mono">MFA on</span>
        </div>
      </div>
    </div>
  )
}

function PaymentsGraphic() {
  return (
    <div className="flex items-center justify-center h-full p-6 min-h-[260px]">
      <div className="w-full max-w-[230px] space-y-2.5">
        <div className="bg-[#080d18] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-slate-500 uppercase tracking-wider">Monthly Revenue</span>
            <span className="text-[8px] px-1.5 py-0.5 bg-[#34d399]/10 text-[#34d399] rounded-full border border-[#34d399]/20">↑ 12%</span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-3">$18,400</div>
          <svg viewBox="0 0 180 40" className="w-full h-8">
            <defs>
              <linearGradient id="payGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f9b74" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0f9b74" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,38 L22,30 L45,33 L70,22 L95,26 L120,14 L145,9 L168,3 L180,1"
              fill="none" stroke="#0f9b74" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0,38 L22,30 L45,33 L70,22 L95,26 L120,14 L145,9 L168,3 L180,1 L180,40 L0,40 Z"
              fill="url(#payGrad)" />
          </svg>
        </div>
        <div className="bg-[#080d18] border border-white/10 rounded-2xl p-3 space-y-2">
          {[
            { name: 'Pro Plan',   amount: '+$299',   color: '#34d399' },
            { name: 'Enterprise', amount: '+$1,200', color: '#34d399' },
            { name: 'Refund',     amount: '-$99',    color: '#f87171' },
          ].map(t => (
            <div key={t.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-white/4 border border-white/6" />
                <span className="text-[9px] text-slate-400">{t.name}</span>
              </div>
              <span className="text-[9px] font-mono font-bold" style={{ color: t.color }}>{t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AIGraphic() {
  return (
    <div className="flex items-center justify-center h-full p-6 min-h-[260px]">
      <div className="w-full max-w-[230px]">
        <div className="bg-[#080d18] border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/6">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-[#a78bfa]" />
              </div>
              <span className="text-[9px] font-semibold text-white">AI Assistant</span>
            </div>
            <span className="text-[8px] px-1.5 py-0.5 bg-[#a78bfa]/10 text-[#a78bfa] rounded-full border border-[#a78bfa]/20">GPT-4 Turbo</span>
          </div>
          <div className="p-3 space-y-2.5">
            <div className="flex justify-end">
              <div className="bg-[#0f9b74]/12 border border-[#0f9b74]/20 rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[75%]">
                <span className="text-[9px] text-slate-300">Summarize Q3 performance</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-[#a78bfa]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-2.5 h-2.5 text-[#a78bfa]" />
              </div>
              <div className="bg-white/4 border border-white/8 rounded-xl rounded-tl-sm px-2.5 py-1.5">
                <span className="text-[9px] text-slate-300 leading-relaxed">Revenue grew 18% to $18.4K MRR. Signups up 32%. Churn below 2%.</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-[#a78bfa]/15 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-2.5 h-2.5 text-[#a78bfa]" />
              </div>
              <div className="bg-white/4 border border-white/8 rounded-xl px-3 py-2 flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1 h-1 rounded-full bg-slate-500"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AutomationGraphic() {
  const nodes = [
    { label: 'Trigger', sub: 'New signup',   color: '#0f9b74' },
    { label: 'Filter',  sub: 'Plan = Pro',   color: '#06b6d4' },
    { label: 'Action',  sub: 'Send email',   color: '#8b5cf6' },
    { label: 'Notify',  sub: 'Slack alert',  color: '#34d399' },
  ]
  return (
    <div className="flex items-center justify-center h-full p-6 min-h-[260px]">
      <div className="space-y-1.5 w-full max-w-[200px]">
        {nodes.map((node, i) => (
          <div key={node.label}>
            <div className="bg-[#080d18] border rounded-xl p-2.5 flex items-center gap-2.5"
              style={{ borderColor: `${node.color}28` }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[9px] font-bold"
                style={{ background: `${node.color}18`, color: node.color }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold text-white">{node.label}</div>
                <div className="text-[8px] text-slate-500">{node.sub}</div>
              </div>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: node.color }} />
            </div>
            {i < nodes.length - 1 && (
              <div className="flex justify-center py-0.5">
                <div className="w-px h-2.5" style={{ background: `${node.color}25` }} />
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center justify-center gap-1.5 mt-2 bg-[#06b6d4]/8 border border-[#06b6d4]/20 rounded-xl py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
          <span className="text-[9px] font-mono text-[#06b6d4]">847 runs today</span>
        </div>
      </div>
    </div>
  )
}

function AnalyticsGraphic() {
  return (
    <div className="flex items-center justify-center h-full p-6 min-h-[260px]">
      <div className="w-full max-w-[240px] space-y-2.5">
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Visitors',   value: '12.4K', delta: '+18%',  color: '#0f9b74' },
            { label: 'Conv.',      value: '3.8%',  delta: '+0.4%', color: '#06b6d4' },
            { label: 'Bounce',     value: '32%',   delta: '-4%',   color: '#a78bfa' },
          ].map(k => (
            <div key={k.label} className="bg-[#080d18] border border-white/8 rounded-xl p-2 text-center">
              <div className="text-[8px] text-slate-500">{k.label}</div>
              <div className="text-[11px] font-bold text-white mt-0.5">{k.value}</div>
              <div className="text-[8px] font-semibold mt-0.5" style={{ color: k.color }}>{k.delta}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#080d18] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-slate-500">Traffic · 30 days</span>
            <span className="text-[8px] text-[#0f9b74] font-mono">+18%</span>
          </div>
          <svg viewBox="0 0 200 55" className="w-full h-11">
            <defs>
              <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f9b74" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0f9b74" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,52 L20,44 L40,46 L60,38 L80,40 L100,30 L120,24 L140,17 L160,12 L180,6 L200,3"
              fill="none" stroke="#0f9b74" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0,52 L20,44 L40,46 L60,38 L80,40 L100,30 L120,24 L140,17 L160,12 L180,6 L200,3 L200,55 L0,55 Z"
              fill="url(#chartGrad)" />
            <path d="M0,52 L28,50 L56,47 L84,44 L112,40 L140,36 L168,31 L200,26"
              fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function APIGraphic() {
  return (
    <div className="flex items-center justify-center h-full p-6 min-h-[260px]">
      <div className="w-full max-w-[240px] space-y-2.5">
        <div className="bg-[#080d18] border border-white/10 rounded-2xl p-4 font-mono">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#f87171]/60" />
            <div className="w-2 h-2 rounded-full bg-[#fbbf24]/60" />
            <div className="w-2 h-2 rounded-full bg-[#34d399]/60" />
            <span className="text-[8px] text-slate-600 ml-1">api.parallax.io</span>
          </div>
          <div className="space-y-0.5 text-[8px] leading-relaxed">
            <div><span className="text-[#a78bfa]">const</span> <span className="text-[#67e8f9]">stripe</span> <span className="text-slate-500">= require(</span><span className="text-[#34d399]">'stripe'</span><span className="text-slate-500">)</span></div>
            <div className="text-slate-600 mt-1">{'// '}Create subscription</div>
            <div><span className="text-[#a78bfa]">await</span> <span className="text-[#67e8f9]">stripe</span><span className="text-slate-500">.subs.create({'{'}</span></div>
            <div className="pl-3"><span className="text-[#fbbf24]">customer</span><span className="text-slate-500">: userId,</span></div>
            <div className="pl-3"><span className="text-[#fbbf24]">plan</span><span className="text-slate-500">: </span><span className="text-[#34d399]">'pro'</span></div>
            <div><span className="text-slate-500">{'})'}</span></div>
          </div>
        </div>
        <div className="bg-[#080d18] border border-white/10 rounded-2xl p-3">
          <div className="text-[8px] text-slate-500 mb-2">Connected services</div>
          <div className="flex flex-wrap gap-1.5">
            {['Stripe', 'Slack', 'Twilio', 'SendGrid', 'OpenAI'].map((s, i) => (
              <span key={s} className="text-[8px] px-2 py-0.5 rounded-full border font-medium"
                style={{
                  color:        ['#0f9b74','#06b6d4','#8b5cf6','#34d399','#a78bfa'][i],
                  borderColor: `${['#0f9b74','#06b6d4','#8b5cf6','#34d399','#a78bfa'][i]}30`,
                  background:  `${['#0f9b74','#06b6d4','#8b5cf6','#34d399','#a78bfa'][i]}10`,
                }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CommunicationGraphic() {
  return (
    <div className="flex items-center justify-center h-full p-5 min-h-[260px]">
      <div className="w-full max-w-[250px] grid grid-cols-2 gap-2">
        <div className="bg-[#080d18] border border-white/10 rounded-xl p-3 space-y-1.5">
          <div className="text-[8px] text-[#06b6d4] font-bold uppercase tracking-wider mb-1.5">Email</div>
          <div className="h-3.5 bg-white/8 rounded" />
          <div className="h-2.5 bg-white/5 rounded w-4/5" />
          <div className="h-2.5 bg-white/5 rounded w-3/5" />
          <div className="h-2.5 bg-white/5 rounded w-4/5" />
          <div className="h-6 rounded-lg mt-2 flex items-center justify-center"
            style={{ background: 'rgba(15,155,116,0.15)', border: '1px solid rgba(15,155,116,0.25)' }}>
            <span className="text-[7px] font-semibold text-[#0f9b74]">Open now →</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
            <span className="text-[7px] text-[#34d399] font-mono">42% open</span>
          </div>
        </div>
        <div className="bg-[#080d18] border border-white/10 rounded-xl p-2.5 space-y-2">
          <div className="text-[8px] text-[#34d399] font-bold uppercase tracking-wider mb-1.5">SMS</div>
          <div className="flex justify-end">
            <div className="bg-[#0f9b74]/12 border border-[#0f9b74]/22 rounded-xl rounded-tr-sm px-2 py-1.5">
              <span className="text-[7px] text-slate-300 leading-relaxed">Order confirmed! Track it here.</span>
            </div>
          </div>
          <div className="flex">
            <div className="bg-white/5 border border-white/8 rounded-xl rounded-tl-sm px-2 py-1.5">
              <span className="text-[7px] text-slate-400">Got it, thanks!</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
            <span className="text-[7px] text-[#06b6d4] font-mono">98% delivered</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function DatabaseGraphic() {
  const rows = [
    { id: '001', name: 'Acme Corp',  plan: 'Enterprise', status: 'Active', color: '#34d399' },
    { id: '002', name: 'BuildCo',    plan: 'Pro',        status: 'Active', color: '#34d399' },
    { id: '003', name: 'SkyTech',    plan: 'Starter',    status: 'Trial',  color: '#fbbf24' },
    { id: '004', name: 'DataFlow',   plan: 'Enterprise', status: 'Active', color: '#34d399' },
  ]
  return (
    <div className="flex items-center justify-center h-full p-5 min-h-[260px]">
      <div className="w-full max-w-[260px]">
        <div className="bg-[#080d18] border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 gap-1 px-3 py-2 border-b border-white/6">
            {['ID', 'Name', 'Plan', 'Status'].map(h => (
              <span key={h} className="text-[7px] font-semibold text-slate-500 uppercase tracking-wide">{h}</span>
            ))}
          </div>
          {rows.map(row => (
            <div key={row.id} className="grid grid-cols-4 gap-1 px-3 py-2 border-b border-white/4 last:border-0">
              <span className="text-[8px] font-mono text-slate-600">{row.id}</span>
              <span className="text-[8px] text-slate-300">{row.name}</span>
              <span className="text-[8px] text-slate-400">{row.plan}</span>
              <span className="text-[8px] font-semibold" style={{ color: row.color }}>{row.status}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[8px] text-slate-600 font-mono">2.1M records</span>
          <span className="text-[8px] text-[#67e8f9] font-mono">≤ 12ms avg</span>
        </div>
      </div>
    </div>
  )
}

function UIGraphic() {
  return (
    <div className="flex items-center justify-center h-full p-6 min-h-[260px]">
      <div className="w-full max-w-[230px] space-y-2.5">
        <div className="bg-[#080d18] border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Component Library</div>
          <div className="flex gap-1.5">
            <div className="flex-1 h-7 rounded-lg text-[8px] font-bold text-white flex items-center justify-center"
              style={{ background: AURORA }}>
              Primary
            </div>
            <div className="flex-1 h-7 rounded-lg text-[8px] font-semibold text-slate-300 flex items-center justify-center bg-white/5 border border-white/10">
              Secondary
            </div>
          </div>
          <div className="h-7 bg-white/4 border border-white/8 rounded-lg px-2.5 flex items-center gap-1.5">
            <span className="text-[8px] text-slate-500">Search components...</span>
            <div className="ml-auto w-px h-3 bg-[#0f9b74] animate-blink" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] text-slate-500 mr-0.5">Palette</span>
            {['#0f9b74','#06b6d4','#8b5cf6','#34d399','#0c1426'].map(c => (
              <div key={c} className="w-4 h-4 rounded-md border border-white/10" style={{ background: c }} />
            ))}
          </div>
          <div className="bg-white/3 border border-white/6 rounded-xl p-2.5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center">
              <Layout className="w-3 h-3 text-[#8b5cf6]" />
            </div>
            <div>
              <div className="text-[8px] font-semibold text-white">Dashboard card</div>
              <div className="text-[7px] text-slate-500">Custom component</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-[#8b5cf6] opacity-60" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 0, word: 'security', label: 'Authentication', Icon: Lock,
    desc: 'Enterprise-grade identity and access management with SSO, MFA, and role-based permissions.',
    stats: [{ label: '2,847 sessions', color: '#0f9b74' }, { label: 'SSO + MFA', color: '#34d399' }],
    Graphic: AuthGraphic,
  },
  {
    id: 1, word: 'payments', label: 'Payments', Icon: CreditCard,
    desc: 'Billing, subscriptions, and revenue infrastructure that scales with your business.',
    stats: [{ label: '$18.4K MRR', color: '#34d399' }, { label: '99.9% uptime', color: '#0f9b74' }],
    Graphic: PaymentsGraphic,
  },
  {
    id: 2, word: 'intelligence', label: 'AI Integration', Icon: Sparkles,
    desc: 'AI-powered assistants, copilots, and intelligent workflows embedded in your product.',
    stats: [{ label: 'GPT-4 Turbo', color: '#a78bfa' }, { label: 'Custom fine-tune', color: '#8b5cf6' }],
    Graphic: AIGraphic,
  },
  {
    id: 3, word: 'automation', label: 'Automation', Icon: GitBranch,
    desc: 'Trigger-based workflows that replace repetitive operations and accelerate your team.',
    stats: [{ label: '847 runs/day', color: '#22d3ee' }, { label: 'Zero-latency', color: '#06b6d4' }],
    Graphic: AutomationGraphic,
  },
  {
    id: 4, word: 'analytics', label: 'Analytics', Icon: BarChart2,
    desc: 'Real-time performance metrics, conversion tracking, and user behavior insights.',
    stats: [{ label: '+18% traffic', color: '#fb923c' }, { label: '3.8% conv.', color: '#0f9b74' }],
    Graphic: AnalyticsGraphic,
  },
  {
    id: 5, word: 'integration', label: 'API Integrations', Icon: Plug,
    desc: 'Connect your platform to every tool and third-party service it depends on.',
    stats: [{ label: '99.9% uptime', color: '#6ee7b7' }, { label: '50+ services', color: '#8b5cf6' }],
    Graphic: APIGraphic,
  },
  {
    id: 6, word: 'communication', label: 'Communication', Icon: MessageSquare,
    desc: 'Lifecycle email and SMS systems for onboarding, nurture, alerts, and conversion.',
    stats: [{ label: '42% open rate', color: '#4ade80' }, { label: '98% delivered', color: '#06b6d4' }],
    Graphic: CommunicationGraphic,
  },
  {
    id: 7, word: 'infrastructure', label: 'Databases', Icon: Database,
    desc: 'Operational data infrastructure with visibility, structure, and blazing-fast queries.',
    stats: [{ label: '2.1M records', color: '#67e8f9' }, { label: '≤12ms avg', color: '#0f9b74' }],
    Graphic: DatabaseGraphic,
  },
  {
    id: 8, word: 'experience', label: 'UI / Design', Icon: Layout,
    desc: 'Custom interfaces and design systems that reflect your brand at every touchpoint.',
    stats: [{ label: 'Custom design', color: '#8b5cf6' }, { label: 'Pixel-perfect', color: '#a78bfa' }],
    Graphic: UIGraphic,
  },
]

// ─── Ambient background ───────────────────────────────────────────────────────
function AmbientBg({ mouseX, mouseY }) {
  const gx = useSpring(mouseX, { stiffness: 55, damping: 22 })
  const gy = useSpring(mouseY, { stiffness: 55, damping: 22 })

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />
      <div className="absolute rounded-full blur-[140px] animate-glow-pulse-slow"
        style={{ width: 680, height: 680, top: '-15%', left: '5%',
          background: 'radial-gradient(circle, rgba(15,155,116,0.10), transparent 70%)' }} />
      <div className="absolute rounded-full blur-[120px] animate-glow-pulse-slow"
        style={{ width: 560, height: 560, bottom: '-5%', right: '0%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.09), transparent 70%)',
          animationDelay: '2.5s' }} />
      <div className="absolute rounded-full blur-[100px] animate-glow-pulse-slow"
        style={{ width: 400, height: 400, top: '30%', right: '30%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07), transparent 70%)',
          animationDelay: '4s' }} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [gx, gy],
            ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(15,155,116,0.07), transparent 55%)`
          ),
        }}
      />
    </div>
  )
}

const entrance = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } },
  item: { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } } },
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef(null)
  const sectionRef   = useRef(null)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0])
  const contentY       = useTransform(scrollYProgress, [0, 0.38], [0, -48])
  const bgScale        = useTransform(scrollYProgress, [0, 0.7],  [1, 1.05])
  const veilOpacity    = useTransform(scrollYProgress, [0.18, 0.56], [0, 1])
  const hintOpacity    = useTransform(scrollYProgress, [0, 0.09], [1, 0])

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }, [rawX, rawY])

  const [activeId, setActiveId]   = useState(0)
  const [hoveredId, setHoveredId] = useState(null)
  const displayId = hoveredId !== null ? hoveredId : activeId

  useEffect(() => {
    if (hoveredId !== null) return
    const t = setInterval(() => setActiveId(i => (i + 1) % FEATURES.length), 3000)
    return () => clearInterval(t)
  }, [hoveredId])

  const active = FEATURES[displayId]
  const ActiveIcon = active.Icon
  const ActiveGraphic = active.Graphic

  return (
    <div ref={containerRef} style={{ height: '220vh' }}>
      <div
        ref={sectionRef}
        className="sticky top-0 h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <AmbientBg mouseX={rawX} mouseY={rawY} />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-[#080d18] pointer-events-none z-20"
          style={{ opacity: veilOpacity }}
        />

        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-16 pb-8"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.div
            variants={entrance.container}
            initial="hidden"
            animate="show"
            className="w-full max-w-5xl flex flex-col items-center gap-5"
          >

            {/* Headline */}
            <motion.div variants={entrance.item} className="text-center">
              <h1 className="text-[clamp(1.75rem,3.8vw,3.4rem)] leading-[1.08] tracking-tight">
                <span className="block text-slate-500 font-light">Hold your business to the</span>
                <span className="block font-light">
                  <span className="text-slate-400">highest standard of </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={active.word}
                      initial={{ opacity: 0, y: '50%', filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: '0%',  filter: 'blur(0px)' }}
                      exit={{    opacity: 0, y: '-40%', filter: 'blur(5px)' }}
                      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="inline-block font-extrabold italic bg-clip-text text-transparent"
                      style={{ backgroundImage: AURORA }}
                    >
                      {active.word}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
            </motion.div>

            {/* Feature tab strip */}
            <motion.div variants={entrance.item} className="w-full max-w-4xl">
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {FEATURES.map(f => {
                  const FIcon = f.Icon
                  const isActive = displayId === f.id
                  return (
                    <button
                      key={f.id}
                      onClick={() => { setActiveId(f.id); setHoveredId(null) }}
                      onMouseEnter={() => setHoveredId(f.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
                      style={isActive ? {
                        background: AURORA,
                        color: '#fff',
                        boxShadow: '0 2px 14px rgba(15,155,116,0.32)',
                      } : {
                        background: 'rgba(255,255,255,0.04)',
                        color: '#64748b',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <FIcon className="w-3 h-3 flex-shrink-0" />
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Large feature widget */}
            <motion.div variants={entrance.item} className="w-full max-w-4xl">
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(#0c1426, #0c1426) padding-box, linear-gradient(135deg, #0f9b74, #06b6d4, #8b5cf6) border-box',
                  border: '1px solid transparent',
                  boxShadow: '0 0 60px rgba(15,155,116,0.10), 0 0 120px rgba(6,182,212,0.05), 0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* Top edge glow */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px opacity-75"
                  style={{ background: AURORA }} />

                <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr]">
                  {/* Info panel */}
                  <div className="p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/6 min-h-[260px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.28 }}
                      >
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                          style={{ background: 'rgba(15,155,116,0.15)', color: '#0f9b74' }}
                        >
                          <ActiveIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{active.label}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{active.desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${active.id}-stats`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-wrap gap-2 mt-5"
                      >
                        {active.stats.map(s => (
                          <span
                            key={s.label}
                            className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-xl"
                            style={{
                              color: s.color,
                              background: `${s.color}12`,
                              border: `1px solid ${s.color}25`,
                            }}
                          >
                            {s.label}
                          </span>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Graphic panel */}
                  <div
                    className="relative overflow-hidden"
                    style={{ background: 'rgba(8,13,24,0.35)', minHeight: '260px' }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at 70% 25%, rgba(15,155,116,0.05), transparent 60%)' }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${active.id}-graphic`}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="h-full w-full"
                      >
                        <ActiveGraphic />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={entrance.item} className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="group flex items-center gap-2 px-7 py-3 text-sm font-bold rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: AURORA, boxShadow: '0 4px 24px rgba(15,155,116,0.30)' }}
              >
                Start a project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#capabilities"
                className="flex items-center gap-2 px-7 py-3 bg-white/5 hover:bg-white/8 text-slate-300 hover:text-white text-sm font-bold rounded-xl border border-white/8 hover:border-white/15 transition-all duration-200"
              >
                Explore capabilities
              </a>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[10px] text-slate-700 tracking-[0.22em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-slate-700" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
