<template>
  <div class="visibility-list" :style="{height:height + 'px'}" ref="weatherList" v-loading="loading">
    <div class="hasData" v-if="list.length > 0">
      <div class="content">
        <div class="head">
          <div class="column-first">排名</div>
          <div class="column-second">路线</div>
          <div class="column-three">桩号</div>
          <div class="column-forth">{{currentItem.val}}</div>
        </div>
        <div class="content-div" v-for="(item,index) in list" v-if="item && item"
             @click.stop="handleClick(item, index)"
             @mouseenter="handleMouseOver_(item, index)"
             :style="liRoute(index)"
             @mouseleave="handleMouseOut_(item, index)">
          <div class="column-first">
            <span>{{index + 1}}</span>
          </div>
          <div class="column-second">
            <div>
              <span>{{item.lxmc}}</span>
            </div>
            <div>
              <span>[{{item.lxbm}}]</span>
              <span>{{item.sxxfx | formatSxxfx}}</span>
            </div>
          </div>
          <div class="column-three">
            <div>
              <span> {{item.qdzh | formatZh}}</span>
            </div>
            <div>
              <span> {{item.zdzh | formatZh}}</span>
            </div>
          </div>
          <div class="column-forth">
            <div>
              <span> {{Math.abs(item.zdzh - item.qdzh) | keepDecimal(3)}}公里</span>
            </div>
            <div>
              <span class="wendu">{{item.sz}}</span>
              <span>{{currentItem.unit}}</span>
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
  .visibility-list {
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
        border-bottom: 1px solid #eee;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: rgb(51,51,51);
      }
      .content-div {
        height: 65px;
        border-bottom: 1px solid #f3f3f3;
        cursor: pointer;
        &:hover {
          background-color: #eff6ff;
          border: solid 1px #daeafd;
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
        width: 25px;
        height: 100%;
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
        width: 92px;
        text-align: center;
      }
      .column-three {
        width: 85px;
        text-align: center;
      }
      .column-forth {
        width: 73px;
        text-align: center;
        .wendu {
          color:rgb(232,14,14);
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
</style>
<script>
  import pager from '@/components/common/pager'
  import noData from '@/components/common/noData'
  import popover from '@/map/mixin/popover'
  import addPointPjData from '@/mixin/addPointsPjData'
  import PerimeterSearch from '@/mixin/perimeterSearch'
  import SegmentSearch from '@/mixin/SegmentSearch'
  import { mapState } from 'vuex'
  const layerName = 'weatherPoints'
  export default {
    props: {
      height: {
        type: Number
      },
      currentItem: {
        type: Object
      }
    },
    mixins: [
      addPointPjData, PerimeterSearch,
      popover, SegmentSearch],
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
        roadType: state => state.roadWatch.lxType,
        loadMapSuccess: state => state.map.loadMapSuccess,
        refreshTimer: state => state.map.refreshTimer
      })
    },
    mounted () {
      if (this.$store.getters.lxType.value) {
        this.lxlx = this.$store.getters.lxType.value
      }
      this.visibilityList()
    },
    watch: {
      currentItem () {
        this.list = []
        this.current = 1
        this.visibilityList()
      },
      roadType (val) {
        this.lxlx = val.value
        this.current = 1
        this.visibilityList()
      },
      refreshTimer (value) {
        if (value && value.state) {
          this.current = 1
          this.visibilityList()
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
      visibilityList () {
        this.clearMap_()
        const limit = this.getLimit()
        this.loading = true
        this.$fetch.visibilityList({
          lxlx: this.lxlx,
          lx: this.currentItem.id,
          szpx: this.currentItem.szpx,
          lcpx: this.currentItem.lcpx,
          currentPageNum: this.current,
          perPageSize: limit
        }).then(res => {
          this.loading = false
          this.list = res.entitys
          this.total = res.totalCount
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
        this.visibilityList()
        this.$store.dispatch('isShow', false)
      },
      handleClick (item, index) {
        if (item.ptx && item.pty) {
          let center = [item.ptx, item.pty]
          this.destroyCircle(true)
          this.clearAlias()
          this.queryAlias(item.lxbm, item.sxxfx, item.qdzh, item.zdzh)
          this.matchConfig(item, center)
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
        this.$Maps.removeFeatureByLayerName(layerName)
        this.markerCurrPagePoints(points, layerName)
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
