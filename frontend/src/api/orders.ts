import { apiFetch } from './client'
import type { OrderDto } from '../types/order'

export function getAllOrders(accessToken: string): Promise<OrderDto[]> {
  return apiFetch<OrderDto[]>('/orders', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
