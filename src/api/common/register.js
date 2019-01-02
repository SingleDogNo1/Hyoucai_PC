import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function isExistUser(data) {
  return request({
    url: '/user/isExistUser',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function cpmOrTjm() {
  return request({
    url: '/user/cpmOrTjm',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  })
}

export function getSmsCode(data) {
  return request({
    url: '/SmsRegisterCode',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}
