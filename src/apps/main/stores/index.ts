import { createPinia } from 'pinia'
import { useCounterStore } from './counter'
import { useLoginStore } from './login'
import { useSystemStore } from './system'

const store = createPinia()

export default store

export { useCounterStore, useLoginStore, useSystemStore }

export async function setupStore() {
  const loginStore = useLoginStore()
  await loginStore.loadLocalLogin()

  const systemStore = useSystemStore()
  await systemStore.getInitialDataAction()
}

export type { SystemPageListColumn, SystemPageCountColumn } from './types'
