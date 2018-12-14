import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import monitor from '@/views/monitor/index'
import setting from '@/views/xtgl/setting'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [{
        path: '/index/monitor',
        name: 'monitor',
        component: monitor
      }]
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '*',
      redirect: '/setting'
    }
  ]
})
