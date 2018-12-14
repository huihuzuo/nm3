<template>
  <div class="main-panel-wrap ZhiChaoTongJi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：2017年）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goToDetail"></span>
    </div>
    <div class="main-panel-body">
      <div class="ZhiChaoTongJi-charts">
        <div id="chaoXianLv_chart"></div>
        <div id="jianCeLv_chart"></div>
        <div id="chuFaLv_chart"></div>
      </div>
      <div class="ZhiChaoTongJi-title">
        <div>超限率</div>
        <div>监测率</div>
        <div>处罚率</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '治超统计'
      }
    },
    mounted () {
      this.initChart('超限率', 'chaoXianLv_chart', 20, '#cd115b', '#f1ab24')
      this.initChart('检测率', 'jianCeLv_chart', 89, '#fc5401', '#eec22d')
      this.initChart('处罚率', 'chuFaLv_chart', 90, '#00d484', '#eec22d')
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

  .ZhiChaoTongJi-wrap {
    .ZhiChaoTongJi-charts {
      margin-top: 5px;
      div {
        width: 120px;
        height: 120px;
        float: left;
      }
    }
    .ZhiChaoTongJi-title {
      clear: both;
      margin-bottom: 20px;
      div {
        width: 120px;
        text-align: center;
        float: left;
      }
    }
  }
</style>
