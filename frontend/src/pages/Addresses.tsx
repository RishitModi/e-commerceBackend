import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { AddressDto } from '../types/address'
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../api/addresses'

export default function Addresses() {
  const { accessToken, user } = useAuth()
  const [addresses, setAddresses] = useState<AddressDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [stateVal, setStateVal] = useState('')
  const [zip, setZip] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    if (!accessToken) {
      setAddresses([])
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await getAddresses(accessToken)
        setAddresses(result)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Failed to load addresses')
        }
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [accessToken])

  if (!user) {
    return <p>Log in to manage your addresses.</p>
  }

  if (loading) {
    return <div className="loading-state">Loading your addresses...</div>
  }

  const clearForm = () => {
    setStreet('')
    setCity('')
    setStateVal('')
    setZip('')
    setEditingId(null)
  }

  const handleEdit = (a: AddressDto) => {
    setStreet(a.street)
    setCity(a.city)
    setStateVal(a.state)
    setZip(a.zip)
    setEditingId(a.id)
  }

  const handleDelete = async (id: number) => {
    if (!accessToken) return
    if (!window.confirm('Delete this address?')) return
    try {
      await deleteAddress(id, accessToken)
      const updated = await getAddresses(accessToken)
      setAddresses(updated)
    } catch (err) {
      // ignore for now
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessToken) return
    const payload = { street, city, state: stateVal, zip }
    try {
      if (editingId) {
        await updateAddress(editingId, payload, accessToken)
      } else {
        await createAddress(payload, accessToken)
      }
      clearForm()
      const updated = await getAddresses(accessToken)
      setAddresses(updated)
    } catch (err) {
      // ignore for now
    }
  }

  return (
    <section className="page">
      <h2>My Addresses</h2>
      <div className="navbar-links" style={{ marginBottom: '16px' }}>
        <Link to="/account">Profile</Link>
        <Link to="/account/addresses">Addresses</Link>
      </div>

      {error ? <p>{error}</p> : null}

      {addresses.length === 0 ? (
        <p>No saved addresses.</p>
      ) : (
        <div className="order-list">
          {addresses.map((a) => (
            <div key={a.id} className="order-card">
              <div>{a.street}</div>
              <div>{a.city}</div>
              <div>{a.state}</div>
              <div>{a.zip}</div>
              <div style={{ marginTop: '8px' }}>
                <button onClick={() => handleEdit(a)}>Edit</button>
                <button className="button-danger" onClick={() => handleDelete(a.id)} style={{ marginLeft: '8px' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <form className="admin-form" onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        <label>
          Street
          <input value={street} onChange={(e) => setStreet(e.target.value)} />
        </label>
        <label>
          City
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          State
          <input value={stateVal} onChange={(e) => setStateVal(e.target.value)} />
        </label>
        <label>
          ZIP
          <input value={zip} onChange={(e) => setZip(e.target.value)} />
        </label>

        <div>
          <button type="submit">{editingId ? 'Update Address' : 'Add Address'}</button>
          {editingId ? (
            <button type="button" onClick={clearForm} style={{ marginLeft: '8px' }}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  )
}
