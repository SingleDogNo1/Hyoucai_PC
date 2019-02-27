import request from '@/assets/js/requestDJS'
import qs from 'qs'

// 投资详情接口3.0
export function investCountProjectMsg(data) {
  return request({
    url: 'InvestCountProjectMsg',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      version: '3.0'
    }
  })
}

// 获取出借记录
export function investUserCountMsg(data) {
  return request({
    url: 'InvestUserCountMsg',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 根据产品编号查询债权
export function bondproject(data) {
  return request({
    url: 'BondProject',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询用户可用红包
export function availableRedPacketApi(data) {
  return request({
    url: 'AvailableRedPacket',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 用户投资
export function availableCouponApi(data) {
  return request({
    url: 'AvailableCoupon',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询用户可用加息券
export function investApi(data) {
  return request({
    url: 'InvestProject',
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

// 到期自动复投
export function expireRepeatApi(data) {
  return request({
    url: 'ExpireRepeat',
    method: 'post',
    data: qs.stringify(data)
  })
}
