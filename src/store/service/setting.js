import {
  settingWeatherUrl,
  settingTrafficUrl,
  settingEventUrl,
  SERVER_SERVICE
} from '../api'
import axios from 'axios'
export default {
  settingWeatherSave (params) {
    return axios.post(settingWeatherUrl + '/modify', params, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  getWeather () {
    return axios.get(settingWeatherUrl + '/getConfig', {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  settingTrafficSave (params) {
    return axios.post(settingTrafficUrl + '/modify', params, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  getTraffic () {
    return axios.get(settingTrafficUrl + '/getConfig', {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  settingEventSave (params) {
    return axios.post(settingEventUrl + '/modify', params, {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  },
  getEvent () {
    return axios.get(settingEventUrl + '/getConfig', {
      baseURL: SERVER_SERVICE
    }).then(res => {
      let [r] = []
      r = res.data
      return new Promise(resolve => {
        resolve(r)
      })
    })
  }
}
