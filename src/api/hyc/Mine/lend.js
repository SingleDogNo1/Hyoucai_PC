import request from '@/assets/js/requestHYC'
import qs from 'qs'

function getInvestStatusApi(data) {
  return request({
    url: 'extendApi/userPorjectInvestStatusHidden',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getDefaultStatusApi(data) {
  return request({
    url: 'collection/defaultInvStatusForShow',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getQSTList(data) {
  return request({
    url: 'collectionProject/list',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  getInvestStatusApi, // 获取投资状态 projectType => 0: 散标 2:集合标
  getDefaultStatusApi, // 我的投资-轻松投-默认展示的投资状态
  getQSTList // 获取轻松投列表
}
