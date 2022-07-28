import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import MultiPagePlugin from 'vite-plugin-multiple-page'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    MultiPagePlugin({
      pages: {
        main: {
          entry: 'src/apps/main/index.ts',
          filename: 'index.html',
          template: 'src/apps/main/index.html',
          inject: {
            data: {
              title: 'mpa-app1',
              injectScript: `<script type="module" src="/test.js"></script>`,
            }
          }
        },
        login: {
          entry: 'src/apps/login/index.ts',
          filename: 'login.html',
          template: 'src/apps/login/index.html',
          inject: {
            data: {
              title: 'mpa-app2',
              injectScript: `<script type="module" src="/test.js"></script>`,
            }
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/apps/main', import.meta.url))
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
