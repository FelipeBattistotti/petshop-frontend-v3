import useSWR from "swr"
import api from "../services/api"

// Axios
const fetcher = (url: string) => api.get(url, {
  headers: {
    Authorization: typeof window !== 'undefined' ? localStorage.getItem('userId') : ''
  }
})
  .then(r => r.data)

export const useFetcher = <Data = any, Error = any>(url: string) => {
  const { data } = useSWR<Data, Error>(url, fetcher)
  return { data }
}
