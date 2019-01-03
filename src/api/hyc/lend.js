import request from '@/assets/js/requestHYC'

export function getCountMsg(data) {
  return request({
    url: '/collection/investList',
    method: 'POST',
    data: data
  })
}
export function getList(data) {
  return request({
    url: '/collection/investList',
    method: 'POST',
    data: data
  })
}
