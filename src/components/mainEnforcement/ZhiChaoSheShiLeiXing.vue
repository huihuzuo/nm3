<template>
  <div class="main-panel-wrap ZhiChaoSheShiLeiXing-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goToDetail"></span>
    </div>
    <div class="main-panel-body">

      <div class="ZhiChaoSheShiLeiXing-charts">
        <div id="zaiXian_chart"></div>
        <div id="chuChe_chart"></div>
        <div id="liCheng_chart"></div>
      </div>

      <div class="ZhiChaoSheShiLeiXing-total">
        <div>
          <span>311</span><small>座</small>
          <div>收费站</div>
        </div>
        <div>
          <span>351</span><small>座</small>
          <div>治超站</div>
        </div>
        <div>
          <span>22</span><small>座</small>
          <div>高速劝返站</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '治超设施类型'
      }
    },
    mounted () {
      this.initChart('在线率', 'zaiXian_chart', 72, '#cd115b', '#f1ab24')
      this.initChart('出车率', 'chuChe_chart', 43, '#fc5401', '#eec22d')
      this.initChart('里程利用率', 'liCheng_chart', 63, '#00d484', '#eec22d')
    },
    methods: {
      initChart (_name, _id, _value, _color1, _color2) {
        let myChart = this.$echarts.init(document.getElementById(_id))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} {d}%'
          },
          title: {
            text: _value + '%',
            textStyle: {
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'normal',
              fontFamily: '微软雅黑'
            },
            x: 'center',
            y: 'center'
          },
          series: [{
            name: _name,
            type: 'pie',
            radius: ['60%', '50%'],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: _value,
              hoverAnimation: false,

              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: _color1
                  }, {
                    offset: 1,
                    color: _color2
                  }])
                },
                emphasis: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: _color1
                  }, {
                    offset: 1,
                    color: _color2
                  }])
                }
              }
            }, {
              value: 100 - _value,
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#001b3c'
                },
                emphasis: {
                  color: '#001b3c'
                }
              },
              hoverAnimation: false
            }]
          }]
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

  .ZhiChaoSheShiLeiXing-wrap {
    .ZhiChaoSheShiLeiXing-total {
      display: flex;
      > div {
        text-align: center;
        width: 110px;
        span {
          font-size: 20px;
          color: #fff;
          line-height: 30px;
        }
        small {
          line-height: 30px;
          font-size: 14px;
        }
        div {
          margin-top: 20px;
        }
      }
    }
    .ZhiChaoSheShiLeiXing-charts {
      margin-top: 20px;
      display: flex;
      div {
        width: 110px;
        height: 110px;
      }
    }
  }
</style>
