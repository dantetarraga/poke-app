import axios, { type AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error)
    // return Promise.reject(error)
    // return Promise.reject({ error: error.message, status: error.response?.status })
    
    return null
  }
)

const axiosRequest = <T>(config: AxiosRequestConfig): Promise<T> =>
  api(config).then((data) => data as T)

// api(config).then((data) => [data as T, null] as const).catch((error) => [null, error] as const)
export default axiosRequest

