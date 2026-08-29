export function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padding = payload.length % 4
    if (padding > 0) {
      payload += '='.repeat(4 - padding)
    }

    const decoded = atob(payload)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}
