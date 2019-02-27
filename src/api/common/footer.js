import request from '@/assets/js/requestHYC'
import qs from 'qs'

function getFriendLink(data) {
  return request({
    url: '/HyFriendLinkMsg',
    method: 'get',
    params: data
  })
}

function reportTelephone(data) {
  return request({
    url: '/reportTelephone/query',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}



export { getFriendLink, reportTelephone }
