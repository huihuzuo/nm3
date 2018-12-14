// import Vue from 'vue'
import { IMAGE_INDEX } from '../mutation-types'

// initial state
const state = {
  imageIndex: ''
}

// getters
const getters = {
  getImageIndex: state => state.imageIndex
}

// actions
const actions = {
  setImageIndex ({commit, state}, param) {
    commit(IMAGE_INDEX, param)
  }
}

// mutations
const mutations = {
  [IMAGE_INDEX] (state, data) {
    state.imageIndex = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

