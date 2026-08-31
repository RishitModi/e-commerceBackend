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
    <div>
      {cart.items.map((item) => (
        <div key={item.product.id} className="cart-item-row">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.product.imageUrl ? (
              <img
                className="cart-item-thumb"
                src={item.product.imageUrl || undefined}
                alt={item.product.name}
              />
            ) : (
              <div className="cart-item-thumb-placeholder" aria-hidden="true" />
            )}
            <span>{item.product.name} {'\u2014'} ${item.totalPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            <button className="button-danger" onClick={() => void removeItem(item.product.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  )
}
