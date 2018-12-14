<template>
  <div class="layer-item">
    <h4 class="title">{{item.name}}</h4>
    <ul class="clearfix">
      <li class="layer-item-li" v-for="iem in item.child" @click="layerClick(iem)">
        <span
          class="name-content"
          :class="selected === iem.code ? 'layer-selected' : ''">{{iem.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'layer-item',
    props: {
      item: Object
    },
    data () {
      return {
        selected: '',
        currentLayer: null
      }
    },
    methods: {
      // 关闭方法
      layerClick (item) {
        this.selected = item['code']
        const _config = config.layerConfig.getLayerConfigByLayerName(item['code'], 'overlaylayers')
        this.removeLayer()
        if (_config) {
          switch (_config['layerType']) {
            case 'TileArcGISRest':
              this.currentLayer = this.$Maps.createTitleLayer(_config.layerName, _config)
              break
            case 'TileWMS':
              this.currentLayer = this.$Maps.createTileWMSLayer(_config.layerName, _config)
              break
            case 'TileWMTS':
              this.currentLayer = this.$Maps.createWMTSLayer(_config.layerName, _config)
              break
            case 'TileXYZ':
              this.currentLayer = this.$Maps.createXYZLayer(_config.layerName, _config)
              break
          }
        }
      },
      removeLayer () {
        if (this.currentLayer) {
          this.$Maps.removeLayer(this.currentLayer)
          delete this.currentLayer
        }
      }
    },
    destroyed () {
      this.removeLayer()
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/variables.scss";
  .layer-item {
    margin-top: 15px;
    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: $panel-text-color;
      background-color: $panel-bg-color;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      padding: 0 10px;
    }
    ul {
      color: $panel-text-color;
      padding-left: 30px;
      .layer-item-li {
        float: left;
        width: 50%;
        height: 38px;
        line-height: 38px;
        span {
          padding: 5px 10px;
          border-radius: 3px;
          &:hover {
            color: $panel-text-highlight-color;
            cursor: pointer;
          }
        }
        .layer-selected {
          color: $panel-text-highlight-color;
        }
      }
    }
  }
</style>
