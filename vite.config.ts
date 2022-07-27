import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/apps/main',
  base: './',
  publicDir: '../../../public',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/apps/main', import.meta.url))
    }
  },
  build: {
    outDir: '../../../dist',
    assetsDir: './assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/apps/main/index.html'),
        // test: resolve(__dirname, 'src/apps/test/index.html')
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
