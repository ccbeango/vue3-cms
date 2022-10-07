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

  // 查询列表
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

  // 创建数据
  const createPageDataAction = async (payload: any) => {
    const { pageName, newData } = payload
    const pageUrl = `/${pageName}`
    await SystemService.createPageData(pageUrl, newData)

    // 重新拉取最新数据
    getPageListAction({
      pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
  }

  // 编辑数据
  const editPageDataAction = async (payload: any) => {
    const { pageName, editData, id } = payload
    const pageUrl = `/${pageName}/${id}`
    await SystemService.editPageData(pageUrl, editData)

    // 重新拉取最新数据
    getPageListAction({
      pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
  }

  // 删除数据
  const deletePageDataAction = async (payload: any) => {
    const { pageName, id } = payload
    const pageUrl = `/${pageName}/${id}`
    await SystemService.deletePageData(pageUrl)

    // 重新拉取最新数据
    getPageListAction({
      pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
  }


  const entireDepartment = ref<any[]>([])
  const entireRole = ref<any[]>([])
  const entireMenu = ref<any[]>([])
  const getInitialDataAction = async () => {
    // 1.请求部门数据
    const departmentResult = await SystemService.getPageListData('/department/list', {
      offset: 0,
      size: 1000
    })
    const { list: departmentList } = departmentResult.data
    // 2.请求角色数据
    const roleResult = await SystemService.getPageListData('/role/list', {
      offset: 0,
      size: 1000
    })
    const { list: roleList } = roleResult.data
    // 3.请求菜单数据
    const menuResult = await SystemService.getPageListData('/menu/list', {})
    const { list: menuList } = menuResult.data

    // 保存数据
    entireDepartment.value = departmentList
    entireRole.value = roleList
    entireMenu.value = menuList
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
    getPageListAction,
    createPageDataAction,
    editPageDataAction,
    deletePageDataAction,


    entireDepartment,
    entireRole,
    entireMenu,
    getInitialDataAction
  }
})
