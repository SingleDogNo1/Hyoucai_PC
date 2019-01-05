import request from '@/assets/js/requestDJS'
import qs from 'qs'

export function getRecord(data) {
  return request({
    url: '/TrasactionList',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
