import { createPinia } from 'pinia'
import { useCounterStore } from './counter'
import { useLoginStore } from './login'
import { useSystemStore } from './system'

const store = createPinia()

export default store

export { useCounterStore, useLoginStore, useSystemStore }

export async function setupStore() {
  console.log('调用了吗')
  const loginStore = useLoginStore()
  await loginStore.loadLocalLogin()
}
