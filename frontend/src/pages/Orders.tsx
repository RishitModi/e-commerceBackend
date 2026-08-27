import { useEffect, useState } from 'react'
import { getAllOrders } from '../api/orders'
import { useAuth } from '../context/AuthContext'
import type { OrderDto } from '../types/order'

export default function Orders() {
  const { accessToken, user } = useAuth()
  const [orders, setOrders] = useState<OrderDto[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!accessToken) {
      setOrders([])
      return
    }

    const loadOrders = async () => {
      try {
        setError(null)
        const result = await getAllOrders(accessToken)
        setOrders(result)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          return
        }

        setError('Failed to load orders')
      }
    }

    void loadOrders()
  }, [accessToken])

  if (!user) {
    return <p>Log in to see your orders</p>
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
                Order #{order.id} — {order.status} —{' '}
                {new Date(order.createdAt).toLocaleDateString()} — Total: ${order.totalPrice.toFixed(2)}
              </p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.product.id}>
                    {item.product.name} x{item.quantity} — ${item.totalPrice.toFixed(2)}
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
