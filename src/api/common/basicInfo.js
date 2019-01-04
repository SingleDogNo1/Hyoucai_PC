import request from '@/assets/js/requestHYC'
import qs from 'qs'
// 用户基本信息
export function getUserBasicInfo(data) {
  return request({
    url: '/TouchStoneServiceNew/UserBasicInfo',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
