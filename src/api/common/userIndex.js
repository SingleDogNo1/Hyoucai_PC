import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getAlertInfo(data) {
  return new Promise((resolve, reject) => {
    axios.post('/alert/alertInfo', qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function getUserCompleteInfo(data) {
  return new Promise((resolve, reject) => {
    axios.post('/user/userInfoCompleteNotice', qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function alertInfoAcceptApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('/alert/alertInfoAccept', qs.stringify(data)).then(
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
  getAlertInfo, // 弹窗信息
  getUserCompleteInfo, // 签约、开户等状态
  alertInfoAcceptApi // 确认看到了弹窗（目前只有风险评测）
}
