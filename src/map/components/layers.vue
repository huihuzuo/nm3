<template>
  <panel
    class="layer-statistic-tree"
    :class="isFullScreen ? 'full-open' : 'full-exit'"
    title="图层"
    v-loading="loading"
    @onClose="handleClose">
    <span slot="head" class="iconfont icon-jiaotiaozhan layer-statistic-tree-header-icon"></span>
    <div class="layer-statistic-tree-body" slot="body">
      <vue-tree
        ref="layersTree"
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="props"
        :show-expand-icon="false"
        :default-expanded-keys="defaultExpanded"
        :expand-on-click-node="true"
        @check="checkNode">
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
        @mouseover.stop="addHoverDom(node, data)"
        @mouseout.stop="removeHoverDom(node, data)">
        <span class="custom-tree-node-icon iconfont icon-tuceng" v-if="node.data.disableCheckBox"></span>
        <span>{{ node.label }}</span>
        <div v-if="node.checked && node.data.transparent" class="slider-content clearfix">
          <span class="title">透明度：</span>
          <sf-slider
            :show-tooltip="false"
            v-model="node.data.transparentValue"
            :format-tooltip="formatTooltip"
            :step="1" @change="handleSlider($event, node, data)">
          </sf-slider>
        </div>
        <ul
          class="legend-content clearfix"
          v-if="node.checked && node.data.legends && node.data.legends.length > 0">
          <li
            class="legend"
            v-for="item in node.data.legends"
            :title="item.legendName"
            :style="{backgroundColor: item.cancelSelected ? '#e1e1e1' : item.color, width: (100 / node.data.legends.length) + '%'}"
            @click="handleLegendClick(item, node)"></li>
        </ul>
      </span>
      </vue-tree>
      <ul class="layer-statistic-tree-description" v-if="descriptions && descriptions.length > 0">
        <li v-for="item in descriptions">
          <div class="title">{{item.label}}:</div>
          <div class="content">{{item.content}}</div>
          <div class="target"><a :href="item.target" target="_blank">{{item.target}}</a></div>
        </li>
      </ul>
    </div>
  </panel>
</template>

