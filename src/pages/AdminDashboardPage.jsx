import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  collection, getDocs, doc, setDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore'
import {
  LogOut, Plus, X, Users, FolderOpen, Copy, Check,
  RefreshCw, Trash2, ChevronDown, ChevronUp, Pencil, ReceiptText,
  Inbox, Mail, Phone, Tag,
} from 'lucide-react'
import { httpsCallable } from 'firebase/functions'
import { db, functions } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import parallaxLogo from '../assets/ParallaxLogo.png'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'
const MotionDiv = motion.div

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

const STATUS_OPTIONS = ['in_progress', 'completed']
const STATUS_LABELS  = { planning: 'Planning', in_progress: 'In Progress', completed: 'Completed' }
const STATUS_COLORS  = { planning: '#94a3b8', in_progress: '#67e8f9', completed: '#0f9b74' }

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="text-slate-500 hover:text-white transition-colors ml-1.5">
      {copied ? <Check className="w-3.5 h-3.5 text-[#0f9b74]" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] ?? '#94a3b8'
  return (
    <span className="inline-flex items-center justify-center text-[11px] font-semibold px-2.5 py-1 rounded-full"
      style={{ color, background: `${color}18`, border: `1px solid ${color}28` }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

export default function AdminDashboardPage() {
  const { logOut } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('projects')

  // Projects state
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)

  // Users state
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [expandedUser, setExpandedUser] = useState(null)
  const [userProjects, setUserProjects] = useState({})
  const [editingUserId, setEditingUserId] = useState(null)
  const [editUserForm, setEditUserForm] = useState({})
  const [savingUser, setSavingUser] = useState(false)
  const [saveUserError, setSaveUserError] = useState('')

  // Messages state
  const [messages, setMessages] = useState([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [expandedMsg, setExpandedMsg] = useState(null)

  // Create project form
  const [form, setForm] = useState({ name: '', clientName: '', description: '', status: 'in_progress' })
  const [creating, setCreating] = useState(false)
  const [newCode, setNewCode] = useState(null)
  const [formError, setFormError] = useState('')

  // Edit project
  const [editOpen, setEditOpen] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', clientName: '', description: '', status: 'in_progress' })
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Invoices state
  const [allInvoices, setAllInvoices] = useState([])
  const [loadingInvoices, setLoadingInvoices] = useState(false)
  const [invoiceFormOpen, setInvoiceFormOpen] = useState(false)
  const [invoiceForm, setInvoiceForm] = useState({ projectCode: '', description: '', amount: '', dueDate: todayStr() })
  const [creatingInvoice, setCreatingInvoice] = useState(false)
  const [invoiceError, setInvoiceError] = useState('')

  useEffect(() => { loadProjects() }, [])

  async function loadProjects() {
    setLoadingProjects(true)
    try {
      const q = query(collection(db, 'projectCodes'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      const projectList = snap.docs.map(d => ({ id: d.id, ...d.data() }))

      // Build a reverse map: projectCode → client info from users' subcollections
      const usersSnap = await getDocs(collection(db, 'users'))
      const clientMap = {}
      await Promise.all(
        usersSnap.docs
          .filter(u => u.data().email !== 'aidenyasharian@gmail.com')
          .map(async u => {
            const projSnap = await getDocs(collection(db, 'users', u.id, 'projects'))
            const userData = u.data()
            projSnap.docs.forEach(p => {
              clientMap[p.id] = userData.displayName || userData.email || '—'
            })
          })
      )

      setProjects(projectList.map(p => ({
        ...p,
        clientName: p.clientName || clientMap[p.id] || '',
      })))
    } catch { setProjects([]) }
    finally { setLoadingProjects(false) }
  }

  async function loadUsers() {
    setLoadingUsers(true)
    try {
      const snap = await getDocs(collection(db, 'users'))
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(u => u.email !== 'aidenyasharian@gmail.com'))
    } catch { setUsers([]) }
    finally { setLoadingUsers(false) }
  }

  async function loadUserProjects(uid) {
    if (userProjects[uid]) return
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'projects'))
      setUserProjects(prev => ({ ...prev, [uid]: snap.docs.map(d => ({ id: d.id, ...d.data() })) }))
    } catch {
      setUserProjects(prev => ({ ...prev, [uid]: [] }))
    }
  }

  async function loadMessages() {
    setLoadingMessages(true)
    try {
      const snap = await getDocs(query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc')))
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {
      setMessages([])
    } finally {
      setLoadingMessages(false)
    }
  }

  async function markRead(id) {
    await updateDoc(doc(db, 'contactMessages', id), { read: true })
    setMessages(ms => ms.map(m => m.id === id ? { ...m, read: true } : m))
  }

  async function deleteMessage(id) {
    await deleteDoc(doc(db, 'contactMessages', id))
    setMessages(ms => ms.filter(m => m.id !== id))
    if (expandedMsg === id) setExpandedMsg(null)
  }

  function handleTabChange(t) {
    setTab(t)
    if (t === 'users' && users.length === 0) loadUsers()
    if (t === 'invoices') loadAllInvoices()
    if (t === 'messages') loadMessages()
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!form.name.trim()) { setFormError('Project name is required.'); return }
    setCreating(true)
    setFormError('')
    let code
    try {
      // Generate a unique code
      let attempts = 0
      do {
        code = generateCode()
        attempts++
      } while (projects.some(p => p.id === code) && attempts < 10)

      await setDoc(doc(db, 'projectCodes', code), {
        name: form.name.trim(),
        clientName: form.clientName.trim(),
        description: form.description.trim(),
        status: form.status,
        createdAt: serverTimestamp(),
      })
      setNewCode(code)
      setForm({ name: '', clientName: '', description: '', status: 'in_progress' })
      await loadProjects()
    } catch {
      setFormError('Failed to create project. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(code) {
    if (!confirm(`Delete project code ${code}?`)) return
    await deleteDoc(doc(db, 'projectCodes', code))
    setProjects(prev => prev.filter(p => p.id !== code))
  }

  function openEdit(p) {
    setEditProject(p)
    setEditForm({ name: p.name ?? '', clientName: p.clientName ?? '', description: p.description ?? '', status: p.status ?? 'in_progress' })
    setEditError('')
    setEditOpen(true)
  }

  async function handleEditSave(e) {
    e.preventDefault()
    if (!editForm.name.trim()) { setEditError('Project name is required.'); return }
    setEditSaving(true)
    setEditError('')
    try {
      await updateDoc(doc(db, 'projectCodes', editProject.id), {
        name: editForm.name.trim(),
        clientName: editForm.clientName.trim(),
        description: editForm.description.trim(),
        status: editForm.status,
      })
      setProjects(prev => prev.map(p =>
        p.id === editProject.id
          ? { ...p, name: editForm.name.trim(), clientName: editForm.clientName.trim(), description: editForm.description.trim(), status: editForm.status }
          : p
      ))
      setEditOpen(false)
    } catch {
      setEditError('Failed to save changes. Please try again.')
    } finally {
      setEditSaving(false)
    }
  }

  async function handleLogOut() {
    await logOut()
    navigate('/admin')
  }

  async function loadAllInvoices() {
    setLoadingInvoices(true)
    try {
      const projectsSnap = await getDocs(collection(db, 'projectCodes'))
      const all = []
      await Promise.all(projectsSnap.docs.map(async p => {
        const invSnap = await getDocs(collection(db, 'projectCodes', p.id, 'invoices'))
        invSnap.docs.forEach(d => all.push({ id: d.id, ...d.data(), projectCode: p.id, projectName: p.data().name ?? p.id }))
      }))
      all.sort((a, b) => (b.createdAt?.toDate?.() ?? 0) - (a.createdAt?.toDate?.() ?? 0))
      setAllInvoices(all)
    } catch (err) { console.error('loadAllInvoices:', err) }
    setLoadingInvoices(false)
  }

  async function handleCreateInvoiceDashboard(e) {
    e.preventDefault()
    if (!invoiceForm.projectCode || !invoiceForm.description.trim() || !invoiceForm.amount) return
    setCreatingInvoice(true)
    setInvoiceError('')
    const selectedProject = projects.find(p => p.id === invoiceForm.projectCode)
    try {
      const createInvoice = httpsCallable(functions, 'createInvoice')
      await createInvoice({
        projectCode: invoiceForm.projectCode,
        projectName: selectedProject?.name ?? '',
        description: invoiceForm.description.trim(),
        amount: parseFloat(invoiceForm.amount),
        dueDate: invoiceForm.dueDate || null,
        successUrl: `${window.location.origin}/dashboard/project/${invoiceForm.projectCode}?payment=success`,
        cancelUrl: `${window.location.origin}/dashboard/project/${invoiceForm.projectCode}`,
      })
      setInvoiceForm({ projectCode: '', description: '', amount: '', dueDate: todayStr() })
      setInvoiceFormOpen(false)
      await loadAllInvoices()
    } catch (err) {
      console.error('createInvoice:', err)
      setInvoiceError(err.message || 'Failed to create invoice.')
    }
    setCreatingInvoice(false)
  }

  async function handleDeleteInvoiceDashboard(projectCode, invoiceId) {
    if (!confirm('Delete this invoice?')) return
    try {
      await deleteDoc(doc(db, 'projectCodes', projectCode, 'invoices', invoiceId))
      setAllInvoices(prev => prev.filter(i => i.id !== invoiceId))
    } catch (err) { console.error('deleteInvoice:', err) }
  }

  const unpaidInvoices = allInvoices.filter(inv => inv.status !== 'paid')
  const paidInvoices = allInvoices.filter(inv => inv.status === 'paid')

  function renderInvoiceRow(inv, isLast = false) {
    return (
      <div key={inv.id} className={`flex items-center gap-4 px-5 py-4 ${!isLast ? 'border-b border-white/[0.04]' : ''}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white truncate">{inv.description}</span>
            <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
              inv.status === 'paid'
                ? 'text-[#0f9b74] bg-[#0f9b74]/10 border border-[#0f9b74]/20'
                : 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
            }`}>{inv.status === 'paid' ? 'Paid' : 'Unpaid'}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span
              onClick={() => navigate(`/admin/project/${inv.projectCode}`)}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer"
            >{inv.projectName || inv.projectCode}</span>
            <span className="font-semibold text-slate-400">${Number(inv.amount).toFixed(2)}</span>
            {inv.dueDate && <span>Due {inv.dueDate?.toDate ? inv.dueDate.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {inv.status !== 'paid' && (
            <button
              onClick={() => window.open(inv.stripeSessionUrl, '_blank', 'noreferrer')}
              className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-80 transition-opacity"
              style={{ background: AURORA }}
            >Pay link</button>
          )}
          <button
            onClick={() => handleDeleteInvoiceDashboard(inv.projectCode, inv.id)}
            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
          ><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>
    )
  }

  function toggleUser(uid) {
    if (expandedUser === uid) { setExpandedUser(null); return }
    setExpandedUser(uid)
    setEditingUserId(null)
    loadUserProjects(uid)
  }

  function startEditUser(u) {
    setEditUserForm({ firstName: u.firstName ?? '', lastName: u.lastName ?? '', email: u.email ?? '', displayName: u.displayName ?? '' })
    setSaveUserError('')
    setEditingUserId(u.id)
  }

  async function handleSaveUser(uid) {
    setSavingUser(true)
    setSaveUserError('')
    try {
      const displayName = `${editUserForm.firstName.trim()} ${editUserForm.lastName.trim()}`.trim() || editUserForm.displayName.trim()
      await updateDoc(doc(db, 'users', uid), {
        firstName: editUserForm.firstName.trim(),
        lastName: editUserForm.lastName.trim(),
        email: editUserForm.email.trim(),
        displayName,
      })
      setUsers(prev => prev.map(u => u.id === uid
        ? { ...u, firstName: editUserForm.firstName.trim(), lastName: editUserForm.lastName.trim(), email: editUserForm.email.trim(), displayName }
        : u
      ))
      setEditingUserId(null)
    } catch { setSaveUserError('Failed to save. Please try again.') }
    setSavingUser(false)
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Topbar */}
      <header className="border-b border-white/[0.06] bg-[#080d18]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={parallaxLogo} alt="Parallax" className="h-7 w-auto object-contain" />
              <span className="text-sm font-bold tracking-tight text-white">Parallax</span>
            </Link>
            <span className="text-slate-700">·</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Admin</span>
          </div>
          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2">Admin Portal</p>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h1>
        </MotionDiv>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-white/[0.06]">
          {[
            { id: 'projects',  label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
            { id: 'users',     label: 'Users',    icon: <Users className="w-4 h-4" /> },
            { id: 'invoices',  label: 'Invoices', icon: <ReceiptText className="w-4 h-4" /> },
            { id: 'messages',  label: 'Messages', icon: <Inbox className="w-4 h-4" />, badge: messages.filter(m => !m.read).length },
          ].map(({ id, label, icon, badge }) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                tab === id
                  ? 'border-white text-white'
                : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {icon}
              {label}
              {badge > 0 && (
                <span className="flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold text-white" style={{ background: '#ef4444' }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Projects tab */}
        {tab === 'projects' && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">All projects</h2>
              <div className="flex items-center gap-2">
                <button onClick={loadProjects} className="p-2 text-slate-500 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setCreateOpen(true); setNewCode(null); setFormError('') }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: AURORA }}
                >
                  <Plus className="w-4 h-4" />
                  Create project
                </button>
              </div>
            </div>

            {loadingProjects ? (
              <div className="flex justify-center py-16">
                <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">No projects yet.</div>
            ) : (
              <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-[1fr_1fr_120px_100px_76px] gap-4 px-5 py-3 border-b border-white/[0.05] text-[11px] font-semibold uppercase tracking-widest text-slate-600">
                  <span>Project</span>
                  <span className="text-center">Client</span>
                  <span className="text-center">Code</span>
                  <span className="text-center">Status</span>
                  <span />
                </div>
                {projects.map((p, i) => (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/admin/project/${p.id}`, { state: { clientName: p.clientName } })}
                    className={`grid grid-cols-[1fr_1fr_120px_100px_76px] gap-4 px-5 py-4 items-center cursor-pointer hover:bg-white/[0.02] transition-colors ${i < projects.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{p.name}</div>
                      {p.description && <div className="text-xs text-slate-600 mt-0.5 truncate max-w-[200px]">{p.description}</div>}
                    </div>
                    <div className="text-sm text-slate-400 text-center">{p.clientName || '—'}</div>
                    <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                      <span className="font-mono text-sm font-bold text-white tracking-widest">{p.id}</span>
                      <CopyButton text={p.id} />
                    </div>
                    <div className="flex justify-center">
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => openEdit(p)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </MotionDiv>
        )}

        {/* Users tab */}
        {tab === 'users' && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">All users</h2>
              <button onClick={loadUsers} className="p-2 text-slate-500 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-16">
                <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">No users found.</div>
            ) : (
              <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl overflow-hidden">
                {users.map((u, i) => (
                  <div key={u.id} className={i < users.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                    <button
                      onClick={() => toggleUser(u.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: AURORA }}
                      >
                        {(() => {
                          const parts = (u.displayName ?? '').trim().split(/\s+/).filter(Boolean)
                          if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                          return (u.displayName ?? u.email ?? '?')[0].toUpperCase()
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white">{u.displayName || '—'}</div>
                        <div className="text-xs text-slate-500 truncate">{u.email}</div>
                      </div>
                      {expandedUser === u.id
                        ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                    </button>

                    <AnimatePresence>
                      {expandedUser === u.id && (
                        <MotionDiv
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 pt-5 border-t border-white/[0.04]">
                            {editingUserId === u.id ? (
                              <div className="mb-6">
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  {[
                                    { label: 'First name', key: 'firstName' },
                                    { label: 'Last name',  key: 'lastName' },
                                    { label: 'Email',      key: 'email' },
                                  ].map(({ label, key }) => (
                                    <div key={key} className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3">
                                      <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1.5">{label}</div>
                                      <input
                                        value={editUserForm[key]}
                                        onChange={e => setEditUserForm(f => ({ ...f, [key]: e.target.value }))}
                                        className="w-full bg-transparent text-xs text-white font-mono outline-none placeholder:text-slate-600"
                                      />
                                    </div>
                                  ))}
                                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-3.5">
                                    <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1.5">UID</div>
                                    <div className="text-xs text-slate-500 font-mono truncate">{u.id}</div>
                                  </div>
                                </div>
                                {saveUserError && (
                                  <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2 mb-3">{saveUserError}</p>
                                )}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setEditingUserId(null)}
                                    className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveUser(u.id)}
                                    disabled={savingUser}
                                    className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white rounded-xl transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                                    style={{ background: AURORA }}
                                  >
                                    {savingUser ? 'Saving…' : 'Save changes'}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="mb-6">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  {[
                                    { label: 'First name', value: u.firstName },
                                    { label: 'Last name',  value: u.lastName },
                                    { label: 'Email',      value: u.email },
                                    { label: 'UID',        value: u.id },
                                  ].map(row => (
                                    <div key={row.label} className="bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-3.5">
                                      <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1.5">{row.label}</div>
                                      <div className="text-xs text-slate-300 font-mono truncate">{row.value || '—'}</div>
                                    </div>
                                  ))}
                                </div>
                                <button
                                  onClick={() => startEditUser(u)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                                >
                                  <Pencil className="w-3 h-3" />
                                  Edit info
                                </button>
                              </div>
                            )}

                            <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3.5">Linked projects</div>
                            {!userProjects[u.id] ? (
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <div className="w-3 h-3 rounded-full border border-white/10 border-t-white/40 animate-spin" />
                                Loading…
                              </div>
                            ) : userProjects[u.id].length === 0 ? (
                              <div className="text-xs text-slate-600">No projects linked.</div>
                            ) : (
                              <div className="space-y-2">
                                {userProjects[u.id].map(p => (
                                  <div
                                    key={p.id}
                                    onClick={() => navigate(`/admin/project/${p.code ?? p.id}`, { state: { clientName: u.displayName || u.email } })}
                                    className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-2.5 cursor-pointer hover:bg-white/[0.05] hover:border-white/[0.08] transition-colors"
                                  >
                                    <div>
                                      <div className="text-xs font-semibold text-white">{p.name}</div>
                                      <div className="text-[10px] text-slate-600 font-mono mt-0.5">Code: {p.code ?? p.id}</div>
                                    </div>
                                    <StatusBadge status={p.status} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </MotionDiv>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </MotionDiv>
        )}

        {/* Invoices tab */}
        {tab === 'invoices' && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Invoices</h2>
              <div className="flex items-center gap-2">
                <button onClick={loadAllInvoices} className="p-2 text-slate-500 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setInvoiceFormOpen(true); setInvoiceError('') }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: AURORA }}
                >
                  <Plus className="w-4 h-4" />
                  Create invoice
                </button>
              </div>
            </div>

            {loadingInvoices ? (
              <div className="flex justify-center py-16">
                <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
              </div>
            ) : allInvoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                  <ReceiptText className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">No invoices yet.</p>
              </div>
            ) : (
              <div className="space-y-7">
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600">Unpaid</p>
                    <span className="text-xs text-slate-600">{unpaidInvoices.length}</span>
                  </div>
                  {unpaidInvoices.length === 0 ? (
                    <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-8 text-center text-sm text-slate-500">
                      No unpaid invoices.
                    </div>
                  ) : (
                    <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl overflow-hidden">
                      {unpaidInvoices.map((inv, i) => renderInvoiceRow(inv, i === unpaidInvoices.length - 1))}
                    </div>
                  )}
                </section>

                <section>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600">Paid</p>
                    <span className="text-xs text-slate-600">{paidInvoices.length}</span>
                  </div>
                  {paidInvoices.length === 0 ? (
                    <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-8 text-center text-sm text-slate-500">
                      No paid invoices.
                    </div>
                  ) : (
                    <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl overflow-hidden">
                      {paidInvoices.map((inv, i) => renderInvoiceRow(inv, i === paidInvoices.length - 1))}
                    </div>
                  )}
                </section>
              </div>
            )}
          </MotionDiv>
        )}
        {/* Messages tab */}
        {tab === 'messages' && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-white">Messages</h2>
                {messages.filter(m => !m.read).length > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: '#ef4444' }}>
                    {messages.filter(m => !m.read).length} unread
                  </span>
                )}
              </div>
              <button onClick={loadMessages} className="p-2 text-slate-500 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {loadingMessages ? (
              <div className="flex justify-center py-16">
                <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                  <Inbox className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">No messages yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map(msg => {
                  const isOpen = expandedMsg === msg.id
                  const date = msg.createdAt?.toDate?.()
                  const dateStr = date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
                  const timeStr = date ? date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : ''
                  return (
                    <div
                      key={msg.id}
                      className="bg-[#0c1426] border rounded-2xl overflow-hidden transition-colors"
                      style={{ borderColor: !msg.read ? 'rgba(6,182,212,0.25)' : 'rgba(255,255,255,0.06)' }}
                    >
                      {/* Row */}
                      <button
                        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                        onClick={() => {
                          const next = isOpen ? null : msg.id
                          setExpandedMsg(next)
                          if (!msg.read && next) markRead(msg.id)
                        }}
                      >
                        {/* Unread dot */}
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: !msg.read ? '#06b6d4' : 'transparent' }} />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-white">{msg.name}</span>
                            {!msg.read && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-[#06b6d4]" style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)' }}>New</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                            <span className="text-xs text-slate-500">{msg.email}</span>
                            {msg.features?.length > 0 && (
                              <span className="text-xs text-slate-600">· {msg.features.slice(0, 2).join(', ')}{msg.features.length > 2 ? ` +${msg.features.length - 2}` : ''}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs text-slate-600 hidden sm:block">{dateStr}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </div>
                      </button>

                      {/* Expanded */}
                      {isOpen && (
                        <div className="border-t border-white/[0.05] px-5 py-4 space-y-4">
                          {/* Meta */}
                          <div className="flex flex-wrap gap-3">
                            <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                              <Mail className="w-3.5 h-3.5" />
                              {msg.email}
                            </a>
                            {msg.features?.length > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Tag className="w-3.5 h-3.5" />
                                {msg.features.join(', ')}
                              </div>
                            )}
                            <span className="text-xs text-slate-600">{dateStr} at {timeStr}</span>
                          </div>

                          {/* Message body */}
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">
                            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <a
                              href={`mailto:${msg.email}?subject=Re: Your Parallax Inquiry`}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
                              style={{ background: AURORA }}
                            >
                              <Mail className="w-3.5 h-3.5" />
                              Reply
                            </a>
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </MotionDiv>
        )}

      </main>

      {/* Create invoice modal */}
      <AnimatePresence>
        {invoiceFormOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            onClick={() => {
              setInvoiceFormOpen(false)
              setInvoiceForm({ projectCode: '', description: '', amount: '', dueDate: todayStr() })
              setInvoiceError('')
            }}
          >
            <MotionDiv
              className="absolute inset-0 bg-[#050912]/80 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <MotionDiv
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0b1120] border border-white/10 rounded-[28px] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            >
              <button
                onClick={() => {
                  setInvoiceFormOpen(false)
                  setInvoiceForm({ projectCode: '', description: '', amount: '', dueDate: todayStr() })
                  setInvoiceError('')
                }}
                className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Create invoice</h2>
              </div>

              <form onSubmit={handleCreateInvoiceDashboard} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-200">Project *</span>
                  <select
                    value={invoiceForm.projectCode}
                    onChange={e => setInvoiceForm(f => ({ ...f, projectCode: e.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-[#0c1426] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/60 [color-scheme:dark]"
                  >
                    <option value="">Select project...</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-200">Description *</span>
                  <input
                    value={invoiceForm.description}
                    onChange={e => setInvoiceForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="e.g. Website Design - Phase 1"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]"
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-200">Amount *</span>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">$</span>
                      <input
                        type="number" min="1" step="0.01"
                        value={invoiceForm.amount}
                        onChange={e => setInvoiceForm(f => ({ ...f, amount: e.target.value }))}
                        placeholder="Amount"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-8 pr-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-200">Due date</span>
                    <input
                      type="date"
                      value={invoiceForm.dueDate}
                      onChange={e => setInvoiceForm(f => ({ ...f, dueDate: e.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/60 focus:bg-white/[0.06] [color-scheme:dark]"
                    />
                  </label>
                </div>

                {invoiceError && (
                  <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{invoiceError}</p>
                )}

                <button
                  type="submit"
                  disabled={creatingInvoice || !invoiceForm.projectCode || !invoiceForm.description.trim() || !invoiceForm.amount}
                  className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: AURORA, boxShadow: '0 10px 28px rgba(15,155,116,0.2)' }}
                >
                  {creatingInvoice ? 'Creating...' : 'Create invoice'}
                </button>
              </form>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>

      {/* Edit project modal */}
      <AnimatePresence>
        {editOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            onClick={() => setEditOpen(false)}
          >
            <MotionDiv
              className="absolute inset-0 bg-[#050912]/80 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <MotionDiv
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0b1120] border border-white/10 rounded-[28px] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            >
              <button
                onClick={() => setEditOpen(false)}
                className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Edit project</h2>
                <p className="mt-1.5 text-sm text-slate-400 font-mono">Code: {editProject?.id}</p>
              </div>

              <form onSubmit={handleEditSave} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-200">Project name *</span>
                  <input type="text" required value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Acme Corp Website"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]" />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-200">Client name</span>
                  <input type="text" value={editForm.clientName} onChange={e => setEditForm(f => ({ ...f, clientName: e.target.value }))}
                    placeholder="e.g. Acme Corp"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]" />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-200">General description</span>
                  <textarea value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Brief project description" rows={3}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06] resize-none" />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-200">Status</span>
                  <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-[#0c1426] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/60">
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                  </select>
                </label>

                {editError && (
                  <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{editError}</p>
                )}

                <button type="submit" disabled={editSaving}
                  className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: AURORA, boxShadow: '0 10px 28px rgba(15,155,116,0.2)' }}>
                  {editSaving ? 'Saving…' : 'Save changes'}
                </button>
              </form>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>

      {/* Create project modal */}
      <AnimatePresence>
        {createOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            onClick={() => setCreateOpen(false)}
          >
            <MotionDiv
              className="absolute inset-0 bg-[#050912]/80 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <MotionDiv
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0b1120] border border-white/10 rounded-[28px] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            >
              <button
                onClick={() => setCreateOpen(false)}
                className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {newCode ? (
                <div className="text-center py-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(15,155,116,0.15)', border: '1px solid rgba(15,155,116,0.25)' }}>
                    <FolderOpen className="w-7 h-7 text-[#0f9b74]" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Project created</h2>
                  <p className="text-slate-400 text-sm mb-6">Share this code with your client to link the project to their account.</p>
                  <div className="flex items-center justify-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 mb-7">
                    <span className="font-mono text-3xl font-extrabold text-white tracking-[0.25em]">{newCode}</span>
                    <CopyButton text={newCode} />
                  </div>
                  <button
                    onClick={() => setCreateOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: AURORA }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Create project</h2>
                    <p className="mt-1.5 text-sm text-slate-400">A unique 6-character code will be generated automatically.</p>
                  </div>

                  <form onSubmit={handleCreate} className="space-y-4">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-200">Project name *</span>
                      <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Acme Corp Website"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]" />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-200">Client name</span>
                      <input type="text" value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
                        placeholder="e.g. Acme Corp"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]" />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-200">General description</span>
                      <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Brief project description" rows={3}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06] resize-none" />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-200">Status</span>
                      <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                        className="w-full rounded-2xl border border-white/10 bg-[#0c1426] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/60">
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </label>

                    {formError && (
                      <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{formError}</p>
                    )}

                    <button type="submit" disabled={creating}
                      className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: AURORA, boxShadow: '0 10px 28px rgba(15,155,116,0.2)' }}>
                      {creating ? 'Creating…' : 'Create project'}
                    </button>
                  </form>
                </>
              )}
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
