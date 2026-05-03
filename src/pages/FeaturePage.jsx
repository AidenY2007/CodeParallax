import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { getFeatureBySlug, FEATURES } from '../data/features'
import { useStartProject } from '../hooks/useStartProject'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

const ease = [0.21, 0.47, 0.32, 0.98]

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export default function FeaturePage() {
  const { slug } = useParams()
  const feature = getFeatureBySlug(slug)

  if (!feature) return <Navigate to="/" replace />

  const { Icon, title, tagline, description, color, features, approach, useCases } = feature

  const startProject = useStartProject()
  const currentIndex = FEATURES.findIndex(f => f.slug === slug)
  const prev = FEATURES[currentIndex - 1] ?? null
  const next = FEATURES[currentIndex + 1] ?? null

  return (
    <div className="min-h-screen bg-[#080d18] text-white">

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: `${color}18` }}
        />

        <div className="relative max-w-4xl mx-auto">
          <FadeUp>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
              style={{ background: `${color}18`, border: `1px solid ${color}30` }}
            >
              <Icon className="w-7 h-7" style={{ color }} />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color }}>
              Capability
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl font-semibold text-slate-300 mb-6 leading-relaxed max-w-2xl">
              {tagline}
            </p>
            <p className="text-slate-400 leading-relaxed max-w-2xl text-base">
              {description}
            </p>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="flex flex-wrap gap-3 mt-10">
              <button
                onClick={startProject}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: AURORA, boxShadow: '0 8px 24px rgba(15,155,116,0.22)' }}
              >
                Start a project
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-white mb-2">What's included</h2>
            <p className="text-slate-500 mb-12">Every engagement includes these capabilities, built to production standard.</p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map(({ Icon: FIcon, title: ftitle, desc }, i) => (
              <FadeUp key={ftitle} delay={0.06 * i}>
                <div
                  className="p-5 rounded-2xl border border-white/[0.06] bg-[#0c1426] group hover:border-white/[0.12] transition-colors duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}14`, color }}
                  >
                    <FIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{ftitle}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Approach + use cases */}
      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">

          <FadeUp>
            <h2 className="text-xl font-bold text-white mb-8">Our approach</h2>
            <div className="space-y-0">
              {approach.map((step, i) => (
                <div key={step.num} className="flex gap-4 relative">
                  {/* Connecting line */}
                  {i < approach.length - 1 && (
                    <div
                      className="absolute left-[15px] top-8 bottom-0 w-px"
                      style={{ background: `linear-gradient(to bottom, ${color}30, transparent)` }}
                    />
                  )}
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono"
                      style={{ background: `${color}14`, color, border: `1px solid ${color}28` }}
                    >
                      {step.num}
                    </div>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2 className="text-xl font-bold text-white mb-6">Common use cases</h2>
            <ul className="space-y-3">
              {useCases.map(uc => (
                <li key={uc} className="flex items-start gap-3 text-sm text-slate-400">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                  {uc}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Ready to build your {title} system?
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Every engagement starts with a conversation. Tell us what you're building and we'll scope the right solution.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: AURORA, boxShadow: '0 10px 32px rgba(15,155,116,0.22)' }}
            >
              Start a project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Prev / Next nav */}
      {(prev || next) && (
        <section className="py-12 px-6 border-t border-white/[0.05]">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            {prev ? (
              <Link
                to={`/features/${prev.slug}`}
                className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-700 mb-0.5">Previous</div>
                  <div className="text-sm font-semibold">{prev.title}</div>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                to={`/features/${next.slug}`}
                className="flex items-center gap-3 text-right text-slate-500 hover:text-white transition-colors group"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-700 mb-0.5">Next</div>
                  <div className="text-sm font-semibold">{next.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </section>
      )}
    </div>
  )
}
