<template>
  <div class="main-panel-wrap JiHuaZiJin-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：5:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
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
          <div>{{item.gzcl}}</div>
        </li>
        <li>
          <div>{{item.lclyl}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '重点区域排名',
        listHead: ['排名', '名称', '工作车辆', '里程利用率'],
        list: [
          {
            mc: '朝阳区',
            gzcl: '67',
            lclyl: '96%'
          },
          {
            mc: '海淀区',
            gzcl: '87',
            lclyl: '99%'
          },
          {
            mc: '丰台区',
            gzcl: '122',
            lclyl: '97%'
          },
          {
            mc: '昌平区',
            gzcl: '49',
            lclyl: '87%'
          },
          {
            mc: '新城区',
            gzcl: '47',
            lclyl: '99%'
          }
        ]
      }
    },
    mounted () {
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'planmoney'})
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .JiHuaZiJin-wrap {

    .list-head {
      margin-top: 40px;
      display: flex;
      li {
        font-weight: bold;
        &:nth-child(1) {
          width: 50px;
        }
        &:nth-child(2) {
          width: 120px;
        }
        &:nth-child(3) {
          width: 80px;
        }
        &:nth-child(4) {
          width: 80px;
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
          width: 120px;
        }
        &:nth-child(3) {
          width: 80px;
        }
        &:nth-child(4) {
          width: 80px;
        }
      }
    }
  }
</style>
