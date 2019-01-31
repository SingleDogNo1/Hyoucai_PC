import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getIncomeApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('userInfo/incomeDetailed', qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

export default {
  getIncomeApi // 回款日历——收益明细
}
