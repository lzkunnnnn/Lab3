import request from '@/utils/request'
import axios from '@/stores/axios'

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





export type appointInfo={
  courseId:string
  courseName:string
  labId:string
  startWeek:string
  endWeek:string
  dayOfWeek:string
  section:string
}

export const appoint = (appoint:appointInfo) =>{
  return axios({
    method: 'POST',
    url: 'user/reserve-range',
    data: {
      courseId:appoint.courseId,
      courseName:appoint.courseName,
      labId:appoint.labId,
      startWeek:appoint.startWeek,
      endWeek:appoint.endWeek,
      dayOfWeek:appoint.dayOfWeek,
      section:appoint.section
    },
  })
}
