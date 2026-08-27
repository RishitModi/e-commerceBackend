import { apiFetch } from './client'
import type { ProductDto } from '../types/product'

export function getAllProducts(): Promise<ProductDto[]> {
  return apiFetch<ProductDto[]>('/products')
}
