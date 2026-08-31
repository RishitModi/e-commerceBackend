export interface CartProductDto {
  id: number
  name: string
  price: number
  imageUrl: string | null
}

export interface CartItemDto {
  product: CartProductDto
  quantity: number
  totalPrice: number
}

export interface CartDto {
  id: string
  items: CartItemDto[]
  totalPrice: number
}
