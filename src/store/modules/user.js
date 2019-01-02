import { getUser, setUser, getUserBasicInfo, setUserBasicInfo } from '@/assets/js/cache'
const user = {
  state: {
    user: getUser(),
    userBasicInfo: getUserBasicInfo()
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
      setUser(user)
    },
    SET_USERBASICINFO: (state, info) => {
      state.userBasicInfo = info
      setUserBasicInfo(info)
    }
  },

  actions: {}
}

export default user
