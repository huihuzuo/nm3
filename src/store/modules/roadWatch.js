// import Vue from 'vue'
import { ROAD_WATCH, ROAD_TYPE } from '../mutation-types'

// initial state
const state = {
  videoPanel: false,
  lxType: {}
}

// getters
const getters = {
  getPanelState: state => state.videoPanel,
  lxType: state => state.lxType
}

// actions
const actions = {
  setPanelState ({commit, state}, param) {
    commit(ROAD_WATCH, param)
  },
  lxType ({commit, state}, param) {
    commit(ROAD_TYPE, param)
  }
}

// mutations
const mutations = {
  [ROAD_WATCH] (state, flag) {
    state.videoPanel = flag
  },
  [ROAD_TYPE] (state, data) {
    state.lxType = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
