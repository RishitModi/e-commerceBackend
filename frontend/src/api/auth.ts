import { apiFetch } from './client'
import type { UserDto } from '../types/user'

export function login(
  email: string,
  password: string,
): Promise<{ token: string }> {
  return apiFetch<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function register(
  name: string,
  email: string,
  password: string,
): Promise<void> {
  return apiFetch<void>('/users', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export function getCurrentUser(accessToken: string): Promise<UserDto> {
  return apiFetch<UserDto>('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
