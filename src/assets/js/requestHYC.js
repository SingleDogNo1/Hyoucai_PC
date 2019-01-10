import axios from 'axios'
import { getAuth } from './utils'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_HYC_API,
  timeout: 5000,
  headers: {
    platform: 'pc',
    version: '1.0',
    'Content-type': 'application/x-www-form-urlencoded'
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
    if (res && ['505', '506'].includes(res.resultCode)) {
      store.dispatch('logout').then(() => {
        //location.href = '/'
      })
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    // Toast(error.response.data.resultMsg)
    return Promise.reject(error)
  }
)

export default service
