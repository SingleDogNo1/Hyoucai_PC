import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getUserBankCardInfo(data) {
  return new Promise((resolve, reject) => {
    axios.post('bankCardQuery/query', qs.stringify(data)).then(
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

function changeBankcard(data) {
  return new Promise((resolve, reject) => {
    axios.post('cardUnbind/unbindPage', qs.stringify(data)).then(
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
  getUserBankCardInfo, // 获取用户银行卡列表
  prevChangeBankcard, // 判断银行卡是否可以解绑
  changeBankcard // 用户更换银行卡前校验接口
}
