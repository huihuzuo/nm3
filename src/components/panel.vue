<template>
  <div class="panel-wrap">
    <div class="panel-header">
      <slot name="head"></slot>
      <span class="panel-title" v-if="title !== undefined">{{title}}</span>
      <div class="panel-switch" v-if="showSwitch">
        <el-switch
          v-model="switchV"
          size="small"
          active-color="#003d70"
          inactive-color="#001c32">
        </el-switch>
      </div>
      <span class="iconfont icon-guanbi" v-if="showClose" @click="close"></span>
    </div>
    <div class="panel-body">
      <slot name="body"></slot>
    </div>
    <!--<div class="angle zs" v-show="position !== 'right'">
      <div class="angle-jj zsj"></div>
    </div>
    <div class="angle zx" v-show="position === 'right'">
      <div class="angle-jj zxj"></div>
    </div>
    <div class="angle ys" v-show="position === 'right'">
      <div class="angle-jj ysj"></div>
    </div>

    <div class="angle yx" v-show="position !== 'right'">
      <div class="angle-jj yxj"></div>
    </div>-->
  </div>
</template>

<script>
  export default {
    props: {
      title: [String, Object],             // 面板头部标题
      position: [String, Object],          // 面板位置，可选项：[left, right]
      value: [String, Object, Boolean],    // v-model 面板开关值
      showClose: {                         // 是否显示关闭按钮
        type: [Object, Boolean],
        default: function () {
          return true
        }
      },
      showSwitch: {                        // 是否显示开关
        type: [Object, Boolean],
        default: function () {
          return false
        }
      }
    },
    watch: {
      value: function (v, ov) {
        this.switchV = v
      },
      switchV: function (v, ov) {
        this.$emit('input', v)
      }
    },
    mounted () {
      this.switchV = this.value
    },
    data () {
      return {
        switchV: false
      }
    },
    methods: {
      close () {
        this.$emit('onClose')
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/variables.scss";
  .panel-wrap {
    position: relative;
    box-shadow: inset 0 0 4px 2px rgba(198, 198, 198, 0.6);
    background-color: #ffffff;
    border-radius: 4px;
    width: 300px;
    height: calc(100% - 20px);
    pointer-events: auto;
    color: #2a2a2a;
    .panel-header {
      border-bottom: 1px solid rgb(241,241,241);
      line-height: 40px;
      height: 40px;
      font-size: 13px;
      position: relative;
      overflow: hidden;
      color: $panel-text-color;
      .panel-title {
        font-size: 14px;
        margin-left: 10px;
        color: $panel-text-color;
      }
      .icon-guanbi {
        float: right;
        margin-right: 10px;
        font-size: 14px;
        color: $panel-text-color;
        transition: .3s;
        &:hover {
          cursor: pointer;
          color: $panel-text-highlight-color;
        }
      }
      span {
        color: $panel-text-highlight-color;
      }
      .panel-switch {
        position: absolute;
        right: 0;
        top: 0;
        .el-switch__button {
          background: $panel-text-color;
        }
      }
      &:before, &:after {
        position: absolute;
        bottom: -3px;
        content: ' ';
        height: 5px;
        width: 5px;
        border-radius: 5px;
        background: $panel-border-color;
        display: none;
      }
      &:after {
        right: -5px;
      }
      &:before {
        left: -5px;
      }
    }
    .panel-body {
      //padding: 0 9px;
      overflow: hidden;
      h3 {
        font-weight: normal;
        color: $panel-text-highlight-color;
        line-height: 30px;
        font-size: 12px;
        //border-top: 1px solid $panel-border-color;
      }
    }
    .angle {
      width: 20px;
      height: 20px;
      position: relative;
      color: $panel-mini-angle;
      .angle-jj {
        width: 12px;
        height: 12px;
        position: absolute;
        color: $panel-mini-angle-jj;
      }
    }
    .zs {
      border-top: 2px solid;
      border-left: 2px solid;
      position: absolute;
      left: -2px;
      top: -2px;
      .zsj {
        border-top: 4px solid;
        border-left: 4px solid;
        left: -3px;
        top: -3px;
      }
    }
    .zx {
      border-bottom: 2px solid;
      border-left: 2px solid;
      position: absolute;
      left: -2px;
      bottom: -2px;
      .zxj {
        border-bottom: 4px solid;
        border-left: 4px solid;
        left: -3px;
        bottom: -3px;
      }
    }
    .ys {
      border-top: 2px solid;
      border-right: 2px solid;
      position: absolute;
      right: -2px;
      top: -2px;
      .ysj {
        border-top: 4px solid;
        border-right: 4px solid;
        right: -3px;
        top: -3px;
      }
    }
    .yx {
      border-bottom: 2px solid;
      border-right: 2px solid;
      position: absolute;
      right: -2px;
      bottom: -2px;
      .yxj {
        border-bottom: 4px solid;
        border-right: 4px solid;
        right: -3px;
        bottom: -3px;
      }
    }
  }

</style>
