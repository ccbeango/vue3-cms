import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}

export default class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.useInterceptors()
  }

  /**
   * 拦截器
   */
  private useInterceptors() {
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.useInnerInterceptors()

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  /**
   * 类内部拦截器
   */
  private useInnerInterceptors() {
    this.instance.interceptors.request.use(
      config => {
        console.log('类内部的request拦截器')
        return config
      },
      err => {
        console.log('类内部的request的Error拦截器')
        return err
      }
    )

    this.instance.interceptors.response.use(
      res => {
        console.log('类内部的response拦截器')
        return res.data
      },
      err => {
        console.log('类内部的response的Error拦截器')
        return err
      }
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          return resolve(res)
        })
        .catch(err => {
          return reject(err)
        })
    })
  }
}
