import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import globalRegister from '@/global'
import store, { setupStore } from './stores'
import router from './router'
import App from './App.vue'
import '@common/styles/reset.css'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(globalRegister)
app.use(store)
setupStore().then(() => {
  app.use(router)
  app.mount('#app')
})
