import RequestService from '../../index'
import type { ResponseData } from '../../index'

function getPageListData(url: string, queryInfo: any) {
  return RequestService.request<ResponseData<any>>({
    url: url,
    method: 'post',
    data: queryInfo
  })
}

function deletePageData(url: string) {
  return RequestService.request<ResponseData<any>>({
    url,
    method: 'delete'
  })
}

function createPageData(url: string, newData: any) {
  return RequestService.request<ResponseData<any>>({
    url,
    method: 'post',
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return RequestService.request<ResponseData<any>>({
    url: url,
    method: 'patch',
    data: editData
  })
}

export default {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
}
