import { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, LogOut, StickyNote, FileText, ReceiptText, File, Plus, Upload, Loader2 } from 'lucide-react'
import { doc, getDoc, onSnapshot, collection, getDocs, addDoc, Timestamp, query, orderBy } from 'firebase/firestore'
import { ref, listAll, getDownloadURL, getMetadata, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import parallaxLogo from '../assets/ParallaxLogo.png'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'
const STATUS_LABELS = { planning: 'Planning', in_progress: 'In Progress', completed: 'Completed' }
const STATUS_COLORS = { planning: '#94a3b8', in_progress: '#67e8f9', completed: '#0f9b74' }

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] ?? '#94a3b8'
  return (
    <span
      className="inline-flex items-center justify-center text-[11px] font-semibold px-2.5 py-1 rounded-full"
      style={{ color, background: `${color}18`, border: `1px solid ${color}28` }}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

function formatDate(ts) {
  if (!ts) return ''
  const d = ts instanceof Date ? ts : (ts.toDate ? ts.toDate() : new Date(ts))
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatBytes(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileColor(type = '') {
  if (type.includes('pdf')) return '#f87171'
  if (type.includes('image')) return '#a78bfa'
  if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv')) return '#34d399'
  if (type.includes('word') || type.includes('document')) return '#60a5fa'
  if (type.includes('zip') || type.includes('archive')) return '#fbbf24'
  return '#94a3b8'
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

export default function ClientProjectPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { user, logOut } = useAuth()
  const fileInputRef = useRef(null)

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('notes')

  // Notes
  const [notes, setNotes] = useState([])
  const [loadingNotes, setLoadingNotes] = useState(true)
  const [noteSort, setNoteSort] = useState('date')
  const [addingNote, setAddingNote] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)

  // Files
  const [files, setFiles] = useState([])
  const [loadingFiles, setLoadingFiles] = useState(true)
  const [fileSort, setFileSort] = useState('date')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadName, setUploadName] = useState('')
  const [dragging, setDragging] = useState(false)

  // Invoices
  const [invoices, setInvoices] = useState([])
  const [loadingInvoices, setLoadingInvoices] = useState(true)

  useEffect(() => {
    if (!user) return
    getDoc(doc(db, 'users', user.uid, 'projects', code)).then(snap => {
      if (!snap.exists()) { setLoading(false); return }
      const unsub = onSnapshot(doc(db, 'projectCodes', code), (codeSnap) => {
        if (codeSnap.exists()) setProject({ id: code, code, ...codeSnap.data() })
        setLoading(false)
      })
      return unsub
    }).catch(err => { console.error(err); setLoading(false) })
  }, [code, user])

  useEffect(() => {
    if (user) loadNotes()
  }, [code, user])

  async function loadNotes() {
    try {
      const snap = await getDocs(collection(db, 'projectCodes', code, 'notes'))
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (b.createdAt?.toDate?.() ?? b.createdAt ?? 0) - (a.createdAt?.toDate?.() ?? a.createdAt ?? 0))
      setNotes(list)
    } catch (err) { console.error('loadNotes:', err) }
    setLoadingNotes(false)
  }

  useEffect(() => {
    if (user) loadFiles()
  }, [code, user])

  async function loadFiles() {
    try {
      const folderRef = ref(storage, `projects/${code}`)
      const result = await listAll(folderRef)
      const fileData = await Promise.all(
        result.items.map(async item => {
          const [url, meta] = await Promise.all([getDownloadURL(item), getMetadata(item)])
          return {
            id: item.name,
            name: meta.customMetadata?.originalName ?? item.name,
            downloadURL: url,
            size: meta.size,
            type: meta.contentType ?? '',
            uploadedAt: new Date(meta.timeCreated),
            author: meta.customMetadata?.author ?? '',
          }
        })
      )
      setFiles(fileData.sort((a, b) => b.uploadedAt - a.uploadedAt))
    } catch (err) { console.error('loadFiles:', err); setFiles([]) }
    setLoadingFiles(false)
  }

  useEffect(() => {
    if (user) loadInvoices()
  }, [code, user])

  async function loadInvoices() {
    try {
      const snap = await getDocs(collection(db, 'projectCodes', code, 'invoices'))
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (b.createdAt?.toDate?.() ?? 0) - (a.createdAt?.toDate?.() ?? 0))
      setInvoices(list)
    } catch (err) { console.error('loadInvoices:', err) }
    setLoadingInvoices(false)
  }

  async function handleAddNote(e) {
    e.preventDefault()
    if (!noteText.trim()) return
    setSavingNote(true)
    try {
      const now = Timestamp.fromDate(new Date())
      const noteRef = await addDoc(collection(db, 'projectCodes', code, 'notes'), {
        title: noteTitle.trim(),
        content: noteText.trim(),
        createdAt: now,
        author: user.displayName || user.email || 'Client',
        authorUid: user.uid,
      })
      setNotes(prev => [{ id: noteRef.id, title: noteTitle.trim(), content: noteText.trim(), createdAt: now, author: user.displayName || user.email || 'Client', authorUid: user.uid }, ...prev])
      setNoteTitle('')
      setNoteText('')
      setAddingNote(false)
    } catch (err) { console.error('addNote:', err) }
    setSavingNote(false)
  }

  async function handleUpload(file) {
    if (!file || uploading) return
    setUploading(true)
    setUploadProgress(0)
    setUploadName(file.name)
    try {
      const storageRef = ref(storage, `projects/${code}/${Date.now()}_${file.name}`)
      const task = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
        customMetadata: { originalName: file.name, author: user.displayName || user.email || 'Client' },
      })
      await new Promise((resolve, reject) => {
        task.on('state_changed',
          snap => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
          reject, resolve,
        )
      })
      await loadFiles()
    } catch (err) { console.error('Upload:', err) }
    setUploading(false)
    setUploadProgress(0)
    setUploadName('')
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  async function handleLogOut() {
    await logOut()
    navigate('/')
  }

  if (loading) {
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
        <Link to="/dashboard" className="text-sm text-slate-500 hover:text-white transition-colors">← Back to dashboard</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      <header className="border-b border-white/[0.06] bg-[#080d18]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={parallaxLogo} alt="Parallax" className="h-7 w-auto object-contain" />
            <span className="text-sm font-bold tracking-tight text-white">Parallax</span>
          </Link>
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
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <div className="flex items-center justify-between gap-4 mb-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>
        <div className="flex flex-col gap-0.5 mb-6">
          <p className="text-sm font-bold text-white font-mono">
            <span className="text-slate-500 font-sans font-bold">Code:</span> {code}
          </p>
        </div>

        <div className="bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-4 mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-1.5">General description</p>
          <p className="text-sm text-slate-300 leading-relaxed">{project.description || '—'}</p>
        </div>

        <div className="flex items-center gap-1 mb-8 border-b border-white/[0.06]">
          {[
            { id: 'notes',    label: 'Notes',    Icon: StickyNote },
            { id: 'files',    label: 'Files',    Icon: FileText },
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

        {/* Notes tab */}
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
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
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
                        onClick={() => { setAddingNote(false); setNoteTitle(''); setNoteText('') }}
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

            {loadingNotes ? (
              <div className="flex justify-center py-20">
                <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
              </div>
            ) : notes.length === 0 && !addingNote ? (
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
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-4"
                  >
                    {note.title && <p className="text-sm font-semibold text-white mb-1.5">{note.title}</p>}
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-slate-600">{formatDate(note.createdAt)}</span>
                      {note.author && <span className="text-xs text-slate-700">· {note.author}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Files tab */}
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
                onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = '' }}
              />
            </div>

            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`fixed inset-0 z-40 pointer-events-none transition-colors duration-150 ${dragging ? 'pointer-events-auto bg-cyan-400/[0.03]' : ''}`}
            />

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
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">No files yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {[...files].sort((a, b) => fileSort === 'author'
                  ? (a.author ?? '').localeCompare(b.author ?? '')
                  : b.uploadedAt - a.uploadedAt
                ).map(f => {
                  const color = fileColor(f.type)
                  return (
                    <div
                      key={f.id}
                      onClick={() => window.open(f.downloadURL, '_blank', 'noreferrer')}
                      className="flex items-center gap-4 bg-[#0c1426] border border-white/[0.06] rounded-2xl px-5 py-4 hover:border-white/[0.1] hover:bg-white/[0.02] transition-colors cursor-pointer"
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
                          {formatBytes(f.size)} · {formatDate(f.uploadedAt)}{f.author ? ` · ${f.author}` : ''}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Invoices tab */}
        {tab === 'invoices' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
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
                {/* Unpaid */}
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
                              {inv.dueDate && <span>Due {inv.dueDate?.toDate ? inv.dueDate.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>}
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(inv.stripeSessionUrl, '_blank', 'noreferrer')}
                            className="flex-shrink-0 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-transform hover:-translate-y-0.5"
                            style={{ background: AURORA }}
                          >
                            Pay now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Paid */}
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
                              {inv.paidAt && <span>Paid {inv.paidAt?.toDate ? inv.paidAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>}
                            </div>
                          </div>
                          <span className="flex-shrink-0 text-xs font-bold text-[#0f9b74] bg-[#0f9b74]/10 border border-[#0f9b74]/20 px-2.5 py-1 rounded-full">Paid</span>
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
    </div>
  )
}
