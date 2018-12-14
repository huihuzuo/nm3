<template>
  <div class="main-panel-wrap ZuDuanShiJian-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goPath"></span>
    </div>
    <div class="main-panel-body">

      <ul class="ZuDuanShiJian-total">
        <li @click="clickEvent('all')">
          <div>37 <span>个</span></div>
          <div>总个数</div>
        </li>
        <li @click="clickEvent('1')">
          <div>6 <span>个</span></div>
          <div>重大</div>
        </li>
        <li @click="clickEvent('2')">
          <div>11 <span>个</span></div>
          <div>较大</div>
        </li>
      </ul>

      <div style="position: relative; overflow: hidden">
        <ul class="main-panel-switch">
          <li v-for="item in switchs"><span :class="{true: 'selected'}[item.type == type]" @click="switchClick(item.type)">{{item.name}}</span></li>
        </ul>
        <div id="ZuDuanShiJian_charts"></div>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        title: '当天阻断事件',
        type: 'bar',
        switchs: [
          {
            name: '统计图',
            type: 'bar'
          },
          {
            name: '趋势图',
            type: 'line'
          }
        ],
        blockList: [
          {
            'attributes': {
              'OBJECTID': '7',
              'USERID': '0',
              'PROV': '100000.0000000000',
              'NAME': '秦皇岛市',
              'ID': '1'
            },
            'geometry': 'POINT(115.74651833 28.87821666)',
            'geometryType': 'Point'
          },
          {
            'attributes': {
              'OBJECTID': '7',
              'USERID': '0',
              'PROV': '100000.0000000000',
              'NAME': '秦皇岛市',
              'ID': '2'
            },
            'geometry': 'POINT(115.224609375 25.147705078125)',
            'geometryType': 'Point'
          },
          {
            'attributes': {
              'OBJECTID': '7',
              'USERID': '0',
              'PROV': '100000.0000000000',
              'NAME': '秦皇岛市',
              'ID': '3'
            },
            'geometry': 'POINT(114.3017578125 27.191162109375)',
            'geometryType': 'Point'
          },
          {
            'attributes': {
              'OBJECTID': '7',
              'USERID': '0',
              'PROV': '100000.0000000000',
              'NAME': '秦皇岛市',
              'ID': '4'
            },
            'geometry': 'POINT(116.89453125 27.344970703125)',
            'geometryType': 'Point'
          },
          {
            'attributes': {
              'OBJECTID': '7',
              'USERID': '0',
              'PROV': '100000.0000000000',
              'NAME': '秦皇岛市',
              'ID': '5'
            },
            'geometry': 'POINT(115.42236328125 27.322998046875)',
            'geometryType': 'Point'
          },
          {
            'attributes': {
              'OBJECTID': '7',
              'USERID': '0',
              'PROV': '100000.0000000000',
              'NAME': '秦皇岛市',
              'ID': '6'
            },
            'geometry': 'POINT(115.400390625 26.180419921875)',
            'geometryType': 'Point'
          }
        ]
      }
    },
    mounted () {
      this.initChart()
      if (this.$store.getters.loadMapSuccess) {
        // this.clickEvent('all')
      }
    },
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess
      })
    },
    watch: {
      loadMapSuccess () {
        // this.clickEvent('all')
      }
    },
    methods: {
      clickEvent (alias) {
        switch (alias) {
          case 'all':
            this.addPoints(this.blockList)
            break
          case '1':
            break
          case '2':
            break
        }
      },
      addPoints (datas) {
        this.$Maps.addOverlayPoints(datas, {
          layerName: 'point',
          zoomToExtent: false,
          orderBy: true,
          style: {
            element: {
              className: 'block-point'
            }
          }
        })
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('ZuDuanShiJian_charts'))
        let xAxisData = []
        let seriesData = []
        if (this.type === 'bar') {
          xAxisData = ['事故', '气象', '地质', '重大', '其他']
          seriesData = [10, 12, 7, 4, 8]
        } else {
          xAxisData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
          seriesData = [10, 12, 7, 4, 8, 10, 12, 7, 4, 8, 10, 12, 7, 4, 8, 10, 12, 7, 4, 8, 10, 12, 7, 4]
        }
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
              name: '起      ',
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
              name: '阻断事件',
              type: this.type,
              barWidth: '8px',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#f72155'
                  }, {
                    offset: 1,
                    color: '#eec22d'
                  }], false),
                  barBorderRadius: [10, 10, 0, 0]
                }
              },
              data: seriesData
            }
          ]
        }
        myChart.setOption(option)
      },
      switchClick (type) {
        this.type = type
        this.initChart()
      },
      goPath () {
        this.$router.push({name: 'event'})
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .ZuDuanShiJian-wrap {
    #ZuDuanShiJian_charts {
      margin-top: 30px;
      height: 150px;
      width: 360px;
    }
    .main-panel-switch {
      top: 0 !important;
      right: 0;
    }
    .ZuDuanShiJian-total {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      li {
        width: 115px;
        height: 70px;
        background: url('../../../static/images/main/zd_1.png') center no-repeat;
        &:nth-child(2) {
          background: url('../../../static/images/main/zd_2.png') center no-repeat;
        }
        div {
          font-size: 28px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          color: #fff;
          span {
            font-size: 14px;
          }
          &:last-child {
            font-size: 14px;
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
  }
  .block-point{
    width: 20px !important;
    height: 20px !important;
    border-radius: 10px !important;
    background-color: #FF9D15;
    font-size: 10px;
    animation: orange-point 1s linear 2s infinite alternate;
    cursor: pointer;
    &:hover{
      background-color: red;
    }
  }
  @keyframes orange-point{
    0% {
      box-shadow: 0 0 12px #ff9d15, 0 0 11px #ff9d15, 0 0 8px #ff9d15, 0 0 3px #ff9d15, 0 0 2px #ff9d15, inset 0 0 3px #ff9d15, inset 0 0 5px #ff9d15, inset 0 0 6px #ff9d15, inset 0 0 8px #ff9d15;
    }
    50% {
      box-shadow: 0 0 5px #ff9d15, 0 0 2px #ff9d15, 0 0 3px #ff9d15, 0 0 2px #ff9d15, 0 0 1px #ff9d15, inset 0 0 2px #ff9d15, inset 0 0 3px #ff9d15, inset 0 0 28px #ff9d15, inset 0 0 32px #ff9d15;
    }
    100% {
      box-shadow: 0 0 12px #ff9d15, 0 0 11px #ff9d15, 0 0 8px #ff9d15, 0 0 3px #ff9d15, 0 0 2px #ff9d15, inset 0 0 3px #ff9d15, inset 0 0 5px #ff9d15, inset 0 0 6px #ff9d15, inset 0 0 8px #ff9d15;
    }
  }
</style>
