import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 优质计划-投资详情2.0
export function investDetail(data) {
  return request({
    url: 'collection/investDetail/2.0',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 预期收益计算
export function expectedIncome(data) {
  return request({
    url: 'ExpectedIncome',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 获取优质计划-加入记录
export function investRecord(data) {
  return request({
    url: 'collection/investRecord',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 获取优质计划-项目组成
export function projectCompo(data) {
  return request({
    url: 'collection/projectCompo',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
