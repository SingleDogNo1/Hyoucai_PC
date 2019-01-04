import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getUserBasicInfo(data) {
  return new Promise((resolve, reject) => {
    axios.post('UserBasicInfo', qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getAmountInfo(data) {
  return new Promise((resolve, reject) => {
    axios.post('personalAccount/amountInfo', qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

export default {
  getUserBasicInfo, // 获取用户信息
  getAmountInfo // 账户总览
}
