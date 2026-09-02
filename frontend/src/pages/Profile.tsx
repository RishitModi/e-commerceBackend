import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) {
    return <p>Log in to view your profile.</p>
  }

  return (
    <section className="page">
      <h2>My Profile</h2>

      <div className="navbar-links" style={{ marginBottom: '16px' }}>
        <Link to="/account">Profile</Link>
        <Link to="/account/addresses">Addresses</Link>
      </div>

      <div>
        <div><strong>Name:</strong> {user.name}</div>
        <div style={{ marginTop: '8px' }}><strong>Email:</strong> {user.email}</div>
      </div>
    </section>
  )
}
