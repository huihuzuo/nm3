<template>
  <div class="sf-perimeter">
    <header class="sf-perimeter-header">
      <span class="title">周边资源</span>
      <span @click="closeClick" class="titafont tita-icon16 icon-icon16"></span>
    </header>
    <div class="sf-perimeter-layers">
      <sf-layer :count="count"></sf-layer>
      <div class="perimeter-search-box">
        <input type="text" v-model="keyword" placeholder="输入筛选条件">
        <span @click="initCustomCircleList()" class="titafont tita-chaxun1"></span>
      </div>
    </div>
    <div class="sf-perimeter-content" ref="perimeterContent">
      <transition-group
        tag="ul"
        name="fade"
        class="sf-perimeter-scroll"
        v-if="list.length !== 0">
        <li v-for="(l, index) in list"
            :key="l.attributes['id']"
            :title="l.attributes['address']"
            :data-index="index"
            @mouseover="mouseover(l)"
            @mouseout="mouseout(l)"
            @click="showDetail(l)"
            class="sf-perimeter-scroll-li"
            :class="detailSelected === l.attributes['id'] ? 'detail-selected' : ''">
          <span class="list-icon titafont tita-dingwei1">
            <span>{{index + 1}}</span>
          </span>
          <div class="list-content">
            <span>{{l.attributes.address}}</span>
            <span>{{l.attributes.table}}</span>
          </div>
          <div class="list-button-wrap">
            <span class="iconfont icon-fuhaobuxianshi"
                  :class="!layerShow[l.attributes['id']]? '' : 'l-b-selected'"
                  @click.stop="hideClick(l, index)"></span>
            <span class="iconfont icon-tianjiaweibiaojidian"
                  :class="!layerDin[l.attributes['id']]? '' : 'l-b-selected'"
                  @click.stop="markClick(l, index)"></span>
          </div>
        </li>
      </transition-group>
      <transition name="fade">
        <div class="page-wrap" :style="{display: list.length === 0 ? 'none' : 'block'}">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="limit"
            layout="prev, pager, next"
            :total="count">
          </el-pagination>
        </div>
      </transition>
      <transition name="fade">
        <div class="perimeter-search-null-data" v-if="list.length === 0 && this.layers.length <= 0 && !loading">
          <img src="static/images/zhoubian_wushuju.png"/>
          <span>暂无内容！</span>
          （请先选择要素类型）
        </div>
      </transition>
      <transition name="fade">
        <div class="perimeter-search-null-data" v-if="list.length === 0 && this.layers.length > 0 && !loading">
          <img src="static/images/null_msg.png"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import sfLayer from './layer'
  import { getMarkOverLay, sortAllData } from './helper'
  const layerName = 'perimeter-search-points'
  export default {
    name: 'sf-perimeter',
    data () {
      return {
        title: '周边资源',
        count: 0,
        list: [],
        listAll: [],
        limit: 10, // 当前页面过滤数
        currentPage: 1,
        circle: null,
        showLayers: false,
        radius: 5000,
        keyword: '',
        loading: false,
        detailSelected: '',
        layerDin: {},
        layerShow: {}
      }
    },
    mounted () {
      this.$Maps.removeOverlayByLayerName('perimeter-search-overlay-point')
      const location = this.location || this.$store.getters.location
      if (location && Array.isArray(location) && location.length > 0) {
        this._clearMap()
        this.initCustomCircle(location)
      }
    },
    computed: {
      ...mapState({
        location: state => state.perimeter.location,
        layers: state => state.perimeter.layers
      })
    },
    watch: {
      location: function (v, ov) {
        if (v && v !== ov) {
          this._clearMap()
          this.initCustomCircle(v)
        }
      },
      layers: function () {
        this.initCustomCircleList()
      },
      keyword: function () {
        this.initCustomCircleList()
      },
      list: function (v) {
        this.$Maps.removeOverlayByLayerName(layerName)
        if (v && v.length > 0) {
          this._addPoints(v)
        }
      }
    },
    methods: {
      closeClick () {
        this.$store.dispatch('actionToolPanel', {
          type: 'perimeter',
          params: '',
          isShow: false
        })
        this.count = 0
        this.list = []
        this.keyword = ''
        this._clearMap()
      },
      // 初始化地图circle
      initCustomCircle (center) {
        this._clearMap()
        if (!this.circle) {
          this.circle = new ol.interaction.FreeHandCircle({
            layerName: 'perimeterSerachLayer',
            style: { // 不传使用默认
              stroke: {
                strokeColor: 'rgba(71, 129, 217, 1)',
                strokeLineCap: 'round',
                strokeLineJoin: 'round',
                strokeLineDash: [5],
                strokeLineDashOffset: '0',
                strokeMiterLimit: 10,
                strokeWidth: 1
              },
              fill: {
                fillColor: 'rgba(3, 24, 65, 0)'
              }
            }
          })
          this.$Maps.getMap().getView().animate({
            center: center,
            zoom: 9,
            duration: 500
          })
          this.$Maps.addInteraction(this.circle)
          this.circle.createCircle(center, 5000)
          this.circle.on('changeend', this.circleChangeHandel, this)
        } else {
          this.circle.setCenter(center)
        }
        this.initCustomCircleList()
      },
      // circle 改变事件（包括半径和中心点变化）
      circleChangeHandel (event) {
        if (event) {
          this.radius = this.circle.radius
          this.initCustomCircleList()
        }
      },
      initCustomCircleList () {
        this._clearMap()
        this._getLimit()
        if (this.location && this.layers && this.radius && this.layers.length > 0) {
          const ids = getMarkOverLay('sf-mark-overLay')
          let params = {
            current: this.currentPage,
            distance: (this.radius / 1000),
            field: '',
            coordSys: 'wgs:wgs84',
            ids: ids,
            input: this.keyword,
            limit: this.limit,
            tables: this.layers,
            wktPoint: 'POINT (' + this.location[0] + ' ' + this.location[1] + ')'
          }
          this.$api.getPerimeterList(params).then(res => {
            if (res['result'] && res['result'].length > 0) {
              this.count = res['count']
              this.list = sortAllData(res['result'], this.location, this.$Maps.getMap())
            } else {
              this.count = 0
              this.list = []
              this.$Maps.removeOverlayByLayerName('perimeter-search-overlay-point')
            }
          }).catch(e => {
            console.warn(e)
          })
        } else {
          this.count = 0
          this.list = []
        }
      },
      _getLimit () {
        let panelHeight = this.$refs['perimeterContent'].offsetHeight
        this.limit = Math.floor(panelHeight / 62)
      },
      handleCurrentChange (page) {
        console.log(page)
        this.currentPage = page
        console.log(this.currentPage)
        this.initCustomCircleList()
      },
      _addPoints (points) {
        this.$Maps.removeOverlayByLayerName(layerName)
        this.$Maps.addOverlayPoints(points, {
          layerName: layerName,
          orderBy: true,
          zoomToExtent: true,
          style: {
            color: '#F61717',
            selectColor: '#1b9de8',
            element: {
              className: 'titafont tita-dingwei1',
              fontSize: '32px'
            }
          }
        })
      },
      // 鼠标移入高亮要素
      mouseover (item) {
        if (item && item['attributes'] && item['attributes']['id']) {
          this.$Maps.highLightOverLay(item['attributes']['id'])
        }
      },
      // 鼠标移出取消高亮要素
      mouseout (item) {
        if (item && item['attributes'] && item['attributes']['id']) {
          this.$Maps.unHighLightOverLay(item['attributes']['id'])
        }
      },
      // 标记当前要素
      markClick (item, index) {
      },
      // 隐藏当前要素
      hideClick (item) {
        if ((item && item['attributes'] && item['attributes']['id']) && this.layerShow[item.attributes['id']] === undefined) {
          this.$set(this.layerShow, item.attributes['id'], false)
        } else {
          this.layerShow[item.attributes['id']] = !this.layerShow[item.attributes['id']]
        }
        this.setOverLayOpacityById(item.attributes['id'])
      },
      setOverLayOpacityById (id) {
        if (this.$Maps.getMap() && !!id) {
          let overLay = this.$Maps.getOverLayById(id)
          if (overLay && overLay instanceof ol.Overlay) {
            overLay.getElement().style.opacity = (overLay.getElement().style.opacity === '0') ? 1 : 0
          }
        }
      },
      showDetail (item) {
        this.detailSelected = item.attributes.id
        if (item.geometry) {
          item.attributes['layerName'] = layerName
          item.attributes['position'] = item.geometry
          this.$ShowPopover('PerimeterPoint', this.$Maps.getMap(), {
            id: item.attributes['id'],
            layerName: item.attributes['layerName'],
            coordinates: item.geometry,
            properties: item.attributes
          })
          this.$Maps.getMap().getView().animate({
            center: item.geometry,
            zoom: 12,
            duration: 500
          })
        }
      },
      _clearMap (flag) {
        if (!this.$Maps.getMap()) return
        this.$Maps.removeOverlayByLayerNames([layerName])
        if (flag && this.circle) {
          this.currentPage = 1
          this.circle.destroy()
          this.$Maps.removeInteraction(this.circle)
          this.circle = null
        }
      }
    },
    destroyed () {
      this.count = 0
      this.list = []
      this.keyword = ''
      this._clearMap(true)
    },
    components: {
      sfLayer
    }
  }
