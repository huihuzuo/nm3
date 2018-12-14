<template>
  <panel-mini title="隧道状态监测" position="right" :show-switch="true" :show-close="false" class="monit-tunnel-wrap">
    <div slot="body">
      <div id="monit_tunnel_chart"></div>
    </div>
  </panel-mini>
</template>
<script>
  import panelMini from '../panels/panelMini'
  export default {
    data () {
      return {
        data: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.getData()
      },
      getData () {
        this.initChart()
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('monit_tunnel_chart'))
        let myData = ['有危险', '有异常', '无异常']
        let databeast = {
          1: [63, 179, 149]
        }
        let databeauty = {
          1: [327491, 298753, 102098]
        }
        let timeLineData = [1]

        let option = {
          baseOption: {
            timeline: {
              show: false,
              top: 0,
              data: []
            },
            legend: {
              show: false
            },
            tooltip: {
              show: true,
              trigger: 'axis',
              formatter: '{b}<br/>{a}: {c}人',
              axisPointer: {
                type: 'shadow'
              }
            },

            grid: [{
              show: false,
              left: 50,
              top: 0,
              bottom: 0,
              containLabel: true,
              width: 150
            }, {
              show: false,
              left: '52%',
              top: 20,
              bottom: 0,
              width: 0
            }, {
              show: false,
              right: 50,
              top: 0,
              bottom: 0,
              containLabel: true,
              width: 150
            }],

            xAxis: [
              {
                type: 'value',
                inverse: true,
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                position: 'top',
                axisLabel: {
                  show: false
                },
                splitLine: {
                  show: false
                }
              }, {
                gridIndex: 1,
                show: false
              }, {
                gridIndex: 2,
                nameTextStyle: {
                  color: '#50afff',
                  fontSize: 14
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                position: 'top',
                axisLabel: {
                  show: false
                },
                splitLine: {
                  show: false
                }
              }],
            yAxis: [{
              type: 'category',
              inverse: true,
              position: 'right',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              data: myData
            }, {
              gridIndex: 1,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#50afff',
                  fontSize: 14
                }

              },
              data: myData.map(function (value) {
                return {
                  value: value,
                  textStyle: {
                    align: 'center'
                  }
                }
              })
            }, {
              gridIndex: 2,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false

              },
              data: myData
            }],
            series: []

          },
          options: []
        }

        option.baseOption.timeline.data.push(timeLineData[0])
        option.options.push({
          tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{c} {a}'
          },
          series: [{
            name: '座',
            type: 'bar',
            barWidth: 6,
            label: {
              normal: {
                show: true,
                position: 'left',
                offset: [0, 0],
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#4ca8f6',
                barBorderRadius: [50, 0, 0, 50]
              }
            },

            data: databeast[timeLineData[0]]
          }, {
            name: '万延米',
            type: 'bar',
            barWidth: 6,
            xAxisIndex: 2,
            yAxisIndex: 2,
            label: {
              normal: {
                show: true,
                position: 'right',
                offset: [0, 0],
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#00d484',
                barBorderRadius: [0, 50, 50, 0]
              }
            },
            data: databeauty[timeLineData[0]]
          }
          ]
        })
        myChart.setOption(option)
      }
    },
    components: {
      panelMini
    }
  }
</script>
<style lang="scss">
  .monit-tunnel-wrap {
    #monit_tunnel_chart {
      height: 200px;
      margin-bottom: 10px;
    }
  }
</style>
