<template>
  <div class="layer-item base-layer">
    <h4 class="title">{{item.name}}</h4>
    <ul class="clearfix">
      <li v-for="c in item.child"
          :class="currentBaseLayer === c.code ? 'base-layer-selected' : ''"
          @click="switchLayer(c.code)">
        <img :src="'static/images/base-layers/' + c.code + '.png'" :alt="c.name">
        <span class="name-content">{{c.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'base-layer',
    props: {
      item: Object
    },
    data () {
      return {
        currentBaseLayer: '',
        baseLayers: null
      }
    },
    mounted () {
      if (this.$Maps) {
        this.$Maps.map.once('postrender', (mapEvent) => {
          const layers = this.$Maps.getBaseLayers()
          const $current = layers.filter(layer => {
            return (layer.getVisible() === true)
          })
          if ($current && $current.length > 0) {
            this.currentBaseLayer = $current[0].get('layerName')
          }
        }, this)
        this.$Maps.map.renderSync()
      }
    },
    methods: {
      // 切换底图
      switchLayer (layerName) {
        if (layerName) {
          this.currentBaseLayer = layerName
          let layers = this.getBaseLayers()
          if (layers) {
            layers.forEach(layer => {
              if (layer.get('layerName') === layerName) {
                layer.setVisible(true)
              } else {
                layer.setVisible(false)
              }
            })
          }
        }
      },
      // 获取所有底图（获取后不会再次获取，性能优化）
      getBaseLayers () {
        if (!this.baseLayers) {
          this.baseLayers = this.$Maps.getBaseLayers()
        }
        return this.baseLayers
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/variables.scss";
  .base-layer {
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
      padding: 0px;
      margin-left: 18px;
      margin-top: 20px;
      li {
        width: 80px;
        height: 60px;
        float: left;
        box-sizing: border-box;
        border: 1px solid $panel-border-color;
        padding: 1px;
        margin-right: 30px;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          text-align: center;
          display: inherit;
        }
        &:hover {
          cursor: pointer;
          border: 1px solid $panel-border-color;
          color: $panel-text-highlight-color;
        }
      }
      .base-layer-selected {
        border: 1px solid $panel-border-color;
        color: $panel-text-highlight-color;
      }
    }
  }
</style>
