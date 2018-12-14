import {
  SET_PANEL,
  SET_SHOW_POPUP,
  SHOW_MONIT_LIST
} from '../mutation-types'

// initial state
const state = {
  panel: {
    event: 'index', // 显示某个参数 默认显示首页的
    value: true  // 当前值
  },
  showPopup: {
    event: null,
    value: true
  },
  monitParams: {
    monitListShow: false,
    monitTitle: ''
  }
}

// getters
const getters = {
  panel: state => state.panel,
  showMonitList: state => state.showMonitList
}

// actions
const actions = {
  setPanel ({commit, state}, params) {
    commit(SET_PANEL, params)
  },
  setShowPopup ({commit, state}, params) {
    commit(SET_SHOW_POPUP, params)
  },
  SHOW_MONIT_LIST ({commit, state}, params) {
    commit(SHOW_MONIT_LIST, params)
  }
}

// mutations
const mutations = {
  [SET_PANEL] (state, data) {
    state.panel = data
  },
  [SET_SHOW_POPUP] (state, data) {
    state.showPopup = data
  },
  [SHOW_MONIT_LIST] (state, data) {
    state.monitParams = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
