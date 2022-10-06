import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SystemService } from '@common/service'

export const useSystemStore = defineStore('system', () => {
  // 用户管理
  const usersList = ref([])
  const usersCount = ref(0)
  // 角色管理
  const roleList = ref([])
  const roleCount = ref(0)
  // 商品管理
  const goodsList = ref([])
  const goodsCount = ref(0)
  // 菜单管理
  const menuList = ref([])
  const menuCount = ref(0)

  const getPageListAction = async (payload: any) => {
    const pageName: 'users' | 'role' = payload.pageName
    const pageUrl = `/${pageName}/list`

    const res = await SystemService.getPageListData(pageUrl, payload.queryInfo)
    // usersList.value = res.data.list
    // usersCount.value = res.data.totalCount
    const map = {
      users: { usersList, usersCount },
      role: { roleList, roleCount },
      goods: { goodsList, goodsCount },
      menu: { menuList, menuCount }
    }
    ;(map[pageName] as any)[`${pageName}List`].value = res.data.list
    ;(map[pageName] as any)[`${pageName}Count`].value = res.data.totalCount
  }

  return {
    usersList,
    usersCount,
    roleList,
    roleCount,
    goodsList,
    goodsCount,
    menuList,
    menuCount,
    getPageListAction
  }
})
