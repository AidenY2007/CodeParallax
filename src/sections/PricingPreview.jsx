import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

const TIERS = [
  {
    name: 'Starter',
    from: '$3,500',
    description: 'A single focused system for businesses getting started with custom infrastructure.',
    features: ['1 core system', 'Firebase auth', 'Basic admin panel', 'Launch support', '30-day warranty'],
    color: '#3b82f6',
    highlighted: false,
  },
  {
    name: 'Growth',
    from: '$8,500',
    description: 'Multiple integrated systems for businesses ready to operate at a higher level.',
    features: ['3–5 core systems', 'Payments integration', 'Custom dashboards', 'Priority support', '60-day warranty', 'Automation workflows'],
    color: '#8b5cf6',
    highlighted: true,
  },
  {
    name: 'Platform',
    from: '$18,000+',
    description: 'A full-stack business platform built to your exact operating model.',
    features: ['All 9 systems', 'AI integration', 'Custom analytics', 'Dedicated build team', '90-day warranty', 'Evolve retainer available'],
    color: '#06b6d4',
    highlighted: false,
  },
]

export default function PricingPreview() {
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
          <span className="text-xs font-semibold text-emerald-400 tracking-[0.2em] uppercase">Pricing</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Custom systems. Transparent investment.
          </h2>
          <p className="mt-4 text-slate-400 max-w-md mx-auto leading-relaxed">
            Every project is scoped individually. These tiers reflect typical investment ranges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier, i) => {
            const ref = useRef(null)
            const inView = useInView(ref, { once: true, margin: '-40px' })
            return (
              <motion.div
                key={tier.name}
                ref={ref}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`relative flex flex-col p-7 rounded-2xl border overflow-hidden ${
                  tier.highlighted
                    ? 'bg-[#0e0e1c] border-violet-500/30 shadow-2xl shadow-violet-500/10'
                    : 'bg-[#0e0e1c] border-white/6'
                }`}
              >
                {tier.highlighted && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }}
                  />
                )}
                {tier.highlighted && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                    Popular
                  </span>
                )}

                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: tier.color }}
                >
                  {tier.name}
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-xs text-slate-600">from</span>
                  <span className="text-3xl font-extrabold text-white">{tier.from}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{tier.description}</p>

                <ul className="space-y-2.5 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tier.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="group flex items-center justify-center gap-2 mt-8 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border"
                  style={
                    tier.highlighted
                      ? {
                          background: tier.color,
                          borderColor: tier.color,
                          color: '#fff',
                        }
                      : {
                          background: 'transparent',
                          borderColor: `${tier.color}30`,
                          color: tier.color,
                        }
                  }
                >
                  Get a quote
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-slate-600 mt-8"
        >
          All projects are scoped individually. Contact us for a custom quote.
        </motion.p>
      </div>
    </section>
  )
}
