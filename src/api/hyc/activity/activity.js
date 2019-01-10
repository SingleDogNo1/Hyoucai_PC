import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function getHot(data) {
  return request({
    url: '/activity/getHot',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
