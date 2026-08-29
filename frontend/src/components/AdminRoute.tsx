import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

type AdminRouteProps = {
  children: ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isAdmin } = useAuth()

  if (!user) {
    return <p>Log in to access this page.</p>
  }

  if (!isAdmin) {
    return <p>You don't have access to this page.</p>
  }

  return <>{children}</>
}
