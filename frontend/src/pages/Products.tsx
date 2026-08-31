import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../api/categories'
import { getAllProducts, getProductsByCategory } from '../api/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import type { CategoryDto } from '../types/category'
import type { ProductDto } from '../types/product'

export default function Products() {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [products, setProducts] = useState<ProductDto[]>([])
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingProductIds, setAddingProductIds] = useState<Set<number>>(new Set())

  const categoryThumbnails = useMemo(() => {
    const map = new Map<number, string>()

    for (const product of products) {
      if (product.categoryId === null || product.imageUrl == null || map.has(product.categoryId)) {
        continue
      }
      map.set(product.categoryId, product.imageUrl)
    }

    return map
  }, [products])

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
    const loadCategories = async () => {
      try {
        const result = await getAllCategories()
        setCategories(result)
      } catch {
        setCategories([])
      }
    }

    void loadCategories()
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const result =
          selectedCategoryId === null
            ? await getAllProducts()
            : await getProductsByCategory(selectedCategoryId)
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
  }, [selectedCategoryId])

  if (error) {
    return <p>{error}</p>
  }

  if (loading) {
    return <div className="loading-state">Loading products...</div>
  }

  return (
    <div className="page">
      <div className="category-scroll">
        <div className="category-track">
          {categories.map((category) => {
            const thumbnail = categoryThumbnails.get(category.id)
            return (
              <div
                key={category.id}
                className={`category-tile${category.id === selectedCategoryId ? ' active' : ''}`}
                style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : undefined }}
                onClick={() =>
                  setSelectedCategoryId((previous) =>
                    previous === category.id ? null : category.id,
                  )
                }
              >
                <span>{category.name}</span>
              </div>
            )
          })}
          {categories.map((category) => {
            const thumbnail = categoryThumbnails.get(category.id)
            return (
              <div
                key={`dup-${category.id}`}
                className={`category-tile${category.id === selectedCategoryId ? ' active' : ''}`}
                style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : undefined }}
                onClick={() =>
                  setSelectedCategoryId((previous) =>
                    previous === category.id ? null : category.id,
                  )
                }
              >
                <span>{category.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                {product.imageUrl ? (
                  <img src={product.imageUrl || undefined} alt={product.name} />
                ) : (
                  <div className="image-placeholder" aria-hidden="true" />
                )}
              </Link>
              <h2>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h2>
              <p>${product.price.toFixed(2)}</p>
              <button
                onClick={() => void handleAddToCart(product.id, product.name)}
                disabled={addingProductIds.has(product.id)}
              >
                {addingProductIds.has(product.id) ? 'Adding...' : 'Add to Cart'}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
