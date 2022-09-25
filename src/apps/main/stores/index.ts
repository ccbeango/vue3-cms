import { createPinia } from 'pinia'
import { useCounterStore } from './counter'
import { useLoginStore } from './login'

const store = createPinia()

export default store

export { useCounterStore, useLoginStore }

export async function setupStore() {
  console.log('调用了吗')
  const loginStore = useLoginStore()
  await loginStore.loadLocalLogin()
}
