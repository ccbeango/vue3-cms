import { MockMethod } from '../mock/types'
export default [
  {
    url: '/api/createUser',
    method: 'post',
    response: ({ body, query }) => {
      console.log('body>>>>>>>>', body)
      console.log('query>>>>>>>>', query)
      return {
        code: 0,
        message: 'ok',
        data: null,
      }
    },
  },
] as MockMethod[]
