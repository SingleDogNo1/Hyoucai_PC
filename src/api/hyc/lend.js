import request from '@/assets/js/requestHYC'

export function getCountMsg(data) {
  return request({
    url: '/InvestCountMsg',
    method: 'GET',
    data: data
  })
}
export function getList(data) {
  return request({
    url: '/collection/investList',
    method: 'POST',
    headers: {
      version: '2.0'
    },
    data: data
  })
}
