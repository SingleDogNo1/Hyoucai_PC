import request from '@/assets/js/requestHYC'
import qs from 'qs'

export default {
  userInfoCompleteNotice: userInfoCompleteNotice, // 用户信息完善提醒
  basicInfo: basicInfo, //简化用户基本信息
  supportBankList: supportBankList, //查询支持的银行列表
  userInfoAuth: userInfoAuth, //用户三要素验证接口
  accountOpenEncryptPage: accountOpenEncryptPage
}

export function userInfoCompleteNotice(data) {
  return request({
    url: '/user/userInfoCompleteNotice',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function basicInfo(data) {
  return request({
    url: '/user/basicInfo',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function supportBankList(data) {
  return request({
    url: '/bank/supportBankList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function userInfoAuth(data) {
  return request({
    url: '/user/userInfoAuth',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function accountOpenEncryptPage(data) {
  return request({
    url: '/escrow/accountOpenEncryptPage',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
