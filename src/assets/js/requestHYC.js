import axios from 'axios'
import { getAuth } from './utils'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_HYC_API,
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
  response => {
    const res = response.data
    if (res && res.resultCode === '1') {
      return response
    } else {
      // Toast(res.resultMsg)
      return Promise.reject('error')
    }
  },
  error => {
    // Toast(error.response.data.resultMsg)
    return Promise.reject(error)
  }
)

export default service
