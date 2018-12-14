<template>
  <div class="main-panel-wrap ZhongDianBanXianPaiMing-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goPath"></span>
    </div>
    <div class="main-panel-body">
      <ul class="main-panel-switch">
        <li v-for="item in switchs"><span :class="{true: 'selected'}[item.name == type]" @click="switchClick(item.name)">{{item.name}}</span></li>
      </ul>
      <ul class="list-line list-head">
        <li v-for="item in listHead">{{item}}</li>
      </ul>
      <ul class="list-line" v-for="(item, index) in list">
        <li>
          <div>{{index + 1}}</div>
        </li>
        <li>
          <div>{{item.mc}}</div>
        </li>
        <li>
          <div>{{item.kws}}</div>
        </li>
        <li>
          <div>{{item.szl}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '重点班线排名',
        listHead: ['排名', '名称', '客位数', '实载率'],
        type: '班车',
        switchs: [
          {
            name: '班车'
          },
          {
            name: '客运车'
          }
        ],
        list: [
          {
            mc: '吐鲁番-巴彦淖尔',
            kws: '2392',
            szl: '99%'
          },
          {
            mc: '北京-海拉尔',
            kws: '283',
            szl: '80%'
          },
          {
            mc: '北京-上海',
            kws: '1923',
            szl: '92%'
          },
          {
            mc: '北京-杭州',
            kws: '1877',
            szl: '95%'
          }
        ]
      }
    },
    mounted () {

    },
    methods: {
      switchClick (type) {
        this.type = type
        if (type === '班车') {
        } else {
        }
      },
      goPath () {
        this.$router.push({name: 'road'})
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .ZhongDianBanXianPaiMing-wrap {
    .list-head {
      margin-top: 40px;
      display: flex;
      text-align: center;
      li {
        font-weight: bold;
        &:nth-child(1) {
          width: 50px;
        }
        &:nth-child(2) {
          width: 150px;
        }
        &:nth-child(3) {
          width: 65px;
        }
        &:nth-child(4) {
          width: 60px;
        }
      }
    }
    .list-line {
      display: flex;
      line-height: 50px;
      height: 50px;
      border-bottom: 1px solid $panel-border-color;
      li {
        color: $panel-text-color;
        &:nth-child(1) {
          width: 50px;
          div {
            width: 25px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            margin-top: 13px;
            margin-left: 13px;
            border-radius: 30px;
            background: $index-bg;
            color: $index-color;
          }
        }
        &:nth-child(2) {
          width: 150px;
        }
        &:nth-child(3) {
          text-align: center;
          width: 65px;
        }
        &:nth-child(4) {
          text-align: center;
          width: 60px;
        }
      }
    }
  }
</style>
