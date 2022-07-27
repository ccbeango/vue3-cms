import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test/about',
      name: 'about',
      component: () => import('../components/AboutView.vue')
    }
  ]
})

export default router
