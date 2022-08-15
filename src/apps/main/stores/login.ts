import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IAccount {
  name: string
  password: string
}

export const useLoginStore = defineStore('login', () => {
  const token = ref('')
  const userInfo = ref({})
  const userMenus = ref([])

  const accountLoginAction = (payload: IAccount) => {
    console.log('登录Action', payload)
  }

  return {
    token,
    userInfo,
    userMenus,

    // action
    accountLoginAction
  }
})
