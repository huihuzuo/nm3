<template>
  <div class="main-panel-wrap YongDuPaiMing-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:45）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goPath"></span>
    </div>
    <div class="main-panel-body">
      <ul class="main-panel-switch">
        <li><span class="selected">道路</span></li>
        <li><span>收费站</span></li>
      </ul>
      <ul class="list-line list-head">
        <li v-for="item in listHead">{{item}}</li>
      </ul>
      <ul class="list-line" v-for="(item, index) in list">
        <li>
          <div>{{index + 1}}</div>
        </li>
        <li>
          <div>{{item.lxbm}}-{{item.lxmc}}</div>
          <div>{{item.fx}}</div>
        </li>
        <li>
          <div>{{item.qdzh}}</div>
          <div>{{item.zdzh}}</div>
        </li>
        <li>
          <div>{{item.yxlc}} 公里</div>
          <div :style="{color: textColor[item.yzdj]}">{{item.yzdj}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '拥堵排名',
        listHead: ['排名', '路线', '桩号', '里程/影响'],
        list: [
          {
            lxbm: '宁上高速',
            lxmc: 'G1514',
            fx: '双向',
            qdzh: 'K300',
            zdzh: 'K352+966',
            yxlc: '23.1',
            yzdj: '严重拥堵'
          },
          {
            lxbm: '济广高速',
            lxmc: 'G35',
            fx: '上行',
            qdzh: 'K940',
            zdzh: 'K1574+623',
            yxlc: '23.1',
            yzdj: '拥堵'
          },
          {
            lxbm: '龙河高速',
            lxmc: 'G4511',
            fx: '上行',
            qdzh: 'K0',
            zdzh: 'K29+698',
            yxlc: '29.698',
            yzdj: '缓行'
          },
          {
            lxbm: '杭瑞高速',
            lxmc: 'G56',
            fx: '上行',
            qdzh: 'K241+443',
            zdzh: 'K556+37',
            yxlc: '315',
            yzdj: '畅通'
          },
          {
            lxbm: '昌韶高速',
            lxmc: 'G6011',
            fx: '上行',
            qdzh: 'K0',
            zdzh: 'K483+001',
            yxlc: '483.001',
            yzdj: '畅通'
          }
        ],
        textColor: {
          '严重拥堵': '#aa2218',
          '拥堵': '#de443b',
          '缓行': '#f1a142',
          '畅通': '#57ba3b'
        }
      }
    },
    mounted () {

    },
    methods: {
      goPath () {
        this.$router.push({name: 'road'})
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .YongDuPaiMing-wrap {
    .list-head {
      margin-top: 40px;
      display: flex;
      li {
        font-weight: bold;
        &:nth-child(1) {
          width: 50px;
        }
        &:nth-child(2) {
          width: 150px;
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
          width: 150px;
        }
        &:nth-child(3) {
          width: 80px;
        }
        &:nth-child(4) {
          width: 80px;
        }
        div {
          line-height: 25px;
          height: 25px;
        }
      }
    }
  }
</style>
