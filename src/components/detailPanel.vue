<template>
  <div class="detail-panel-wrap">
    <span class="iconfont icon-guanbi" @click="onClose"></span>
    <el-tabs type="border-card" :value="tabValue" @tab-click="tabClick">
      <!--<el-tab-pane label="路况">路况</el-tab-pane>-->

      <!--<el-tab-pane label="气象">气象</el-tab-pane>-->

      <el-tab-pane label="事件">
        <div class="tab-wrap" v-if="currValue === '事件'">
          <div class="tab-scroll">
            <event :road-detail="roadDetail"></event>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="交调站">
        <div class="tab-wrap" v-if="currValue === '交调站'">
          <div class="tab-scroll">
            <station :road-detail="roadDetail"></station>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="视频">
        <div class="tab-wrap" v-if="currValue === '视频'">
          <div class="tab-scroll">
            <video-station :road-detail="roadDetail"></video-station>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="路线">
        <div class="tab-wrap" v-if="currValue === '路线'">
          <div class="tab-scroll">
            <road :road-detail="roadDetail"></road>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="构筑物">
        <div class="tab-wrap" v-if="currValue === '构筑物'">
          <div class="tab-scroll">
            <structure :road-detail="roadDetail"></structure>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="沿线设施">
        <div class="tab-wrap" v-if="currValue === '沿线设施'">
          <div class="tab-scroll">
            <facility :road-detail="roadDetail"></facility>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as details from '@/components/detail/export'
  import * as api from '@/store/api'
  export default {
    props: {
      detailInfo: {
        type: [Object],
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        tabValue: '0',
        currValue: '事件',
        roadDetail: {}
      }
    },
    mounted () {
      console.log(this.detailInfo)
      this.getRoadDetail()
    },
    methods: {
      tabClick (instance) {
        this.currValue = instance.label
      },
      onClose () {
        this.$emit('onClose')
      },
      getRoadDetail () {
        api.getRoadDetail({
          params: {
            lxbm: this.detailInfo.lxbm,
            xzqhbm: '36'
          }
        }).then(res => {
          this.roadDetail = res.data
          this.roadDetail.zxzh = Math.floor(this.detailInfo.zh * 1000) / 1000
          this.roadDetail.ptx = this.detailInfo.ptx
          this.roadDetail.pty = this.detailInfo.pty
          this.roadDetail.sxxfx = this.detailInfo.sxxfx
        })
      }
    },
    components: {
      ...details
    }
  }
</script>

<style lang="scss">
  @import "../assets/variables.scss";
  .detail-panel-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 580px;
    height: 520px;
    background: $panel-bg-color;
    box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
    overflow: hidden;
    pointer-events: auto;
    .icon-guanbi {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 1;
      font-size: 10px;
      color: #2487bb;
      transition: .3s;
      &:hover {
        color: #ff9c9c;
        cursor: pointer;
      }
    }
    .el-tabs--border-card {
      background: none;
      border: none;
      box-shadow: none;
      > .el-tabs__header {
        background: none;
        border-color: $panel-border-color;
        .el-tabs__item {
          color: $panel-text-color;
          border: none;
          padding: 0 13px;
          font-size: 12px;
          font-family: Helvetica;
          position: relative;
          &.is-active {
            color: $panel-text-highlight-color;
            background: none;
            &:before {
              position: absolute;
              bottom: 0;
              left: 0;
              background: #7adaff;
              content: ' ';
              display: inline-block;
              height: 1px;
              width: 100%;
            }
          }
        }
      }
      >.el-tabs__content {
        padding: 0 5px !important;
      }

    }
    .tab-wrap {
      width: 610px;
      height: 480px;
      overflow-x: hidden;
      overflow-y: auto;
      .tab-scroll {
        width: 570px;
      }
    }
  }
</style>
