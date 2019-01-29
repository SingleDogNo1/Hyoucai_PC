import request from '@/assets/js/requestDJS'
// import qs from 'qs'

export function getRecord(params) {
  return request({
    url: '/TrasactionList',
    method: 'GET',
    headers: { version: '1.0' },
    params: params
  })
}
