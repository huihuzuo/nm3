// initial state
const state = {
  wayShow: true,           // 路线树
  conditionShow: false,    // 条件查询
  cljkShow: true,          // 车辆监控
  listShow: false,         // 车辆列表
  detailsShow: false,      // 车辆详情
  treeId: '',               // 路线树id
  carBaseMsg: {}              // 车牌号
}

// getters
const getters = {
}

// actions
const actions = {

}

// mutations
const mutations = {
  // 切换条件查询
  cutCondition (state) {
    state.wayShow = false
    state.conditionShow = true
  },
  // 切换树
  cutTree (state) {
    state.wayShow = true
    state.conditionShow = false
  },
  // 切换车辆监控
  cutCljk (state) {
    state.cljkShow = true
    state.listShow = false
    state.detailsShow = false
  },
  // 切换车辆列表
  cutList (state) {
    state.cljkShow = false
    state.listShow = true
    state.detailsShow = false
  },
  // 切换车辆详情
  cutDetails (state) {
    state.cljkShow = false
    state.listShow = false
    state.detailsShow = true
  },
  // 传数节点id
  setTreeId (state, n) {
    state.treeId = n
  },
  // 传车辆静态信息
  carBaseMsg (state, n) {
    state.carBaseMsg = n
    console.log(state.carBaseMsg)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
