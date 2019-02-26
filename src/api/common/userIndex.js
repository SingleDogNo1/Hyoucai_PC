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

function repeatInvestApi(data) {
  return axios({
    url: 'RepeatMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}

function UpdateMessageApi(data) {
  return axios({
    url: 'UpdateMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  getAlertInfo, // 弹窗信息
  getUserCompleteInfo, // 签约、开户等状态
  alertInfoAcceptApi, // 确认看到了弹窗（目前只有风险评测）
  repeatInvestApi, // 复投消息中心接口
  UpdateMessageApi //消息标记成已读接口
}
