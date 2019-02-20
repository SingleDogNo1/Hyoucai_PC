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
