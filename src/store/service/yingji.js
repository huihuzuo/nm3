/**
 * author     dark
 * date       18/2/9
 */
'use strict'
import axios from 'axios'
const getWeather = (type) => {
  let url = ''
  switch (type) {
    case '1':
      url = 'static/json/jiangxi/njd.json'
      break
    case '2':
      url = 'static/json/jiangxi/js.json'
      break
    case '3':
      url = 'static/json/jiangxi/wd.json'
      break
    case '4':
      url = 'static/json/jiangxi/feng.json'
      break
  }
  return axios.get(url, {
    baseURL: ''
  })
}

export default {
  getWeather
}
