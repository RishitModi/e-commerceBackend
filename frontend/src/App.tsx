import { useEffect, useState } from 'react'
import { getAllProducts } from './api/products'
import type { ProductDto } from './types/product'

export default function App() {
  const [products, setProducts] = useState<ProductDto[]>([])
  const [error, setError] = useState<string | null>(null)

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
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} — ${product.price.toFixed(2)}
        </li>
      ))}
    </ul>
  )
}
