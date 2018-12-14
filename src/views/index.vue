<template>
  <div class="index-wrap">
    <div class="map-content">
      <map-content :id="childId" :mapConfig="mapConfig"></map-content>
    </div>

    <div class="index-content" :class="isFullScreen ? 'full-open' : 'full-exit'">
      <transition name="fade">
        <router-view/>
      </transition>

      <road-state @clickEvent="clickEvent" v-if="showRoadstate"></road-state>
      <toolbar @clickEvent="clickEvent"></toolbar>
      <detail-panel v-if="detailShow" @onClose="detailClose" :detail-info="detailInfo"></detail-panel>
    </div>

  </div>
</template>
<script>
  import mapContent from '@/map/components/mapContent'
  import weatherMini from '@/components/panels/weatherMini'
  import trafficMini from '@/components/panels/trafficMini'
  import toolsPanel from '@/components/toolsPanel'
  import monitList from '@/views/roadnet/monitList'
  import plotTemp from '@/map/components/plot/index'
  import util from '@/map/mixin/utils'
  import fullScreen from '@/mixin/fullScreen'
  import perimeterSearchTemp from '@/map/components/perimeter/index'
  import controlLegendTemp from '@/views/roadnet/legend'
  import toolbar from '@/components/toolbar'
  import roadState from '@/components/roadState'
  import detailPanel from '@/components/detailPanel'
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        childId: 'childId',
        mapConfig: config.mapconfig,
        showDetailRight: true,
        weatherShow: false,
        trafficShow: false,
        videoShow: false,
        monitListShow: false,
        plotShow: false,
        perimeterShow: false,
        legendControl: false,
        showVideo: false,
        showRoadstate: false,
        detailShow: false,
        videoTop: 0,
        screenFlag: false
      }
    },
    mixins: [util, fullScreen],
    computed: {
      ...mapState({
        monitParams: state => state.panel.monitParams,
        plotState: state => state.tools.plotState,
        associatedInfo: state => state.map.associatedInfo,
        toolPanel: state => state.map.toolPanel,
        layersPerimeterState: state => state.perimeterInfo.layersPerimeterState,
        showLegend: state => state.control.showLegend,
        detailInfo: state => state.BriefDetails.detailInfo,
        isShow: state => state.BriefDetails.isShow
      })
    },
    watch: {
      plotState (v) {
        this.plotShow = v.value
      },
      monitParams: {
        handler: function (v, ov) {
          this.monitListShow = v.monitListShow
        },
        deep: true
      },
      detailInfo (v) {
        this.detailShow = true
      },
      isShow () {
        this.detailShow = false
      },
      associatedInfo (v) {
        let table = ''
        if (v.value.type) {
          switch (v.value.type) {
            case 'video':
              table = 'GIS_SPD'
              break
            case 'traffic':
              table = 'GIS_JDZ'
              break
          }
          let params = {
            distance: 1000,
            tables: [table],
            wktPoint: 'POINT (' + v.value.item.coordinates[0] + ' ' + v.value.item.coordinates[1] + ')'
          }
          this.$api.perimeterSearch(params).then(res => {
            if (res && res.data.object.count > 0) {
              this._addPerimeterPoints(res.data.object.result, {
                layerName: 'perimeterSearch',
                zoomToExtent: true
              })
            } else {
              this.$message('暂未查到数据！')
            }
          }).catch(error => {
            console.warn(error)
          })
        }
      },
      layersPerimeterState (v) {
        if (v.value.isShow) {
          this[v.value.type + 'Show'] = v.value.isShow
        }
      },
      toolPanel (v) {
        if (v.value.type === 'perimeter') {
          this.perimeterShow = v.value.isShow
        }
      },
      showLegend (v) {
        this.legendControl = v.value.isShow
      }
    },
    methods: {
      detailClose () {
        this.detailShow = false
      },
      clickEvent (alias) {
        switch (alias) {
          case 'list':
            this.showVideoList = true
            break
          case 'close':
            this.showVideoWrap = true
            break
          case 'Listclose':
            this.showVideoList = false
            break
          case 'roadStateclose':
            this.showRoadstate = false
            break
          case 'basicQuery':
            window.open(config.jxzsPage)
            break
          case 'roadState':
            this.showRoadstate = true
            break
          case 'jdz':
            this.showVideo = true
            break
          case 'zoomOut':
            this.handleZoom(-1)
            break
          case 'zoomIn':
            this.handleZoom(1)
            break
          case 'fullScreen':
            this.screenFlag = !this.screenFlag
            this.fullScreen()
            break
        }
      },
      handleZoom (type) {
        if (!this.$Maps) return
        type === 1 ? this.$Maps.zoomIn() : this.$Maps.zoomOut()
      }
    },
    destroyed () {
      console.log(this.SinoVMS)
    },
    components: {
      mapContent,
      weatherMini,
      trafficMini,
      toolsPanel,
      monitList,
      plotTemp,
      perimeterSearchTemp,
      controlLegendTemp,
      toolbar,
      roadState,
      detailPanel
    }
  }
