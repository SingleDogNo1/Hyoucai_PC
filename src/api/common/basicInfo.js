import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 获取收货地址
export function getMailingAddress(data) {
  return request({
    url: '/QueryMailingAddress',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 修改昵称
export function modifyNikename(data) {
  return request({
    url: '/ModifyNikename',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 修改密码
export function updateUserPsw(data) {
  return request({
    url: '/UpdateUserPsw',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 修改注册手机号
export function modifyBindMobile(data) {
  return request({
    url: '/ModifyBindMobile',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 获取短信验证码
export function modifyBindMobileSendCode(data) {
  return request({
    url: '/ModifyBindMobileSendCode',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 修改收货地址
export function saveMailingAddress(data) {
  return request({
    url: '/SaveMailingAddress',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded', version: '2.0' },
    data: qs.stringify(data)
  })
}
// 修改交易密码
export function tansactionPwd(data) {
  return request({
    url: '/escrow/passwordReset',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 修改电子账户手机号
export function jxMobileModify(data) {
  return request({
    url: 'smsCodeApply/sendSms',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
