import request from '@/assets/js/requestHYC'

export function getTypes(params) {
  return request({
    url: '/userTransaction/invQueryConditions',
    method: 'get',
    params: params
  })
}

export function getRecord(params) {
  return request({
    url: '/userTransaction/record',
    method: 'get',
    params: params
  })
}
