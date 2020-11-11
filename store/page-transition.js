export const state = () => ({
  isActive: false
})

export const mutations = {
  setIsActive(state, payload) {
    state.isActive = payload
  }
}

export const actions = {
  setIsActive({commit}, payload) {
    commit('setIsActive', payload);
  }
}

export const getters = {
  isActive(state) {
    return state.isActive;
  }
}
