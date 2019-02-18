import request from '@/assets/js/requestDJS'
import qs from 'qs'

export function getUserBasicInfo(data) {
  return request({
    url: '/UserBasicInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getPersonalAccount() {
  return request({
    url: '/PersonalAccount',
    method: 'post'
  })
}

export default {
  getUserBasicInfo, // 获取用户信息
  getPersonalAccount // 获取个人账户信息
}
