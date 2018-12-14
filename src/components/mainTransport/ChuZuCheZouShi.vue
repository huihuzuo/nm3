<template>
  <div class="main-panel-wrap ChuZuCheZouShi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
      <ul class="main-panel-switch">
        <li v-for="item in switchs"><span :class="{true: 'selected'}[item.name == type]" @click="switchClick(item.name)">{{item.name}}</span></li>
      </ul>
      <div id="ChuZuCheZouShi_charts"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '出租车走势图',
        type: '重车',
        switchs: [
          {
            name: '重车'
          },
          {
            name: '空车'
          }
        ],
        pieColor: ['#78e138', '#ffab52', '#60fce8', '#fc5401', '#f6f072']
      }
    },
    mounted () {
      this.initChart([20, 52, 125, 89, 20, 52, 125, 89, 20, 52, 125, 89, 28])
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'planproperty'})
      },
      switchClick (type) {
        this.type = type
        if (type === '重车') {
          this.initChart([20, 52, 125, 89, 20, 52, 125, 89, 20, 52, 125, 89, 28])
        } else {
          this.initChart([20, 92, 49, 65, 36, 58, 19, 74, 47, 32, 61, 52, 71])
        }
      },
      initChart (data) {
        let myChart = this.$echarts.init(document.getElementById('ChuZuCheZouShi_charts'))
        let xAxisData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        let seriesData = data
        let option = {
          grid: {
            left: '0',
            right: '0',
            top: '30px',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
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
          },
          yAxis: {
            type: 'value',
            name: '个      ',
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
          },
          series: [{
            data: seriesData,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#ffc000'
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#ffc000'
                }, {
                  offset: 1,
                  color: '#003d70'
                }])
              }
            }
          }]
        }
        myChart.setOption(option)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .ChuZuCheZouShi-wrap {
    #ChuZuCheZouShi_charts {
      margin-top: 30px;
      margin-bottom: 20px;
      height: 150px;
      width: 330px;
    }
    .jsxz-wrap {
      ul {
        position: absolute;
        top: 130px;
        right: 20px;
        width: 180px;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 90px;
          line-height: 30px;
          span {
            display: inline-block;
            float: left;
            width: 12px;
            height: 12px;
            margin-top: 9px;
            border-radius: 3px;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
