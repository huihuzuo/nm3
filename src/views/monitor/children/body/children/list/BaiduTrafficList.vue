<template>
  <div class="Baidu-traffic-list"
       :style="{height:height + 'px'}"
       ref="BaiduTrafficList"
       v-loading="loading">
    <div class="hasData" v-if="list.length > 0">
      <div class="content">
        <div class="head">
          <div class="column-first">排名</div>
          <div class="column-second">路线</div>
          <div class="column-three">桩号</div>
          <div class="column-forth">里程</div>
        </div>
        <div class="content-div" v-for="(item,index) in list" v-if="item"
             @click.stop="handleClick(item, index)"
             @mouseenter="handleMouseOver_(item, index)"
             @mouseleave="handleMouseOut_(item, index)"
             :style="liRoute(index)"
        >
          <div class="column-first">
            <span >{{index + 1}}</span>
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
            <div class="distanceNum">
              <span> {{Math.abs(item.zdzh - item.qdzh) | keepDecimal(3)}}</span>
              <span>公里</span>
            </div>
            <div>
              <span :style="classObject(item)">{{item.status | formatRoadStatus}}</span>
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
  .Baidu-traffic-list {
    width: 100%;
    height: 100%;
    margin: -12px 0 -12px 0;
    overflow: hidden;
    .statistic{
      width: 100%;
      height: 80px;
    }
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
        height: 32px;
        line-height: 32px;
        //border-bottom: 1px solid rgba(18, 74, 104, 0.6);
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgb(51,51,51);
        display:flex;
        border-top: 1px #f3f3f3 solid;
        border-bottom: 1px #f3f3f3 solid;
        border-radius: 2px;
        justify-content: space-between;
        text-align: center;
      }
      .content-div {
        width:280px;
        height: 51px;
        display:flex;
        justify-content: space-between;
        text-align: center;
        //border-bottom: 1px solid rgba(18, 74, 104, 0.6);
        cursor: pointer;
        &:hover {
          background-color: rgb(239,246,255);
          border: 1px solid  rgb(239,246,255)
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
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .column-first {
        //width: 30px;
        width:25px;
        border-radius:2px;
        //height: 100%;
        span {
          width: 17px;
          height: 17px;
          line-height: 17px;
          text-align: center;
          background-color: #b40000;
          border-radius: 1px;
          display: block;
          font-family: ArialMT;
          font-size: 12px;
          color: #ffffff!important;
          margin: 25px 0 0 0;
        }
      }
      .column-second {
        //width: 133px;
        width:83px;
        //height:30px;
        span {
          font-size:12px;
          font-family: SimSun;
          color:rgb(51,51,51)
        }
      }
      .column-three {
        //width: 85px;
        width:68px;
        //height:26px;
        span {
          font-size:12px;
          font-family: SimSun;
          color:rgb(51,51,51)
        }
      }
      .column-forth {
        //width: 100px;
        width:65px;
        //height:30px;
        //text-align: right;
        span:nth-child(1){
          color:rgb(180,0,0);
          font-size:12px;
        }
        span:nth-child(2) {
          font-size:12px;
          font-family: SimSun;
          color:rgb(51,51,51)
        }
      }
    }
    .pagination {
      width:100%;
      height: 30px;
      line-height: 30px;
      position: absolute;
      bottom: 1px;
      left:-10px;
      //width: calc(100% - 30px);
    }
  }
</style>
<script>
  import pager from '@/components/common/pager'
  import noData from '@/components/common/noData'
  import miniPanel from '@/components/panels/miniPanel'
  import addPointPjData from '@/mixin/addPointsPjData'
  import popover from '@/map/mixin/popover'
  import { mapState } from 'vuex'
  import PerimeterSearch from '@/mixin/perimeterSearch'
  import SegmentSearch from '@/mixin/SegmentSearch'
  const layerName = 'BaiduTrafficPoint'
  export default {
    props: {
      height: {
        type: Number
      }
    },
    mixins: [
      addPointPjData, popover,
      PerimeterSearch, SegmentSearch
    ],
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
      this.BaiduTrafficList()
    },
    watch: {
      roadType (val) {
        this.current = 1
        this.lxlx = val.value
        this.BaiduTrafficList()
      },
      refreshTimer (value) {
        if (value && value.state) {
          this.current = 1
          this.BaiduTrafficList()
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
        switch (item.status) {
          case 1:
            return {
              'color': '#4fd27d'
            }
          case 2:
            return {
              'color': '#ffd045',
            }
          case 3:
            return {
              'color': '#e80e0e'
            }
          case 4:
            return {
              'color': '#b40000'
            }
        }
      },
      BaiduTrafficList () {
        const limit = this.getLimit()
        this.clearMap_()
        this.loading = true
        this.$fetch.BaiduTrafficList({
          lxlx: this.lxlx,
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
      handleCurrentChange (val) {
        this.list = []
        this.current = val
        this.BaiduTrafficList()
        this.$store.dispatch('isShow', false)
      },
      handleClick (item, index) {
        if (item.ptx && item.pty) {
          const _center = [item['ptx'], item['pty']]
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
        this.clearMap_()
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
      noData,
      miniPanel
    }
  }
</script>
