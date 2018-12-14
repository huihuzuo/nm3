import {
  LAYERS_STATE,
  PLOT_STATE,
  IS_FULL_SCREEN
} from '../mutation-types'

// initial state
const state = {
  layersState: false,
  plotState: false,
  isFullScreen: false
}

// getters
const getters = {
  layersState: state => state.layersState,
  plotState: state => state.plotState,
  getIsFullScreen: state => state.isFullScreen
}

// actions
const actions = {
  layersState ({commit, state}, params) {
    commit(LAYERS_STATE, params)
  },
  plotState ({commit, state}, params) {
    commit(PLOT_STATE, {
      value: params,
      id: Math.random()
    })
  },
  setIsFullScreen ({commit, state}, params) {
    commit(IS_FULL_SCREEN, params)
  }
}

// mutations
const mutations = {
  [LAYERS_STATE] (state, data) {
    state.layersState = data
  },
  [PLOT_STATE] (state, data) {
    state.plotState = data
  },
  [IS_FULL_SCREEN] (state, data) {
    state.isFullScreen = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
