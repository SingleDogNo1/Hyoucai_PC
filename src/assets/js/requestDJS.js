import axios from 'axios'
import { getAuth } from './utils'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_DJS_API,
  timeout: 5000,
  headers: {
    platform: 'pc',
    version: '1.0'
  }
})
service.interceptors.request.use(
  config => {
    let authorization = getAuth()
    if (authorization) {
      config.headers['Authorization'] = authorization
    }
    return config
  },
  error => {
    // Toast(error.response.data.resultMsg)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => response,
  error => {
    console.log(error.response.data.resultMsg)
    return Promise.reject(error)
  }
)

export default service
