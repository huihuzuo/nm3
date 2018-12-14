/**
 * Created by FDD on 2017/12/25.
 * @desc 基础设施监测
 */

import {
  SET_TUNNEL_ACTIVE,
  SET_BRIDGE_ACTIVE
} from '../mutation-types'

// initial state
const state = {
  bridgeActive: {
    value: false,
    time: (new Date()).getTime(),
    source: ''
  },
  tunnelActive: {
    value: false,
    time: (new Date()).getTime(),
    source: ''
  }
}

// getters
const getters = {}

// actions
const actions = {
  actionBridgeActive ({commit, state}, param) {
    commit(SET_BRIDGE_ACTIVE, param)
  },
  actionTunnelActive ({commit, state}, param) {
    commit(SET_TUNNEL_ACTIVE, param)
  }
}

// mutations
const mutations = {
  [SET_BRIDGE_ACTIVE] (state, data) {
    state.bridgeActive = data
  },
  [SET_TUNNEL_ACTIVE] (state, data) {
    state.tunnelActive = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
