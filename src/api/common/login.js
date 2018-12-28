import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function userLogin(data) {
  return request({
    url: '/UserLogin',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
