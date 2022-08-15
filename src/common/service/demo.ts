import Request from './request'

console.log('哈哈哈')

const requestService = new Request({
  baseURL: 'http://152.136.185.210:4000',
  timeout: 3000,
  interceptors: {
    requestInterceptor: config => {
      console.log('实例化的request拦截器')
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

console.log('呵呵')

interface ResponseData {
  returnCode: string
  success: boolean
  data?: any
}

requestService
  .request<ResponseData>({
    url: '/home/multidata',
    method: 'get',
    interceptors: {
      requestInterceptor: config => {
        console.log('单个请求的request拦截器')
        return config
      },
      requestInterceptorCatch: err => {
        console.log('单个请求的request的Error拦截器')
        return err
      },
      responseInterceptor: res => {
        console.log('单个请求的response拦截器')
        return res
      },
      responseInterceptorCatch: err => {
        console.log('单个请求的response的Error拦截器')
        return err
      }
    }
  })
  .then(res => {
    console.log('res222', res)
  })
