import request from '@/assets/js/requestDJS'
// import qs from 'qs'

export function getTasteGoldUserList(params) {
  return request({
    url: '/tasteGoldUserList',
    method: 'GET',
    params: params
  })
}
// username: djs272302ll
// authorization: DSCJ ZGpzMjcyMzAybGw6ZTZmYWVkY2YtMDAzNy00ZWZkLWEzYzYtMTllYjU0ZjcwNmFh
// clientType: QD03
// status: useUp
export function getTasteGoldUserUsable(params) {
  return request({
    url: '/tasteGoldUserUsable',
    method: 'GET',
    params: params
  })
}
// username: djs272302ll
// authorization: DSCJ ZGpzMjcyMzAybGw6ZTZmYWVkY2YtMDAzNy00ZWZkLWEzYzYtMTllYjU0ZjcwNmFh
