export interface ProductDto {
  id: number
  name: string
  price: number
  description: string
  categoryId: number | null
  imageUrl: string | null
}
