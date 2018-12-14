<template>
  <transition
    enter-active-class="bounceInRight"
    leave-active-class="bounceOutRight">
    <panel-mini title="气象站 - 某县（站号:392919）" position="right" class="weather-mini-wrap" @onClose="onClose">
      <div slot="body">
        <div id="weather_chart"></div>

        <h3>本站主要观测要素</h3>

        <ul class="weather-info-wrap">
          <li>平均气温：-2.1℃</li>
          <li>本站气压：904Hpa</li>
          <li>相对湿度：76%</li>
          <li>1小时累计降水：--</li>
          <li>小时能见度：10km</li>
          <li>小时最大风速：1.7m/s</li>
        </ul>
      </div>
    </panel-mini>
  </transition>
</template>

<script>
  import panelMini from './panelMini'
  import echarts from 'echarts'

  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.initWeatherChart()
    },
    methods: {
      initWeatherChart () {
        let data = [
          ['5日9时', 5],
          ['5日12时', 39],
          ['5日17时', 20],
          ['6日9时', 15],
          ['6日12时', 30],
          ['6日17时', 25],
          ['7日9时', 19],
          ['7日12时', 27]
        ]

        let dateList = data.map(function (item) {
          return item[0]
        })
        let valueList = data.map(function (item) {
          return item[1]
        })

        let chart = echarts.init(document.getElementById('weather_chart'))
        let option = {
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 40,
            color: ['#00d2ff', '#006b81', '#00434e']
          }],
          title: [{
            left: 'center',
            text: '曲线图 - 平均气温【某县】',
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
            name: '温度',
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
            type: 'line',
            showSymbol: false,
            data: valueList,
            markArea: {
              data: [ [{
                name: '预报',
                xAxis: '6日9时'
              }, {
                xAxis: '7日12时'
              }] ],
              label: {
                normal: {
                  color: '#5096b3'
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(27, 86, 109, .5)'
                }
              }
            }
          }]
        }
        chart.setOption(option)
      },
      onClose () {
        this.$emit('onClose', 'weather')
      }
    },
    components: {
      panelMini
    }
  }
</script>

<style lang="scss">

  .weather-mini-wrap {
    #weather_chart {
      width: 370px;
      height: 150px;
    }
    .weather-info-wrap {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 184px;
        line-height: 26px;
      }
    }
  }

</style>
