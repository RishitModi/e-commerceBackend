import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getCurrentUser, login } from '../api/auth'
import type { UserDto } from '../types/user'

type AuthContextValue = {
  accessToken: string | null
  user: UserDto | null
  loginUser: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserDto | null>(null)

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

  const value = useMemo(
    () => ({ accessToken, user, loginUser, logout }),
    [accessToken, user],
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
