<template>
  <div class="main-panel-wrap JiHuaXiangMu-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：2017年）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
      <ul class="main-panel-switch">
        <li v-for="item in switchs"><span :class="{true: 'selected'}[item.type == type]" @click="switchClick(item.type)">{{item.name}}</span></li>
      </ul>
      <div id="JiHuaXiangMu_charts" v-show="type === 'line'"></div>
      <div class="jsxz-wrap" v-show="type === 'pie'">
        <div id="JiHuaXiangMu_charts_pie"></div>

        <ul>
          <li v-for="(item, index) in pieLegend"><span :style="{background: pieColor[index]}"></span>{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '计划项目',
        type: 'pie',
        switchs: [
          {
            name: '建设性质',
            type: 'pie'
          },
          {
            name: '项目分类',
            type: 'line'
          }
        ],
        pieColor: ['#78e138', '#ffab52', '#60fce8', '#fc5401', '#f6f072'],
        pieLegend: ['建设', '改建', '新改建', '拆除重建', '加固改造']
      }
    },
    mounted () {
      this.initChartPie()
    },
    methods: {
      detailgoto () {
        if (this.type === 'line') {
          this.$router.push({name: 'plantype'})
        } else {
          this.$router.push({name: 'planproperty'})
        }
        // this.$router.push({name: 'planproperty'})
      },
      switchClick (type) {
        this.type = type
        if (type === 'line') {
          this.initChart()
        } else {
          this.initChartPie()
        }
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('JiHuaXiangMu_charts'))
        let xAxisData = ['公路', '桥梁', '隧道', '涵洞']
        let seriesData = [20, 52, 125, 89]
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
      },
      initChartPie () {
        let myChart = this.$echarts.init(document.getElementById('JiHuaXiangMu_charts_pie'))

        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: this.pieColor,
          series: [
            {
              name: '建设性质',
              type: 'pie',
              radius: [20, 70],
              center: ['30%', '60%'],
              roseType: 'area',
              label: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 10, name: '新建'},
                {value: 5, name: '改建'},
                {value: 15, name: '新改建'},
                {value: 25, name: '拆除重建'},
                {value: 20, name: '加固改造'}
              ]
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
  .JiHuaXiangMu-wrap {
    #JiHuaXiangMu_charts, #JiHuaXiangMu_charts_pie {
      margin-top: 30px;
      margin-bottom: 20px;
      height: 150px;
      width: 360px;
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
