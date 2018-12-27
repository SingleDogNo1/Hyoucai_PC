import request from '@/assets/js/requestHYC'

export function isExistUser(data) {
  return request({
    url: '/user/isExistUser',
    method: 'post',
    data
  })
}
