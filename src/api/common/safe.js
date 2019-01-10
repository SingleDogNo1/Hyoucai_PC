import request from '@/assets/js/requestHYC'
import qs from 'qs'
// 安全措施
export function zxdtMtbdMsg(data) {
  return request({
    url: '/ZxdtMtbdMsg',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
