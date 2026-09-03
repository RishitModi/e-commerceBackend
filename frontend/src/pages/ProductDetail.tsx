import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllCategories } from '../api/categories'
import { getProduct } from '../api/products'
import { getReviews } from '../api/reviews'
import ReviewForm from '../components/ReviewForm'
import ReviewList from '../components/ReviewList'
import { useCart } from '../context/CartContext'
import type { CategoryDto } from '../types/category'
import type { ProductDto } from '../types/product'
import type { ReviewDto } from '../types/review'

export default function ProductDetail() {
  const { id } = useParams()
  const productId = Number(id)
  const { addItem } = useCart()
  const [product, setProduct] = useState<ProductDto | null>(null)
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [adding, setAdding] = useState(false)
  const [reviews, setReviews] = useState<ReviewDto[]>([])

  const loadReviews = async (targetProductId: number) => {
    const reviewResult = await getReviews(targetProductId)
    setReviews(reviewResult)
  }

  useEffect(() => {
    const loadProduct = async () => {
      if (!id || Number.isNaN(productId)) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setNotFound(false)
        const [productResult, categoriesResult, reviewResult] = await Promise.all([
          getProduct(productId),
          getAllCategories(),
          getReviews(productId),
        ])
        setProduct(productResult)
        setCategories(categoriesResult)
        setReviews(reviewResult)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    void loadProduct()
  }, [id, productId])

  const handleAddToCart = async () => {
    if (!product) {
      return
    }

    setAdding(true)
    try {
      await addItem(product.id)
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return <div className="loading-state">Loading product...</div>
  }

  if (notFound || !product) {
    return (
      <section className="page">
        <p>Product not found</p>
        <Link to="/">Back to products</Link>
      </section>
    )
  }

  const categoryName =
    product.categoryId === null
      ? 'Uncategorized'
      : categories.find((category) => category.id === product.categoryId)?.name ?? 'Uncategorized'

  return (
    <section className="page">
      <div className="breadcrumb">
        <Link to="/">Products</Link>
        <span className="breadcrumb-separator">/</span>
        <span>{categoryName}</span>
        <span className="breadcrumb-separator">/</span>
        <span>{product.name}</span>
      </div>
      <div className="product-detail">
        <div className="product-detail-image">
          {product.imageUrl ? (
            <img src={product.imageUrl || undefined} alt={product.name} />
          ) : (
            <div className="image-placeholder" aria-hidden="true" />
          )}
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-category">{categoryName}</p>
          <p className="product-detail-description">{product.description}</p>
        </div>

        <div className="buy-box">
          <div className="buy-box-price">${product.price.toFixed(2)}</div>
          <button onClick={() => void handleAddToCart()} disabled={adding}>
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <section style={{ marginTop: '24px', textAlign: 'left' }}>
        <h2>Reviews</h2>
        <ReviewList reviews={reviews} />
        <ReviewForm productId={productId} onSubmitted={() => void loadReviews(productId)} />
      </section>
    </section>
  )
}
