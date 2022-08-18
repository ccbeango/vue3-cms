import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import MultiPagePlugin from 'vite-plugin-multiple-page'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { viteMockServe } from './mock'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: './types/components.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    MultiPagePlugin({
      pages: {
        main: {
          entry: 'src/apps/main/index.ts',
          filename: 'index.html',
          template: 'src/apps/main/index.html',
          inject: {
            data: {
              title: 'mpa-app1',
              injectScript: `<script type="module" src="/test.js"></script>`
            }
          }
        },
        hello: {
          entry: 'src/apps/hello/index.ts',
          filename: 'hello.html',
          template: 'src/apps/hello/index.html',
          inject: {
            data: {
              title: 'mpa-app2',
              injectScript: `<script type="module" src="/test.js"></script>`
            }
          }
        }
      }
    }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
      // prodEnabled: command !== 'serve' && prodMock,
      // //  这样可以控制关闭mock的时候不让mock打包到最终代码内
      // injectCode: `
      //   import { setupProdMockServer } from './mockProdServer';
      //   setupProdMockServer();
      // `,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/apps/main', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/common', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@common/styles/index.scss";`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