</script>
<style lang="scss">
  .index-wrap {
    height: 100%;
    background-size: cover;
    overflow: hidden;
    .map-content {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
    }
    .index-content {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: none;
      pointer-events: none;
    }
    .index-video-wrap-parent {
      width: 508px;
      z-index: 2;
      float: right;
      position: absolute;
      right: 10px;
      top: 10px;
      pointer-events: auto;
      .icon-jiaotiaozhan:before {
        margin: 0 10px;
        font-size: 18px;
      }
      .content {
        width: 100%;
        height: calc(100% - 34px);
        overflow: hidden;
        .video {
          width: calc((100% - 5px) / 2);
          height: calc((100% - 5px) / 2);
          float: left;
          background-color: #1b9de8;
          margin-bottom: 5px;
        }
        .video:nth-of-type(even) {
          margin-left: 5px;
        }
      }
    }
    .index-video-list-wrap {
      width: 360px;
      height: calc(100% - 461px);
      z-index: 3;
      position: absolute;
      float: right;
      top: 461px;
      right: 20px;
      background: rgba(2, 49, 66, 0.9);
      -webkit-box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
      box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
      .icon-jiaotiaozhan:before {
        margin: 0 10px;
        font-size: 18px;
      }
      .index-video-list-wrap-title {
        width: 100%;
        height: 34px;
        font-size: 14px;
        line-height: 34px;
        border-bottom: 2px #50AFFF solid;
        span {
          display: inline-block;
          cursor: pointer;
        }
        span:nth-child(2) {
          float: right;
          width: 14px;
          height: 12px;
          margin-right: 10px;
          font-size: 13px;
        }
      }
      .choosed-video {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 5px;
        color: #7adaff;
        div {
          display: inline-block;
          width: 163px;
          height: 26px;
          text-align: center;
          line-height: 26px;
          border-radius: 2px;
          border: solid 1px rgba(122, 218, 255, 1);
          cursor: pointer;
          position: relative;
          &:hover {
            color: #023243;
            background-color: #7ADAFF;
            span {
              display: block;
            }
          }
          span {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-color: rgba(239, 75, 24, 1);
            position: absolute;
            right: -8px;
            top: -8px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            color: #FFF;
            line-height: 15px;
            text-align: center;
            display: none;
          }
          font {
            overflow: hidden;
            width: 100%;
            height: 21px;
            display: block;
          }
        }
        div:nth-child(odd) {
          margin: 7px 5px 5px 10px;
        }
        div:nth-child(even) {
          margin: 7px 10px 5px 5px;
        }
      }
      .video-list-tree {
        height: calc(100% - 34px - 76px);
        width: 100%;
        overflow: hidden;
        .ztree {
          width: 105%;
          height: 105%;
          overflow: scroll;
        }
      }
      .ztree li a.curSelectedNode {
        background: none !important;
        border: 0px #FFB951 solid !important;
      }
      .ztree li {
        line-height: 30px;
        a {
          padding: 6px 3px 0 0 !important;
        }
        span {
          color: #b8deff !important;
          margin-top: 6px;
        }
      }
    }
    .left-legend-control {
      left: 410px;
      width: 240px;
      position: absolute;
      bottom: 10px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
    .right-wrap-tools {
      position: absolute;
      right: 10px;
      top: 78px;
      pointer-events: none;
    }
    .right-wrap {
      position: absolute;
      right: 0;
      top: 0;
      max-height: 100%;
      width: 415px;
      padding: 10px;
      overflow: hidden;
      .right-scroll {
        padding: 5px;
        width: 430px;
        max-height: calc(100vh - 20px);
        overflow-y: auto;
        overflow-x: hidden;
      }
      .panel-mini-wrap {
        margin-top: 10px;
        &:first-child {
          margin-top: 0;
        }
      }
    }

    .index-user {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 40px;
      width: 40px;
      img {
        height: 40px;
        width: 40px;
        border: none;
        border-radius: 40px;
        box-shadow: 0 5px 10px 1px rgba(0, 0, 0, .2);
        &:hover {
          cursor: pointer;
        }
      }
    }

  }
</style>
