import request from '@/utils/request'

// 用户登录 - 参数类型
type LoginInfo = {
    /* phone: string */
  account: string
  code?: string
  password: string
}

// 用户登录 - 返回数据类型
type LoginResult = {
  success: boolean
  state: number
  message: string
  content: string
}

// 修改 login 函数，使用 LoginInfo 类型
export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    method: 'POST',
    //url: '/front/user/login',
    url: '/api/login',
    /* data: `phone=${loginInfo.phone}&password=${loginInfo.password}`, */
    data: `account=${loginInfo.account}&password=${loginInfo.password}`,
  })
}
