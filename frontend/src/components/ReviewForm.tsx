import { type FormEvent, useState } from 'react'
import { createReview } from '../api/reviews'
import { useAuth } from '../context/AuthContext'

type ReviewFormProps = {
  productId: number
  onSubmitted: () => void
}

export default function ReviewForm({ productId, onSubmitted }: ReviewFormProps) {
  const { accessToken, user } = useAuth()
  const [rating, setRating] = useState('5')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!user) {
    return <p>Log in to write a review.</p>
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!accessToken) {
      setError('You must be logged in to submit a review.')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      await createReview(productId, Number(rating), comment, accessToken)
      setRating('5')
      setComment('')
      onSubmitted()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to submit review')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <label htmlFor="review-rating">
        Rating
        <select
          id="review-rating"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          disabled={submitting}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>

      <label htmlFor="review-comment">
        Comment
        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          disabled={submitting}
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
      {error ? <p>{error}</p> : null}
    </form>
  )
}
