import { apiFetch } from './client'
import type { ReviewDto } from '../types/review'

export function getReviews(productId: number): Promise<ReviewDto[]> {
  return apiFetch<ReviewDto[]>(`/products/${productId}/reviews`)
}

export function createReview(
  productId: number,
  rating: number,
  comment: string,
  accessToken: string,
): Promise<ReviewDto> {
  return apiFetch<ReviewDto>(`/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ rating, comment }),
  })
}
