import { createApp } from 'vue'
import store, { setupStore } from './stores'
import router from './router'
import App from './App.vue'
import '@common/styles/reset.css'

const app = createApp(App)

app.use(store)
app.use(router)
setupStore()

app.mount('#app')
