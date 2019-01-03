import request from '@/assets/js/requestDJS'

export function getList(params) {
  return request({
    url: '/TouchStoneService/InvestCountMsg',
    method: 'get',
    params: params
  })
}
