import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playStatus: false,
    playMusicId: 1426087898,
    isNeedLogin: false
  },
  getters: {
    getPlayStatus (state) {
      return state.playStatus
    }
  },
  mutations: {
    setPlayStatus (state) {
      state.playStatus = !state.playStatus
    },
    setPlayMusic (state, id) {
      state.playMusicId = id
    },
    setIsNeedLogin (state) {
      state.isNeedLogin = !state.isNeedLogin
    }
  },
  actions: {
  },
  modules: {
  }
})
