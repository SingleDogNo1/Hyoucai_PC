import request from '@/assets/js/requestHYC'
// import qs from 'qs'

function getFriendLink(data) {
  return request({
    url: '/HyFriendLinkMsg',
    method: 'get',
    params: data
  })
}

export { getFriendLink }
