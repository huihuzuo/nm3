<template>
  <div
    ref="gaodeEventLists"
    class="Gaode-event-list"
    :style="{height:height + 'px'}"
    v-loading="loading">
    <div class="hasData" v-if="list.length > 0">
      <div class="content">
        <div
          class="content-div" v-for="(item,index) in list"
          @click.stop="handleClick(item, index)"
          @mouseenter="handleMouseOver_(item, index)"
          :style="liRoute(index)"
          @mouseleave="handleMouseOut_(item, index)">
          <div class="content-left">
            <span>{{index + 1}}</span>
          </div>
          <div class="content-right">
            <div class="first">
              <span>{{item.brief}}</span>
              <div class="first-right">
                <span>9km</span>&nbsp;
                <span>12:00</span>
              </div>
            </div>
            <div class="second">
              <span>{{item.lxmc}} ({{item.lxbm}}) </span>
              <span>{{item.sxxfx | formatSxxfx}}</span>
              <span>{{item.zh | formatZh}}</span>
            </div>
            <div class="three">
              <!--<span>结束时间：{{item.endTime | dateFormat}}</span>-->
              <div class="three-zaihaistyle">
                <div class="shiguzaihai">{{item.blockReason}}</div>
                <div class="qixiangzaihai">{{item.blockReason}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <pager :total="total" :limit="limit" :current="current" @handleCurrentChange="handleCurrentChange"></pager>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <no-data></no-data>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .Gaode-event-list {
    width: 100%;
    height: 100%;
    margin: -22px 0 -12px 0;
    overflow: hidden;
    .hasData, .noData {
      width: 100%;
      height: 100%;
    }
    .content {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      position: relative;
      div:nth-last-child(2) {
        border: none !important;
      }
      .content-div {
        width: 100%;
        height: 90px;
        //border-bottom: 1px solid #eee;
        //padding-top: 15px;
        border-top: 1px solid #f1f1f1;
        cursor: pointer;
        display:flex;
        justify-content: space-between;
        position:relative;
        &:hover {
          background-color: rgb(218,234,253);
        }
        .content-left {
          width: 32px;
          //float: left;
          span {
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            background-color: #eb4f38;
            color: #fff;
            border-radius: 1px;
            display: block;
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            margin: 9px 0 0;
          }
        }
        .content-right {
          width: calc(100% - 32px);
          //float: left;
          font-family: PingFang-SC-Medium;
          .first {
            width: 100%;
            font-size: 12px;
            line-height: 24px;
            color: rgb(51, 51, 51);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            justify-content: space-around;
            span:nth-child(2), span:nth-child(3) {
              float: right;
              margin-right: 8px;
            }
            span:nth-child(1) {
              width: 160px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .second {
            font-size: 12px;
            line-height: 24px;
            color: rgb(93,93,93);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .three {
            margin-top: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .three-zaihaistyle {
              width: 140px;
              justify-content: space-around;
              //align-items: center;
              display: flex;
              color: #fff;
              font-size: 12px;
              height:18px;
              .shiguzaihai {
                background-color: rgba(251, 172, 80,0.7);
                border-radius: 2px;
                width: 64px;
                height:18px;
                text-align: center;
              }
              .qixiangzaihai {
                background-color: rgba(64, 158, 255,0.7);
                border-radius: 2px;
                width: 64px;
                height:18px;
                text-align: center;
              }
              span {
                text-align: center;
                height: 18px;
                line-height: 18px;
                border-radius: 2px;
                font-size: 13px;
                color: #b8deff;
                margin-right: 10px;
              }
            }
          }
        }
      }
      .pagination {
        width:100%;
        height: 30px;
        line-height: 30px;
        position: absolute;
        bottom: 0;
        left:-10px;
        //width: calc(100% - 30px);
      }
    }
  }
</style>
<script>
  import pager from '@/components/common/pager'
  import noData from '@/components/common/noData'
  import PerimeterSearch from '@/mixin/perimeterSearch'
  import popover from '@/map/mixin/popover'
  import SegmentSearch from '@/mixin/SegmentSearch'
  import { mapState } from 'vuex'
  const layerName = 'GaodeEventPoint'
  export default {
    mixins: [
      PerimeterSearch, popover, SegmentSearch
    ],
    props: {
      height: {
        type: Number
      }
    },
    data () {
      return {
        lxlx: '1,2',
        list: [],
        total: 0,
        limit: 10,
        current: 1,
        loading: true
      }
    },
    computed: {
      ...mapState({
        roadType: state => state.roadWatch.lxType,
        loadMapSuccess: state => state.map.loadMapSuccess,
        refreshTimer: state => state.map.refreshTimer
      })
    },
    mounted () {
      if (this.$store.getters.lxType.value) {
        this.lxlx = this.$store.getters.lxType.value
      }
      this.GaodeEventList()
    },
    watch: {
      roadType (val) {
        this.lxlx = val.value
        this.current = 1
        this.GaodeEventList()
      },
      refreshTimer (value) {
        if (value && value.state) {
          this.current = 1
          this.GaodeEventList()
        }
      }
    },
    methods: {
      liRoute (index) {
        let num1 = (index * 0.1).toFixed(2)
        let num2 = ((this.list.length - 1) * 0.1 + index * 0.1).toFixed(2)
        return {
          'animation-name': 'swing,flipOutY',
          'animation-duration': '.7s,.9s',
          'animation-timing-function': 'linear,ease',
          'animation-delay': num1 + 's,' + num2 + 's',
          'animation-iteration-count': 'infinite,forwards'
        }
      },
      GaodeEventList: function () {
        const limit = this.getLimit()
        this.clearMap_()
        this.loading = true
        this.$fetch.getGaodeEventList({
          lxlx: this.lxlx,
          currentPageNum: this.current,
          perPageSize: limit
        }).then(res => {
          this.loading = false
          this.list = res.data.page.entitys
          this.total = res.data.page.totalCount
          this.markerCurrentPagePoints(this.list)
        }).catch(error => {
          console.warn(error)
        })
      },
      handleCurrentChange: function (val) {
        this.list = []
        this.current = val
        this.GaodeEventList()
        this.$store.dispatch('isShow', false)
      },
      getLimit () {
        this.limit = Math.floor((this.height - 30) / 110)
        return this.limit || 1
      },
      handleClick (item, index) {
        if (item['llng'] && item['llat']) {
          const _center = [item['llng'], item['llat']]
          this.destroyCircle(true)
          this.clearAlias()
          this.queryAlias(item.lxbm, item.sxxfx, item.qdzh, item.zdzh)
          this.matchConfig(item, _center)
          this.$store.dispatch('isShow', false)
        }
      },
      handleMouseOver_ (item, index) {
        if (!this.$Maps) return
        this.$Maps.highLightFeature(item['id'])
      },
      handleMouseOut_ (item, index) {
        if (!this.$Maps) return
        this.$Maps.unHighLightFeature(item['id'])
      },
      markerCurrentPagePoints (points) {
        if (!this.$Maps) return
        this.clearMap_()
        points = points.map((el, index) => {
          if (el['llng'] && el['llat']) {
            let _object = {}
            _object['attributes'] = el
            _object['geometry'] = [el['llng'], el['llat']]
            _object['attributes']['layerName'] = layerName
            _object['attributes']['style'] = {
              zIndex: index,
              image: {
                type: 'icon',
                image: {
                  imageSrc: './static/images/marker.png',
                  imageAnchor: [0.5, 1]
                }
              },
              text: {
                textFont: 'normal lighter 14px Arial',
                textOverflow: false,
                text: (index + 1).toString(),
                textOffsetX: 3,
                textOffsetY: -18,
                textFill: {
                  fillColor: '#FFF'
                }
              }
            }
            _object['attributes']['selectStyle'] = {
              zIndex: index,
              image: {
                type: 'icon',
                image: {
                  imageSrc: './static/images/marker_hover.png',
                  imageAnchor: [0.5, 1]
                }
              },
              text: {
                textFont: 'normal lighter 14px Arial',
                textOverflow: false,
                text: (index + 1).toString(),
                textOffsetX: 3,
                textOffsetY: -18,
                textFill: {
                  fillColor: '#FFF'
                }
              }
            }
            return _object
          }
        })
        if (points.length > 0) {
          this.$Maps.addPoints(points, {
            layerName: layerName,
            zoomToExtent: true,
            selectable: true
          })
        }
      },
      clearMap_ () {
        if (!this.$Maps) return
        this.$Maps.removeFeatureByLayerNames([layerName, 'perimeter-points'])
        this.destroyCircle(true)
        this.clearAlias()
      }
    },
    beforeDestroy () {
      this.clearMap_()
    },
    components: {
      pager,
      noData
    }
  }
</script>
