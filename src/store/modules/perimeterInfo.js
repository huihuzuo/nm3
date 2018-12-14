/**
 * Created by changjn on 2018/1/25.
 * @desc 周边搜索store
 */

import {
  LAYERS_PERMISTER_STATE
} from '../mutation-types'

// initial state
const state = {
  layersPerimeterState: false
}

// getters
const getters = {
  layersPerimeterState: state => state.layersPerimeterState
}

// actions
const actions = {
  layersPerimeterState ({commit, state}, param) {
    commit(LAYERS_PERMISTER_STATE, {
      id: Math.random(),
      value: param
    })
  }
}

// mutations
const mutations = {
  [LAYERS_PERMISTER_STATE] (state, data) {
    state.layersPerimeterState = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
