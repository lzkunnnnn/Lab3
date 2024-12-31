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


//更新实验室
export type updateLab = {
  id:string
  state?:string
  description?:string
  manage?:string
}

export const update = async (lab: updateLab, id: string) => {
  const requests = [];
  if (lab.manage) {
   // console.log(lab.manage)
    requests.push( await axios({
      method: 'PUT',
      url: 'admin/labs/manage/' + id,
      params: {
        manage: lab.manage,
      },
    }));
  }
  if (lab.state) {
    //console.log(lab.state)
    requests.push(axios({
      method: 'PUT',
      url: 'admin/labs/state/' + id,
      params: {
        state: parseInt(lab.state),
      },
    }));
  }
  if (lab.description) {
    //console.log(lab.description)
    requests.push(axios({
      method: 'PUT',
      url: 'admin/labs/description/' + id,
      params: {
        description: lab.description,
      },
    }));
  }
  if (requests.length === 0) {
    return Promise.resolve({ message: 'No updates to perform' });
  }

  // 使用Promise.all等待所有请求完成
  return Promise.all(requests)
    .then(responses => {
      // 处理所有成功的响应
      console.log('All updates successful:', responses);
      return responses;
    })
    .catch(error => {
      // 处理任何一个请求失败的情况
      console.error('Error during update:', error);
      throw error;
    });
}
