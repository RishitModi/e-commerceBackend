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
    <section>
      <h2>My Orders</h2>
      {error ? <p>{error}</p> : null}
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>
                Order #{order.id} {'\u2014'} {order.status} {'\u2014'}{' '}
                {new Date(order.createdAt).toLocaleDateString()} {'\u2014'} Total: ${order.totalPrice.toFixed(2)}
              </p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.product.id}>
                    {item.product.name} x{item.quantity} {'\u2014'} ${item.totalPrice.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
