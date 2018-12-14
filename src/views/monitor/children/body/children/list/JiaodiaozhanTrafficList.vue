<template>
  <div class="Jiaodiaozhan-traffic-list" :style="{height:height + 'px'}" ref="stationEventLists" v-loading="loading">
    <div class="hasData" v-if="list.length > 0">
      <div class="content">
        <div class="head">
          <div class="column-first">排名</div>
          <div class="column-second">路线</div>
          <div class="column-three">桩号</div>
          <div class="column-forth">车速/拥堵情况</div>
        </div>
        <div class="content-div" v-for="(item,index) in list"
             @click.stop="handleClick(item, index)"
             @mouseenter="handleMouseOver_(item, index)"
             :style="liRoute(index)"
             @mouseleave="handleMouseOut_(item, index)">
          <div class="column-first">
            <span>{{index + 1}}</span>
          </div>
          <div class="column-second">
            <div>
              <span>{{item.gczmc}}</span>
            </div>
            <div>
              <span>{{item.zh | formatZh}}</span>
            </div>
          </div>
          <div class="column-three">
            <div>
              <span> {{item.jdc_dl}}辆</span>
            </div>
            <div>
              <span> {{item.yjd}}</span>
            </div>
          </div>
          <div class="column-forth">
            <div>
              <span> {{item.jdc_cs}}km/h</span>
            </div>
            <div>
              <span :style="classObject(item)">{{item.ydzt | formatStationStatus}}</span>
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
  .Jiaodiaozhan-traffic-list {
    width: 100%;
    height: 100%;
    margin: -12px 0 -12px 0;
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
      .head {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid rgba(18, 74, 104, 0.6);
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #7adaff;
      }
      .content-div {
        height: 65px;
        border-bottom: 1px solid rgba(18, 74, 104, 0.6);
        &:hover {
          cursor: pointer;
          background-color: rgba(18, 74, 104, 0.3);
        }
      }
      .column-first, .column-second, .column-three, .column-forth {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        div:nth-child(1) {
          margin-top: 9px;
        }
        div {
          font-family: PingFang-SC-Medium;
          font-size: 13px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .column-first {
        width: 30px;
        span {
          width: 18px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          background-color: #eb4f38;
          border-radius: 1px;
          display: block;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #ffffff;
          margin: 25px 0 0 0;
        }
      }
      .column-second {
        width: 128px;
      }
      .column-three {
        width: 90px;
      }
      .column-forth {
        width: 100px;
        text-align: right;
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
</style>
<script>
  import { mapState } from 'vuex'
  import pager from '@/components/common/pager'
  import noData from '@/components/common/noData'
  import PerimeterSearch from '@/mixin/perimeterSearch'
  import popover from '@/map/mixin/popover'
  import SegmentSearch from '@/mixin/SegmentSearch'
  const layerName = 'JiaodiaozhanTrafficPoint'
  export default {
    mixins: [
      PerimeterSearch, popover,
      SegmentSearch],
    props: {
      height: {
        type: Number
      }
    },
    data () {
      return {
        list: [],
        total: 0,
        limit: 10,
        current: 1,
        lxlx: '1,2',
        loading: true
      }
    },
    computed: {
      ...mapState({
        lxType: state => state.roadWatch.lxType,
        loadMapSuccess: state => state.map.loadMapSuccess,
        refreshTimer: state => state.map.refreshTimer
      })
    },
    mounted () {
      if (this.$store.getters.lxType.value) {
        this.lxlx = this.$store.getters.lxType.value
      }
      this.getTrafficStationList()
    },
    watch: {
      roadType (val) {
        this.current = 1
        this.lxlx = val.value
        this.getTrafficStationList()
      },
      refreshTimer (value) {
        if (value && value.state) {
          this.current = 1
          this.getTrafficStationList()
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
      classObject (item) {
        switch (item.ydzt) {
          case 1:
          case '1':
            return {
              'color': '#18bf00'
            }
          case 2:
          case '2':
            return {
              'color': '#18bf00'
            }
          case 3:
          case '3':
            return {
              'color': '#ff9e19'
            }
          case 4:
          case '4':
            return {
              'color': '#f23030'
            }
          case 5:
          case '5':
            return {
              'color': '#ba0001'
            }
        }
      },
      getTrafficStationList: function () {
        this.clearMap_()
        const limit = this.getLimit()
        this.loading = true
        this.$fetch.JiaodiaozhanTrafficList({
          currentPageNum: this.current,
          perPageSize: limit,
          lxlx: this.lxlx
        }).then(res => {
          this.loading = false
          this.list = res.result.entitys || []
          this.total = res.result.totalCount || 0
          this.markerCurrentPagePoints(this.list)
        }).catch(error => {
          console.warn(error)
        })
      },
      getLimit () {
        this.limit = Math.floor((this.height - 70) / 65)
        return this.limit || 1
      },
      handleCurrentChange: function (val) {
        this.list = []
        this.current = val
        this.getTrafficStationList()
      },
      handleClick (item, index) {
        if (item['latitude'] && item['longitude']) {
          const _center = [item['longitude'], item['latitude']]
          this.destroyCircle(true)
          this.clearAlias()
          this.queryAlias(item.lxbm, item.sxxfx, item.qdzh, item.zdzh)
          this.matchConfig(item, _center)
        }
      },
      handleMouseOver_ (item, index) {
        if (!this.$Maps) return
        this.$Maps.highLightFeature(item['gczbs'])
      },
      handleMouseOut_ (item, index) {
        if (!this.$Maps) return
        this.$Maps.unHighLightFeature(item['gczbs'])
      },
      markerCurrentPagePoints (points) {
        if (!this.$Maps) return
        points = points.map((el, index) => {
          el['id'] = el['gczbs']
          if (el['latitude'] && el['longitude']) {
            let _object = {}
            _object['attributes'] = el
            _object['geometry'] = [el['longitude'], el['latitude']]
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
          console.log(points)
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
