import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react'
import parallaxLogo from '../assets/ParallaxLogo.png'
import { useAuth } from '../context/AuthContext'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logOut, isAdmin } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(pathname !== '/')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  async function handleLogOut() {
    await logOut()
    navigate('/')
  }

  function openAuthModal(modal) {
    setMobileOpen(false)
    setUserMenuOpen(false)

    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent(`open-${modal}`))
      return
    }

    navigate('/', { state: { authModal: modal } })
  }

  useEffect(() => {
    const handler = () => {
      const isHome = pathname === '/'
      const hero = document.getElementById('home-hero')

      setScrolled(window.scrollY > 40)

      if (!isHome || !hero) {
        setVisible(true)
        return
      }

      const threshold = Math.max(hero.offsetHeight - window.innerHeight, 0)
      setVisible(window.scrollY >= threshold)
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      visible
        ? 'opacity-100 translate-y-0 pointer-events-auto'
        : 'opacity-0 -translate-y-4 pointer-events-none'
    } ${
      scrolled || pathname !== '/'
        ? 'bg-[#080d18]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={parallaxLogo} alt="Parallax" className="h-8 w-auto object-contain" />
          <span className="text-base font-bold tracking-tight text-white">
            Parallax
          </span>
        </Link>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: AURORA }}
                >
                  {(() => {
                    const parts = (user.displayName ?? '').trim().split(/\s+/).filter(Boolean)
                    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                    return (user.displayName ?? user.email ?? '?')[0].toUpperCase()
                  })()}
                </div>
                <span className="text-sm font-semibold text-slate-300 max-w-[120px] truncate">
                  {isAdmin ? 'Admin' : (user.displayName ?? user.email)}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#0c1426] border border-white/8 rounded-2xl p-2 shadow-2xl shadow-black/60 z-50">
                  <Link
                    to={isAdmin ? '/admin/dashboard' : '/profile'}
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {isAdmin ? 'Dashboard' : 'View profile'}
                  </Link>
                  <button
                    onClick={() => { setUserMenuOpen(false); handleLogOut() }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
              >
                Sign up
              </button>
              <Link
                to="/contact"
                className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: AURORA, boxShadow: '0 2px 16px rgba(15,155,116,0.25)' }}
              >
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0c1426] border-t border-white/5 px-6 py-5 space-y-1">
          <div className="pt-3">
            {user ? (
              <div className="space-y-2">
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2.5 text-sm font-semibold text-slate-300 rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); handleLogOut() }}
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors"
                  style={{ background: AURORA }}
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-300 rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-300 rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  Sign up
                </button>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors"
                  style={{ background: AURORA }}
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
