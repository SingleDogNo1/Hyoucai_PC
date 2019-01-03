import axios from '@/assets/js/requestDJS'
import qs from 'qs'

function getUserBankCardList(data) {
  return new Promise((resolve, reject) => {
    axios.post('UserBankCardList', qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function prevChangeBankcard(data) {
  return new Promise((resolve, reject) => {
    axios.post('bankCard/userChangeBankCardPreVerify', qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

export {
  getUserBankCardList, // 获取用户银行卡列表
  prevChangeBankcard // 用户更换银行卡前校验接口
}
