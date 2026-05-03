import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function useStartProject() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return function startProject(e) {
    if (user) {
      e?.preventDefault()
      window.dispatchEvent(new CustomEvent('open-project-code'))
    } else {
      navigate('/contact')
    }
  }
}
