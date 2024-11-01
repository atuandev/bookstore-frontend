import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import envConfig from '@/config/env-config'
import { getAccessToken, removeAccessToken } from '@/utils/local-storage'

class HttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const axiosInstance = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (token)
      config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response) {
      const { status, data: { message } } = error.response

      if (status === 401) {
        removeAccessToken()
      }

      return Promise.reject(new HttpError(status, message))
    }
    return Promise.reject(error)
  },
)

const axiosClient = {
  get: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.get(url, config)
  },
  post: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.post(url, data, config)
  },
  put: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.put(url, data, config)
  },
  delete: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.delete(url, config)
  },
}

export default axiosClient
