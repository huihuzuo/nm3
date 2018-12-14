// import Vue from 'vue'
import { VIDEO_PANEL } from '../mutation-types'

// initial state
const state = {
  videoPanel: false
}

// getters
const getters = {
  getPanelState: state => state.videoPanel
}

// actions
const actions = {
  setPanelState ({commit, state}, param) {
    commit(VIDEO_PANEL, param)
  }
}

// mutations
const mutations = {
  [VIDEO_PANEL] (state, flag) {
    state.videoPanel = flag
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
