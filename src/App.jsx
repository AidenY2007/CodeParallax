import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import HomePage from './pages/HomePage'
import FeaturePage from './pages/FeaturePage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminProjectPage from './pages/AdminProjectPage'
import ClientProjectPage from './pages/ClientProjectPage'
import ContactPage from './pages/ContactPage'
import AdminRoute from './components/AdminRoute'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import ProjectCodeModal from './components/ProjectCodeModal'
import { AuthProvider } from './context/AuthContext'

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
      <AuthProvider>
        <div className="min-h-screen bg-[#080d18] text-[#eeeef5]">
          <ScrollToTop />
          <Navbar />
          <ProjectCodeModal />
          <main>
            <Routes>
              <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
              <Route path="/features/:slug" element={<FeaturePage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              } />
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={
                <AdminRoute><AdminDashboardPage /></AdminRoute>
              } />
              <Route path="/admin/project/:code" element={
                <AdminRoute><AdminProjectPage /></AdminRoute>
              } />
              <Route path="/dashboard/project/:code" element={
                <ProtectedRoute><ClientProjectPage /></ProtectedRoute>
              } />
              <Route path="/contact" element={
                <PublicRoute><ContactPage /></PublicRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
