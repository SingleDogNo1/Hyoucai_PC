import request from '@/assets/js/requestDJS'
import qs from 'qs'

// 补录推荐码
export function saveInviteCode(data) {
  return request({
    url: '/ModifyInviteCode',
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
    url: '/user/userInviteInfo',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
