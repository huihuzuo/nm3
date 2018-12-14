<template>
  <panel-mini class="block-wrap" :show-close="false">
    <div slot="head">
      <div>
        公路阻断：<span>25</span> 起
      </div>
    </div>
    <div class="block-body" slot="body">
      <div class="cartogram">
        <div class="cartogram-legend">
          <span class="cartogram-label cartogram-title">事件</span>
          <span class="cartogram-label cartogram-title">影响里程</span>
        </div>
        <div class="cartogram-statistics">
          <two-sides-statistics-adjacent :list="list2"></two-sides-statistics-adjacent>
        </div>
        <div class="cartogram-legend-unit">
          <span class="cartogram-label">(起)</span>
          <span class="cartogram-label">(km)</span>
        </div>
        <div class="cartogram-legend">
          <span class="cartogram-label-type">
            <span class="cartogram-label-type-title">涉桥</span>
            <span class="cartogram-label-type-num">{{zdData[0].total}}</span>
            <span class="cartogram-label-type-unit">起</span>
          </span>
          <span class="cartogram-label-type">
            <span class="cartogram-label-type-title">涉隧</span>
            <span class="cartogram-label-type-num">{{zdData[1].total}}</span>
            <span class="cartogram-label-type-unit">起</span>
          </span>
          <span class="cartogram-label-type">
            <span class="cartogram-label-type-title">邻省</span>
            <span class="cartogram-label-type-num">{{zdData[2].total}}</span>
            <span class="cartogram-label-type-unit">起</span>
          </span>
        </div>
      </div>
    </div>
  </panel-mini>
</template>
<script>
  import panelMini from '../panels/panelMini'
  import twoSidesStatisticsAdjacent from './twoSidesStatisticsAdjacent'
  import DrawGeometry from '@/map/mixin/DrawGeometry'

  export default {
    data () {
      return {
        list2: {
          column: 1,
          content: [
            {
              label: '一级',
              leftContent: [
                {
                  value: 2,
                  unit: '起',
                  color: '#fa3601'
                }
              ],
              rightContent: [
                {
                  value: 300,
                  unit: 'km',
                  color: '#fa3601'
                }
              ]
            },
            {
              label: '二级',
              leftContent: [
                {
                  value: 2,
                  unit: '起',
                  color: '#ff8a00'
                }
              ],
              rightContent: [
                {
                  value: 4,
                  unit: 'km',
                  color: '#ff8a00'
                }
              ]
            },
            {
              label: '三级',
              leftContent: [
                {
                  value: 7,
                  unit: '起',
                  color: '#ffc200'
                }
              ],
              rightContent: [
                {
                  value: 6,
                  unit: 'km',
                  color: '#ffc200'
                }
              ]
            },
            {
              label: '四级',
              leftContent: [
                {
                  value: 7,
                  unit: '起',
                  color: '#0099f7'
                }
              ],
              rightContent: [
                {
                  value: 6,
                  unit: 'km',
                  color: '#0099f7'
                }
              ]
            }
          ]
        },
        zdData: [
          {
            total: 0
          },
          {
            total: 0
          },
          {
            total: 0
          }
        ]
      }
    },
    mixins: [DrawGeometry],
    components: {
      panelMini,
      twoSidesStatisticsAdjacent
    },
    computed: {},
    watch: {},
    mounted () {
      this.loadBlockEvents({
        type: 1
      })
    },
    methods: {
      loadBlockEvents (params) {
        this.$api.loadBlockEvents(params).then(res => {
          if (res.data.data && res.data.data.length > 0) {
            this.addPoints(res.data.data, {
              layerName: 'blockEvents',
              zoomToExtent: true,
              selectable: true,
              style: {
                color: '#F61717',
                selectColor: '#1b9de8'
              }
            }, true)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    destroyed () {
      this.$Maps.removeOverlayByLayerName('blockEvents')
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";

  .block-wrap {
    .block-body {
      .cartogram {
        width: 100%;
        line-height: 22px;
        .cartogram-legend {
          width: 100%;
          height: 22px;
          margin: 20px 0 20px 0;
          .cartogram-label {
            width: 50%;
            height: 100%;
            display: inline-block;
            float: left;
            text-align: center;
          }
          .cartogram-title {
            font-size: 16px;
            color: $panel-text-color;
            background: url('../../../static/images/sjbq.png') no-repeat 24px 0;
          }
          .cartogram-label-type {
            width: 33.33%;
            display: inline-block;
            float: left;
            text-align: center;
            &:last-child {
              .cartogram-label-type-num {
                color: #ff0402 !important;
              }
            }
            .cartogram-label-type-title {
              color: $panel-text-color;
              font-size: 16px;
            }
            .cartogram-label-type-num {
              color: #fff;
              font-size: 16px;
            }
            .cartogram-label-type-unit {
              color: $panel-text-color;
              font-size: 14px;
            }
          }
        }
        .cartogram-statistics {
          .twoSidesStatisticsLabelAdjacent-wrap-item-label {
            width: 40px !important;
          }
          .twoSidesStatisticsLabelAdjacent-wrap-item-left {
            width: calc((100% - 60px) / 2) !important;
            .twoSidesStatisticsLabelAdjacent-wrap-item-left-label-num {
              float: left;
              color: #fff;
            }
          }
          .twoSidesStatisticsLabelAdjacent-wrap-item-right {
            width: calc((100% - 60px) / 2) !important;
            .twoSidesStatisticsLabelAdjacent-wrap-item-right-label-num {
              float: right;
              color: #fff;
            }
          }
        }
        .cartogram-legend-unit {
          height: 50px;
          line-height: 40px;
          padding: 0 10px 10px;
          border-bottom: 1px $panel-border-color solid;
          .cartogram-label:nth-child(1) {
            height: 100%;
            display: inline-block;
            float: left;
            text-align: left;
          }
          .cartogram-label:nth-child(2) {
            height: 100%;
            display: inline-block;
            float: right;
            text-align: right;
          }
        }
      }
    }
  }
</style>
