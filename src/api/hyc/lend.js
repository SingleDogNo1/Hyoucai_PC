import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function getCountMsg(data) {
  return request({
    url: '/InvestCountMsg',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function getQSList(data) {
  return request({
    url: '/collection/investList',
    method: 'POST',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

export function getZXList(data) {
  return request({
    url: '/project/investList',
    method: 'POST',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

// TODO 个人债转接口（未开发）
export function getGRList(data) {
  return request({
    url: '/collection/grlist',
    method: 'POST',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

export function getPageConfig() {
  return request({
    url: '/pageConfig/getPageConfig',
    method: 'POST'
  })
}

export function getProjectDetail(data) {
  // 项目详情
  return request({
    url: '/collection/projectDetail',
    method: 'POST',
    data: qs.stringify(data)
  })
}

export function getPeopleLoanInfo(data) {
  return request({
    url: '/collection/peopleLoanInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 优质计划-投资详情2.0
export function easyInvestDetail(data) {
  return request({
    url: 'collection/investDetail/2.0',
    method: 'post',
    data: qs.stringify(data)
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
