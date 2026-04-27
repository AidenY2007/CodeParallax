import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

const PROJECTS = [
  {
    name: 'Replyline',
    url: 'replyline.org',
    href: 'https://replyline.org',
    description:
      'A modern communication platform built for teams that need structured, async-first messaging with intelligent routing and response tracking.',
    tags: ['Platform', 'Messaging', 'AI'],
    accent: '#0f9b74',
    status: 'Live',
  },
  {
    name: 'FlyParallax',
    url: 'flyparallax.com',
    href: 'https://flyparallax.com',
    description:
      'An aviation-focused operations system delivering real-time flight data, crew coordination tools, and logistics management for charter operators.',
    tags: ['Aviation', 'Operations', 'Real-time'],
    accent: '#06b6d4',
    status: 'Live',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
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
          <span className="text-sm font-mono text-slate-500 mt-0.5 block">{project.url}</span>
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
      <p className="text-slate-400 leading-relaxed text-sm flex-1 mb-6 relative">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 relative">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/[0.07] bg-white/[0.03] text-slate-500"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }}
      />
    </motion.div>
  )
}

export default function RecentProjects() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ backgroundImage: AURORA, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}
          >
            Recent Work
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Projects we've shipped.
          </h2>
          <p className="mt-4 text-slate-400 max-w-md mx-auto leading-relaxed">
            A look at some of the systems we've built — each one designed around the specific operations and goals of the client.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
