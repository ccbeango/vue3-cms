import Request from './request'
import localCache from '@/utils/cache'

export { default as LoginService } from './login/login'

export interface ResponseData<T> {
  code: number
  data: T
}

const requestService = new Request<ResponseData>({
  baseURL: 'api',
  timeout: 3000,
  interceptors: {
    requestInterceptor: config => {
      console.log('实例化的request拦截器')
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch: err => {
      console.log('实例化的request的Error拦截器')
      return err
    },
    responseInterceptor: res => {
      console.log('实例化的response拦截器')
      return res
    },
    responseInterceptorCatch: err => {
      console.log('实例化的response的Error拦截器')
      return err
    }
  }
})

export default requestService