</script>

<style lang="scss">
  $font-color: #747474;
  $blue-color: #20A1FF;
  .sf-perimeter {
    position: absolute;
    top: 20px;
    bottom: 20px;
    right: 20px;
    width: 360px;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
    z-index: 2;
    &-header {
      color: #FFFFFF;
      height: 80px;
      line-height: 80px;
      padding: 0 20px;
      font-size: 16px;
      font-weight: bold;
      background: url(../../../../static/images/zhoubian_topbg.png)  right bottom no-repeat #1b9de8;
      .title {
        display: inline-block;
        font-size: 14px;
        margin-left: 5px;
      }
      .tita-icon16 {
        float: right;
        font-size: 14px;
        &:hover {
          cursor: pointer;
          color: $blue-color;
        }
      }
    }
    &-layers {
      .perimeter-search-box {
        position: relative;
        height: 30px;
        line-height: 30px;
        text-align: left;
        background: #f1f2f4;
        margin: 0 10px 10px;
        span {
          position: absolute;
          right: 0;
          top: 0;
          color: #5e5e5e;
          display: inline-block;
          width: 30px;
          height: 30px;
          text-align: center;
          &:hover {
            cursor: pointer;
            color: #1B9DE8;
          }
        }
        input {
          height: 29px;
          line-height: 30px;
          padding: 0 5px;
          margin: 0;
          width: 340px;
          border: none;
          background: none;
          text-align: left;
          color: #7D7466;
          &:focus {
            + span {
              color: #1b9de8;
            }
          }
        }
      }
    }
    &-content {
      height: calc(100% - 175px);
      overflow: hidden;
      .sf-perimeter-scroll {
        height: calc(100% - 32px);
        width: calc(100% + 30px);
        overflow-y: auto;
        overflow-x: hidden;
        &-li {
          position: relative;
          width: calc(100% + 30px);
          padding: 5px 0;
          &:hover {
            cursor: pointer;
            background-color: #f5f6f8;
            .list-icon {
              &:before {
                color: #1b9de8;
              }
            }
          }
          .list-icon {
            position: absolute;
            top: 12px;
            left: 10px;
            display: inline-block;
            color: rgb(246, 23, 23);
            width: 26px;
            height: 26px;
            line-height: 23px;
            text-align: center;
            &:before {
              top: 0;
              left: 0;
              display: inline-block;
              position: absolute;
              width: 26px;
              height: 26px;
              font-size: 32px;
              text-align: center;
              transition: .3s;
            }
            span {
              line-height: 25px;
              font-size: 12px;
              color: #fff;
              position: absolute;
              top: -5px;
              left: 12px;
            }
          }
          .list-content {
            padding-left: 50px;
            span {
              display: block;
              &:first-child {
                height: 30px;
                line-height: 30px;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 300px
              }
              height: 22px;
              line-height: 22px;
              &:first-child {
                color: #1b9de8;
              }
            }
          }
          .list-button-wrap {
            height: 30px;
            line-height: 30px;
            position: absolute;
            right: 20px;
            top: 5px;
            span {
              float: left;
              margin-left: 10px;
              color: #797979;
              &:hover {
                color: #1B9DE8;
              }
            }
            .l-b-selected {
              color: #1B9DE8;
            }
          }
        }
      }
      .perimeter-search-null-data {
        text-align: center;
        height: 100%;
        line-height: 100%;
        padding-top: 50%;
        img {
          display: block;
          margin: 0 auto;
        }
        span {
          margin-bottom: 8px;
          color: #7ac2f1;
          display: block;
        }
        span:nth-child(1) {
          margin-top: 10px;
        }
      }
      .el-pagination {
        text-align: center;
      }
    }
  }
</style>
