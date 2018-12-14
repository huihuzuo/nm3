<template>
  <div class="main-panel-wrap ZongLiCheng-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>

      <ul class="ZongLiCheng-switch">
        <!--<li><span class="selected">总里程</span></li>-->
        <!--<li><span>高速</span></li>-->
        <!--<li><span>普通公路</span></li>-->
        <!--<li><span>农村公路</span></li>-->
        <li v-for="(i, index) in itemList"><span :class="{'selected': selectedIndex === index}" @click="getTab(i, index)">{{i.title}}</span></li>
        <li><span class="titafont tita-gengduo" @click="goTo()"></span></li>
      </ul>
    </div>
    <div class="main-panel-body">
      <div class="totals" v-html="formatTotal(total)"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '总里程',
        total: 161908,
        selectedIndex: 0,
        itemList: [
          {
            title: '总里程',
            total: 161908
          },
          {
            title: '高速',
            total: 5894
          },
          {
            title: '普通公路',
            total: 18550
          },
          {
            title: '农村公路',
            total: 137464
          }

        ]
      }
    },
    mounted () {
      this.total = this.itemList[0].total
    },
    methods: {
      formatTotal (v) {
        let vString = v.toString()
        let spans = ''
        for (let item in vString) {
          spans += '<span>' + vString[item] + '</span>'
          // spans += '<span>' + vString[(vString.length - 1) - item] + '</span>'
        }
        return spans + '公里'
      },
      goTo () {
        // window.open('http://211.101.37.253:8077/jxzs/indexMain.html#/in/app/main/default', '_blank')
        this.$router.push({
          path: '/index/jihua/basic'
        })
      },
      getTab (i, index) {
        this.selectedIndex = index
        this.total = i.total
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .ZongLiCheng-wrap {
    .ZongLiCheng-switch {
      float: right;
      li {
        float: left;
        margin-left: 5px;
        &:first-child {
          margin-left: 0;
        }
        span {
          display: inline-block;
          height: 24px;
          line-height: 24px;
          padding: 0 5px;
          font-size: 14px;
          text-align: center;
          border-radius: 3px;
          color: $panel-text-color;
          box-shadow: 0 0 10px 1px #07173a inset;
          border: 1px solid $panel-border-color;
          transition: .3s;
          &:hover {
            cursor: pointer;
            box-shadow: 0 0 10px 1px #01abf3 inset;
          }
          &.selected {
            box-shadow: 0 0 10px 1px #01abf3 inset;
          }
        }
      }
    }

    .totals {
      margin-top: 30px;
      color: $panel-text-highlight-color;
      font-size: 18px;
      span {
        display: inline-block;
        width: 30px;
        height: 42px;
        line-height: 42px;
        background-color: #43e1e3;
        border-radius: 2px;
        color: $panel-text-highlight-color;
        font-size: 30px;
        text-align: center;
        margin-right: 10px;
        position: relative;
      }
    }
  }
</style>
