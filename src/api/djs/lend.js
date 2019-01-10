import request from '@/assets/js/requestDJS'

export function getList(params) {
  return request({
    url: '/InvestCountMsg',
    method: 'get',
    headers: { version: '2.0' },
    params: params
  })
}
