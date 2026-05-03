import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Plus, Trash2, FileText, Upload,
  File, LogOut, StickyNote, Loader2, Pencil, Check, X, ReceiptText,
} from 'lucide-react'
import {
  collection, addDoc, deleteDoc, updateDoc, doc,
  Timestamp, getDocs, getDoc,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll, getMetadata } from 'firebase/storage'
import { httpsCallable } from 'firebase/functions'
import { db, storage, functions } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import parallaxLogo from '../assets/ParallaxLogo.png'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'
const STATUS_LABELS = { planning: 'Planning', in_progress: 'In Progress', completed: 'Completed' }
const STATUS_COLORS = { planning: '#94a3b8', in_progress: '#67e8f9', completed: '#0f9b74' }

function todayStr() {
  return new Date().toISOString().split('T')[0]
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

function SortToggle({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-500">Sort by:</span>
      <div className="flex items-center gap-1 bg-white/[0.04] rounded-xl p-1">
        {['date', 'author'].map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              value === opt ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {opt === 'date' ? 'Recency' : 'Author'}
          </button>
        ))}
      </div>
    </div>
  )
}

function formatBytes(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(ts) {
  if (!ts) return ''
  const d = ts instanceof Date ? ts : (ts.toDate ? ts.toDate() : new Date(ts))
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fileColor(type = '') {
  if (type.includes('pdf')) return '#f87171'
  if (type.includes('image')) return '#a78bfa'
  if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv')) return '#34d399'
  if (type.includes('word') || type.includes('document')) return '#60a5fa'
  if (type.includes('zip') || type.includes('archive')) return '#fbbf24'
  return '#94a3b8'
}

export default function AdminProjectPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { logOut } = useAuth()
  const fileInputRef = useRef(null)

  const [project, setProject] = useState(null)
  const [loadingProject, setLoadingProject] = useState(true)
  const [tab, setTab] = useState('notes')

  // Notes
  const [notes, setNotes] = useState([])
  const [noteText, setNoteText] = useState('')
  const [noteTitle, setNoteTitle] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [savingNote, setSavingNote] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editingNoteText, setEditingNoteText] = useState('')
  const [editingNoteTitle, setEditingNoteTitle] = useState('')
  const [updatingNote, setUpdatingNote] = useState(false)
  const [noteSort, setNoteSort] = useState('date')
  const [fileSort, setFileSort] = useState('date')

  // Invoices
  const [invoices, setInvoices] = useState([])
  const [loadingInvoices, setLoadingInvoices] = useState(true)
  const [creatingInvoice, setCreatingInvoice] = useState(false)
  const [invoiceForm, setInvoiceForm] = useState({ description: '', amount: '', dueDate: todayStr() })
  const [invoiceFormOpen, setInvoiceFormOpen] = useState(false)
  const [invoiceError, setInvoiceError] = useState('')

  // Files
  const [files, setFiles] = useState([])
  const [loadingFiles, setLoadingFiles] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadName, setUploadName] = useState('')
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    async function loadProject() {
      try {
        const snap = await getDoc(doc(db, 'projectCodes', code))
        if (!snap.exists()) { setLoadingProject(false); return }
        const data = { id: snap.id, ...snap.data() }

        // Use clientName passed via route state (from dashboard) if Firestore doesn't have it
        const stateClientName = location.state?.clientName
        if (!data.clientName && stateClientName) {
          data.clientName = stateClientName
        }

        if (!data.clientName) {
          const usersSnap = await getDocs(collection(db, 'users'))
          for (const u of usersSnap.docs) {
            if (u.data().email === 'aidenyasharian@gmail.com') continue
            const projsSnap = await getDocs(collection(db, 'users', u.id, 'projects'))
            const found = projsSnap.docs.find(p => p.id === code)
            if (found) {
              const ud = u.data()
              data.clientName = ud.displayName || ud.email || ''
              break
            }
          }
        }

        setProject(data)
      } catch (err) { console.error(err) }
      setLoadingProject(false)
    }
    loadProject()
  }, [code])

  useEffect(() => { loadNotes() }, [code])

  async function loadNotes() {
    try {
      const snap = await getDocs(collection(db, 'projectCodes', code, 'notes'))
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (b.createdAt?.toDate?.() ?? b.createdAt ?? 0) - (a.createdAt?.toDate?.() ?? a.createdAt ?? 0))
      setNotes(list)
    } catch (err) { console.error('loadNotes error:', err) }
  }

  useEffect(() => { loadFiles() }, [code])

  async function loadFiles() {
    setLoadingFiles(true)
    try {
      const folderRef = ref(storage, `projects/${code}`)
      const result = await listAll(folderRef)
      const fileData = await Promise.all(
        result.items.map(async item => {
          const [url, meta] = await Promise.all([getDownloadURL(item), getMetadata(item)])
          return {
            id: item.name,
            name: meta.customMetadata?.originalName ?? item.name,
            author: meta.customMetadata?.author ?? '—',
            storagePath: item.fullPath,
            downloadURL: url,
            size: meta.size,
            type: meta.contentType ?? '',
            uploadedAt: new Date(meta.timeCreated),
          }
        })
      )
      setFiles(fileData.sort((a, b) => b.uploadedAt - a.uploadedAt))
    } catch (err) {
      console.error('loadFiles error:', err)
      setFiles([])
    }
    setLoadingFiles(false)
  }

  async function handleAddNote(e) {
    e.preventDefault()
    if (!noteText.trim()) return
    setSavingNote(true)
    try {
      const now = Timestamp.fromDate(new Date())
      const ref = await addDoc(collection(db, 'projectCodes', code, 'notes'), {
        title: noteTitle.trim(),
        content: noteText.trim(),
        createdAt: now,
        author: 'Admin',
      })
      setNotes(prev => [{ id: ref.id, title: noteTitle.trim(), content: noteText.trim(), createdAt: now, author: 'Admin' }, ...prev])
      setNoteText('')
      setNoteTitle('')
      setAddingNote(false)
    } catch (err) { console.error('addNote error:', err) }
    setSavingNote(false)
  }

  async function handleDeleteNote(id) {
    try {
      await deleteDoc(doc(db, 'projectCodes', code, 'notes', id))
      setNotes(prev => prev.filter(n => n.id !== id))
    } catch (err) { console.error('deleteNote error:', err) }
  }

  function startEditNote(note) {
    setEditingNoteId(note.id)
    setEditingNoteTitle(note.title ?? '')
    setEditingNoteText(note.content)
  }

  function cancelEditNote() {
    setEditingNoteId(null)
    setEditingNoteTitle('')
    setEditingNoteText('')
  }

  async function handleUpdateNote(id) {
    if (!editingNoteText.trim()) return
    setUpdatingNote(true)
    try {
      await updateDoc(doc(db, 'projectCodes', code, 'notes', id), {
        title: editingNoteTitle.trim(),
        content: editingNoteText.trim(),
      })
      setNotes(prev => prev.map(n => n.id === id ? { ...n, title: editingNoteTitle.trim(), content: editingNoteText.trim() } : n))
      setEditingNoteId(null)
      setEditingNoteTitle('')
      setEditingNoteText('')
    } catch (err) { console.error('updateNote error:', err) }
    setUpdatingNote(false)
  }

  async function handleUpload(file) {
    if (!file || uploading) return
    setUploading(true)
    setUploadProgress(0)
    setUploadName(file.name)
    try {
      const storagePath = `projects/${code}/${Date.now()}_${file.name}`
      const storageRef = ref(storage, storagePath)
      const task = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
        customMetadata: { originalName: file.name, author: 'Admin' },
      })

      await new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          snap => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
          reject,
          resolve,
        )
      })

      await loadFiles()
    } catch (err) { console.error('Upload error:', err) }
    setUploading(false)
    setUploadProgress(0)
    setUploadName('')
  }

  async function handleDeleteFile(f) {
    try {
      await deleteObject(ref(storage, f.storagePath))
      setFiles(prev => prev.filter(x => x.id !== f.id))
    } catch (err) { console.error('Delete error:', err) }
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  useEffect(() => { loadInvoices() }, [code])

  async function loadInvoices() {
    try {
      const snap = await getDocs(collection(db, 'projectCodes', code, 'invoices'))
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (b.createdAt?.toDate?.() ?? 0) - (a.createdAt?.toDate?.() ?? 0))
      setInvoices(list)
    } catch (err) { console.error('loadInvoices:', err) }
    setLoadingInvoices(false)
  }

  async function handleCreateInvoice(e) {
    e.preventDefault()
    if (!invoiceForm.description.trim() || !invoiceForm.amount) return
    setCreatingInvoice(true)
    setInvoiceError('')
    try {
      const createInvoice = httpsCallable(functions, 'createInvoice')
      await createInvoice({
        projectCode: code,
        projectName: project?.name ?? '',
        description: invoiceForm.description.trim(),
        amount: parseFloat(invoiceForm.amount),
        dueDate: invoiceForm.dueDate || null,
        successUrl: `${window.location.origin}/dashboard/project/${code}?payment=success`,
        cancelUrl: `${window.location.origin}/dashboard/project/${code}`,
      })
      setInvoiceForm({ description: '', amount: '', dueDate: todayStr() })
      setInvoiceFormOpen(false)
      await loadInvoices()
    } catch (err) {
      console.error('createInvoice:', err)
      setInvoiceError(err.message || 'Failed to create invoice.')
    }
    setCreatingInvoice(false)
  }

  async function handleDeleteInvoice(id) {
    if (!confirm('Delete this invoice?')) return
    try {
      await deleteDoc(doc(db, 'projectCodes', code, 'invoices', id))
      setInvoices(prev => prev.filter(i => i.id !== id))
    } catch (err) { console.error('deleteInvoice:', err) }
  }

  async function handleLogOut() {
    await logOut()
    navigate('/admin')
  }

  if (loadingProject) {
    return (
      <div className="min-h-screen bg-[#080d18] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#080d18] flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400 text-sm">Project not found.</p>
        <Link to="/admin/dashboard" className="text-sm text-slate-500 hover:text-white transition-colors">
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Topbar */}
      <header className="border-b border-white/[0.06] bg-[#080d18]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
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

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Back */}
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        {/* Project header */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>

        <div className="flex flex-col gap-0.5 mb-6">
          <p className="text-sm font-bold text-white">
            <span className="text-slate-500 font-bold">Client:</span> {project.clientName || '—'}
          </p>
          <p className="text-sm font-bold text-white font-mono">
            <span className="text-slate-500 font-sans font-bold">Code:</span> {project.id}
          </p>
        </div>

        {/* Description */}
        <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-4 mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-1.5">General description</p>
          <p className="text-sm text-slate-300 leading-relaxed">{project.description || '—'}</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-white/[0.06]">
          {[
            { id: 'notes', label: 'Notes', Icon: StickyNote },
            { id: 'files', label: 'Files', Icon: FileText },
            { id: 'invoices', label: 'Invoices', Icon: ReceiptText },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                tab === id ? 'border-white text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ── Notes tab ── */}
        {tab === 'notes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <div className="flex items-center justify-between mb-5">
              <SortToggle value={noteSort} onChange={setNoteSort} />
              {!addingNote && (
                <button
                  onClick={() => setAddingNote(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: AURORA }}
                >
                  <Plus className="w-4 h-4" />
                  Add note
                </button>
              )}
            </div>

            <AnimatePresence>
              {addingNote && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <form onSubmit={handleAddNote} className="bg-[#0c1426] border border-white/[0.08] rounded-2xl p-4 space-y-3">
                    <input
                      autoFocus
                      value={noteTitle}
                      onChange={e => setNoteTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40 transition-colors"
                    />
                    <textarea
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Write a note…"
                      rows={4}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 resize-none focus:border-cyan-400/40 transition-colors"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setAddingNote(false); setNoteText(''); setNoteTitle('') }}
                        className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={savingNote || !noteText.trim()}
                        className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: AURORA }}
                      >
                        {savingNote ? 'Saving…' : 'Save note'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {notes.length === 0 && !addingNote ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                  <StickyNote className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">No notes yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...notes].sort((a, b) => noteSort === 'author'
                  ? (a.author ?? '').localeCompare(b.author ?? '')
                  : (b.createdAt?.toDate?.() ?? b.createdAt ?? 0) - (a.createdAt?.toDate?.() ?? a.createdAt ?? 0)
                ).map(note => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-4"
                  >
                    {editingNoteId === note.id ? (
                      <>
                        <input
                          autoFocus
                          value={editingNoteTitle}
                          onChange={e => setEditingNoteTitle(e.target.value)}
                          placeholder="Title"
                          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40 transition-colors mb-3"
                        />
                        <textarea
                          value={editingNoteText}
                          onChange={e => setEditingNoteText(e.target.value)}
                          rows={4}
                          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 resize-none focus:border-cyan-400/40 transition-colors"
                        />
                        <div className="flex items-center justify-end gap-2 mt-3">
                          <button
                            onClick={cancelEditNote}
                            className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateNote(note.id)}
                            disabled={updatingNote || !editingNoteText.trim()}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white rounded-xl transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: AURORA }}
                          >
                            <Check className="w-3.5 h-3.5" />
                            {updatingNote ? 'Saving…' : 'Save'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {note.title && (
                          <p className="text-sm font-semibold text-white mb-1.5">{note.title}</p>
                        )}
                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-600">{formatDate(note.createdAt)}</span>
                            {note.author && (
                              <span className="text-xs text-slate-700">· {note.author}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEditNote(note)}
                              className="p-1.5 text-slate-600 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-400/10"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1.5 text-slate-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── Files tab ── */}
        {tab === 'files' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <div className="flex items-center justify-between mb-5">
              <SortToggle value={fileSort} onChange={setFileSort} />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                style={{ background: AURORA }}
              >
                <Upload className="w-4 h-4" />
                Upload file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0]
                  if (f) handleUpload(f)
                  e.target.value = ''
                }}
              />
            </div>

            {/* Invisible drag target covering the whole tab */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`fixed inset-0 z-40 pointer-events-none transition-colors duration-150 ${dragging ? 'pointer-events-auto bg-cyan-400/[0.03]' : ''}`}
            />

            {/* Upload progress */}
            {uploading && (
              <div className="flex items-center gap-4 bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-4 mb-4">
                <Loader2 className="w-4 h-4 text-slate-400 animate-spin flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 font-medium truncate mb-1.5">{uploadName}</p>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: AURORA }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">{uploadProgress}%</span>
              </div>
            )}

            {loadingFiles ? (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">No files uploaded yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {[...files].sort((a, b) => fileSort === 'author'
                  ? (a.author ?? '').localeCompare(b.author ?? '')
                  : b.uploadedAt - a.uploadedAt
                ).map(f => {
                  const color = fileColor(f.type)
                  return (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => window.open(f.downloadURL, '_blank', 'noreferrer')}
                      className="flex items-center gap-4 bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-4 group hover:border-white/[0.1] hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}18`, border: `1px solid ${color}28` }}
                      >
                        <File className="w-4 h-4" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{f.name}</div>
                        <div className="text-xs text-slate-600 mt-0.5">
                          {formatBytes(f.size)} · {formatDate(f.uploadedAt)}{f.author && f.author !== '—' ? ` · ${f.author}` : ''}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleDeleteFile(f)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* ── Invoices tab ── */}
        {tab === 'invoices' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <div className="flex items-center justify-between mb-5">
              <span />
              <button
                onClick={() => { setInvoiceFormOpen(true); setInvoiceError('') }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: AURORA }}
              >
                <Plus className="w-4 h-4" />
                Create invoice
              </button>
            </div>

            {loadingInvoices ? (
              <div className="flex justify-center py-20">
                <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                  <ReceiptText className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">No invoices yet.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {invoices.filter(i => i.status === 'unpaid').length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3">Unpaid</p>
                    <div className="space-y-2">
                      {invoices.filter(i => i.status === 'unpaid').map(inv => (
                        <div key={inv.id} className="flex items-center gap-4 bg-[#0c1426] border border-amber-400/20 rounded-2xl px-5 py-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white mb-0.5">{inv.description}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-600">
                              <span className="font-semibold text-slate-400">${Number(inv.amount).toFixed(2)}</span>
                              {inv.dueDate && <span>Due {formatDate(inv.dueDate)}</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => window.open(inv.stripeSessionUrl, '_blank', 'noreferrer')}
                              className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-80 transition-opacity"
                              style={{ background: AURORA }}
                            >Pay link</button>
                            <button onClick={() => handleDeleteInvoice(inv.id)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {invoices.filter(i => i.status === 'paid').length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3">Paid</p>
                    <div className="space-y-2">
                      {invoices.filter(i => i.status === 'paid').map(inv => (
                        <div key={inv.id} className="flex items-center gap-4 bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white mb-0.5">{inv.description}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-600">
                              <span className="font-semibold text-slate-400">${Number(inv.amount).toFixed(2)}</span>
                              {inv.paidAt && <span>Paid {formatDate(inv.paidAt)}</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-xs font-bold text-[#0f9b74] bg-[#0f9b74]/10 border border-[#0f9b74]/20 px-2.5 py-1 rounded-full">Paid</span>
                            <button onClick={() => handleDeleteInvoice(inv.id)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Create invoice modal */}
      <AnimatePresence>
        {invoiceFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6" onClick={() => setInvoiceFormOpen(false)}>
            <motion.div className="absolute inset-0 bg-[#050912]/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }} transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0b1120] border border-white/10 rounded-[28px] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            >
              <button onClick={() => { setInvoiceFormOpen(false); setInvoiceForm({ description: '', amount: '', dueDate: todayStr() }); setInvoiceError('') }} className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Create invoice</h2>
                <p className="mt-1.5 text-sm text-slate-400">{project?.name}</p>
              </div>
              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-200">Description *</span>
                  <input
                    autoFocus
                    value={invoiceForm.description}
                    onChange={e => setInvoiceForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="e.g. Website Design — Phase 1"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-200">Amount (USD) *</span>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">$</span>
                    <input
                      type="number" min="1" step="0.01"
                      value={invoiceForm.amount}
                      onChange={e => setInvoiceForm(f => ({ ...f, amount: e.target.value }))}
                      placeholder="0.00"
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
                {invoiceError && <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">{invoiceError}</p>}
                <button
                  type="submit"
                  disabled={creatingInvoice || !invoiceForm.description.trim() || !invoiceForm.amount}
                  className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: AURORA, boxShadow: '0 10px 28px rgba(15,155,116,0.2)' }}
                >
                  {creatingInvoice ? 'Creating…' : 'Create invoice'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
