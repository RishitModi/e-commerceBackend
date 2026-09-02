import { apiFetch } from './client'
import type { AddressDto } from '../types/address'

export function getAddresses(accessToken: string): Promise<AddressDto[]> {
  return apiFetch<AddressDto[]>('/users/me/addresses', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

export function createAddress(
  address: Omit<AddressDto, 'id'>,
  accessToken: string,
): Promise<AddressDto> {
  return apiFetch<AddressDto>('/users/me/addresses', {
    method: 'POST',
    body: JSON.stringify(address),
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

export function updateAddress(
  id: number,
  address: Omit<AddressDto, 'id'>,
  accessToken: string,
): Promise<AddressDto> {
  return apiFetch<AddressDto>(`/users/me/addresses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(address),
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

export function deleteAddress(id: number, accessToken: string): Promise<void> {
  return apiFetch<void>(`/users/me/addresses/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}
