import useSWR from 'swr'

interface CsrfResponse {
  token: string
}

interface UseCsrfToken {
  data: CsrfResponse | undefined
  isLoading: boolean
  error: Error | undefined
}
export function useCsrfToken(): UseCsrfToken {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, isLoading, error } = useSWR<CsrfResponse>('/api/csrf', fetcher)
  return { data, isLoading, error }
}
