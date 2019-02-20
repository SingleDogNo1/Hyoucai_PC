import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 获取首页轮播图
export function getBanner(data) {
  return request({
    url: '/HomeBannerPic',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded', version: '2.0' },
    data: qs.stringify(data)
  })
}

// 投资统计
export function getOperateData() {
  return request({
    url: '/InvestCount',
    method: 'post'
  })
}

// 首页标的列表
export function getQualityList(data) {
  return request({
    url: '/homePage/projectList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
