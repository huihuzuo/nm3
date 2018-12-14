<template>
  <panel-mini class="main-road-wrap" :show-switch="true" :show-close="false" v-model="switchValue">
    <div slot="head">
      <div>
        路况总里程：<countTo :startVal="0" :endVal='Math.round(count)' :duration='3000'></countTo> 公里
      </div>
    </div>
    <div slot="body">

      <div id="road_charts" class="road-charts"></div>

      <ul class="main-road-type">
        <li v-for="item in data">{{item.lable}} <countTo :startVal="0" :endVal='Math.round(item.ydlc)' :duration='3000'></countTo> 公里</li>
      </ul>

      <div style="padding: 0 10px">
        <div class="main-road-bar">
          <div v-for="item in data" :style="{background: textColor[item.lable], width: (Math.round(item.ydlc / count * 100)) + '%'}"></div>
        </div>
        <div class="main-road-bar-info" v-if="data.length > 1">
          <div>畅通&nbsp;&nbsp;(<span>{{(Math.round(data[3].ydlc / count * 100)) + '%'}}</span>)</div>
          <div>严重拥堵&nbsp;&nbsp;(<span>{{(Math.round(data[0].ydlc / count * 100)) + '%'}}</span>)</div>
        </div>

        <p>连续拥堵超过2小时（共 <span style="color: #AA2218">8</span> 段）<span style="color: #fff; font-size: 16px;">35</span> 公里</p>
        <p>流量较大的收费站共 <span style="color: #fff; font-size: 16px;">10</span> 个</p>
      </div>
    </div>
  </panel-mini>
</template>
<script>
  import {mapState} from 'vuex'
  import LayerManage from '@/map/mixin/LayerManage'
  import mixin from '@/mixin/mixin'
  import panelMini from '@/components/panels/panelMini'
  export default {
    data () {
      return {
        data: [],
        switchValue: true,
        textColor: {
          '严重拥堵': '#AA2218',
          '拥堵': '#DE443B',
          '缓行': '#F1A142',
          '畅通': '#57BA3B'
        },
        count: 0
      }
    },
    mixins: [LayerManage, mixin],
    mounted () {
      if (this.$store.getters.loadMapSuccess) {
        this.init()
        this.addTrafficLayer(true)
      }
    },
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess
      })
    },
    watch: {
      loadMapSuccess () {
        this.init()
        this.addTrafficLayer(true)
      },
      switchValue (v) {
        if (v) {
          this.addTrafficLayer(true)
        } else {
          this.removerLayer('roadSituation')
        }
      }
    },
    methods: {
      init () {
        this.$api.getRoadMileageStatistics().then(res => {
          this.data = res.data.data.data
          this.count = this.data[0].ydlc + this.data[1].ydlc + this.data[2].ydlc + this.data[3].ydlc
          this.initCharts()
        })
      },
      initCharts () {
        let myChart = this.$echarts.init(document.getElementById('road_charts'))

        let option = {
          series: [{
            type: 'liquidFill',
            data: [Math.round(this.data[3].ydlc / this.count)],
            color: ['#50afff'],
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                color: 'none',
                borderColor: '#0d4370',
                borderWidth: 1,
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.25)'
              }
            },
            center: ['50%', '50%'],
            radius: '99%',
            waveLength: '100%',
            backgroundStyle: {
              color: '#06335b'
            },
            label: {
              normal: {
                show: true,
                color: '#50afff',
                insideColor: '#fff',
                fontSize: 18,
                fontWeight: 'bold',

                align: 'center',
                baseline: 'middle',
                position: 'inside'
              }
            }
          }]
        }

        myChart.setOption(option)
      },
      addTrafficLayer (active) {
        const _config = config.layerConfig.getLayerConfigByLayerName('roadSituation', 'overlaylayers')
        if (active) {
          this.addOverlayLayer(_config, true)
        } else {
          this.removerLayer()
        }
      }
    },
    destroyed () {
      this.removerLayer('roadSituation')
    },
    components: {
      panelMini
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .main-road-wrap {

    .road-charts {
      width: 180px;
      height: 100px;
      float: left;
      margin-top: 25px;
    }

    .main-road-type {
      float: right;
      width: 170px;
      margin-top: 10px;
      margin-bottom: 30px;
      li {
        line-height: 30px;
        span {
          font-size: 16px;
          color: #fff;
        }
        &:first-child {
          font-size: 16px;
          span {
            font-size: 20px;
            color: #AA2218;
          }
        }
      }
    }
    .main-road-bar {
      margin-top: 20px;
      clear: both;
      display: flex;
      width: 100%;
      overflow: hidden;
      border-radius: 3px;
      div {
        height: 6px;
      }
    }
    .main-road-bar-info {
      height: 25px;
      line-height: 25px;
      margin-top: 10px;
      div {
        color: $panel-text-highlight-color;
        &:first-child {
          float: left;
          span {
            color: #57BA3B;
          }
        }
        &:last-child {
          float: right;
          span {
            color: #AA2218;
          }
        }
      }
    }
    p {
      margin-top: 20px;
      &:last-child {
        margin-bottom: 20px;
      }
    }
  }
</style>
