import axios, { type AxiosRequestConfig } from 'axios'

export type ApiError = {
  message: string
  status: number
}

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
  (error) =>
    Promise.reject({
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status || 500,
    })
)

const axiosRequest = <T>(
  options: AxiosRequestConfig
): Promise<readonly [T | null, ApiError | null]> =>
  api(options)
    .then((data) => [data as T, null] as const)
    .catch((error: ApiError) => [null, error] as const)

export default axiosRequest

