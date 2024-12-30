import axios from "axios";
axios.defaults.baseURL = '/api/'

axios.interceptors.request.use(
  (req) => {
    const auth = localStorage.getItem('token')
    // 判断,用于避免header包含authorization属性但数据值为空
    if (auth && req.headers) {
      req.headers['token'] = auth
    }
    return req
  },
  (error) => {
    console.log(error)
    return Promise.reject()
  }
)


export default axios;

