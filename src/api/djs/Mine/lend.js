import request from '@/assets/js/requestDJS'
import qs from 'qs'

function userProjectList(data) {
  return request({
    url: '/UserProjectList',
    method: 'POST',
    data: qs.stringify(data)
  })
}

function userProjectDetail(data) {
  return request({
    url: '/UserProjectDetail',
    method: 'POST',
    data: qs.stringify(data)
  })
}

function transferFeeCalculate(data) {
  return request({
    url: '/TransferFeeCalculate',
    method: 'POST',
    data: qs.stringify(data)
  })
}

function transferProject(data) {
  return request({
    url: '/TransferProject',
    method: 'POST',
    data: qs.stringify(data)
  })
}

function bondRelation(data) {
  return request({
    url: '/BondRelation',
    method: 'POST',
    data: qs.stringify(data)
  })
}

export {
  userProjectList, // 获取用户出借列表
  userProjectDetail, // 获取用户出借详情
  transferFeeCalculate, // 项目转让金额计算
  transferProject, // 项目转让
  bondRelation // 用户购买产品债权查询
}
