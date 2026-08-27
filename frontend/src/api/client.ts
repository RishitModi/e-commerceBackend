export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const url = `${baseUrl}${path}`

  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const contentLength = response.headers.get('content-length')
  const contentType = response.headers.get('content-type')

  if (
    response.status === 204 ||
    contentLength === '0' ||
    !contentType ||
    !contentType.toLowerCase().includes('application/json')
  ) {
    return undefined as T
  }

  return (await response.json()) as T
}
