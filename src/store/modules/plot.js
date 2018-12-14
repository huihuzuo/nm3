/**
 * Created by FDD on 2017/9/14.
 * @desc 标绘工具相关store
 */

import {
  SET_PLOT_BACKGROUND_COLOR,
  SET_PLOT_BORDERCOLOR,
  SET_PLOT_BORDERWIDTH,
  SET_PLOT_OPACITY
} from '../mutation-types'

// initial state
const state = {
  backgroundColor: '#20a0ff',
  borderColor: '#20a0ff',
  borderWidth: 1,
  opacity: 1
}

// getters
const getters = {}

// actions
const actions = {
  actionBackgroundColor ({commit, state}, param) {
    commit(SET_PLOT_BACKGROUND_COLOR, param)
  },
  actionBorderColor ({commit, state}, param) {
    commit(SET_PLOT_BORDERCOLOR, param)
  },
  actionBorderWidth ({commit, state}, param) {
    commit(SET_PLOT_BORDERWIDTH, param)
  },
  actionOpacity ({commit, state}, param) {
    commit(SET_PLOT_OPACITY, param)
  }
}

// mutations
const mutations = {
  [SET_PLOT_BACKGROUND_COLOR] (state, data) {
    state.backgroundColor = data
  },
  [SET_PLOT_BORDERCOLOR] (state, data) {
    state.borderColor = data
  },
  [SET_PLOT_BORDERWIDTH] (state, data) {
    state.borderWidth = data
  },
  [SET_PLOT_OPACITY] (state, data) {
    state.opacity = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
