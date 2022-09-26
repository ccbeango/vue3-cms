import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SystemService } from '@common/service'

export const useSystemStore = defineStore('system', () => {
  const userList = ref([])
  const userCount = ref(0)


  const getPageListAction = async (payload: any) => {
    const res = await SystemService.getPageListData(payload.pageUrl, payload.queryInfo)

    userList.value = res.data.list
    userCount.value = res.data.totalCount
  }

  return {
    userList,
    userCount,
    getPageListAction
  }

})
