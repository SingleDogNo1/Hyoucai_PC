import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function bidToSign(data) {
  return request({
    url: '/autoBidAuthPlus/bidToSign',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
