import {INPUT_VALUE} from '../mutation-types'

// initial state
const state = {
  inputValue: '' // lucene 查询参数存储
}

// getters
const getters = {
  getInputValue: state => state.inputValue
}

// actions
const actions = {
  setInputValue ({commit, state}, bool) {
    commit(INPUT_VALUE, bool)
  }
}

// mutations
const mutations = {
  [INPUT_VALUE] (state, params) {
    state.inputValue = params
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
