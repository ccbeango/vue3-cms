import RequestService from '../../index'
import type { ResponseData } from '../../index'


function getPageListData(url: string, queryInfo: any) {
  return RequestService.request<ResponseData<any>>({
    url: url,
    method: 'post',
    data: queryInfo
  })
}

export default {
  getPageListData
}
