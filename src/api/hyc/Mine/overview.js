import request from '@/assets/js/requestHYC'
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
    url: '/personalAccount/amountInfo',
    method: 'post'
  })
}

export function isSpecialUser(params) {
  return request({
    url: '/user/isSpecialUser',
    method: 'get',
    params: params
  })
}

export default {
  getUserBasicInfo, // 获取用户信息
  getPersonalAccount, // 获取个人账户信息
  isSpecialUser // 圈存圈提账户身份查询
}
