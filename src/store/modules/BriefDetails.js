import {
  SHOW_DETAIL_INFO,
  IS_SHOW_BRIEF_DETAIL
} from '../mutation-types'

// initial state
const state = {
  detailInfo: {},
  isShow: false
}

// getters
const getters = {
  detailInfo: state => state.detailInfo,
  isShow: state => state.isShow
}

// actions
const actions = {
  detailInfo ({commit, state}, param) {
    commit(SHOW_DETAIL_INFO, param)
  },
  isShow ({commit, state}, param) {
    commit(IS_SHOW_BRIEF_DETAIL, {
      flag: param,
      id: Math.random()
    })
  }
}

// mutations
const mutations = {
  [SHOW_DETAIL_INFO] (state, data) {
    state.detailInfo = data
  },
  [IS_SHOW_BRIEF_DETAIL] (state, data) {
    state.isShow = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
