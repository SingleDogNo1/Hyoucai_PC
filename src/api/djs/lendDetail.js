import request from '@/assets/js/requestDJS'
import qs from 'qs'

// 投资详情接口3.0
export function investCountProjectMsg(data) {
  return request({
    url: 'InvestCountProjectMsg/3.0',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
