<template>
  <panel-mini class="main-traffic-wrap" position="right" :show-switch="true" :show-close="false" v-model="switchValue">
    <div slot="head">
      <div>
        交调站观测里程：<span><countTo :startVal="0" :endVal='Math.round(data.allMileage)' :duration='3000'></countTo></span> 公里
      </div>
    </div>
    <div slot="body">
      <div class="cartogram">
        <div class="cartogramCon" v-for="(item, index) in circle">
          <div class="cartogramConWrap">
            <circle-progress-temp :id="item.id" :obj="item"></circle-progress-temp>
          </div>
          <p class="dynamic-box1-num"><countTo :startVal="0" :endVal='Math.round(item.num)' :duration='3000'></countTo><span
            class="dynamic-box1-unit">{{item.unit}}</span></p>
          <p class="dynamic-box1-name">{{item.name}}</p>
        </div>
      </div>
      <div class="progress">
        <div class="progressBars">
          <span class="progressBarName">已超过最大适应交通量的交调站 (共<span class="progressBarName-num">8</span>段)</span>
          <div id="sectionWarnLegend"></div>
          <span class="progressNum">
           <span class="progressNum-num">30</span>
            <span class="progressNum-unit">km</span>
          </span>
        </div>
        <div class="progressBars">
          <span class="progressBarName">已超过最大适应交通量的交调站 (共<span class="progressBarName-num">8</span>段)</span>
          <div id="sectionWarnTime"></div>
          <span class="progressNum">
            <span class="progressNum-num">30</span>
            <span class="progressNum-unit">km</span>
          </span>
        </div>
      </div>
    </div>
  </panel-mini>
