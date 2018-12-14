// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './helper/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import fetch from './store/service'
import Clickoutside from './mixin/clickoutside'

import countTo from 'vue-count-to'

import panel from '@/components/panel'

import filters from '@/filters/filters'

import '@/assets/index.scss'
import echarts from 'echarts'
import echartsLiquidfill from 'echarts-liquidfill'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import moment from 'moment'

Vue.use(ElementUI, {locale})

Vue.config.productionTip = false
Vue.component('panel', panel)
Vue.component('countTo', countTo)

Vue.prototype.$fetch = fetch
Vue.prototype.$echarts = echarts
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.use(echartsLiquidfill)

Vue.directive('clickoutside', Clickoutside)

for (let key in filters) {
  Vue.filter(key, filters[key])
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
