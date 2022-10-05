import type { App } from 'vue'
import registerElementPlusIcon from './register-elementplus-icon'
import registerGlobalProperties from './register-properties'

export default function globalRegister(app: App) {
  app.use(registerElementPlusIcon)
  app.use(registerGlobalProperties)
}
