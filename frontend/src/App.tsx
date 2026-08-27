import { useEffect, useState } from 'react'
import CartSummary from './components/CartSummary'
import CheckoutButton from './components/CheckoutButton'
import { getAllProducts } from './api/products'
import { useAuth } from './context/AuthContext'
import { useCart } from './context/CartContext'
import Login from './pages/Login'
import Orders from './pages/Orders'
import type { ProductDto } from './types/product'

export default function App() {
  const { user, logout } = useAuth()
  const { addItem } = useCart()
  const [products, setProducts] = useState<ProductDto[]>([])
  const [error, setError] = useState<string | null>(null)
  const [addingProductIds, setAddingProductIds] = useState<Set<number>>(new Set())

  const handleAddToCart = async (productId: number) => {
    setAddingProductIds((previous) => {
      const next = new Set(previous)
      next.add(productId)
      return next
    })

    try {
      await addItem(productId)
    } finally {
      setAddingProductIds((previous) => {
        const next = new Set(previous)
        next.delete(productId)
        return next
      })
    }
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await getAllProducts()
        setProducts(result)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          return
        }

        setError('Failed to load products')
      }
    }

    void loadProducts()
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      {user ? (
        <>
          <p>
            Logged in as {user.name} <button onClick={logout}>Logout</button>
          </p>
          <Orders />
        </>
      ) : (
        <Login />
      )}
      <CartSummary />
      <CheckoutButton />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} � ${product.price.toFixed(2)}
            <button
              onClick={() => void handleAddToCart(product.id)}
              disabled={addingProductIds.has(product.id)}
            >
              {addingProductIds.has(product.id) ? 'Adding...' : 'Add to Cart'}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
