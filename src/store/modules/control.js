/**
 * Created by changjn on 2018/1/26.
 * @desc 管制
 */

import {
  SHOW_LEGEND
} from '../mutation-types'

// initial state
const state = {
  showLegend: false
}

// getters
const getters = {
  showLegend: state => state.showLegend
}

// actions
const actions = {
  showLegend ({commit, state}, param) {
    commit(SHOW_LEGEND, {
      id: Math.random(),
      value: param
    })
  }
}

// mutations
const mutations = {
  [SHOW_LEGEND] (state, data) {
    state.showLegend = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
