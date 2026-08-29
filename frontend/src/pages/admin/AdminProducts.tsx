import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProduct, getAllProducts } from '../../api/products'
import AdminRoute from '../../components/AdminRoute'
import { useAuth } from '../../context/AuthContext'
import type { ProductDto } from '../../types/product'

export default function AdminProducts() {
  const { accessToken } = useAuth()
  const [products, setProducts] = useState<ProductDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingProductIds, setDeletingProductIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
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

  const handleDelete = async (id: number) => {
    if (!accessToken) {
      setError('Log in to manage products')
      return
    }

    if (!window.confirm('Delete this product?')) {
      return
    }

    setDeletingProductIds((previous) => {
      const next = new Set(previous)
      next.add(id)
      return next
    })

    try {
      await deleteProduct(id, accessToken)
      setProducts((previous) => previous.filter((product) => product.id !== id))
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to delete product')
      }
    } finally {
      setDeletingProductIds((previous) => {
        const next = new Set(previous)
        next.delete(id)
        return next
      })
    }
  }

  return (
    <AdminRoute>
      <section>
        <h2>Manage Products</h2>
        <p>
          <Link to="/admin/products/new">+ New Product</Link>
        </p>
        {error ? <p>{error}</p> : null}
        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.categoryId ?? 'N/A'}</td>
                  <td>
                    <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>{' '}
                    <button
                      onClick={() => void handleDelete(product.id)}
                      disabled={deletingProductIds.has(product.id)}
                    >
                      {deletingProductIds.has(product.id) ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AdminRoute>
  )
}
