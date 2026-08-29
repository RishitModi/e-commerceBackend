import { type FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCategories } from '../../api/categories'
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from '../../api/products'
import AdminRoute from '../../components/AdminRoute'
import { useAuth } from '../../context/AuthContext'
import type { CategoryDto } from '../../types/category'

type ProductFormState = {
  name: string
  description: string
  price: string
  categoryId: string
}

export default function AdminProductForm() {
  const { id } = useParams()
  const isEditMode = id !== undefined
  const parsedProductId = id ? Number(id) : null
  const { accessToken } = useAuth()
  const navigate = useNavigate()

  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [form, setForm] = useState<ProductFormState>({
    name: '',
    description: '',
    price: '',
    categoryId: '',
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const categoriesResult = await getAllCategories()
        setCategories(categoriesResult)

        if (isEditMode) {
          if (parsedProductId === null || Number.isNaN(parsedProductId)) {
            setError('Invalid product id')
            return
          }

          const products = await getAllProducts()
          const product = products.find((item) => item.id === parsedProductId)

          if (!product) {
            setError('Product not found')
            return
          }

          setForm({
            name: product.name,
            description: product.description,
            price: String(product.price),
            categoryId: product.categoryId !== null ? String(product.categoryId) : '',
          })
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          return
        }

        setError('Failed to load form data')
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [isEditMode, parsedProductId])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!accessToken) {
      setError('Log in to manage products')
      return
    }

    setSubmitting(true)
    setError(null)

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      categoryId: Number(form.categoryId),
    }

    try {
      if (isEditMode) {
        if (parsedProductId === null || Number.isNaN(parsedProductId)) {
          setError('Invalid product id')
          return
        }
        await updateProduct(parsedProductId, payload, accessToken)
      } else {
        await createProduct(payload, accessToken)
      }

      navigate('/admin/products')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to save product')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminRoute>
      <section>
        <h2>{isEditMode ? 'Edit Product' : 'Create Product'}</h2>
        {loading ? (
          <div className="loading-state">Loading form...</div>
        ) : (
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="product-name">Name</label>
              <input
                id="product-name"
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </div>

            <div>
              <label htmlFor="product-description">Description</label>
              <textarea
                id="product-description"
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
                required
              />
            </div>

            <div>
              <label htmlFor="product-price">Price</label>
              <input
                id="product-price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                required
              />
            </div>

            <div>
              <label htmlFor="product-category">Category</label>
              <select
                id="product-category"
                value={form.categoryId}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, categoryId: event.target.value }))
                }
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </button>
          </form>
        )}
        {error ? <p>{error}</p> : null}
      </section>
    </AdminRoute>
  )
}
