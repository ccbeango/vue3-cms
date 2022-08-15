import { createPinia } from 'pinia'
import { useCounterStore } from './counter'
import { useLoginStore } from './login'

const store = createPinia()

export default store

export { useCounterStore, useLoginStore }
