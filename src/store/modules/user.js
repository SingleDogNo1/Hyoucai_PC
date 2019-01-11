import { getUser, setUser, removeUser, getUserBasicInfo, setUserBasicInfo, removeUserBasicInfo } from '@/assets/js/cache'
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

  actions: {
    logout: ({ commit }) => {
      return new Promise(resolve => {
        commit('SET_USER', '')
        commit('SET_USERBASICINFO', '')
        removeUser()
        removeUserBasicInfo()
        resolve()
      })
    }
  }
}

export default user
