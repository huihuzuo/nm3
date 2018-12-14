<template>
  <transition
    enter-active-class="bounceInRight"
    leave-active-class="bounceOutRight">
    <panel-mini title="交通流 - 某县（站号:392919）" position="right" class="traffic-mini-wrap" @onClose="onClose">
      <div slot="body">
        <div id="traffic_chart"></div>
      </div>
    </panel-mini>
  </transition>
</template>

<script>
  import panelMini from './panelMini'
  import echarts from 'echarts'

  export default {
    data () {
      return {}
    },
    mounted () {
      this.initTrafficChart()
    },
    methods: {
      initTrafficChart () {
        let data = [
          ['00:00', 1.7],
          ['01:00', 1.8],
          ['02:00', 1.9],
          ['03:00', 2.5],
          ['04:00', 1.8],
          ['05:00', 1.6],
          ['06:00', 2.1],
          ['07:00', 1.8],
          ['08:00', 1.9],
          ['09:00', 1.6],
          ['10:00', 1.4],
          ['11:00', 1.5],
          ['12:00', 1.6],
          ['13:00', 1.7],
          ['14:00', 1.8],
          ['15:00', 1.9],
          ['16:00', 2.5],
          ['17:00', 1.8],
          ['18:00', 1.6],
          ['19:00', 2.1],
          ['20:00', 1.8],
          ['21:00', 1.9],
          ['22:00', 1.6],
          ['23:00', 1.4]]
        let dateList = data.map(function (item) {
          return item[0]
        })
        let valueList = data.map(function (item) {
          return item[1]
        })

        let chart = echarts.init(document.getElementById('traffic_chart'))
        let option = {
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 3,
            color: ['#00d2ff', '#006b81', '#00434e']
          }],
          title: [{
            left: 'center',
            text: '未来一周拥堵预测',
            textStyle: {
              color: '#c2edff',
              fontSize: '14px'
            }
          }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            name: '时间',
            data: dateList,
            boundaryGap: false,
            axisLabel: {
              color: '#c2edff'
            },
            axisLine: {
              lineStyle: {
                color: '#1E5267'
              }
            }
          }],
          yAxis: [{
            name: '高峰拥堵指数',
            nameTextStyle: {
              color: '#c2edff'
            },
            min: 1,
            max: 3,
            splitLine: {show: false},
            axisLabel: {
              color: '#c2edff'
            },
            axisLine: {
              lineStyle: {
                color: '#1E5267'
              }
            }
          }],
          grid: [{
            bottom: '40',
            top: '40',
            left: '40',
            right: '20'
          }],
          series: [{
            name: '高峰拥堵指数',
            type: 'line',
            showSymbol: false,
            data: valueList
          }]
        }
        chart.setOption(option)
      },
      onClose () {
        this.$emit('onClose', 'traffic')
      }
    },
    components: {
      panelMini
    }
  }
</script>

<style lang="scss">

  .traffic-mini-wrap {
    #traffic_chart {
      width: 370px;
      height: 200px;
    }
  }

</style>
