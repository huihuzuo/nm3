<template>
  <div class="main-panel-wrap LiangKeCheLiangTongJi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goToDetail"></span>
    </div>
    <div class="main-panel-body">
      <div class="charts-wrap">
        <div class="liangKeCheLiang_chart" id="liangKeCheLiang_chart"></div>
        <div class="charts-content">
          <div>实时客车发车指数</div>
          <div>日均客位数是去年的1.41倍</div>
          <div>实载率较平日同期上升2.1%</div>
        </div>
      </div>

      <div class="liangKeChe-wrap">
        <div class="liangKeChe-item">
          <div><span>612</span>个</div>
          <div><span>+1.24</span><span class="titafont tita-shangsheng" style="color: #43e3e3"></span></div>
          <div>班车</div>
        </div>
        <div class="liangKeChe-item">
          <div><span>612</span>个</div>
          <div><span>+1.24</span><span class="titafont tita-xiajiang" style="color: #ff4c4b"></span></div>
          <div>包车</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '两客车辆统计'
      }
    },
    mounted () {
      this.initChart('在线率', 'liangKeCheLiang_chart', 92, '#cd115b', '#f1ab24')
    },
    methods: {
      initChart (_name, _id, _value, _color1, _color2) {
        let myChart = this.$echarts.init(document.getElementById(_id))
        let data = []

        for (let i = 0; i <= 180; i++) {
          let r = 10
          data.push([r, i])
        }

        let option = {
          title: {
            text: '3.5',
            left: 'center',
            top: 90,
            textStyle: {
              fontSize: 24,
              color: '#fff'
            }
          },
          polar: {},
          visualMap: {
            show: false,
            seriesIndex: 1,
            dimension: 1,
            type: 'continuous',
            min: 0,
            max: 180,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            color: ['#43e3e3', '#ffc34b', '#ff4b4b']
          },
          angleAxis: {
            type: 'value',
            max: 360,
            startAngle: 180,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          radiusAxis: {
            min: 0,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            name: 'line',
            type: 'line',
            coordinateSystem: 'polar',
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 8,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: 'lightskyblue' // 0% 处的颜色
                  }, {
                    offset: 0.5,
                    color: 'yellow' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: 'orangered' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: data
          }, {
            name: 'point',
            type: 'scatter',
            coordinateSystem: 'polar',
            symbolSize: 12,
            hoverAnimation: false,
            cursor: 'default',
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            data: [
              [9.8, 120]
            ]
          }],
          animationDuration: 2000
        }
        myChart.setOption(option)
      },
      goToDetail () {
        this.$router.push({
          name: 'ally'
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";

  .LiangKeCheLiangTongJi-wrap {

    .liangKeCheLiang_chart {
      height: 260px;
      width: 330px;
    }
    .charts-wrap {
      position: relative;
      .charts-content {
        width: 330px;
        text-align: center;
        position: absolute;
        bottom: 10px;
        div {
          font-size: 14px;
          margin-bottom: 10px;
          &:first-child, &:last-child {
            font-size: 16px;
            line-height: 30px;
            color: $panel-text-highlight-color;
          }
          &:first-child {
            margin-bottom: 5px;
          }
          &:last-child {
            display: inline-block;
            padding-top: 5px;
            margin-bottom: 0;
            border-top: 1px solid $panel-border-color;
          }
        }
      }
    }

    .liangKeChe-wrap {
      display: flex;
      .liangKeChe-item {
        width: 50%;
        padding: 0 10px;
        div {
          &:first-child {
            display: inline-block;
            color: $panel-text-highlight-color;
            span {
              font-size: 36px;
              margin-right: 5px;
              color: $panel-text-color;
            }
          }
          &:nth-child(2) {
            float: right;
            margin-top: 24px;
            span {
              color: $panel-text-highlight-color;
            }
          }
          &:last-child {
            margin-top: 10px;
            color: $panel-text-highlight-color;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
