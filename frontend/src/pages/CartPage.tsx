import CartSummary from '../components/CartSummary'
import CheckoutButton from '../components/CheckoutButton'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart } = useCart()
  const total = cart?.totalPrice ?? 0

  return (
    <div className="page">
      <h2>Your Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          <CartSummary />
        </div>
        <div className="cart-summary-panel">
          <h3>Order Summary</h3>
          <div className="cart-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <CheckoutButton />
        </div>
      </div>
    </div>
  )
}
