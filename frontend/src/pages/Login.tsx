import {type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await loginUser(email, password)
      navigate('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        return
      }

      setError('Login failed')
    }
  }

  return (
    <section className="page">
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
      <p>
        Don&apos;t have an account? <Link to="/register">Sign up</Link>
      </p>
    </section>
  )
}
