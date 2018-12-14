/**
 * author     changjn
 * date       18/5/7
 */
'use strict'
import axios from 'axios'
const realURL = config.service.url

const defaults = {
  baseURL: realURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

Object.assign(axios.defaults, defaults)

// 运管 - 客运站
export const getKyz = params => {
  return axios.get(``, {
    baseURL: realURL
  })
}
