import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Cpu, Target, TrendingUp } from 'lucide-react'

const PILLARS = [
  {
    Icon: Layers,
    title: 'Custom by default',
    description:
      'Every system Parallax builds is engineered from scratch for your business — not assembled from drag-and-drop builders or pre-made templates.',
    color: '#3b82f6',
  },
  {
    Icon: Cpu,
    title: 'Built for scale',
    description:
      'Systems designed to grow with your business, from 100 users to 100,000 — without the pain of re-architecting when you hit limits.',
    color: '#8b5cf6',
  },
  {
    Icon: Target,
    title: 'Designed around operations',
    description:
      'Infrastructure shaped by how your business actually works — your workflows, your data, your team — not the other way around.',
    color: '#06b6d4',
  },
  {
    Icon: TrendingUp,
    title: 'Engineered for growth',
    description:
      'Beyond a launch. Systems that evolve with your business, support new channels, and become a long-term competitive advantage.',
    color: '#10b981',
  },
]

export default function WhyParallax() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section className="py-28 px-6 bg-[#09091a]/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-violet-400 tracking-[0.2em] uppercase">Why Parallax</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Beyond typical development.
          </h2>
          <p className="mt-4 text-slate-400 max-w-md mx-auto leading-relaxed">
            Parallax is not a freelancer, an agency, or a no-code builder. It is a systems infrastructure partner for businesses that demand more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((pillar, i) => {
            const ref = useRef(null)
            const inView = useInView(ref, { once: true, margin: '-40px' })
            return (
              <motion.div
                key={pillar.title}
                ref={ref}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative p-8 bg-[#0e0e1c] border border-white/6 rounded-2xl overflow-hidden group"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${pillar.color}50, transparent)` }}
                />
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${pillar.color}18`, color: pillar.color }}
                >
                  <pillar.Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
