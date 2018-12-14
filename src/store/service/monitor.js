import {
  SERVER_SERVICE,
  trafficHead,
  eventHead,
  weatherHead,
  GaodeTrafficList,
  BaiduTrafficList,
  BaiduTrafficStatic,
  visibilityList,
  precipitationList,
  windPowerList,
  temperatureList,
  LuwanEventStatistic,
  GaodeEventStatistics,
  JiaodiaozhanTrafficStatistic,
  videoList
} from '../api'
import axios from 'axios'
export default {
  trafficHead () {
    return axios.get(trafficHead, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  eventHead () {
    return axios.get(eventHead, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  weatherHead () {
    return axios.get(weatherHead, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  GaodeTrafficList (params) {
    return axios.get(GaodeTrafficList, {
      params: params,
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  BaiduTrafficList (params) {
    return axios.get(BaiduTrafficList, {
      params: params,
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  /**
   * 百度路况统计
   * @param params
   * @returns {Promise<any>}
   */
  loadBaiduTrafficStatic (params) {
    return axios.get(BaiduTrafficStatic, {
      params: params,
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  visibilityList (params) {
    return axios.get(visibilityList, {
      params: params,
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  precipitationList () {
    return axios.get(precipitationList, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  windPowerList () {
    return axios.get(windPowerList, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  temperatureList () {
    return axios.get(temperatureList, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  LuwanEventStatistic () {
    return axios.get(LuwanEventStatistic, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  GaodeEventStatistics () {
    return axios.get(GaodeEventStatistics, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  JiaodiaozhanTrafficStatistic () {
    return axios.get(JiaodiaozhanTrafficStatistic, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  videoList () {
    return axios.get(videoList, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res
      return new Promise(resolve => {
        resolve(r)
      })
    })
  }
}
