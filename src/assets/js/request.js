import axios from 'axios'
import { Toast } from 'mint-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASEAPI,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res && res.resultCode === '1') {
      return response
    } else {
      Toast(res.resultMsg)
      return Promise.reject('error')
    }
  },
  error => {
    Toast(error.response.data.resultMsg)
    return Promise.reject(error)
  }
)

export default service
