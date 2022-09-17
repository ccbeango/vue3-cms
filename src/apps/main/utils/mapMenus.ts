import type { RouteRecordRaw } from 'vue-router'
import type { IUserMenuItem } from '@common/service/login/login'

export async function mapMenusToRoutes(
  userMenus: IUserMenuItem[]
): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []
  const routeFilesObj = import.meta.glob('../router/main/**/*.ts')
  for (const path of Object.keys(routeFilesObj)) {
    const route = await import(/* @vite-ignore */ path)
    allRoutes.push(route.default)
  }

  const recurseGetRoute = (menus: IUserMenuItem[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find(route => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        recurseGetRoute(menu.children)
      }
    }
  }
  recurseGetRoute(userMenus)

  return routes
}
