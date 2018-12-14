// import Vue from 'vue'
import {REFRESH_TREE, SET_USER_INFO, USER_MENU_SHOW} from '../mutation-types'
const state = {
  tree: '',
  userInfo: {},
  userMenuShow: false
}

// getters
const getters = {
}
// actions
const actions = {
  refreshTree ({commit}, data) {
    commit(REFRESH_TREE, data)
  },
  setUserInfo ({commit}, data) {
    commit(SET_USER_INFO, data)
  },
  setUserMenuShow ({commit}, data) {
    commit(USER_MENU_SHOW, data)
  }
}

// mutations
const mutations = {
  [REFRESH_TREE] (state, data) {
    state.tree = data
  },
  [SET_USER_INFO] (state, data) {
    state.userInfo = data
  },
  [USER_MENU_SHOW] (state, data) {
    if (data === undefined) {
      state.userMenuShow = !state.userMenuShow
    } else {
      state.userMenuShow = data
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
