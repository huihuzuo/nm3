<template>
  <div class="refresh-content">
    <span>更新时间：{{time}}</span>
    <span class="iconfont icon-shuaxin" :class="refreshing ? 'refresh-padding' : ''" @click="refresh()"></span>
  </div>
</template>

<script>
  import { uuid } from '@/helper'
  import moment from 'moment'
  export default {
    name: 'timer',
    data () {
      return {
        refreshing: false,
        time: moment().format('H:mm'),
        timer: null
      }
    },
    mounted () {
      this.createTimer(true)
    },
    methods: {
      refresh () {
        this.refreshing = true
        window.setTimeout(() => {
          this.refreshing = false
        }, 1000)
        this.createTimer(true)
      },
      createTimer (flag) {
        let vm = this
        if (flag) {
          if (vm.timer) {
            window.clearInterval(vm.timer)
          }
          vm.time = moment().format('H:mm')
          vm.$store.dispatch('actionRefreshTimer', {
            uuid: uuid(),
            time: vm.time,
            state: true
          })
          vm.timer = setInterval(() => {
            let now = new Date()
            let min = now.getMinutes()
            if (min % 5 === 0) {
              vm.time = moment(now).format('H:mm')
              vm.$store.dispatch('actionRefreshTimer', {
                uuid: uuid(),
                time: vm.time,
                state: true
              })
            }
          }, 60 * 1000)
          // vm.timer = setInterval(() => {
          //   vm.time = moment().format('H:mm')
          //   vm.$store.dispatch('actionRefreshTimer', {
          //     uuid: uuid(),
          //     time: vm.time,
          //     state: true
          //   })
          // }, 10 * 1000)
        } else {
          vm.$store.dispatch('actionRefreshTimer', {
            uuid: uuid(),
            time: vm.time,
            state: false
          })
          window.clearInterval(vm.timer)
        }
      }
    },
    beforeDestroy () {
      this.createTimer(false)
    }
  }
</script>

<style scoped lang="scss">
  .refresh-content {
    position: absolute;
    bottom: 10px;
    left: 415px;
    background-color: rgba(1, 28, 38, 0.71);
    padding: 5px 10px;
    border-radius: 3px;
    font-family: SimSun;
    .icon-shuaxin {
      color: #539fbc;
      margin-left: 5px;
      transition: .3s;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        color: #ff9c9c;
      }
    }
    .refresh-padding {
      animation-name: refresh-padding;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  }
</style>
