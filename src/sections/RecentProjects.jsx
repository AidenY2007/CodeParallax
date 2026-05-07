import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Send } from 'lucide-react'
import flyParallaxAd from '../assets/FlyParallaxAd.mov'

const MotionDiv = motion.div

const MESSAGES = [
  { side: 'right', text: 'Hi this is Aiden from Teen Line! What is your name?' },
  { side: 'left',  text: "hey aiden, i'm aisha" },
  { side: 'right', text: 'What would you like to discuss today?' },
  { side: 'left',  text: "idk, i guess i just feel kinda overwhelmed rn" },
  { side: 'right', text: 'Is something specific on your mind?' },
  { side: 'left',  text: "yeah, i think i mightve messed everything up" },
  { side: 'right', text: "It's okay to feel that way. Let's create a course of action to feel better." },
  { side: 'left',  text: "idk if there's anything i can do tbh. it's just a lot and i feel stuck" },
]

const NOTE_TEXT = "After hearing Aisha describe feeling overwhelmed, stuck, and blaming herself, my goal is to create a safe and supportive space where she feels heard and understood. I'll focus on validating her emotions and reflecting back on what she is experiencing to build trust and encourage deeper sharing. I aim to avoid rushing into solutions and instead help her process her feelings and identify what is contributing to her distress. From there, my goal is to gently guide her toward manageable next steps once she feels more grounded."

function ReplylineVisual() {
  return (
    <div
      className="rounded-xl overflow-hidden mt-3 mb-0 flex flex-col"
      style={{ background: '#f1f5f9', border: '1px solid rgba(0,0,0,0.07)', height: 416 }}
    >
      {/* App header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.07] bg-white/80">
        <div>
          <p className="text-[7px] font-bold tracking-[0.15em] uppercase text-slate-400">Practice Session</p>
          <p className="text-[10px] font-bold text-slate-700 leading-tight">Sexual health</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full border border-emerald-300 text-emerald-600 bg-emerald-50">
            Implemented
          </span>
          <span className="text-[8px] font-semibold text-slate-600">Complete session</span>
        </div>
      </div>

      {/* Two-panel body */}
      <div className="flex flex-1" style={{ minHeight: 0 }}>
        {/* Left: chat */}
        <div className="flex flex-col flex-1 border-r border-black/[0.07]" style={{ minWidth: 0 }}>
          <div className="flex-1 px-2.5 pt-2.5 pb-1.5 space-y-1.5 overflow-y-auto">
            {MESSAGES.map((msg, i) => (
              <div key={i} className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="text-[9px] leading-relaxed px-2.5 py-1 rounded-2xl max-w-[75%]"
                  style={
                    msg.side === 'right'
                      ? { background: 'linear-gradient(135deg, #93c5fd, #60a5fa)', color: '#fff', borderBottomRightRadius: 3 }
                      : { background: '#fff', color: '#334155', border: '1px solid rgba(0,0,0,0.08)', borderBottomLeftRadius: 3 }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {/* Input */}
          <div className="flex items-center gap-1.5 px-2.5 py-2 border-t border-black/[0.07] bg-white/60">
            <div className="flex-1 text-[9px] text-slate-400 bg-white border border-black/[0.08] rounded-xl px-2.5 py-1.5">
              Type your response... (Enter to send)
            </div>
            <div
              className="px-2.5 py-1 rounded-xl flex-shrink-0 text-[9px] font-semibold text-white"
              style={{ background: '#7ab8f5' }}
            >
              Send
            </div>
          </div>
        </div>

        {/* Right: session notes */}
        <div className="flex flex-col bg-white" style={{ width: '40%', minWidth: 0 }}>
          <div className="px-3 pt-3 pb-2 border-b border-black/[0.06]">
            <p className="text-[8px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-0.5">Session Notes</p>
            <p className="text-[8px] text-slate-400">Keep track of what's happening in the conversation.</p>
          </div>
          <div className="px-3 pt-2 pb-1 flex flex-col gap-2 flex-1 overflow-hidden">
            <div className="text-[9px] font-medium text-slate-700 bg-white border border-black/[0.1] rounded-xl px-2.5 py-1.5 shadow-sm">
              Aisha's Opening Talk
            </div>
            <div className="text-[8px] text-slate-600 leading-relaxed bg-white border border-black/[0.1] rounded-xl px-2.5 py-2 flex-1 overflow-hidden shadow-sm">
              {NOTE_TEXT}
            </div>
          </div>
          <div className="px-3 py-2 border-t border-black/[0.06]">
            <div
              className="w-full text-center text-[8px] font-semibold py-1.5 rounded-xl text-white shadow-sm"
              style={{ background: '#7ab8f5' }}
            >
              Save and create new note
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlyParallaxVisual() {
  return (
    <div className="mt-3 mb-0 flex justify-center items-center" style={{ height: 416 }}>
      <video
        src={flyParallaxAd}
        autoPlay
        loop
        muted
        playsInline
        style={{
          height: '100%',
          width: 'auto',
          display: 'block',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />
    </div>
  )
}

const PROJECTS = [
  {
    name: 'FlyParallax',
    url: 'flyparallax.com',
    href: 'https://flyparallax.com',
    description:
      'FlyParallax is an AI travel concierge designed to optimize its clients’ booking experience through streamlined flight discovery and personalized travel research.',
    accent: '#0f9b74',
    status: 'Live',
    Visual: FlyParallaxVisual,
  },
  {
    name: 'Replyline',
    url: 'replyline.org',
    href: 'https://replyline.org',
    description:
      'Replyline is an AI-powered training platform designed to help mental health professionals develop experience communicating with distressed teens across a wide range of sensitive and emotionally complex situations.',
    accent: '#06b6d4',
    status: 'Live',
    Visual: ReplylineVisual,
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-[#0b1120]/80 p-8 overflow-hidden transition-colors duration-300 hover:border-white/[0.14]"
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 0%, ${project.accent}18 0%, transparent 65%)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span
              className="text-[10px] font-semibold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border"
              style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}12` }}
            >
              {project.status}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">{project.name}</h3>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-slate-500 hover:text-slate-300 mt-0.5 block transition-colors"
          >
            {project.url}
          </a>
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-200 hover:border-white/20 hover:text-white hover:bg-white/[0.08] flex-shrink-0"
          aria-label={`Visit ${project.name}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Description */}
      <p className="text-slate-400 leading-relaxed text-sm flex-1 mb-4 relative">
        {project.description}
      </p>

      {/* Dynamic visual */}
      {project.Visual && <project.Visual />}

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }}
      />
    </MotionDiv>
  )
}

export default function RecentProjects() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <MotionDiv
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Recent projects we've shipped.
          </h2>
          <p className="mt-4 text-slate-400 max-w-md mx-auto leading-relaxed">
            See what Parallax can create for your business.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
