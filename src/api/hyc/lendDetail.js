import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 优质计划-投资详情2.0
export function easyInvestDetail(data) {
  return request({
    url: 'collection/investDetail/2.0',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 预期收益计算
export function expectedIncome(data) {
  return request({
    url: 'ExpectedIncome',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取优质计划-加入记录
export function easyInvestRecord(data) {
  return request({
    url: 'collection/investRecord',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取优质计划-项目组成
export function projectCompo(data) {
  return request({
    url: 'collection/projectCompo',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 电子账户余额查询(轻松投)
export function amountQuery() {
  return request({
    url: 'balanceQuery/query',
    method: 'post'
  })
}

// 电子账户余额查询(自选投)
export function amountInfo() {
  return request({
    url: 'personalAccount/amountInfo',
    method: 'post'
  })
}

// 系统维护
export function systemMaintenance() {
  return request({
    url: 'collection/systemMaintenance',
    method: 'get'
  })
}

// 账户金额同步
export function amountSync() {
  return request({
    url: 'amountSync/sync',
    method: 'post'
  })
}

// 散标标的详情接口
export function optionalInvestDetail(data) {
  return request({
    url: 'project/projectDetail',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 根据标的编号查询散标投资记录
export function optionalInvestRecord(data) {
  return request({
    url: 'project/investRecord',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询用户可用红包
export function availableRedPacketApi(data) {
  return request({
    url: 'redPacketAndCoupon/getAvailableRedPacket',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询用户可用红包
export function availableCouponApi(data) {
  return request({
    url: 'redPacketAndCoupon/getAvailableCoupon',
    method: 'post',
    data: qs.stringify(data)
  })
}
