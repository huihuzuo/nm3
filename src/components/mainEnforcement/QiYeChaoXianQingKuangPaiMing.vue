<template>
  <div class="main-panel-wrap QiYeChaoXianQingKuangPaiMing-wrap">
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
        listHead: ['排名', '名称', '营运车辆', '超限车辆'],
        list: [
          {
            mc: '朝阳企业',
            gzcl: '345',
            lclyl: '23'
          },
          {
            mc: '海淀企业',
            gzcl: '221',
            lclyl: '14'
          },
          {
            mc: '丰台企业',
            gzcl: '210',
            lclyl: '9'
          },
          {
            mc: '昌平企业',
            gzcl: '187',
            lclyl: '12'
          },
          {
            mc: '新城企业',
            gzcl: '73',
            lclyl: '8'
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
  .QiYeChaoXianQingKuangPaiMing-wrap {

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
