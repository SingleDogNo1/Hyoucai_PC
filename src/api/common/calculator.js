import request from '@/assets/js/requestDJS'

export function calculator(params) {
  return request({
    url: 'calculator',
    method: 'get',
    params: params
  })
}
