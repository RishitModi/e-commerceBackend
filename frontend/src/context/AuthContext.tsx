import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { getCurrentUser, login, refresh } from '../api/auth'
import type { UserDto } from '../types/user'
import { decodeJwtPayload } from '../utils/jwt'

type AuthContextValue = {
  accessToken: string | null
  user: UserDto | null
  isAdmin: boolean
  initializing: boolean
  loginUser: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserDto | null>(null)
  const [initializing, setInitializing] = useState(true)

  const loginUser = async (email: string, password: string) => {
    const { token } = await login(email, password)
    setAccessToken(token)
    const currentUser = await getCurrentUser(token)
    setUser(currentUser)
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
  }

  useEffect(() => {
    const init = async () => {
      try {
        const res = await refresh()
        setAccessToken(res.token)
        const currentUser = await getCurrentUser(res.token)
        setUser(currentUser)
      } catch (err) {
        // no valid refresh token / not logged in — leave as null
      } finally {
        setInitializing(false)
      }
    }

    void init()
  }, [])

  const isAdmin = useMemo(() => {
    if (!accessToken) {
      return false
    }

    const payload = decodeJwtPayload(accessToken)
    return payload?.role === 'ADMIN'
  }, [accessToken])

  const value = useMemo(
    () => ({ accessToken, user, isAdmin, initializing, loginUser, logout }),
    [accessToken, user, isAdmin, initializing],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