</template>
<script>
  import panelMini from '@/components/panels/panelMini'
  import circleProgressTemp from '../../components/common/circleProgressNew'
  import LayerManage from '@/map/mixin/LayerManage'
  export default {
    data () {
      return {
        data: {
          circle: [
            {
              id: 'circle1'
            },
            {
              id: 'circle2'
            },
            {
              id: 'circle3'
            }
          ]
        },
        switchValue: false
      }
    },
    mixins: [LayerManage],
    watch: {
      switchValue (v) {
        this.addTrafficFlowLayer(v)
      }
    },
    mounted () {
      this.init()
      this.executeLineProgress()
    },
    methods: {
      init () {
        this.$api.getJtl().then(res => {
          this.data = res.data.data
          this.circle = [
            {
              id: 'circle1',
              tooltip: {
                show: false
              },
              title: {
                x: 'center',
                y: 'center',
                text: (this.data.onMileage / this.data.allMileage).toFixed(2) * 100 + '%',
                textStyle: {
                  fontWeight: 'normal',
                  color: '#FF8A00',
                  fontSize: 14
                }
              },
              grid: {
                left: '0',
                right: '0',
                top: '60%',
                containLabel: true
              },
              series: {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['65%', '80%'],
                data: [
                  {
                    value: this.data.onMileage,
                    itemStyle: {
                      normal: {
                        color: '#FF8A00'
                        // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        //   offset: 0, color: '#32D2CA' }, {
                        //     offset: 1, color: '#73E869'
                        //   }], false)
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      },
                      emphasis: {
                        show: false
                      }
                    }
                  },
                  {
                    value: this.data.allMileage,
                    tooltip: {
                      show: false
                    },
                    itemStyle: {
                      normal: {
                        color: '#144166'
                      },
                      emphasis: {
                        color: '#144166'
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      },
                      emphasis: {
                        show: false
                      }
                    },
                    hoverAnimation: false
                  }
                ]
              },
              num: `${this.data.onMileage}`,
              unit: 'km',
              name: '在线观测'
            },
            {
              id: 'circle2',
              tooltip: {
                show: false
              },
              title: {
                x: 'center',
                y: 'center',
                text: (this.data.onCount / this.data.allCount).toFixed(2) * 100 + '%',
                textStyle: {
                  fontWeight: 'normal',
                  color: '#01D1A1',
                  fontSize: 14
                }
              },
              grid: {
                left: '0',
                right: '0',
                top: '60%',
                containLabel: true
              },
              series: {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['65%', '80%'],
                data: [
                  {
                    value: this.data.onCount,
                    itemStyle: {
                      normal: {
                        color: '#01D1A1'
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      },
                      emphasis: {
                        show: false
                      }
                    }
                  },
                  {
                    value: this.data.allCount,
                    tooltip: {
                      show: false
                    },
                    itemStyle: {
                      normal: {
                        color: '#144166'
                      },
                      emphasis: {
                        color: '#144166'
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      },
                      emphasis: {
                        show: false
                      }
                    },
                    hoverAnimation: false
                  }
                ]
              },
              num: `${this.data.onCount}`,
              unit: '座',
              name: '在线设备'
            },
            {
              id: 'circle3',
              tooltip: {
                show: false
              },
              title: {
                x: 'center',
                y: 'center',
                text: '80%',
                textStyle: {
                  fontWeight: 'normal',
                  color: '#3497EC',
                  fontSize: 14
                }
              },
              grid: {
                left: '0',
                right: '0',
                top: '60%',
                containLabel: true
              },
              series: {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['65%', '80%'],
                data: [
                  {
                    value: 80,
                    itemStyle: {
                      normal: {
                        color: '#3497EC'
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      },
                      emphasis: {
                        show: false
                      }
                    }
                  },
                  {
                    value: 20,
                    tooltip: {
                      show: false
                    },
                    itemStyle: {
                      normal: {
                        color: '#144166'
                      },
                      emphasis: {
                        color: '#144166'
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      },
                      emphasis: {
                        show: false
                      }
                    },
                    hoverAnimation: false
                  }
                ]
              },
              num: '424',
              unit: '座',
              name: '设备完好'
            }
          ]
        })
      },
      /**
       *  初始化初始化页面所有横向线状进度条
       */
      executeLineProgress () {
        this.initLineProgress('sectionWarnLegend', 76, 'linear-gradient(to right,#FFAA8E, #F45547)', 5, 10)
        this.initLineProgress('sectionWarnTime', 76, 'linear-gradient(to right,#3A8DEB, #F9AA91)', 5, 10)
      },
      /**
       *  初始化横向线状进度条
       *  id: dom id，percent: 数值，color：颜色值，height： 高度，radius：圆角
       */
      initLineProgress (id, percent, color, height, radius) {
        $('#' + id).LineProgressbar({
          percentage: 78,
          fillBackgroundColor: color,
          height: height + 'px',
          radius: '10px'
        })
      },
      addTrafficFlowLayer (active) {
        const _config = config.layerConfig.getLayerConfigByLayerName('GL_GCZ', 'overlaylayers')
        if (active) {
          this.addOverlayLayer(_config, true)
        } else {
          this.removerLayer(_config['layerName'])
        }
      }
    },
    destroyed () {
      this.removerLayer('GL_GCZ')
    },
    components: {
      panelMini,
      circleProgressTemp
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .main-traffic-wrap {
    p{
      margin-top: 0;
    }
    .cartogram{
      height: 150px;
      margin: 15px 0 15px 0;
      position: relative;

      .cartogramCon{
        float: left;
        height: 100%;
        width: 33%;
        position: relative;
        .cartogramConWrap{
          height: 100px;
          width: 100%;
        }
        .dynamic-box1-num{
          font-size: 16px;
          text-align: center;
          height: 35px;
          line-height: 35px;
          color: #fff!important;
        }
        .dynamic-box1-unit{
          font-family: 'Arial';
          font-size: 14px;
          margin-left: 5px;
          color: $panel-text-color;
        }
        .dynamic-box1-name{
          color: $panel-text-color;
          font-size: 14px;
          text-align: center;
        }
      }
    }
    .progress{
      padding: 0 15px;
      .progressBars{
        margin: 0 0px 28px;
        .progressBarName{
          margin-bottom: 5px;
          display: inline-block;
          font-size: 14px;
          color: $panel-text-color;
          .progressBarName-num{
            padding: 3px;
            font-family: 'Arial';
            font-size: 16px;
            color: #fff;
          }
        }
        #sectionWarnLegend,#sectionWarnTime{
          width: 258px;
          height: 30px;
          float: left;
        }
        .progressNum{
          float: left;
          margin-left: 10px;
          .progressNum-num{
            font-family: 'Arial';
            font-size: 16px;
            color: #fff;
          }
          .progressNum-unit{
            font-family: 'Arial';
            color: $panel-text-color;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
