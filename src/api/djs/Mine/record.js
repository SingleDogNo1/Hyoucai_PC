import request from '@/assets/js/requestDJS'

export function getRecord(data) {
  return request({
    url: '/TrasactionList',
    method: 'POST',
    data: data
  })
}
