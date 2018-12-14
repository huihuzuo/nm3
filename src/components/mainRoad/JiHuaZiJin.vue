<template>
  <div class="main-panel-wrap JiHuaZiJin-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：2017年）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
      <ul class="list-lines list-heads">
        <li v-for="item in listHead">{{item}}</li>
      </ul>
      <ul class="list-lines" v-for="item in list">
        <li >{{item.xmmc}}</li>
        <li >{{item.ztz}}</li>
        <li >{{item.cgs}}</li>
        <li >{{item.rys}}</li>
        <li >{{item.dfzc}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '计划资金',
        listHead: ['项目', '总投资(亿)', '车购税', '省级补助', '地方自筹'],
        list: [
          {
            xmmc: '国道',
            ztz: '100',
            cgs: '20',
            rys: '6',
            dfzc: '70'
          },
          {
            xmmc: '省道',
            ztz: '130',
            cgs: '23',
            rys: '8',
            dfzc: '100'
          },
          {
            xmmc: '农村公路',
            ztz: '30',
            cgs: '8',
            rys: '3',
            dfzc: '20'
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
    .list-heads {
      margin-top: 20px;
      display: flex;
      text-align: center;
      li {
        width: 100px;
        font-weight: bold;
      }
    }
    .list-lines {
      display: flex;
      line-height: 50px;
      text-align: center;
      height: 50px;
      border-bottom: 1px solid $panel-border-color;
      li {
        width: 100px;
        color: $panel-text-color;
      }
    }
  }
</style>
