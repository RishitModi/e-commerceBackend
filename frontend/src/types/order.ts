export interface OrderProductDto {
  id: number
  name: string
  price: number
}

export interface OrderItemDto {
  product: OrderProductDto
  quantity: number
  totalPrice: number
}

export interface OrderDto {
  id: number
  status: string
  createdAt: string
  items: OrderItemDto[]
  totalPrice: number
}
