<template>
  <div class="Gaode-traffic-list" :style="{height:height + 'px'}" ref="GaodeTrafficList" v-loading="loading">
    <div class="hasData" v-if="list.length > 0">
      <div class="content">
        <div class="head">
          <div class="column-first">排名</div>
          <div class="column-second">路线</div>
          <div class="column-three">桩号</div>
          <div class="column-forth">里程/平均车速</div>
        </div>
        <div class="content-div" v-for="(item,index) in list" v-if="item"
             @click.stop="handleClick(item, index)"
             @mouseenter="handleMouseOver_(item, index)"
             :style="liRoute(index)"
             @mouseleave="handleMouseOut_(item, index)">
          <div class="column-first">
            <span>{{index + 1}}</span>
          </div>
          <div class="column-second">
            <div>
              <span>[{{item.lxbm}}]{{item.lxmc}}</span>
            </div>
            <div>
              <span>{{item.sxxfx | formatSxxfx}}</span>
            </div>
          </div>
          <div class="column-three">
            <div>
              <span>{{item.zh | formatZh}}</span>
            </div>
            <!--<div>
              <span> {{item.jamDist}}m</span>
            </div>-->
          </div>
          <div class="column-forth">
            <div>
              <span :style="getStyleForState(item)" class="numData">{{item.jamSpeed}}</span>
              <span>公里</span>
            </div>
            <div>
              <span class="numData">{{item.longTime}}</span>
              <span>km/h</span>
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
  .Gaode-traffic-list {
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
      padding: 0 5px 0 5px;
      position: relative;
      div:nth-last-child(2) {
        border: none !important;
      }
      .head {
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #f3f3f3;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: rgb(51,51,51);
        display:flex;
        justify-content: space-around;
        text-align: center;
      }
      .content-div {
        height: 65px;
        cursor: pointer;
        border-bottom: 1px #f3f3f3 solid;
        display:flex;
        justify-content: space-around;
        text-align: center;
        font-family: ArialMT;

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
        width:40px;
        //border-radius:2px;
        height: 100%;
        span {
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          font-size:12px;
          background-color: rgb(180,0,0);
          border-radius: 2px;
          display: block;
          font-family: ArialMT;
          color: #ffffff!important;
          margin: 25px 0 0 0;
        }
      }
      .column-second {
        width: 131px;
        span {
          font-size:12px;
          font-family: SimSun;
          color:rgb(51,51,51)
        }
      }
      .column-three {
        width: 98px;
        span {
          font-size:12px;
          font-family: SimSun;
          color:rgb(51,51,51)
        }
      }
      .column-forth {
        width: 100px;
        //text-align: right;
        span {
          font-size:12px;
          font-family: SimSun;
          color:rgb(51,51,51);
          &:nth-child(1){
            color: rgb(180,0,0)
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
</style>
<script>
  import pager from '@/components/common/pager'
  import noData from '@/components/common/noData'
  import PerimeterSearch from '@/mixin/perimeterSearch'
  import addPointPjData from '@/mixin/addPointsPjData'
  import popover from '@/map/mixin/popover'
  import { mapState } from 'vuex'
  import {uuid} from '@/helper'
  import SegmentSearch from '@/mixin/SegmentSearch'
  const layerName = 'GaodeTrafficPoint'
  export default {
    mixins: [
      PerimeterSearch, addPointPjData,
      SegmentSearch, popover],
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
        roadType: state => state.roadWatch.lxType,
        loadMapSuccess: state => state.map.loadMapSuccess,
        refreshTimer: state => state.map.refreshTimer
      })
    },
    mounted () {
      if (this.$store.getters.lxType.value) {
        this.lxlx = this.$store.getters.lxType.value
      }
      if (this.$store.getters.loadMapSuccess) {
        this.GaodeTrafficList()
      }
    },
    watch: {
      loadMapSuccess (value) {
        if (value) {
          this.GaodeTrafficList()
        }
      },
      roadType (val) {
        this.current = 1
        this.lxlx = val.value
        this.GaodeTrafficList()
      },
      refreshTimer (value) {
        if (value && value.state) {
          this.current = 1
          this.GaodeTrafficList()
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
      getStyleForState (item) {
        let value
        if (typeof item.pubRunStatus !== 'number') {
          value = Number(item.pubRunStatus)
        }
        switch (value) {
          case 3:
            return {
              'color': '#fecb00'
            }
          case 2:
            return {
              'color': '#df0100'
            }
          case 1:
            return {
              'color': '#8e0e0b'
            }
        }
      },
      GaodeTrafficList () {
        this.clearMap_()
        const limit = this.getLimit()
        this.loading = true
        this.$fetch.GaodeTrafficList({
          lxlx: this.lxlx,
          currentPageNum: this.current,
          perPageSize: limit
        }).then(res => {
          this.loading = false
          if (res.entitys && res.entitys.length > 0) {
            this.list = res.entitys.map(item => {
              if (!item.id) item.id = uuid()
              return item
            })
            this.total = res.totalCount
            this.markerCurrentPagePoints(this.list)
          }
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
        this.GaodeTrafficList()
        this.$store.dispatch('isShow', false)
      },
      handleClick (item, index) {
        if (item.llng && item.llat) {
          this.destroyCircle(true)
          this.clearAlias()
          this.queryAlias(item.lxbm, item.sxxfx, item.qdzh, item.zdzh)
          this.matchConfig(item, [item.llng, item.llat])
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
        this.markerCurrPagePoints(points, layerName, 'llng', 'llat')
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
