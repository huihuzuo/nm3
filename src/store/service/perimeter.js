import axios from 'axios'
// import { BASICURL } from '../api'

export default {
  // 图层叠加
  getPerimeterList (params) {
    return axios.get('geocoding/circle', {
      params: params,
      baseURL: config.service.geocoding
    }).then(res => {
      return res.data
    })
  },
  // 事件关联路线动态分段
  getSegmentLine (params) {
    return axios.get('/getSegment', {
      params: {
        params: params
      },
      baseURL: config.service.geoserversde
    }).then(res => {
      return res.data
    })
  }
}
