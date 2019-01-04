import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function bankCardQueryApi (data) {
  return request({
    url: '/bankCardQuery/query',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function getBankUnionNumberUrlApi (data) {
  return request({
    url: '/extendApi/getBankUnionNumberUrl',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function sysProvinceListApi (data) {
  return request({
    url: '/SysProvinceList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function sysCityListApi (data) {
  return request({
    url: '/SysCityList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function sysBankAreaListApi (data) {
  return request({
    url: '/SysBankAreaList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function sysBranceBankListApi (data) {
  return request({
    url: '/SysBranceBankList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function withdrawApi (data) {
  return request({
    url: '/withdraw/withdraw',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function amountInfoApi (data) {
  return request({
    url: '/personalAccount/amountInfo',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
//
// export default {
//   bankCardQueryApi, // 获取银行卡信息
//   getBankUnionNumberUrlApi, // 联行号获取
//   sysProvinceListApi, // 省份
//   sysCityListApi, // 城市
//   sysBankAreaListApi, // 区
//   sysBranceBankListApi, // 银行
//   withdrawApi, // 提现
//   amountInfoApi // 获取账户余额
// }
