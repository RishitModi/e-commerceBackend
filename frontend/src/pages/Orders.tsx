import { useEffect, useState } from 'react'
import { getAllOrders } from '../api/orders'
import { useAuth } from '../context/AuthContext'
import type { OrderDto } from '../types/order'

export default function Orders() {
  const { accessToken, user } = useAuth()
  const [orders, setOrders] = useState<OrderDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!accessToken) {
      setOrders([])
      setLoading(false)
      return
    }

    const loadOrders = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await getAllOrders(accessToken)
        setOrders(result)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          return
        }

        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    void loadOrders()
  }, [accessToken])

  if (!user) {
    return <p>Log in to see your orders</p>
  }

  if (loading) {
    return <div className="loading-state">Loading your orders...</div>
  }

  return (
    <section className="page">
      <h2>My Orders</h2>
      {error ? <p>{error}</p> : null}
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <strong>Order #{order.id}</strong>
                <span className="order-status">{order.status}</span>
              </div>

              <div style={{ color: 'var(--text)', marginBottom: '12px' }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </div>

              {order.items.map((item) => (
                <div key={item.product.id} className="order-item-row">
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}

              <div className="order-total">Total: ${order.totalPrice.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
