import axios from 'axios'
import {BASICURL, GaodeEventList, JiaodiaozhanTrafficList, SERVER_SERVICE} from '../api'

export default {
  /**
   * 获取路网统计项
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getRoadEventsStatistic (params) {
    return axios.get('rnmonitor-service/block/getEventTypeStatistics', {
      params: params,
      baseURL: BASICURL
    }).then(res => {
      return res.data
    })
  },

  /**
   * 获取路网统计列表
   * @returns {Promise<any>}
   */
  getRoadEventsList (params) {
    return axios.post('rnmonitor-service/block/getEventListByPage', params, {
      baseURL: BASICURL
    }).then(res => {
      return res.data.result
    })
  },
  getGaodeEventList (params) {
    return axios.get(GaodeEventList, {
      params: params,
      baseURL: SERVER_SERVICE
    }).then(res => {
      return res.data
    })
  },

  /**
   * 首页交通量统计项
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getStationStatistic (params) {
    return axios.get('/rnmonitor-service/gcz/getGczMileageStatistics', {
      params: params,
      baseURL: BASICURL
    }).then(res => {
      return res.data
    })
  },
  /**
   * 交调站列表查询
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   * @constructor
   */
  JiaodiaozhanTrafficList (params) {
    return axios.get(JiaodiaozhanTrafficList, {
      params: params,
      baseURL: BASICURL
    }).then(res => {
      return res.data
    })
  }
}
