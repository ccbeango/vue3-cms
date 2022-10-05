/// <reference types="vite/client" />

export {}

declare global {
  const __HAHA__: string
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      formatTime(val: string): string
    }
  }
}
