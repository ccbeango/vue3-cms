import { createApp } from 'vue'
import store, { setupStore } from './stores'
import router from './router'
import App from './App.vue'
import '@common/styles/reset.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
setupStore()

app.mount('#app')
