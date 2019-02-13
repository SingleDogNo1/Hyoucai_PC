import request from '@/assets/js/requestHYC'

export function getCountMsg(data) {
  return request({
    url: '/InvestCountMsg',
    method: 'GET',
    data: data
  })
}
export function getQSList(data) {
  return request({
    url: '/collection/investList',
    method: 'POST',
    headers: {
      version: '2.0'
    },
    data: data
  })
}

export function getZXList(data) {
  return request({
    url: '/project/investList',
    method: 'POST',
    headers: {
      version: '2.0'
    },
    data: data
  })
}

export function getGRList(data) {
  return request({
    url: '/collection/investList',
    method: 'POST',
    headers: {
      version: '2.0'
    },
    data: data
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
    data: data
  })
}

export function getPeopleLoanInfo(data) {
  return request({
    url: '/collection/peopleLoanInfo',
    method: 'GET',
    data: data
  })
}
