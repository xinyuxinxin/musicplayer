import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playStatus: false,
    playMusicId: 1426087898,
    isNeedLogin: false,
    isLogin: false,
    token: '',
    account: Object,
    cookie: '',
    profile: Object,
    bindings: [],
    avatarUrl: '',
    userId: ''
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
    setIsNeedLogin (state, flag) {
      state.isNeedLogin = flag
    },
    setIsLogin (state, flag) {
      state.isLogin = flag
    },
    setUserMessage (state, mes) {
      state.avatarUrl = mes.profile.avatarUrl
      state.userId = mes.account.id
    }
  },
  actions: {
  },
  modules: {
  }
})
