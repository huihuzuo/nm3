<template>
  <div class="main-panel-wrap JiHuaJianSheLiCheng-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：2017年）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
      <div id="JiHuaJianSheLiCheng_charts"></div>

      <div class="JiHuaJianSheLiCheng-total">
        <div>
          <div>626.12 <span>公里</span></div>
          <div>总里程</div>
        </div>

        <div>
          <div>13.1%</div>
          <div>增长率</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '计划建设里程'
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'planmileage'})
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('JiHuaJianSheLiCheng_charts'))
        let xAxisData = ['高速', '一级', '二级', '三级', '四级', '等外']
        let seriesData = [10, 52, 200, 334, 390, 330]
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
            right: '0',
            top: '30px',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
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
          yAxis: [
            {
              type: 'value',
              name: '公里        ',
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
              name: '计划建设里程',
              type: 'bar',
              barWidth: '8px',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00d484'
                  }, {
                    offset: 1,
                    color: '#d1a624'
                  }], false),
                  barBorderRadius: [10, 10, 0, 0]
                }
              },
              data: seriesData
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
  .JiHuaJianSheLiCheng-wrap {
    #JiHuaJianSheLiCheng_charts {
      margin-top: 30px;
      height: 150px;
      width: 360px;
    }
    .JiHuaJianSheLiCheng-total {
      margin-top: 20px;
      display: flex;
      > div {
        width: 185px;
        text-align: center;
        height: 80px;
        div {
          line-height: 40px;
          height: 40px;
          font-size: 20px;
          color: $panel-text-highlight-color;
          span {
            font-size: 14px;
            color: $panel-text-color
          }
          &:last-child {
            color: $panel-text-color;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
