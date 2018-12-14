import {
  SET_CAMERA_LIST, WEATHER_TYPE, WEATHER_CLEAR
} from '../mutation-types'

// initial state
const state = {
  cameraList: {},
  weatherType: '1',
  activeNote: ''
}

// getters
const getters = {
  cameraList: state => state.cameraList, // 摄像头List
  weatherType: state => state.weatherType // 摄像头List
}

// actions
const actions = {
  setCameraList ({commit, state}, params) {
    commit(SET_CAMERA_LIST, params)
  },
  getWeatherType ({commit, state}, data) {
    commit(WEATHER_TYPE, data)
  },
  clearWeatherSelected ({commit, state}, data) {
    commit(WEATHER_CLEAR, data)
  }
}

// mutations
const mutations = {
  [SET_CAMERA_LIST] (state, data) {
    state.cameraList = data
  },
  [WEATHER_TYPE] (state, data) {
    state.weatherType = data
  },
  [WEATHER_CLEAR] (state, data) {
    state.activeNote = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
