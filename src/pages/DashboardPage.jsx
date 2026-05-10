import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { LogOut, FolderOpen, Clock, CheckCircle, Circle, ArrowUpRight, Plus, Mail } from 'lucide-react'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { useStartProject } from '../hooks/useStartProject'
import parallaxLogo from '../assets/ParallaxLogo.png'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'
const MotionDiv = motion.div

const STATUS_CONFIG = {
  planning:    { label: 'Planning',     color: '#94a3b8', Icon: Circle },
  in_progress: { label: 'In Progress',  color: '#67e8f9', Icon: Clock },
  completed:   { label: 'Completed',    color: '#0f9b74', Icon: CheckCircle },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.planning
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
      style={{ color: cfg.color, background: `${cfg.color}18`, border: `1px solid ${cfg.color}28` }}
    >
      <cfg.Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  )
}

export default function DashboardPage() {
  const { user, logOut } = useAuth()
  const startProject = useStartProject()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)

  useEffect(() => {
    if (!user) return

    const codeUnsubs = new Map()
    const projectData = new Map()

    const userUnsub = onSnapshot(
      collection(db, 'users', user.uid, 'projects'),
      (snap) => {
        const codes = snap.docs.map(d => d.id)

        // Clean up listeners for removed projects
        for (const [code, unsub] of codeUnsubs) {
          if (!codes.includes(code)) {
            unsub()
            codeUnsubs.delete(code)
            projectData.delete(code)
          }
        }

        if (codes.length === 0) {
          setProjects([])
          setLoadingProjects(false)
          return
        }

        // Add live listeners for each projectCode document
        codes.forEach(code => {
          if (codeUnsubs.has(code)) return
          const unsub = onSnapshot(doc(db, 'projectCodes', code), (codeSnap) => {
            if (codeSnap.exists()) {
              projectData.set(code, { id: code, code, ...codeSnap.data() })
            }
            setProjects([...projectData.values()].sort((a, b) =>
              (b.createdAt?.toDate?.() ?? 0) - (a.createdAt?.toDate?.() ?? 0)
            ))
            setLoadingProjects(false)
          })
          codeUnsubs.set(code, unsub)
        })
      },
      () => { setProjects([]); setLoadingProjects(false) },
    )

    return () => {
      userUnsub()
      codeUnsubs.forEach(unsub => unsub())
    }
  }, [user])

  async function handleLogOut() {
    await logOut()
    navigate('/')
  }

  const firstName = user?.displayName?.split(' ')[0] ?? 'there'

  function greeting() {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Topbar */}
      <header className="border-b border-white/[0.06] bg-[#080d18]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={parallaxLogo} alt="Parallax" className="h-7 w-auto object-contain" />
            <span className="text-sm font-bold tracking-tight text-white">Parallax</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-white">{user?.displayName ?? user?.email}</div>
              <div className="text-xs text-slate-500">{user?.email}</div>
            </div>
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-white/5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-14">
        {/* Greeting */}
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-7"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2">Client Portal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {greeting()}, {firstName}!
          </h1>
          <p className="mt-2 text-slate-400">Access your projects & invoices below.</p>
        </MotionDiv>

        {/* Contact card */}
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-1">Need assistance?</p>
            <p className="text-sm text-slate-300">Reach out to us anytime and we'll get back to you within 24 hours.</p>
          </div>
          <a
            href="mailto:codeparallaxservices@gmail.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 border border-white/[0.10] bg-white/[0.04] whitespace-nowrap transition-colors hover:bg-white/[0.08] hover:text-white flex-shrink-0"
          >
            <Mail className="w-4 h-4" />
            codeparallaxservices@gmail.com
          </a>
        </MotionDiv>

        {/* Projects header */}
        {!loadingProjects && projects.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Your projects</h2>
            <button
              onClick={startProject}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: AURORA }}
            >
              <Plus className="w-4 h-4" />
              Add project
            </button>
          </div>
        )}

        {/* Projects */}
        {loadingProjects ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
              <FolderOpen className="w-7 h-7 text-slate-600" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">No projects yet</h2>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-7">
              Your projects will appear here once your engagement with Parallax begins.
            </p>
            <button
              onClick={startProject}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: AURORA, boxShadow: '0 8px 24px rgba(15,155,116,0.22)' }}
            >
              Add new project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </MotionDiv>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((project, i) => (
              <MotionDiv
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                onClick={() => navigate(`/dashboard/project/${project.code ?? project.id}`)}
                className="p-6 bg-[#0c1426] border border-white/[0.06] rounded-2xl hover:border-white/[0.12] hover:bg-white/[0.02] transition-colors duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-base font-bold text-white leading-tight pr-4">{project.name}</h3>
                  <StatusBadge status={project.status} />
                </div>
                {project.description && (
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>
                )}
                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </MotionDiv>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}
