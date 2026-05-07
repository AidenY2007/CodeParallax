import { Compass, Code2, Rocket, TrendingUp } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    title: 'Strategize',
    description: 'Our clients present their business, goals, and existing systems. We define the scope, architecture, and roadmap.',
    color: '#0f9b74',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Execute',
    description: 'We engineer the system to production-grade quality. Built for reliability, scalability, and long-term performance.',
    color: '#06b6d4',
    icon: Code2,
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'We seamlessly launch the system into production. Every release is tested and delivered with performance and reliability as top priorities.',
    color: '#3b82f6',
    icon: Rocket,
  },
  {
    number: '04',
    title: 'Scale',
    description: 'We scale the system as your business expands. It is continuously refined to remain at the forefront of technological advancement.',
    color: '#8b5cf6',
    icon: TrendingUp,
  },
]

// Progressive: brand green → cyan → blue → single violet
const TRACK_GRADIENT = 'linear-gradient(90deg, #0f9b74, #06b6d4 33%, #3b82f6 66%, #8b5cf6)'
const TRACK_GRADIENT_V = 'linear-gradient(180deg, #0f9b74, #06b6d4 33%, #3b82f6 66%, #8b5cf6)'

export default function Process() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
<h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Parallax blueprint.
          </h2>
          <p className="mt-2 text-slate-400 max-w-md mx-auto leading-relaxed">
            A structured process that efficiently delivers quality systems.
          </p>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden md:grid grid-cols-4 gap-5 relative">

          {/* Horizontal track */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '27px',
              left: 'calc(12.5%)',
              right: 'calc(12.5%)',
              height: '2px',
              background: TRACK_GRADIENT,
              boxShadow: '0 0 12px rgba(6,182,212,0.45), 0 0 32px rgba(6,182,212,0.15)',
            }}
          />

          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="flex flex-col items-center">

                {/* Node */}
                <div
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center border-2 flex-shrink-0"
                  style={{
                    background: '#060c18',
                    borderColor: step.color,
                    boxShadow: `0 0 0 4px ${step.color}18, 0 0 18px ${step.color}40`,
                  }}
                >
                  <span className="text-sm font-black font-mono" style={{ color: step.color }}>
                    {step.number}
                  </span>
                </div>

                {/* Stem: direct visual link from node to card */}
                <div
                  className="w-[2px] h-6 flex-shrink-0"
                  style={{ background: `linear-gradient(180deg, ${step.color}, ${step.color}30)` }}
                />

                {/* Card */}
                <div
                  className="rounded-2xl flex flex-col flex-1 w-full"
                  style={{
                    background: 'linear-gradient(150deg, rgba(12,20,36,0.95) 0%, rgba(6,10,20,0.98) 100%)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                      style={{
                        background: `${step.color}16`,
                        border: `1px solid ${step.color}30`,
                        color: step.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="md:hidden relative pl-16">
          {/* Vertical track */}
          <div
            className="absolute left-[27px] top-4 bottom-4 w-[2px] rounded-full"
            style={{
              background: TRACK_GRADIENT_V,
              boxShadow: '0 0 10px rgba(6,182,212,0.35)',
            }}
          />

          <div className="flex flex-col gap-8">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="flex items-start gap-5">
                  {/* Node */}
                  <div
                    className="absolute left-0 w-14 h-14 rounded-full flex items-center justify-center border-2 flex-shrink-0 z-10"
                    style={{
                      background: '#060c18',
                      borderColor: step.color,
                      boxShadow: `0 0 0 4px ${step.color}18, 0 0 18px ${step.color}40`,
                    }}
                  >
                    <span className="text-sm font-black font-mono" style={{ color: step.color }}>
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-2xl flex-1"
                    style={{
                      background: 'linear-gradient(150deg, rgba(12,20,36,0.95) 0%, rgba(6,10,20,0.98) 100%)',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                    }}
                  >
                    <div className="p-5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: `${step.color}16`, border: `1px solid ${step.color}30`, color: step.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
