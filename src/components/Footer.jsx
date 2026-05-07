import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080d18] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} Parallax. All rights reserved.</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link
              to="/terms-and-conditions"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy-policy"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
