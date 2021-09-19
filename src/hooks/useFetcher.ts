import useSWR from "swr"
import api from "../services/api"

// Axios
const fetcher = (url: string, search?: string) => api.get(url, {
  headers: {
    Authorization: typeof window !== 'undefined' ? localStorage.getItem('userId') : ''
  },
  params: { name: search }
})
.then(r => r.data)

export const useFetcher = <Data = any, Error = any>(url: string, search?: string) => {
  const { data } = useSWR<Data, Error>(search ? [url, search] : null, fetcher, { refreshInterval: 1000 })
  return { data }
}
