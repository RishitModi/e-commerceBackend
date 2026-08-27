import { FormEvent, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { loginUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await loginUser(email, password)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        return
      }

      setError('Login failed')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error ? <p>{error}</p> : null}
    </form>
  )
}
