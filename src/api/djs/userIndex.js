import axios from '@/assets/js/requestDJS'
import qs from 'qs'

// 复投消息中心接口
export function repeatInvestApi(data) {
  return axios({
    url: 'ExpireProject',
    method: 'post',
    data: qs.stringify(data)
  })
}
//消息标记成已读接口
export function UpdateMessageApi(data) {
  return axios({
    url: 'ExpireRepeat',
    method: 'post',
    data: qs.stringify(data)
  })
}
