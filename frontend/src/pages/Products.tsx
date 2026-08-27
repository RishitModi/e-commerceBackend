import { useEffect, useState } from 'react'
import { getAllProducts } from '../api/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import type { ProductDto } from '../types/product'

export default function Products() {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [products, setProducts] = useState<ProductDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingProductIds, setAddingProductIds] = useState<Set<number>>(new Set())

  const handleAddToCart = async (productId: number, productName: string) => {
    setAddingProductIds((previous) => {
      const next = new Set(previous)
      next.add(productId)
      return next
    })

    try {
      await addItem(productId)
      showToast(`Added ${productName} to cart`)
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
      } finally {
        setLoading(false)
      }
    }

    void loadProducts()
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  if (loading) {
    return <div className="loading-state">Loading products...</div>
  }

  return (
    <div className="page">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-card">
              {product.name} � ${product.price.toFixed(2)}
              <button
                onClick={() => void handleAddToCart(product.id, product.name)}
                disabled={addingProductIds.has(product.id)}
              >
                {addingProductIds.has(product.id) ? 'Adding...' : 'Add to Cart'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
