import { getUser } from '@/assets/js/cache'

const user = {
  state: {
    user: getUser()
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {}
}

export default user
