<template>
  <div class="main-panel-wrap GuanZhiXinXi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goPath"></span>
    </div>
    <div class="main-panel-body">
      <div class="GuanZhiXinXi-content">
        <div class="GuanZhiXinXi-left">
          <div>62 <span>个</span></div>
          <div>总数量</div>
          <ul>
            <li class="titafont tita-shoufeizhan selected">收费站</li>
            <li class="titafont tita-daolu">道路</li>
          </ul>
        </div>
        <div class="GuanZhiXinXi-right">
          <div class="main-road-bar-info">
            <div>禁止通行</div>
            <div>46</div>
          </div>
          <div class="main-road-bar">
            <div :style="{background: '#a3200b', width: (Math.round(46 / 100 * 100)) + '%'}"></div>
          </div>

          <div class="main-road-bar-info">
            <div>七座及七座以上限行</div>
            <div>16</div>
          </div>
          <div class="main-road-bar">
            <div :style="{background: '#f31a11', width: (Math.round(16 / 100 * 100)) + '%'}"></div>
          </div>

         <!-- <div class="main-road-bar-info">
            <div>正常通行</div>
            <div>12</div>
          </div>
          <div class="main-road-bar">
            <div :style="{background: '#eee800', width: (Math.round(12 / 100 * 100)) + '%'}"></div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '管制信息'
      }
    },
    mounted () {

    },
    methods: {
      goPath () {
        this.$router.push({name: 'control'})
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .GuanZhiXinXi-wrap {

    .GuanZhiXinXi-content {
      display: flex;
      margin-top: 10px;
    }

    .GuanZhiXinXi-left {
      width: 160px;
      div {
        margin-top: 10px;
        &:nth-child(1) {
          font-size: 34px;
          color: $panel-text-highlight-color;
          margin-bottom: 10px;
          span {
            color: $panel-text-color;
            font-size: 14px;
          }
        }

        &:nth-child(2) {
          color: $panel-text-color;
        }
      }
      ul {
        margin-top: 20px;
        li {
          font-size: 14px;
          line-height: 30px;
          transition: .3s;
          &:hover {
            cursor: pointer;
            color: $panel-text-highlight-color;
          }
          &:before {
            margin-right: 10px;
          }
          &.selected {
            color: $panel-text-highlight-color;
          }
        }
      }
    }

    .GuanZhiXinXi-right {
      width: 200px;
    }

    .main-road-bar {
      margin-top: 10px;
      clear: both;
      display: flex;
      width: 100%;
      overflow: hidden;
      border-radius: 3px;
      background: #001b3c;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      div {
        height: 3px;
      }
    }
    .main-road-bar-info {
      height: 25px;
      line-height: 25px;
      div {
        &:first-child {
          float: left;
          color: $panel-text-color;
        }
        &:last-child {
          float: right;
          font-size: 18px;
          color: $panel-text-highlight-color;
        }
      }
    }
  }
</style>
