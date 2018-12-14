<template>
  <div class="main-panel-wrap ZongGeShu-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>

      <ul class="ZongGeShu-switch">
        <li><span class="selected">高速公路</span></li>
        <li><span>一级公路</span></li>
        <li><span>二级公路</span></li>
        <li><span>三级公路</span></li>
        <li><span>四级公路</span></li>
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
        title: '总个数',
        total: 8392832
      }
    },
    mounted () {
    },
    methods: {
      formatTotal (v) {
        console.log(v)
        let vString = v.toLocaleString()
        let spans = ''
        for (let item in vString) {
          if (vString[item] === ',') {
            spans += '<span class="no-bg">' + vString[item] + '</span>'
          } else {
            spans += '<span>' + vString[item] + '</span>'
          }
        }
        return spans + '公里'
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .ZongGeShu-wrap {
    width: 500px !important;
    .ZongGeShu-switch {
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
        background-color: #0378a0;
        border-radius: 2px;
        color: $panel-text-highlight-color;
        font-size: 30px;
        text-align: center;
        margin-right: 10px;
        position: relative;
      }

      .no-bg {
        width: 10px;
        background: none;
      }
    }
  }
</style>
