<template>
  <div class="main-panel-wrap WeiXianPin-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
      <div class="WeiXianPin-content">
        <div class="content-item" v-for="item in content">
          <div class="content-title">{{item.name}}</div>
          <div class="content-value">{{item.value}}</div>
          <div class="content-img"><img :src="'../../../static/images/main/' + item.logo" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '危险品车辆统计',
        content: [
          {
            name: '报警车辆数',
            value: 106,
            logo: 'weixianpin_1.png'
          },
          {
            name: 'ADAS报警数',
            value: 10034,
            logo: 'weixianpin_2.png'
          },
          {
            name: '其他报警数',
            value: 3246,
            logo: 'weixianpin_3.png'
          },
          {
            name: '最多报警类型',
            value: '车道偏离',
            logo: 'weixianpin_4.png'
          }
        ]
      }
    },
    mounted () {
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'planproperty'})
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .WeiXianPin-wrap {
    width: 463px !important;
    .WeiXianPin-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 440px;
      margin-top: 20px;
      .content-item {
        width: 200px;
        margin: 20px 0;
        position: relative;
        .content-title {
          font-size: 16px;
          line-height: 20px;
          margin-bottom: 10px;
          color: $panel-text-highlight-color;
        }
        .content-value {
          font-size: 28px;
          line-height: 40px;
        }
        .content-img {
          width: 60px;
          height: 60px;
          position: absolute;
          background: $panel-bg-color;
          right: 0;
          top: 0;
        }

        &:last-child {
          .content-value {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
