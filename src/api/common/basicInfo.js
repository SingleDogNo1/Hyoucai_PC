import request from '@/assets/js/requestHYC'
import qs from 'qs'
// 用户基本信息
export function getUserBasicInfo(data) {
  return request({
    url: '/UserBasicInfo',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
export function getMailingAddress(data) {
  return request({
    url: '/QueryMailingAddress',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
export function modifyNikename(data) {
  return request({
    url: '/ModifyNikename',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
export function updateUserPsw(data) {
  return request({
    url: '/UpdateUserPsw',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
export function modifyBindMobile(data) {
  return request({
    url: '/ModifyBindMobile',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
