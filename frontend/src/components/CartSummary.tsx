import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function CartSummary() {
  const { cart, updateItem, removeItem } = useCart()
  const [updatingProductIds, setUpdatingProductIds] = useState<Set<number>>(new Set())

  if (!cart || cart.items.length === 0) {
    return <p>Cart is empty</p>
  }

  const setUpdating = (productId: number, isUpdating: boolean) => {
    setUpdatingProductIds((previous) => {
      const next = new Set(previous)
      if (isUpdating) {
        next.add(productId)
      } else {
        next.delete(productId)
      }
      return next
    })
  }

  const handleDecrement = async (productId: number, quantity: number) => {
    setUpdating(productId, true)
    try {
      if (quantity === 1) {
        await removeItem(productId)
        return
      }

      await updateItem(productId, quantity - 1)
    } finally {
      setUpdating(productId, false)
    }
  }

  const handleIncrement = async (productId: number, quantity: number) => {
    setUpdating(productId, true)
    try {
      await updateItem(productId, quantity + 1)
    } finally {
      setUpdating(productId, false)
    }
  }

  return (
    <>
      <ul>
        {cart.items.map((item) => (
          <li key={item.product.id}>
            {item.product.name} x{item.quantity} � ${item.totalPrice.toFixed(2)}
            <div className="quantity-stepper">
              <button
                onClick={() => void handleDecrement(item.product.id, item.quantity)}
                disabled={updatingProductIds.has(item.product.id)}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => void handleIncrement(item.product.id, item.quantity)}
                disabled={updatingProductIds.has(item.product.id)}
              >
                +
              </button>
            </div>
            <button onClick={() => void removeItem(item.product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${cart.totalPrice.toFixed(2)}</p>
    </>
  )
}
