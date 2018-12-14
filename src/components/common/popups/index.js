import Vue from 'vue'
import linePopupVue from './linePopup'
import panoSamplePopupVue from './panoSamplePopup'

export const ele = {
  linePopup: linePopupVue,
  panoSamplePopup: panoSamplePopupVue
}

let Template

export const getPops = function (_str) {
  Template = Vue.extend(ele[_str])
}

let instance
// 创建实例
const initInstance = () => {
  instance = new Template({
    el: document.createElement('div')
  })
}
// 获取虚拟dom
export const getPopupElement = (_params) => {
  initInstance()
  instance.params = getParams(_params)
  document.body.appendChild(instance.$el)
  return instance.$el
}
// 获取图层配置
export const getParams = params_ => {
  if (params_['layerName'] && params_['id']) {
    let queryParams = {}
    queryParams['properties'] = params_['properties']
    queryParams['id'] = params_['id']
    queryParams['layerName'] = params_['layerName']
    queryParams['showDetailTool'] = params_['showDetailTool']
    if (params_.hasOwnProperty('isRightMenusSearch')) {
      queryParams['isRightMenusSearch'] = params_['isRightMenusSearch']
    }
    return queryParams
  } else {
    console.info('缺少关键查询参数！')
  }
}
