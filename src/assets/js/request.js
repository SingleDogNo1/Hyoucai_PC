import axios from 'axios'

const serviceDJS = axios.create({
  baseURL: process.env.VUE_APP_BASE_DJSAPI,
  timeout: 5000
})

serviceDJS.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

serviceDJS.interceptors.response.use(
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

export default serviceDJS
