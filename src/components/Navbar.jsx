import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import parallaxLogo from '../assets/ParallaxLogo.png'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

const capabilities = [
  { label: 'Authentication',       href: '/features/authentication' },
  { label: 'Payments & Fintech',   href: '/features/payments' },
  { label: 'AI Integration',       href: '/features/ai' },
  { label: 'Automation Workflows', href: '/features/automation' },
  { label: 'Databases & Dashboards', href: '/features/databases-dashboards' },
  { label: 'API Integrations',     href: '/features/api-integrations' },
  { label: 'Email Systems',        href: '/features/email' },
  { label: 'SMS Systems',          href: '/features/sms' },
  { label: 'Website Analytics',    href: '/features/analytics' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [capOpen, setCapOpen]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#080d18]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={parallaxLogo} alt="Parallax" className="h-8 w-auto object-contain" />
          <span
            className="text-base font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: AURORA }}
          >
            Parallax
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors duration-200">
            Home
          </Link>

          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setCapOpen(true)}
            onMouseLeave={() => setCapOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-white transition-colors duration-200">
              Capabilities
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${capOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-[#0c1426] border border-white/8 rounded-2xl p-2 shadow-2xl shadow-black/60 transition-all duration-200 ${
              capOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}>
              {capabilities.map(cap => (
                <Link
                  key={cap.href}
                  to={cap.href}
                  className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-150"
                >
                  {cap.label}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/pricing" className="text-sm text-slate-500 hover:text-white transition-colors duration-200">
            Pricing
          </Link>
          <Link to="/contact" className="text-sm text-slate-500 hover:text-white transition-colors duration-200">
            Contact
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: AURORA, boxShadow: '0 2px 16px rgba(15,155,116,0.25)' }}
          >
            Start a project
          </Link>
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
          {[
            { label: 'Home', href: '/' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Contact', href: '/contact' },
          ].map(item => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm text-slate-400 hover:text-white transition-colors border-b border-white/5 last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3">
            <p className="text-xs text-slate-600 uppercase tracking-widest mb-2">Capabilities</p>
            {capabilities.map(cap => (
              <Link
                key={cap.href}
                to={cap.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-slate-500 hover:text-white transition-colors"
              >
                {cap.label}
              </Link>
            ))}
          </div>
          <div className="pt-3">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors"
              style={{ background: AURORA }}
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
