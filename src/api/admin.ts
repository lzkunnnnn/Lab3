import request from '@/utils/request'

type UserInfo = {
  name: string
  account: string
  role: string
}

export const addUser = (user: UserInfo) => {
  const token = localStorage.getItem('token')
  return request({
    method: 'POST',
    url: '/api/admin/users',
    data: {
      name: user.name,
      account: user.account,
      role: user.role,
    },
    headers: {
      token: token,
    },
  })
}
