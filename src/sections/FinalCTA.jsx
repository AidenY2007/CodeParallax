import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.04) 100%)',
            }}
          />
          <div
            className="absolute inset-0 rounded-3xl border border-white/8"
            style={{
              boxShadow: '0 0 60px rgba(59,130,246,0.07), 0 0 120px rgba(139,92,246,0.05)',
            }}
          />

          <div
            className="absolute top-0 left-1/4 right-1/4 h-px opacity-60"
            style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)' }}
          />
          <div
            className="absolute bottom-0 left-1/3 right-1/3 h-px opacity-40"
            style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }}
          />

          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-32 opacity-20 blur-3xl rounded-full pointer-events-none animate-glow-pulse"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
          />

          <div className="relative text-center py-20 px-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-semibold text-blue-400 tracking-[0.2em] uppercase mb-5"
            >
              Join the Parallax network
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-6"
            >
              Build with{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #a78bfa, #67e8f9)' }}
              >
                Parallax
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            >
              Enter the network. Tell us what you're building — we'll respond within one business day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-2xl transition-all duration-200 shadow-xl shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
              >
                Start a project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/pricing"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/4 hover:bg-white/7 text-slate-300 hover:text-white text-sm font-bold rounded-2xl border border-white/8 hover:border-white/15 transition-all duration-200"
              >
                View pricing
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
