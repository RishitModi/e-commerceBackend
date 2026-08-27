import { apiFetch } from './client'
import type { CheckoutResponse } from '../types/checkout'

export function checkout(
  cartId: string,
  accessToken: string,
): Promise<CheckoutResponse> {
  return apiFetch<CheckoutResponse>('/checkout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ cartId }),
  })
}
