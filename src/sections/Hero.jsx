import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

const CODE_LINES = [
  { text: '// Parallax Systems — v2.1.0', color: '#374151' },
  { text: 'import { parallax } from "@parallax/core"', color: '#6b7280' },
  { text: '', color: '' },
  { text: 'const app = await parallax.init({', color: '#eeeef5' },
  { text: '  auth:       { provider: "firebase" },', color: '#818cf8' },
  { text: '  payments:   { gateway: "stripe" },', color: '#34d399' },
  { text: '  ai:         { model: "gpt-4-turbo" },', color: '#8b5cf6' },
  { text: '  automation: { triggers: "realtime" },', color: '#06b6d4' },
  { text: '  analytics:  { tracking: true },', color: '#f59e0b' },
  { text: '})', color: '#eeeef5' },
  { text: '', color: '' },
  { text: '// 9 systems initialized. Ready.', color: '#374151' },
]

function CodePanel() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible < CODE_LINES.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 100)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <div className="relative animate-float">
      <div className="absolute -inset-6 bg-gradient-to-br from-blue-600/15 via-violet-600/10 to-transparent rounded-3xl blur-3xl pointer-events-none animate-glow-pulse" />

      <div className="relative bg-[#0b0b18] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
        <div className="flex items-center gap-1.5 px-4 py-3.5 bg-[#0e0e1e] border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-auto text-[11px] text-slate-600 font-mono tracking-wide">parallax.config.js</span>
        </div>

        <div className="p-5 font-mono text-[13px] leading-6 min-h-[268px]">
          {CODE_LINES.slice(0, visible).map((line, i) => (
            <div key={i} style={{ color: line.color || 'transparent' }}>
              {line.text || '\u00A0'}
            </div>
          ))}
          {visible < CODE_LINES.length && (
            <span className="inline-block w-[7px] h-[14px] bg-blue-500 animate-blink align-middle" />
          )}
        </div>
      </div>

      <div className="absolute -bottom-3 -right-3 flex items-center gap-2 px-3 py-2 bg-[#0e0e1e] border border-white/8 rounded-xl shadow-xl">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] text-slate-400 font-mono">9 systems active</span>
      </div>

      <div className="absolute -top-3 -left-3 flex items-center gap-2 px-3 py-2 bg-[#0e0e1e] border border-white/8 rounded-xl shadow-xl">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <span className="text-[11px] text-slate-400 font-mono">parallax.io</span>
      </div>
    </div>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[100px] animate-glow-pulse-slow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-700/8 rounded-full blur-[100px] animate-glow-pulse-slow"
        style={{ animationDelay: '2s' }}
      />
    </div>
  )
}

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] } },
  },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <GridBackground />

      <div className="relative max-w-7xl mx-auto px-6 w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={stagger.item}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-widest uppercase">
              <Zap className="w-3 h-3" />
              Premium Systems Infrastructure
            </span>
          </motion.div>

          <motion.h1
            variants={stagger.item}
            className="text-5xl lg:text-6xl xl:text-[68px] font-extrabold leading-[1.04] tracking-tight text-white"
          >
            Infrastructure for{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #67e8f9 100%)',
              }}
            >
              modern businesses
            </span>
          </motion.h1>

          <motion.p variants={stagger.item} className="text-lg text-slate-400 leading-relaxed max-w-lg">
            Parallax designs and builds the systems modern businesses run on — authentication, payments, AI, automation, analytics, APIs, databases, email, and SMS.
          </motion.p>

          <motion.div variants={stagger.item} className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#capabilities"
              className="flex items-center gap-2 px-6 py-3 bg-white/4 hover:bg-white/7 text-slate-300 hover:text-white text-sm font-bold rounded-xl border border-white/8 hover:border-white/15 transition-all duration-200"
            >
              Explore capabilities
            </a>
          </motion.div>

          <motion.div variants={stagger.item} className="flex items-center gap-8 pt-2">
            {[
              { value: '9', label: 'Core systems' },
              { value: '100%', label: 'Custom built' },
              { value: '∞', label: 'Scalable' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-slate-600 mt-0.5 tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative hidden lg:block"
        >
          <CodePanel />
        </motion.div>
      </div>
    </section>
  )
}
