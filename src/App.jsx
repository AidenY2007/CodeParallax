import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import HomePage from './pages/HomePage'
import FeaturePage from './pages/FeaturePage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#080d18] text-[#eeeef5]">
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features/:slug" element={<FeaturePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
