import request from '@/assets/js/requestDJS'

export function getHot() {
  return request({
    url: '/activity/getHot',
    method: 'post',
    headers: { version: '2.0' }
  })
}
