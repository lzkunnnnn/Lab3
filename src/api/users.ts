import request from '@/utils/request'

// 用户登录 - 参数类型
type LoginInfo = {
  account: string
  password: string
}

// 用户登录 - 返回数据类型
/* type LoginResult = {
  id: string
  name: string
  account: string
  password: string
  role: string
  createTime: string
  updateTime: string
  avatar: string
} */

// 修改 login 函数，使用 LoginInfo 类型
export const login = (loginInfo: LoginInfo) => {
  return request/* <LoginResult> */({
    method: 'POST',
    url: '/api/login',
    data: {
      account: loginInfo.account,
      password: loginInfo.password,
    },
  })
}


/* export const aLogin = () =>{
  return
}
 */