import { apiFetch } from './client'
import type { CartDto, CartItemDto } from '../types/cart'

export function createCart(): Promise<CartDto> {
  return apiFetch<CartDto>('/carts', {
    method: 'POST',
  })
}

export function getCart(cartId: string): Promise<CartDto> {
  return apiFetch<CartDto>(`/carts/${cartId}`)
}

export function addToCart(cartId: string, productId: number): Promise<CartItemDto> {
  return apiFetch<CartItemDto>(`/carts/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({ productId }),
  })
}

export function updateCartItem(
  cartId: string,
  productId: number,
  quantity: number,
): Promise<CartItemDto> {
  return apiFetch<CartItemDto>(`/carts/${cartId}/items/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  })
}

export function removeCartItem(cartId: string, productId: number): Promise<void> {
  return apiFetch<void>(`/carts/${cartId}/items/${productId}`, {
    method: 'DELETE',
  })
}
