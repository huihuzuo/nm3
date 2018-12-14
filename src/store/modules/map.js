/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import {
  SET_MAP_LOAD_STATE,
  SET_TOOL_PANEL,
  MAP_RIGHT_CLICK,
  MAP_ADD_CLICK,
  LAYER_CONTROL,
  REFRESH_TIMER
} from '../mutation-types'
import {uuid} from '../../helper'

// initial state
const state = {
  loadMapSuccess: false,
  toolPanel: {
    type: '',
    params: ''
  },
  associatedInfo: '',
  mapAddClick: '',
  showLayerControl: {
    state: false,
    item: ''
  },
  refreshTimer: {
    uuid: uuid(),
    time: '',
    state: false
  }
}

// getters
const getters = {
  loadMapSuccess: state => state.loadMapSuccess,
  toolPanel: state => state.toolPanel,
  associatedInfo: state => state.associatedInfo,
  mapAddClick: state => state.mapAddClick,
  showLayerControl: state => state.showLayerControl,
  refreshTimer: state => state.refreshTimer
}

// actions
const actions = {
  actionMapState ({commit, state}, param) {
    commit(SET_MAP_LOAD_STATE, param)
  },
  actionToolPanel ({commit, state}, param) {
    commit(SET_TOOL_PANEL, {
      id: Math.random(),
      value: param
    })
  },
  associatedInfo ({commit, state}, param) {
    commit(MAP_RIGHT_CLICK, {
      id: Math.random(),
      value: param
    })
  },
  mapAddClick ({commit, state}, param) {
    commit(MAP_ADD_CLICK, {
      id: Math.random(),
      value: param
    })
  },
  actionLayerControl ({commit, state}, data) {
    commit(LAYER_CONTROL, data)
  },
  actionRefreshTimer ({commit, state}, data) {
    console.log(data)
    commit(REFRESH_TIMER, data)
  }
}

// mutations
const mutations = {
  [SET_MAP_LOAD_STATE] (state, data) {
    state.loadMapSuccess = data
  },
  [SET_TOOL_PANEL] (state, data) {
    state.toolPanel = data
  },
  [MAP_RIGHT_CLICK] (state, data) {
    state.associatedInfo = data
  },
  [MAP_ADD_CLICK] (state, data) {
    state.mapAddClick = data
  },
  [LAYER_CONTROL] (state, data) {
    state.showLayerControl = data
  },
  [REFRESH_TIMER] (state, data) {
    state.refreshTimer = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
