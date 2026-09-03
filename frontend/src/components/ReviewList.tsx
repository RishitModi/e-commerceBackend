import type { ReviewDto } from '../types/review'

type ReviewListProps = {
  reviews: ReviewDto[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p>No reviews yet.</p>
  }

  return (
    <div className="order-list">
      {reviews.map((review) => (
        <div key={review.id} className="order-card">
          <div className="order-card-header">
            <strong>{review.userName}</strong>
            <span>Rating: {review.rating}/5</span>
          </div>
          {review.comment ? <p>{review.comment}</p> : null}
          <div style={{ color: 'var(--text)', marginTop: '12px' }}>
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}
