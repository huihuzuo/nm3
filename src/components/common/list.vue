<template>
  <div class="list">
    <ul>
      <li
        class="lists-item"
        @click="itemClick(item, index)"
        @mouseover.stop="handleMouseOver(item, index)"
        @mouseout.stop="handleMouseOut(item, index)"
        v-for="(item,index) in list">
        <span class="l-color">{{index + 1}}</span>
        <div class="l-content">
          <div class="desc">
            {{item.attributes.LXMC}}
            【{{item.attributes.LXBM}}-{{item.attributes.SXXFX | formatSxxfx}}】
            <span>{{item.attributes.QDZH | formatZh}}</span>
            &nbsp;{{item.attributes.REASON_CATEGORY}}
          </div>
          <div>发生时间：{{item.attributes.START_TIME | formatTime}}</div>
          <div v-if="item.attributes.EVENT_TYPE !== 0">预计恢复：{{item.attributes.END_TIME | formatTime}}</div>
          <div v-else>信息来源：{{item.attributes.SOURCE_NAME}}</div>
          <div class="tools">
            <span v-if="showDetailBtn" @click.stop="btnClick('detail',item)" class="iconfont icon-xiangqing2"
                  :title="'详情'"></span>
            <span v-if="showConfirmBtn" @click.stop="btnClick('confirm',item)" class="iconfont icon-queren1"
                  :title="'确认'"></span>
            <span v-if="showRelieveBtn" @click.stop="btnClick('relieve',item)"
                  class="iconfont icon-ic_block_black_px" :title="'解除'"></span>
            <span v-if="showRecoveryBtn" @click.stop="btnClick('recovery',item)" class="iconfont icon-huifu"
                  :title="'恢复'"></span>
            <span v-if="showCancelBtn" @click.stop="btnClick('cancel',item)" class="iconfont icon-quxiao"
                  :title="'取消'"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  @import "../../assets/variables";
  @import '../../assets/scss/common/list.scss';
</style>
<script>
  import {mapState} from 'vuex'
  import DrawGeometry from '@/map/mixin/DrawGeometry'
  export default {
    props: {
      list: {
        type: Array,
        default: function () {
          return []
        }
      },
      showDetailBtn: false,
      showConfirmBtn: false,
      showRelieveBtn: false,
      showRecoveryBtn: false,
      showCancelBtn: false,
      layerName: {
        type: String,
        default: function () {
          return ''
        }
      },
      btnClick: {
        type: Function
      }
    },
    mixins: [DrawGeometry],
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess
      })
    },
    data () {
      return {}
    },
    mounted () {
    },
    watch: {
      list (v) {
        if (this.loadMapSuccess) {
          let layer = this.$Maps.getLayerByLayerName(this.layerName)
          if (layer) {
            this.$Maps.removeFeatureByLayerName(this.layerName)
          }
        }
        if (v && v.length > 0) {
          this.addPoints(v, {
            layerName: this.layerName
          })
        }
      }
    },
    methods: {
      itemClick (item) {
        console.log(item)
        this.$emit('itemClick', item)
      }
    },
    components: {},
    destroyed () {
      this.$Maps.removeFeatureByLayerName(this.layerName)
    }
  }
</script>
