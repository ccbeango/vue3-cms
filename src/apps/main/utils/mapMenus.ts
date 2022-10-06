import type { RouteRecordRaw } from 'vue-router'
import type { IUserMenuItem } from '@common/service/login/login'
import type { IBreadcrumb } from '@/base-ui/breadcrumb'

export async function mapMenusToRoutes(userMenus: IUserMenuItem[]) {
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

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: IUserMenuItem[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): IUserMenuItem | undefined {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)

      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}


export function mapMenusToPermissions(userMenus: IUserMenuItem[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}
