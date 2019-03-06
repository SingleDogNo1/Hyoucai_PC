import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getAlertInfo(data) {
  return axios({
    url: 'alert/alertInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getUserCompleteInfo(data) {
  return axios({
    url: 'user/userInfoCompleteNotice',
    method: 'post',
    data: qs.stringify(data)
  })
}

function alertInfoAcceptApi(data) {
  return axios({
    url: 'alert/alertInfoAccept',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  getAlertInfo, // 弹窗信息
  getUserCompleteInfo, // 签约、开户等状态
  alertInfoAcceptApi // 确认看到了弹窗（目前只有风险评测）
}
