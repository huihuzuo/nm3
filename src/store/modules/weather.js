/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import {
  SET_WEATHER_LEGEND,
  SET_WEATHER_SHOW,
  SET_WEATHER_LAYERNAME
} from '../mutation-types'

// initial state
const state = {
  layerName: '10010101',
  showWeather: false,
  legendData: []
}

// getters
const getters = {
  layerName: state => state.layerName,
  showWeather: state => state.showWeather
}

// actions
const actions = {
  actionWeatherLayerName ({commit, state}, param) {
    commit(SET_WEATHER_LAYERNAME, param)
  },
  actionWeatherShow ({commit, state}, param) {
    commit(SET_WEATHER_SHOW, param)
  },
  actionLegendData ({commit, state}, param) {
    commit(SET_WEATHER_LEGEND, param)
  }
}

// mutations
const mutations = {
  [SET_WEATHER_LAYERNAME] (state, data) {
    state.layerName = data
  },
  [SET_WEATHER_SHOW] (state, data) {
    state.showWeather = data
  },
  [SET_WEATHER_LEGEND] (state, data) {
    state.legendData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
