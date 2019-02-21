import request from '@/assets/js/requestDJS'
import qs from 'qs'

// 投资详情接口3.0
export function investCountProjectMsg(data) {
  return request({
    url: 'InvestCountProjectMsg/3.0',
    method: 'post',
    data: qs.stringify(data)
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

// 系统维护
export function systemMaintenance() {
  return request({
    url: 'collection/systemMaintenance',
    method: 'get'
  })
}