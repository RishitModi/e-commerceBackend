import { apiFetch } from './client'
import type { CategoryDto } from '../types/category'

export function getAllCategories(): Promise<CategoryDto[]> {
  return apiFetch<CategoryDto[]>('/categories')
}
