import { apiFetch } from './client'
import type { ProductDto } from '../types/product'

export function getAllProducts(): Promise<ProductDto[]> {
  return apiFetch<ProductDto[]>('/products')
}

export function deleteProduct(id: number, accessToken: string): Promise<void> {
  return apiFetch<void>(`/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export function createProduct(
  product: Omit<ProductDto, 'id'>,
  accessToken: string,
): Promise<ProductDto> {
  return apiFetch<ProductDto>('/products', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export function updateProduct(
  id: number,
  product: Omit<ProductDto, 'id'>,
  accessToken: string,
): Promise<ProductDto> {
  return apiFetch<ProductDto>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
