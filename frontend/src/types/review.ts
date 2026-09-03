export interface ReviewDto {
  id: number
  productId: number
  userName: string
  rating: number
  comment: string | null
  sentimentLabel: string | null
  sentimentScore: number | null
  createdAt: string
}
