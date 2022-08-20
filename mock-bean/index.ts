// import path from 'path'
// import { normalizePath } from 'vite'

import type { ResolvedConfig, Plugin } from 'vite'
import type { MockOptions } from './types'

import { createMockServer, requestMiddleware } from './createMockServer'

// const defaultAppEntry = 'src/main.ts'

export function ViteMockServer(options: MockOptions): Plugin {
  // const { appEntry = defaultAppEntry } = options
  // const absEntry = path.resolve(process.cwd(), appEntry)
  // const entry = normalizePath(absEntry)

  // let config: ResolvedConfig
  // let needSourcemap = false
  let isDev = false

  return {
    name: 'vite:mock-bean',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      const { command, build } = resolvedConfig
      isDev = command === 'serve'
      // needSourcemap = !!build.sourcemap
      isDev && createMockServer(options)
    },
    async configureServer({ middlewares }) {
      if (!isDev) return
      const middleware = await requestMiddleware(options)
      middlewares.use(middleware)
    }
    // transform(code: string, id: string) {
    //   const aa = this.getCombinedSourcemap()
    //   return {
    //     map: needSourcemap ? this.getCombinedSourcemap() : null,
    //     // code: `${code}\n${injectCode}`
    //     code: `${code}`
    //   }
    // }
  }
}
