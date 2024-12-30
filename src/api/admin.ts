import axios from '@/stores/axios'
//用户
type UserInfo = {
  name: string
  account: string
  role: string
}

export const addUser = (user: UserInfo) => {
  return axios({
    method: 'POST',
    url: 'admin/users',
    data: {
      name: user.name,
      account: user.account,
      role: user.role,
    },
  })
}

//实验室
type LabInfo = {
  name: string
  state: number
  quantity: number
  description?: string
  manager?: string
}

export const addLab = (lab: LabInfo) => {
  return axios({
    method: 'POST',
    url: 'admin/labs',
    data: {
      name: lab.name,
      quantity: lab.quantity,
      state: lab.state,
      manager: lab.manager,
      description: lab.description,
    },
  })
}

//公告
type AnnounceInfo = {
  title: string
  content: string
}

export const addAnnouncement = (announce: AnnounceInfo) => {
  return axios({
    method: 'POST',
    url: 'admin/announcements',
    data: {
      title: announce.title,
      content: announce.content,
    },
  })
}

//get请求
export const get = async (url: string) => {
  try {
    const response = await axios.get(url)
    return response.data.data
  } catch (error) {
    console.log('获取失败', error)
  }
}

//delete
export const deletex = async (url: string) => {
  try {
    const response = await axios.delete(url)
    return response.data.data
  } catch (error) {
    console.log('删除失败', error)
  }
}
