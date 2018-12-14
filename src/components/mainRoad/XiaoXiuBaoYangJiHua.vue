<template>
  <div class="main-panel-wrap XiaoXiuBaoYangJiHua-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：2018年2月）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto()"></span>
    </div>
    <div class="main-panel-body">
      <div id="XiaoXiuBaoYangJiHua_charts"></div>
      <ul>
        <li>养护计划</li>
        <li>实际养护</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '小修保养计划'
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'xiaoxiubaoyang'})
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('XiaoXiuBaoYangJiHua_charts'))
        let xAxisData = ['绿化', '桥隧', '路面', '路基']
        let seriesData1 = [10, 52, 200, 334]
        let seriesData2 = [20, 82, 300, 410]
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '50px',
            top: '0',
            bottom: '0',
            containLabel: true
          },
          yAxis: [
            {
              type: 'category',
              data: xAxisData,
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#003d70'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(0, 61, 112, 0.3)'
                }
              },
              axisLabel: {
                color: '#50afff',
                fontSize: 14
              }
            }
          ],
          xAxis: [
            {
              type: 'value',
              name: '公里',
              nameLocation: 'end',
              nameTextStyle: {
                fontSize: 14
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#003d70'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(0, 61, 112, 0.3)'
                }
              },
              axisLabel: {
                color: '#50afff',
                fontSize: 14
              }
            }
          ],
          series: [
            {
              name: '实际养护',
              type: 'bar',
              barWidth: '8px',
              stack: '总量',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: '#00d484'
                  }, {
                    offset: 1,
                    color: '#81fffa'
                  }], false),
                  barBorderRadius: [0, 10, 10, 0]
                }
              },
              data: seriesData1
            },
            {
              name: '计划养护',
              type: 'bar',
              barWidth: '8px',
              stack: '总量',
              itemStyle: {
                normal: {
                  color: '#001b3c',
                  barBorderRadius: [0, 10, 10, 0]
                }
              },
              data: Object.keys(seriesData2).map(function (key) {
                return seriesData2[key] - seriesData1[key]
              })
            }
          ]
        }
        myChart.setOption(option)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .XiaoXiuBaoYangJiHua-wrap {
    width: auto !important;
    #XiaoXiuBaoYangJiHua_charts {
      margin-top: 30px;
      height: 250px;
      width: 360px;
    }
    ul {
      text-align: center;
      margin-top: 20px;
      li {
        color: $panel-text-color;
        margin-right: 20px;
        display: inline-block;
        &:before {
          content: ' ';
          display: inline-block;
          width: 20px;
          height: 10px;
          background: #00d484;
          margin-right: 10px;
        }
        &:first-child {
          &:before {
            background: #001b3c;
          }
        }
      }
    }
  }
</style>
