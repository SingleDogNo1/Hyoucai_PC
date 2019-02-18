import axios from '@/assets/js/requestDJS'
import qs from 'qs'

function getUserBankCardList(data) {
  return axios({
    url: 'UserBankCardList',
    method: 'post',
    data: qs.stringify(data)
  })
}

function userChangeBankCard(data) {
  return axios({
    url: 'bankCard/userChangeBankCard',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

function prevChangeBankcard(data) {
  return axios({
    url: 'bankCard/userChangeBankCardPreVerify',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export {
  getUserBankCardList, // 获取用户银行卡列表
  prevChangeBankcard, // 用户更换银行卡前校验接口
  userChangeBankCard
}
