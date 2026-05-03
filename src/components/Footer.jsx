import { Link } from 'react-router-dom'
import parallaxLogo from '../assets/ParallaxLogo.png'
import { useStartProject } from '../hooks/useStartProject'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

const nav = {
  Capabilities: [
    { label: 'Authentication',    href: '/features/authentication' },
    { label: 'Payments',          href: '/features/payments' },
    { label: 'AI Integration',    href: '/features/ai' },
    { label: 'Automation',        href: '/features/automation' },
    { label: 'Databases',         href: '/features/databases-dashboards' },
    { label: 'API Integrations',  href: '/features/api-integrations' },
    { label: 'Email Systems',     href: '/features/email' },
    { label: 'SMS Systems',       href: '/features/sms' },
    { label: 'Analytics',         href: '/features/analytics' },
  ],
  Company: [
    { label: 'Home',    href: '/' },
    { label: 'Contact', href: '/contact' },
  ],
  Account: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Invoices',  href: '/dashboard/invoices' },
    { label: 'Account',   href: '/dashboard/account' },
  ],
}

export default function Footer() {
  const startProject = useStartProject()
  return (
    <footer className="border-t border-white/5 bg-[#080d18] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={parallaxLogo} alt="Parallax" className="h-8 w-auto object-contain" />
              <span
                className="text-base font-bold tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: AURORA }}
              >
                Parallax
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Systems infrastructure for modern businesses. Built for companies that move beyond templates and no-code limitations.
            </p>
            <div className="mt-6">
              <button
                onClick={startProject}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: AURORA, boxShadow: '0 2px 16px rgba(15,155,116,0.20)' }}
              >
                Start a project
              </button>
            </div>
          </div>

          {/* Nav groups */}
          {Object.entries(nav).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{group}</p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} Parallax. All rights reserved.</p>
          <p className="text-xs text-slate-600 font-mono">Infrastructure for modern businesses</p>
        </div>
      </div>
    </footer>
  )
}
