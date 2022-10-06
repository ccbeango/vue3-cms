import { defineStore } from 'pinia'
import { ref } from 'vue'

import router from '@/router'

import LocalCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/mapMenus'

import { LoginService } from '@common/service'

import type {
  IAccount,
  IUserMenuItem,
  IUserInfoResult
} from '@common/service/login/login'

export const useLoginStore = defineStore('login', () => {
  const token = ref('')
  const userInfo = ref<IUserInfoResult>({} as any)
  const userMenus = ref<IUserMenuItem[]>([])
  // 按钮权限
  const btnPermissions = ref<string[]>([])

  // 用户登录
  const accountLoginAction = async (payload: IAccount) => {
    // 登录获取token
    const loginResult = await LoginService.accountLoginRequest(payload)
    token.value = loginResult.data.token
    LocalCache.setCache('token', loginResult.data.token)

    // 请求用户信息
    const userInfoResult = await LoginService.getUserInfo(loginResult.data.id)
    console.log('用户信息', userInfoResult)
    userInfo.value = userInfoResult.data
    LocalCache.setCache('userInfo', userInfoResult.data)

    // 请求用户菜单
    const userMenusResult = await LoginService.getUserMenusByRoleId(
      loginResult.data.id
    )

    userMenus.value = userMenusResult.data
    LocalCache.setCache('userMenus', userMenusResult.data)
    // 动态注册路由
    const routeMenus = await mapMenusToRoutes(userMenusResult.data)
    routeMenus.forEach(route => {
      router.addRoute('main', route)
    })

    // 获取用户按钮权限
    const permissions = mapMenusToPermissions(userMenus.value)
    btnPermissions.value = permissions

    router.push('/main')
  }

  // 加载本地登录信息
  const loadLocalLogin = async () => {
    const tokenCache = LocalCache.getCache('token')
    if (tokenCache) {
      token.value = tokenCache
    }
    const userInfoCache = LocalCache.getCache('userInfo')
    if (userInfo.value) {
      userInfo.value = userInfoCache
    }
    const userMenusCache = LocalCache.getCache('userMenus')
    if (userMenusCache) {
      userMenus.value = userMenusCache
      // 动态注册路由
      const routeMenus = await mapMenusToRoutes(userMenusCache)
      routeMenus.forEach(route => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus.value)
      btnPermissions.value = permissions
    }
  }

  return {
    token,
    userInfo,
    userMenus,
    btnPermissions,

    // action
    accountLoginAction,
    loadLocalLogin
  }
})
