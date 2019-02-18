import request from '@/assets/js/requestDJS'
import qs from 'qs'

export function getRecord(data) {
  return request({
    url: '/TrasactionList',
    method: 'POST',
    data: qs.stringify(data)
  })
}
