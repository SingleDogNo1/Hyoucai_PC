import axios from '@/assets/js/requestHYC'
import DJSRequest from '@/assets/js/requestDJS'
import qs from 'qs'

function getAlertInfoHYC(data) {
  return axios({
    url: 'alert/alertInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getAlertInfoDJS(data) {
  return DJSRequest({
    url: 'alert/alertInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getUserCompleteInfo(data) {
  return axios({
    url: 'user/userInfoCompleteNotice',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

function alertInfoAcceptApiHYC(data) {
  return axios({
    url: 'alert/alertInfoAccept',
    method: 'post',
    data: qs.stringify(data)
  })
}

function alertInfoAcceptApiDJS(data) {
  return DJSRequest({
    url: 'alert/alertInfoAccept',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  getAlertInfoHYC, // 汇有财弹窗
  getAlertInfoDJS, // 点金石弹窗
  getUserCompleteInfo, // 签约、开户等状态
  alertInfoAcceptApiHYC, // 确认看到了弹窗（目前只有风险评测）
  alertInfoAcceptApiDJS // 点金石确认弹窗
}
