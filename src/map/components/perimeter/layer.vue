<template>
  <div class="sf-perimeter-search-layer">
    <div class="layers-button">
      <span>{{showLayers ? '选择资源' : count > 0 ? '附近资源（' + count + '条）' : '点击右侧选择附近资源'}}</span>
      <span @click="openLayers()" class="selecte-button">{{showLayers ? '关闭选择' : '选择要素'}}<i
        class="iconfont icon-zhankai" :style="{transform: 'rotate(' + (showLayers ? '180deg' : '0') + ')'}"></i></span>
    </div>
    <transition name="fade">
      <el-checkbox-group
        v-show="showLayers"
        v-model="checkLayers">
        <ul class="clearfix" @mouseleave="openLayers()">
          <li v-for="layer in layers">
            <el-checkbox
              :label="layer.tableName"
              :key="layer.tableName">{{layer.name}}</el-checkbox>
          </li>
        </ul>
      </el-checkbox-group>
    </transition>
  </div>
</template>
<script>
  import {SET_PERIMETER_LAYER} from '@/store/mutation-types'
  export default {
    name: 'sf-layer',
    data () {
      return {
        layers: [],
        showLayers: false
      }
    },
    mounted () {
      this.$api.getPerimeterLayers().then(res => {
        this.layers = res['data']['data']
      }).catch(error => {
        console.error(error)
      })
    },
    props: {
      count: {
        type: Number,
        default: 0
      }
    },
    computed: {
      checkLayers: {
        // getter
        get: function () {
          return this.$store.getters.layers
        },
        // setter
        set: function (newValue) {
          this.$store.commit(SET_PERIMETER_LAYER, newValue)
        }
      }
    },
    methods: {
      openLayers () {
        this.showLayers = !this.showLayers
      }
    }
  }
</script>
<style lang="scss">
  .sf-perimeter-search-layer {
    position: relative;
    .layers-button {
      margin: 0 15px;
      height: 54px;
      line-height: 54px;
      border-bottom: 1px solid #f9f9f9;
      .selecte-button {
        display: inline-block;
        float: right;
        margin-top: 13px;
        width: 86px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #fff;
        border-radius: 3px;
        text-align: center;
        color: #1B9DE8;
        &:hover {
          cursor: pointer;
          border-color: #1b9de8;
        }
        i {
          display: inline-block;
          margin-left: 5px;
          font-size: 6px;
        }
      }
    }
    .el-checkbox-group {
      position: absolute;
      background: #fff;
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.12), 0 5px 10px -3px rgba(0, 0, 0, 0.3);
      z-index: 12;
      ul {
        padding: 15px;
        li {
          width: 100px;
          overflow: hidden;
          white-space: nowrap;
          margin: 5px 0;
          float: left;
        }
      }
      .el-checkbox__inner {
        width: 16px;
        height: 16px;
      }
      .el-checkbox__inner.is-checked {
        background-color: #1b9de8;
        border-color: #1b9de8;
      }

      .el-checkbox__inner.is-focus {
        border-color: #C0CCDA;
      }

      .el-checkbox__label {
        font-size: 12px;
      }
    }
  }
</style>
