import {SET_SQL_PARAMS, SET_NAVIGATION, SET_STATISTICAL, SET_GSGX_SQL_PARAMS, GOU_ZAO_WU} from '../mutation-types'

// initial state
const state = {
  navigation: {},
  sqlParams: '',
  statistical: false,
  gsgxSqlParams: {},
  show: ''
}

// getters
const getters = {
  getSqlParams: state => state.sqlParams,
  gsgxSqlParams: state => state.gsgxSqlParams
}

// actions
const actions = {
  setSqlParams ({commit, state}, sqlParams) {
    commit(SET_SQL_PARAMS, sqlParams)
  },
  setNavigation ({commit, state}, obj) {
    commit(SET_NAVIGATION, obj)
  },
  setStatistical ({commit, state}, bool) {
    commit(SET_STATISTICAL, bool)
  },
  setGsgxSqlParams ({commit, state}, gsgxSqlParams) {
    commit(SET_GSGX_SQL_PARAMS, gsgxSqlParams)
  },
  gouZaoWu ({commit, state}, val) {
    commit(GOU_ZAO_WU, val)
  }
}

// mutations
const mutations = {
  [SET_SQL_PARAMS] (state, sqlParams) {
    state.sqlParams = sqlParams
  },
  [SET_NAVIGATION] (state, obj) {
    state.navigation = obj
  },
  [SET_STATISTICAL] (state, bool) {
    if (bool !== undefined) {
      state.statistical = bool
    } else {
      state.statistical = !state.statistical
    }
  },
  [SET_GSGX_SQL_PARAMS] (state, gsgxSqlParams) {
    state.gsgxSqlParams = gsgxSqlParams
  },
  [GOU_ZAO_WU] (state, sqlParams) {
    state.show = sqlParams
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
