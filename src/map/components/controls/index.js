import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import components from './contextMenu/src'
let instance
let Template

const getControl = function () {
  Template = Vue.extend(components)
}

// 默认回调
const defaultCallback = action => {
  console.log(action)
}

// 创建实例
const initInstance = () => {
  instance = new Template({
    router,
    store,
    el: document.createElement('div')
  })
  instance.callback = defaultCallback
}

const getControlElement = (type, options) => {
  if (!type) return
  getControl(type)
  if (!instance) {
    initInstance()
  }
  instance.visible = false
  for (let prop in options) {
    if (options[prop]) {
      instance[prop] = options[prop]
    }
  }
  Vue.nextTick(() => {
    // instance.visible = true
  })
  document.body.appendChild(instance.$el)
  return instance.$el
}

const showControl = () => {
  if (instance) {
    instance.visible = true
  }
}

const hideControl = () => {
  if (instance) {
    instance.visible = false
  }
}

export { getControlElement, showControl, hideControl }
