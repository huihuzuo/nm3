<template>
  <div class="panel-mini-wrap weather-mini-wrap">

    <div class="panel-mini-header">
      <slot name="head"></slot>

      <span class="panel-mini-title" v-if="title !== undefined">{{title}}</span>

      <div class="panel-switch" v-if="showSwitch">
        <el-switch
          v-model="switchV"
          size="small"
          active-color="#003d70"
          inactive-color="#001c32">
        </el-switch>
      </div>

      <span class="titafont tita-guanbi" v-if="showClose" @click="close"></span>
    </div>

    <div class="panel-mini-body">
      <slot name="body"></slot>
    </div>

    <div class="angle zs" v-show="position !== 'right'">
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
    </div>
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
  @import "../../assets/variables.scss";

  .panel-mini-wrap {
    position: relative;
    background: $panel-bg-color;
    border: 1px solid $panel-border-color;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .2);
    width: 390px;
    pointer-events: auto;
    .panel-mini-header {
      border-bottom: 1px solid $panel-border-color;
      line-height: 45px;
      height: 45px;
      margin: 0 15px;
      font-size: 20px;
      position: relative;
      color: $panel-text-color;
      .panel-mini-title {
        color: $panel-text-color;
      }
      .tita-guanbi {
        float: right;
        font-size: 14px;
        color: $panel-text-color;
        transition: .3s;
        &:hover {
          cursor: pointer;
          color: $panel-text-highlight-color;
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
      }
      &:after {
        right: -5px;
      }
      &:before {
        left: -5px;
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
    }

    .panel-mini-body {
      padding: 10px;
      h3 {
        font-weight: normal;
        color: $panel-text-highlight-color;
        line-height: 30px;
        font-size: 12px;
        border-top: 1px solid $panel-border-color;
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
