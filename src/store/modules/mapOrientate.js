/**
 * Created by FDD on 2018/1/02.
 * @desc 快速定位功能
 */

import {
  SET_COORDINATES_ORI_SHOW,
  SET_MARK_ORI_SHOW,
  SET_MAPORI_TYPE
} from '../mutation-types'

// initial state
const state = {
  coordinatesOriShow: false,
  markOriShow: false,
  showType: ''
}

// getters
const getters = {
  coordinatesOriShow: state => state.coordinatesOriShow,
  markOriShow: state => state.markOriShow,
  showType: state => state.showType
}

// actions
const actions = {
  actioncoordinatesOriShow ({commit, state}, param) {
    commit(SET_COORDINATES_ORI_SHOW, param)
  },
  actionmarkOriShow ({commit, state}, param) {
    commit(SET_MARK_ORI_SHOW, param)
  },
  actionMapOriType ({commit, state}, param) {
    commit(SET_MAPORI_TYPE, param)
  }
}

// mutations
const mutations = {
  [SET_COORDINATES_ORI_SHOW] (state, data) {
    state.coordinatesOriShow = data
  },
  [SET_MARK_ORI_SHOW] (state, data) {
    state.markOriShow = data
  },
  [SET_MAPORI_TYPE] (state, data) {
    state.showType = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
