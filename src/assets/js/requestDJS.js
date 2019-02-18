import axios from 'axios'
import { getAuth } from './utils'
import store from '@/store'
import { getRetBaseURL } from './utils'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_DJS_API,
  timeout: 10000,
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
      config.headers['authorization'] = authorization
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
        location.href = `${getRetBaseURL()}/login`
      })
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    console.log(error.response.data.resultMsg)
    return Promise.reject(error)
  }
)

export default service
