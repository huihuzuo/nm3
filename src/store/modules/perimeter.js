/**
 * Created by FDD on 2018/1/02.
 * @desc 地图查询（主要包含周边搜索和拉框查询）
 */

import {
  SET_PERIMETER_LOCATION,
  SET_PERIMETER_LAYER,
  SET_PULLBOX_LAYER,
  SET_PULLBOX_PARAMS,
  SET_PULLBOX_UUID
} from '../mutation-types'

// initial state
const state = {
  location: [],
  layers: [],
  pullBox: {},
  activeUUID: '',
  pullBoxLayers: []
}

// getters
const getters = {
  location: state => state.location,
  layers: state => state.layers,
  pullBoxLayers: state => state.pullBoxLayers,
  pullBox: state => state.pullBox
}

// actions
const actions = {
  actionPerimeterLocation ({commit, state}, param) {
    commit(SET_PERIMETER_LOCATION, param)
  },
  actionPerimeterLayer ({commit, state}, param) {
    commit(SET_PERIMETER_LAYER, param)
  },
  actionPullBox ({commit, state}, param) {
    commit(SET_PULLBOX_PARAMS, param)
  },
  actionPullBoxUUID ({commit, state}, param) {
    commit(SET_PULLBOX_UUID, param)
  },
  actionPullBoxLayers ({commit, state}, param) {
    commit(SET_PULLBOX_LAYER, param)
  }
}

// mutations
const mutations = {
  [SET_PERIMETER_LOCATION] (state, data) {
    state.location = data
  },
  [SET_PERIMETER_LAYER] (state, data) {
    state.layers = data
  },
  [SET_PULLBOX_PARAMS] (state, data) {
    state.pullBox = data
  },
  [SET_PULLBOX_UUID] (state, data) {
    state.activeUUID = data
  },
  [SET_PULLBOX_LAYER] (state, data) {
    state.pullBoxLayers = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
