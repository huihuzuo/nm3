<template>
  <div class="layer-switcher">
    <ul class="layer-switcher-ul">
      <li
        :key="item.layerName"
        class="layer-switcher-li"
        :class="selectLayerName === item.layerName ? 'selected-item' : ''"
        :style="fixStyle(item, index)"
        @click="switchLayer(item)"
        v-for="(item, index) in layers">
        <div v-if="index === 0" id="hn-scale-line" class="hn-scale-line" ref="hnScaleLine"></div>
        <span class="layer-name">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        isOver: false,
        baseLayers: '',
        selectLayerName: 'vector',
        layers: [
          {
            layerName: 'vector',
            name: '矢量',
            icon: './static/images/maptype.png',
            offset: [0, 0]
          },
          {
            layerName: 'earth',
            name: '影像',
            icon: './static/images/maptype.png',
            offset: [0, -66]
          },
          {
            layerName: 'panorama',
            name: '地形',
            icon: './static/images/maptype.png',
            offset: [0, -130]
          },
          {
            layerName: 'deformation',
            name: '变形图',
            icon: './static/images/control/deformation.png',
            offset: [0, 0]
          }
        ]
      }
    },
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess
      })
    },
    watch: {
      loadMapSuccess (value) {
        if (value) {}
      }
    },
    mounted () {
      this.$el.addEventListener('mouseenter', event => {
        this.isOver = true
      }, false)
      this.$el.addEventListener('mouseleave', event => {
        this.isOver = false
      }, false)
    },
    methods: {
      // 动态样式（主要处理层叠效果）
      fixStyle (item, index) {
        return {
          background: `url(${item['icon']}) ${item.offset[0]}px ${item.offset[1]}px no-repeat`,
          zIndex: index + 1
        }
      },
      // 切换底图
      switchLayer (item) {
        if (item['layerName']) {
          this.selectLayerName = item['layerName']
          let layers = this.getBaseLayers()
          if (layers) {
            layers.forEach(layer => {
              if (layer.get('layerName') === item['layerName']) {
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
<style scoped lang="scss">
  @import "../../../assets/variables.scss";
  .layer-switcher {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 0;
    ul {
      width: 130px;
      height: 80px;
      transition-property: width,background-color;
      transition-duration: .4s;
      background-color: $panel-bg-color;
      li {
        height: 65px;
        width: 80px;
        position: absolute;
        border-radius: 2px;
        top: 10px;
        box-sizing: border-box;
        border: 1px solid rgba(153,153,153,.42);
        background-size: 86px 240px;
        transition-property: right,background-image;
        transition-duration: .4s;
        .layer-name {
          position: absolute;
          bottom: 0;
          right: 0;
          display: inline-block;
          padding: 4px 3px 3px 4px;
          font-size: 12px;
          height: 16px;
          line-height: 8px;
          color: #FFF;
          border-top-left-radius: 2px;
        }
        .hn-scale-line {
          position: relative;
          width: 100%;
          height: 100%;
        }
        &:hover {
          cursor: pointer;
          border-color: $panel-border-color;
          .layer-name {
            background-color: rgba(0, 0, 0, .39);
            color: #FFFFFF;
          }
        }
      }
      li:nth-child(1) {
        right: 0px;
        margin-right: 40px;
      }
      li:nth-child(2) {
        right: 0px;
        margin-right: 30px;
      }
      li:nth-child(3) {
        right: 0px;
        margin-right: 20px;
      }
      li:nth-child(4) {
        right: 0px;
        margin-right: 10px;
      }
      .selected-item {
        border-color: $panel-border-color;
        .layer-name {
          background-color: rgba(0, 0, 0, .39);
          color: #FFFFFF;
        }
      }
      &:hover {
        width: 390px;
        background-color: $panel-bg-color;
        li:nth-child(1) {
          right: 288px;
          margin-right: 10px;
        }
        li:nth-child(2) {
          right: 192px;
          margin-right: 10px;
        }
        li:nth-child(3) {
          right: 96px;
          margin-right: 10px;
        }
        li:nth-child(4) {
          right: 0px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
