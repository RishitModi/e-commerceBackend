export interface CartProductDto {
  id: number
  name: string
  price: number
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
