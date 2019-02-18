import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function isExistUser(data) {
  return request({
    url: '/user/isExistUser',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function cpmOrTjm() {
  return request({
    url: '/user/cpmOrTjm',
    method: 'post'
  })
}

export function getSmsCode(data) {
  return request({
    url: '/SmsRegisterCode',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

export function userRegister(data) {
  return request({
    url: '/UserRegister',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

export function validateCPM(data) {
  return request({
    url: '/escrow/checkCode',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function validateTJM(data) {
  return request({
    url: '/user/getRecommendUserName',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  isExistUser, // 手机号是否存在
  cpmOrTjm, // 钞票码和推荐码显隐状态
  getSmsCode, // 获取注册验证码
  userRegister, // 用户注册,
  validateCPM, // 校验钞票码
  validateTJM // 校验推荐码
}
