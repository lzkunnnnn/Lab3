import axios from "axios"

const request = axios.create({
  //baseURL: 'http://120.46.159.231:8088/2022212869/',
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
})

export default request