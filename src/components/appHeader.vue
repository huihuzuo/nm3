<template>
  <div class="mainHeader-wrap-i">
    <span class="mainHeader-timer"><span class="iconfont icon-logo"></span>江西省普通公路多数据融合及路网综合管理系统</span>
    <span class="mainHeader-setting iconfont icon-shezhi" :class="isShowSetting ? 'selected' : ''" @click="clickEvent(true)">设置</span>
    <div class="mainHeader-setting-wrap" v-if="isShowSetting">
      <div class="mainHeader-setting-content">
        <div class="content-title">
          <span>系统设置</span>
          <span class="iconfont icon-guanbi" @click="clickEvent(false)"></span>
        </div>
        <div class="content-main">
          <div class="top-bg">
            <span></span>
            <span></span>
            <span><label class="top-bg-title">列表设置</label></span>
            <span></span>
            <span></span>
          </div>

          <div class="center-content">
            <el-checkbox v-model="gs">高速</el-checkbox>
            <el-checkbox v-model="ptgd">普通国道</el-checkbox>
            <el-checkbox v-model="ptsd">普通省道</el-checkbox>
          </div>
          <div class="bottom-bg">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ptgd: true,
        ptsd: true,
        gs: false,
        isShowSetting: false
      }
    },
    watch: {
      ptgd () {
        this.checkChange()
      },
      ptsd () {
        this.checkChange()
      },
      gs () {
        this.checkChange()
      }
    },
    mounted () {
    },
    methods: {
      clickEvent (flag) {
        this.isShowSetting = flag
      },
      checkChange () {
        let code = ''
        if (this.ptgd) {
          code += '1,'
        }
        if (this.ptsd) {
          code += '2,'
        }
        if (this.gs) {
          code += '0,'
        }
        code = code.substr(0, code.length - 1)
        this.$store.dispatch('lxType', {
          value: code,
          id: Math.random()
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/variables";

  .mainHeader-wrap-i {
    position: absolute;
    width: 100%;
    height: 58px;
    line-height: 58px;
    padding: 0 20px;
    background-color: rgba(2, 49, 66, 0.9);
    z-index: 1;
    box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
    .mainHeader-timer {
      position: absolute;
      font-size: 19px;
      color: #7adaff;
      height: 58px;
      font-family: Helvetica;
      .icon-logo {
        font-size: 32px;
        color: #7adaff;
        float: left;
        margin-right: 10px;
      }
    }
    .mainHeader-setting{
      display: inline-block;
      float: right;
      color: #6ecaed;
      cursor: pointer;
      font-size: 13px;
      font-family: "Microsoft YaHei";
      &.selected {
        color: #b8deff;
      }
      &:before {
        font-size: 16px;
      }
    }
    .mainHeader-setting-wrap{
      width: calc(100% + 20px);
      height: 100%;
      position: fixed;
      z-index: 6;
      margin-left: -20px;
      background-color: rgba(0, 0, 0, 0.5);
      .mainHeader-setting-content{
        box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
        width: 239px;
        height: 163px;
        position: fixed;
        z-index: 6;
        left: 50%;
        margin-left: -119px;
        background-color: rgba(2, 49, 66, 0.9);
        top: 50%;
        margin-top: -82px;
        .content-title{
          line-height: 33px;
          font-size: 12px;
          color: #b8deff;
          border-bottom: 1px rgba(32, 98, 125, 1) solid;
          span{
            display: inline-block;
          }
          span:nth-child(1){
            padding-left: 15px;
          }
          span:nth-child(2){
            padding-right: 25px;
            float: right;
            width: 10px;
            height: 10px;
            color: #2487bb;
            font-size: 8px;
            cursor: pointer;
          }
        }
        .content-main{
          width: 100%;
          margin-top: 10px;
          height: calc(100% - 55px);
          .top-bg{
            padding: 0 10px;
            height: 15px;
            margin: auto;
            overflow: hidden;
            span{
              display: inline-block;
              float: left;
              height: 100%;
            }
            span:nth-child(1){
              width: 15px;
              background: url('../../static/images/corner.png') no-repeat
            }
            span:nth-child(2){
              width: 65px;
              border-top: 2px #20627d solid;
              margin: 0 4px;
            }
            span:nth-child(3){
              height: 20px;
              width: calc(100% - 50px - 100px - 16px);
              label{
                position: absolute;
                top: 18px;
              }
            }
            span:nth-child(4){
              width: 50px;
              margin: 0 4px;
              border-top: 2px #20627d solid;
            }
            span:nth-child(5){
              width: 15px;
              background: url('../../static/images/corner.png') -18px 0 no-repeat
            }
          }
          .center-content{
            height: 78px;
            padding: 0 40px;
            line-height: 39px;
            color: #7adaff;
            .el-checkbox__inner{
              display: inline-block;
              position: relative;
              border: 1px solid #589fba;
              color: #589fba;
              background: none;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              width: 14px;
              height: 14px;
              z-index: 1;
              -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
              transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
            }
            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
              background-color: #279b4e !important;
              color: #7adaff !important;
              border: 1px #279b4e solid !important;
            }
            .el-checkbox{
              color: #589fba !important;
            }
            .el-checkbox__label{
              font-family: '宋体' !important;
            }
            .el-checkbox__input.is-checked+.el-checkbox__label{
              color: #7adaff !important;
              font-family: '宋体' !important;
            }
            .el-checkbox+.el-checkbox:nth-child(2){
              margin-left: 22px;
            }
            .el-checkbox+.el-checkbox:nth-child(3){
              margin-left: 0px;
            }
            .el-checkbox{
              color: #7adaff;
            }
          }
          .bottom-bg{
            padding: 0 10px;
            height: 15px;
            margin: auto;
            span{
              display: inline-block;
              float: left;
              height: 100%;
            }
            span:nth-child(1){
              width: 15px;
              background: url('../../static/images/corner.png') 0 -18px no-repeat
            }
            span:nth-child(2){
              width: calc(100% - 30px - 8px);
              margin: 0 4px;
              border-bottom: 2px #20627d solid;
              text-align: center;
              position: relative;
            }
            span:nth-child(3){
              width: 15px;
              background: url('../../static/images/corner.png') -18px -18px no-repeat
            }
          }
        }
      }
    }
    .icon-shezhi:before{
      margin-right: 10px;
    }
  }
</style>
