import RequestService from '../index'
import type { ResponseData } from '../index'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

// 获取登录token
async function accountLoginRequest(account: IAccount) {
  const res = await RequestService.request<ResponseData<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    method: 'post',
    data: account
  })

  return res
}

export interface IUserInfoResult {
  id: number
  name: string
  realname: string
  cellphone: string
  enable: boolean
  role: {
    id: number
    name: string
    intro: string
  }
  department: {
    id: number
    name: string
    leader: string
    parentId: number
  }
}

// 获取用户信息
async function getUserInfo(id: number) {
  const res = await RequestService.request<ResponseData<IUserInfoResult>>({
    url: LoginAPI.LoginUserInfo + id
  })

  return res
}

export interface IUserMenuItem {
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
  parentId: number
  children: IUserMenuItem[]
}

// 根据角色id获取菜单
async function getUserMenusByRoleId(id: number) {
  const res = await RequestService.request<ResponseData<IUserMenuItem[]>>({
    url: LoginAPI.UserMenus + `${id}/menu`
  })

  return res
}

export default {
  accountLoginRequest,
  getUserInfo,
  getUserMenusByRoleId
}
