import { getInvTotalAmt, setInvTotalAmt, getTackBackInt, setTackBackInt } from '@/assets/js/cache'
const lend = {
  state: {
    invTotalAmt: getInvTotalAmt(),
    tackBackInt: getTackBackInt()
  },

  mutations: {
    SET_INVTOTALAMT: (state, invTotalAmt) => {
      state.invTotalAmt = invTotalAmt
      setInvTotalAmt(invTotalAmt)
    },
    SET_TACKBACKINT: (state, tackBackInt) => {
      state.tackBackInt = tackBackInt
      setTackBackInt(tackBackInt)
    }
  }
}

export default lend
