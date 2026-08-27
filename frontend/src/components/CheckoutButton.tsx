import { useState } from 'react'
import { checkout } from '../api/checkout'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function CheckoutButton() {
  const { accessToken, user } = useAuth()
  const { cart } = useCart()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!user) {
    return <p>Please log in to checkout.</p>
  }

  if (!cart || cart.items.length === 0) {
    return <p>Add items to your cart to checkout.</p>
  }

  const handleCheckout = async () => {
    if (!accessToken) {
      setError('Missing access token')
      return
    }

    setError(null)
    setIsRedirecting(true)

    try {
      const response = await checkout(cart.id, accessToken)
      window.location.href = response.checkoutUrl
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Checkout failed')
      }
      setIsRedirecting(false)
    }
  }

  return (
    <>
      <button onClick={() => void handleCheckout()} disabled={isRedirecting}>
        {isRedirecting ? 'Redirecting...' : 'Checkout'}
      </button>
      {error ? <p>{error}</p> : null}
    </>
  )
}
