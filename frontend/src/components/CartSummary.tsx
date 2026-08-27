import { useCart } from '../context/CartContext'

export default function CartSummary() {
  const { cart, updateItem, removeItem } = useCart()

  if (!cart || cart.items.length === 0) {
    return <p>Cart is empty</p>
  }

  const handleQuantityBlur = async (
    productId: number,
    event: React.FocusEvent<HTMLInputElement>,
    currentQuantity: number,
  ) => {
    const nextQuantity = Number(event.target.value)

    if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
      event.target.value = String(currentQuantity)
      return
    }

    if (nextQuantity === currentQuantity) {
      return
    }

    await updateItem(productId, nextQuantity)
  }

  return (
    <>
      <ul>
        {cart.items.map((item) => (
          <li key={item.product.id}>
            {item.product.name} x{item.quantity} — ${item.totalPrice.toFixed(2)}
            <input
              type="number"
              defaultValue={item.quantity}
              min={1}
              onBlur={(event) =>
                void handleQuantityBlur(item.product.id, event, item.quantity)
              }
            />
            <button onClick={() => void removeItem(item.product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${cart.totalPrice.toFixed(2)}</p>
    </>
  )
}
