import { defineStore } from 'pinia'
import { ref } from 'vue'

import router from '@/router'

import LocalCache from '@/utils/cache'

import { LoginService } from '@common/service'

import type { IAccount } from '@common/service/login/login'


export const useLoginStore = defineStore('login', () => {
  const token = ref('')
  const userInfo = ref({})
  const userMenus = ref([])

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
    const userMenusResult = await LoginService.getUserMenusByRoleId(loginResult.data.id)
    console.log('用户菜单', userMenusResult)
    userMenus.value = userMenusResult.data
    LocalCache.setCache('userMenus', userMenusResult.data)

    router.push('/main')
  }

  // 加载本地登录信息
  const loadLocalLogin = () => {
    const tokenCache = LocalCache.getCache('token')
    if (tokenCache) {
      token.value = tokenCache
    }
    const userInfoCache = LocalCache.getCache('userInfo')
    if (userInfo) {
      userInfo.value = userInfoCache
    }
    const userMenusCache = LocalCache.getCache('userMenus')
    if (userMenusCache) {
      userMenus.value = userMenusCache
    }
  }

  return {
    token,
    userInfo,
    userMenus,

    // action
    accountLoginAction,
    loadLocalLogin
  }
})
