<template>
  <panel-mini class="main-road-wrap" :show-switch="true" :show-close="false" v-model="switchValue">
    <div slot="head">
      <div>
        气象监测总里程：<span><countTo :startVal="0" :endVal='Math.round(allMitl)' :duration='3000'></countTo></span> 公里
      </div>
    </div>
    <div slot="body" style="overflow: hidden">
      <span class="qxfgCon-pie">
          <pie-temp :obj="pie6" :id="pie6.id"></pie-temp>
        </span>
      <span class="qxfgCon-legend">
          <span class="qxfgCon-legend-item" v-for="item in qxjcLegend">
            <span class="qxfgCon-legend-item-box" :style="{ backgroundColor: item.color }"></span>
            <span class="qxfgCon-legend-item-label">{{item.name}}</span>
            <span class="qxfgCon-legend-item-num"><countTo :startVal="0" :endVal='Math.round(item.value)' :duration='3000'></countTo></span>
            <span class="qxfgCon-legend-item-unit">{{item.unit}}</span>
          </span>
        </span>
    </div>
  </panel-mini>
</template>
<script>
  import panelMini from '@/components/panels/panelMini'
  import pieTemp from '../../components/common/pie'
  import LayerManage from '@/map/mixin/LayerManage'
  export default {
    data () {
      return {
        pie6: {
          id: 'qxfg'
        },
        qxjcLegend: [],
        allMitl: 0,
        switchValue: false
      }
    },
    mixins: [LayerManage],
    watch: {
      switchValue (v) {
        this.addWeatherLayer(v)
      }
    },
    mounted () {
      this.loadWeather()
    },
    methods: {
      loadWeather () {
        let self = this
        this.$api.loadWeather().then(data => {
          if (data.status === 200) {
            let res = data.data.data
            let count = 0
            let normal = 0
            let colors = []
            let color = {
              '正常': '#00ff00',
              '轻度': '#ffff00',
              '中度': '#ffc000',
              '严重': '#ff0000'
            }
            if (res.length > 0) {
              for (var i = 0; i < res.length; i++) {
                count += res[i].yxlc
                res[i].yxlc = res[i].yxlc.toFixed(2)
                res[i]['name'] = res[i].lable
                res[i]['value'] = res[i].yxlc
                if (res[i].lable === '严重') {
                  res[i]['color'] = '#ff0000'
                  if (res[i]['value'] !== 0) {
                    colors.push('#ff0000')
                  }
                }
                if (res[i].lable === '中度') {
                  res[i]['color'] = '#ffc000'
                  if (res[i]['value'] !== 0) {
                    colors.push('#ffc000')
                  }
                }
                if (res[i].lable === '轻度') {
                  res[i]['color'] = '#ffff00'
                  if (res[i]['value'] !== 0) {
                    colors.push('#ffff00')
                  }
                }
                if (res[i].lable === '正常') {
                  res[i]['color'] = '#00ff00'
                  if (res[i]['value'] !== 0) {
                    colors.push('#00ff00')
                  }
                  normal = res[i].value
                }
              }
              self.allMitl = count.toFixed(2)
            }
            let text = (normal / count).toFixed(2)
            let subText = ''
            if (text > 0.8) {
              subText = '正常'
            }
            if (text < 0.8 && text > 0.7) {
              subText = '轻度'
            }
            if (text < 0.7 && text > 0.6) {
              subText = '中度'
            }
            if (text < 0.6) {
              subText = '严重'
            }
            self.qxjcLegend = res
            self.pie6 = {
              id: 'qxfg',
              title: {
                x: 'center',
                y: 80,
                text: text * 100 + '%',
                subtext: subText,
                textStyle: {
                  fontWeight: 'normal',
                  color: color[subText],
                  fontSize: 14
                },
                subtextStyle: {
                  color: color[subText]
                }
              },
              tooltip: {
                show: false,
                trigger: 'item',
                // formatter: '{b} : {c} ({d}%)',
                formatter: {},
                position: ['20%', '50%'],
                textStyle: {
                  color: '#fff'
                }
              },
              grid: {
                left: '0%',
                right: '0%',
                bottom: '20px',
                top: '10px',
                containLabel: true
              },
              color: ['#ff0000', '#ffc000', '#ffff00', '#00ff00'],
              legend: {},
              series: [
                {
                  center: ['50%', '50%'],
                  radius: ['43', '50'],
                  type: 'pie',
                  data: res,
                  labelLine: {
                    normal: {
                      show: false,
                      formatter: '{d}'
                    }
                  },
                  label: {
                    normal: {
                      show: false,
                      formatter: '{d}'
                    }
                  },
                  hoverOffset: 5
                }
              ]
            }
          }
        })
      },
      addWeatherLayer (active) {
        const _config0 = config.layerConfig.getLayerConfigByLayerName('trafficWeather-visibility', 'overlaylayers')
        const _config1 = config.layerConfig.getLayerConfigByLayerName('trafficWeather', 'overlaylayers')
        if (active) {
          this.addOverlayLayer(_config0, true)
          this.addOverlayLayer(_config1, true)
        } else {
          this.removerLayer(_config0['layerName'])
          this.removerLayer(_config1['layerName'])
        }
      }
    },
    destroyed () {
      this.removerLayer('trafficWeather-visibility')
      this.removerLayer('trafficWeather')
    },
    components: {
      panelMini,
      pieTemp
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .main-road-wrap {
    .progressbar{
      background: #144166;
    }
    .qxfgCon-pie{
      width: 160px;
      height: 190px;
      float: left;
    }
    .qxfgCon-legend{
      width: calc(100% - 170px);
      float: left;
      height: 190px;
      padding-left: 10px;
      span{
        display: inline-block;
      }
      .qxfgCon-legend-item{
        width: 100%;
        height: 16px;
        margin-top: 23px;
        display: inline-flex;
        align-items: center;
        span{
          display: inline-block;
          /*float: left;*/
        }
        .qxfgCon-legend-item-box{
          width: 14px;
          height: 10px;
          border-radius: 2px;
          /*margin-top: 3px;*/
        }
        .qxfgCon-legend-item-label {
          font-family: '宋体';
          color: $panel-text-color;
          margin-left: 8px;
          font-size: 14px;
        }
        .qxfgCon-legend-item-num{
          font-family:'Arial';
          color: #fff;
          font-size: 16px;
          overflow: hidden;
          margin: 0 7px;
          span{
            float: right;
          }
        }
        .qxfgCon-legend-item-unit{
          color: $panel-text-color;
          font-size: 14px;
          font-family: '宋体';
        }
      }
    }
  }
</style>
