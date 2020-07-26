export const state = () => ({})

export const actions = {
  nuxtServerInit ({ dispatch, commit }, { req }) {
    const userID = req && req.session.userID
    if (userID) {
      commit('user/SET_USER_ID', userID)
    }
  }
}

export const mutations = {}

export const getters = {}
