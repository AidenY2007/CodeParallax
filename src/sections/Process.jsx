import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Strategy',
    description: 'Understand your business, goals, and existing systems. Define scope, architecture, and roadmap.',
    color: '#3b82f6',
  },
  {
    number: '02',
    title: 'Build',
    description: 'Engineer the system with precision — clean code, modern tooling, and production-grade quality.',
    color: '#8b5cf6',
  },
  {
    number: '03',
    title: 'Launch',
    description: 'Deploy with confidence. Full QA, staging environments, and seamless production rollout.',
    color: '#06b6d4',
  },
  {
    number: '04',
    title: 'Evolve',
    description: 'Grow your platform over time. New features, integrations, and systems as your business expands.',
    color: '#10b981',
  },
]

export default function Process() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-[0.2em] uppercase">Process</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            How it works.
          </h2>
          <p className="mt-4 text-slate-400 max-w-sm mx-auto leading-relaxed">
            A focused, structured process that delivers real systems — on time, at quality.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent hidden md:block" />

          {STEPS.map((step, i) => {
            const ref = useRef(null)
            const inView = useInView(ref, { once: true, margin: '-40px' })
            return (
              <motion.div
                key={step.number}
                ref={ref}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative flex flex-col items-start md:items-center text-left md:text-center"
              >
                <div
                  className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border"
                  style={{
                    background: `${step.color}15`,
                    borderColor: `${step.color}25`,
                    color: step.color,
                  }}
                >
                  <span className="text-lg font-extrabold font-mono">{step.number}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
