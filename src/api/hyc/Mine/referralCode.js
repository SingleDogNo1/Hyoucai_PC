import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 补录推荐码
export function saveInviteCode(data) {
  return request({
    url: '/user/saveInviteCode',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 用户二维码分享
export function qRCodeShare(data) {
  return request({
    url: '/QRCodeShare',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 邀请有礼、我推荐的人
export function userInviteInfo(data) {
  return request({
    url: '/user/getRecommendUserList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 钞票码或推荐码显隐
export function cpmOrTjm() {
  return request({
    url: '/user/cpmOrTjm',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  })
}

// 查询用户推荐码
export function myInviteCode() {
  return request({
    url: '/user/myInviteCode',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  })
}