<script>
  import { mapState } from 'vuex'
  import SfSlider from '@/components/common/slider/index'
  import vueTree from '@/components/common/vue-tree/tree'
  export default {
    name: 'sf-layers-panel',
    data () {
      return {
        windy: null,
        treeData: [],
        props: {
          label: 'name',
          children: 'children'
        },
        arcgislayer: [],
        descriptions: [],
        defaultExpanded: [],
        loading: false
      }
    },
    computed: {
      ...mapState({
        isFullScreen: state => state.tools.isFullScreen
      })
    },
    mounted () {
      this.loading = true
      this.$fetch.getLayersTree().then(res => {
        this.loading = false
        if (res) {
          this.treeData = res
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    methods: {
      formatTooltip (value) {
        return value + '%'
      },
      /**
       * 面板关闭
       */
      handleClose () {
        this.$store.dispatch('layersState', false)
      },

      /**
       * 树勾选
       * @param node
       * @param check
       */
      checkNode (node, check) {
        const isCheck = (check.checkedKeys && check.checkedKeys.indexOf(node.id) > -1)
        if (node && node.isParent && node.children && node.children.length > 0) {
          this.defaultExpanded = [node.id]
          node.children.forEach(item => {
            this.checkNode(item, check)
          })
        } else if (node.layerType && !node.isParent && node.serviceUrl) {
          this.handleNodeCheck(node, isCheck)
        }
      },

      /**
       * 选择父节点时自动勾选子节点
       * @param node
       * @param isCheck
       */
      handleNodeCheck (node, isCheck) {
        switch (node.layerType) {
          case 1: // 统计服务
            this.checkServiceLayer(node, isCheck)
            break
          case 2: // arcgis专题服务
            this.addTileLayer(node, isCheck)
            break
          case 3: // 热力图
            console.log(node)
            break
          case 4:
            break
          case 5:
            break
          case 7:
            break
          case 8:
            this.checkTileArcgisService(node, isCheck)
            break
          case 9: // geoserver
            this.addGeoserverLayer(node, isCheck)
            break
          case 10: // 图片
            console.log(node)
            if (isCheck) {
              this.$store.dispatch('actionLayerControl', {
                state: true,
                item: {
                  url: node.serviceUrl,
                  id: node.id
                }
              })
            } else {
              this.$store.dispatch('actionLayerControl', {
                state: false,
                item: ''
              })
            }
            break
          case 11:
            this.addWindy(node, isCheck)
            break
          default:
            break
        }
      },

      /**
       * 检查是否可以选择
       * @param _treeNode
       */
      checkSelectAble (_treeNode) {
        const _check = config.statisticsLayerList.find(item => item['id'] === _treeNode['id'])
        if (_check && _check['legendClick']) {
          return true
        } else {
          return false
        }
      },
      /**
       * 改变图层透明度
       * @param layerName
       * @param opacity
       */
      setLayerOpacity (layerName, opacity) {
        const _layer = this.$Maps.getLayerByLayerName(layerName)
        if (_layer) {
          _layer.setOpacity(opacity)
        }
      },

      /**
       * 改变ArcGIS 图层参数
       * @param layerName
       * @param params
       */
      setLayerParams (layerName, params) {
        const _layer = this.$Maps.getLayerByLayerName(layerName)
        if (_layer && _layer.getSource()) {
          _layer.getSource().updateParams(params)
        }
      },
      /**
       * 描述信息显示
       * @param node
       * @param data
       */
      addHoverDom (node, data) {
        if (data.description !== null && data.description.length > 0) {
          this.descriptions = data.description
        }
      },
      /**
       * 描述信息面板移除
       * @param treeId
       * @param treeNode
       */
      removeHoverDom (treeId, treeNode) {
        this.descriptions = []
      },
      /**
       * 获取当前图层配置
       * @param _treeNode
       * @returns {*}
       * @private
       */
      _getLayerConfig (_treeNode) {
        let current_
        config.statisticsLayerList.every(item => {
          if (item['id'] === _treeNode.id) {
            current_ = item
            return false
          } else {
            return true
          }
        })
        return current_
      },

      /**
       * 处理滑块改变事件
       * @param event
       * @param node
       * @param data
       * @returns {*}
       * @private
       */
      handleSlider (event, node, data) {
        if (data && data.id) {
          this.setLayerOpacity(data.id, 1 - event / 100)
        }
      },

      /**
       * 图例点击事件
       * @param item
       * @param node
       */
      handleLegendClick (item, node) {
        if (item && node) {
          this.$set(item, 'cancelSelected', !item.cancelSelected)
          const params = {
            layerName: node.id
          }
          if (this.checkSelectAble(node)) {
            params.layerDefs = this._getArcMapServiceParams(node)
          } else {
            if (node.params && Array.isArray(node.params) && node.params[0] && node.params[0]['value']) {
              params.layerDefs = node.params[0]['value']
            }
          }
          this.setLayerParams(node.id, params)
        }
      },
      /**
       * 改变图层透明度
       * @param node
       * @param isCheck
       */
      addTileLayer (node, isCheck) {
        console.log(node, isCheck)
        if (!isCheck) {
          this.$Maps.removeLayerByLayerName(node.id)
          this.arcgislayer = this.arcgislayer.filter(item => item !== node.id)
        } else {
          this.arcgislayer.push(node.id)
          const params = {
            layerName: node.id
          }
          if (this.checkSelectAble(node)) {
            params.layerDefs = this._getArcMapServiceParams(node)
          } else {
            if (node.params && Array.isArray(node.params) && node.params[0] && node.params[0]['value']) {
              params.layerDefs = node.params[0]['value']
            }
          }
          params['token'] = config.token
          const _layer = this.$Maps.createTitleLayer(node.id, {
            layerName: node.id,
            layerType: 'TileArcGISRest',
            visible: true,
            create: true,
            layerParams: params,
            layerUrl: node.serviceUrl
          })
          if (_layer && node.transparentValue) {
            _layer.setOpacity(1 - node.transparentValue / 100)
          }
        }
      },

      /**
       * 获取ArcGIS动态图层参数
       * @param _treeNode
       */
      _getArcMapServiceParams (_treeNode) {
        let layerDefs_ = ''
        const defs_ = []
        const _layerConfig = this._getLayerConfig(_treeNode)
        if (_treeNode && _treeNode['legends']) {
          const legends = _treeNode['legends']
          legends.forEach((item) => {
            if (!item.cancelSelected) {
              defs_.push(item['legendKey'])
            }
          })
        }
        if (defs_.length > 0 && _layerConfig && _layerConfig['layers'].length > 0) {
          _layerConfig['layers'].forEach(item => {
            layerDefs_ = item + ':' + _layerConfig['field'] + ' IN (' + defs_.join(', ') + ')'
          })
        }
        return layerDefs_
      },

      /**
       * 添加geoserver服务图层
       * @param node
       * @param isCheck
       */
      addGeoserverLayer (node, isCheck) {
        if (!isCheck) {
          this.$Maps.removeLayerByLayerName(node.id)
        } else {
          const params = {
            layerName: node.id,
            layerType: 'TileWMS',
            layerUrl: node.serviceUrl,
            layers: node.params.filter(_item => _item.field === 'layers')[0]['value'],
            styles: node.params.filter(_item => _item.field === 'styles')[0]['value'],
            viewparams: node.params.filter(_item => _item.field === 'viewparams')[0]['value'],
            projection: 'EPSG:4326',
            tiled: true,
            tiledsorrigin: '110.363636682,31.474220641',
            create: true,
            addLayer: true
          }
          this.$Maps.createTileWMSLayer(params.layerName, params)
        }
      },

      /**
       * 添加风场
       * @param node
       * @param isCheck
       */
      addWindy (node, isCheck) {
        if (!isCheck) {
          this.$Maps.removeLayerByLayerName('windy-layer')
        } else {
          this.$fetch.getWindyData('./static/json/windy.json').then(res => {
            const windy = new WindLayer(res, {
              layerName: 'windy-layer',
              projection: 'EPSG:4326',
              ratio: 1,
              map: this.$Maps.getMap()
            })
            windy.appendTo(this.$Maps.getMap())
          })
        }
      },

      /**
       * 根据项目服务组织数据源生成专题图（饼状图、柱状图、散点图、热力图）
       */
      checkServiceLayer () {}
    },
    components: {
      vueTree,
      SfSlider
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables.scss";
  .el-loading-mask {
    background-color: rgba(2, 24, 34, 0.73);
    //margin-left:-10px;
  }
  .full-exit {
    top: 10px;
  }
  .layer-statistic-tree {
    position: absolute !important;
    right: 10px;
    top: 10px;
    bottom: 10px;
    z-index: 3;
    width: 360px;
    font-family: SimSun;
    .panel-header .panel-title {
      margin-left: 0px;
    }
    .panel-header .icon-guanbi {
      margin-right: 14px;
      color: #2487bb;
      &:hover {
        color: #ff9c9c;
      }
    }
    .panel-body {
      padding: 10px 12px;
    }
    &-header-icon {
      color: #6ecaed!important;
      margin-left: 10px;
    }
    &-body {
      overflow: auto;
      height: 100%;
      width: calc(100% + 30px);
      .el-tree {
        margin: 0;
        color: #b8deff;
        width: calc(100% - 30px);
        background: transparent;
        .el-tree-node__content {
          width: 100%;
          height: auto;
          line-height: 26px;
          align-items: flex-start;
          .slider-content {
            margin-left: -22px;
            background-color: rgba(2, 38, 51, 0.9);
            padding: 0px 15px;
            line-height: 40px;
            .title {
              float: left;
            }
            .el-slider {
              float: left;
              width: calc(100% - 60px);
            }
          }
          .custom-tree-node {
            width: 100%;
            .legend-content {
              margin-left: -22px;
              margin-top: 10px;
              .legend {
                height: 12px;
                float: left;
                &:hover {
                  cursor: pointer;
                }
              }
            }
            &-icon {
              height: 11px;
              width: 12px;
              margin-right: 5px;
              margin-top: 9px;
              color: #7adaff;
              font-size: 12px;
            }
          }
          &:hover {
            background-color: transparent;
          }
        }
        .el-tree-node:focus>.el-tree-node__content {
          background-color: transparent;
        }
      }
    }
    &-description {
      li {
        .title {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          color: #2a2a2a;
          font-weight: 700;
        }
        .content {
          font-size: 12px;
          color: #2a2a2a;
          font-family: SimSun;
        }
      }
    }
  }
</style>
