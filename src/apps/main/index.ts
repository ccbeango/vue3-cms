import { createApp } from 'vue'
import store from './stores'
import router from './router'
import App from './App.vue'
import '@common/service/demo'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
