<template>
  <div class="mainHeader-wrap">
    <span class="mainHeader-timer"><img src="../../static/images/weather/weather_1.png" alt="">{{time}}</span>

    <ul class="mainHeader-nav">
      <li v-for="item in nav"><span :class="{true: 'selected'}[item.name === selected]" @click="goRouter(item)">{{item.name}}</span></li>
    </ul>

    <!--<ul class="mainHeader-warn">
      <li>
        <el-badge :value="12" class="mainHeader-badge">
          <span class="titafont tita-baojing"></span>
        </el-badge>
        <span></span>
        </li>
    </ul>-->
  </div>
</template>

<script>
  export default {
    props: {
      selected: [String]
    },
    data () {
      return {
        time: '',
        nav: [
          {
            name: '运管',
            router: 'mainTransport'
          },
          {
            name: '公路',
            router: 'mainRoad'
          },
          {
            name: '执法',
            router: 'mainEnforcement'
          }
        ]
      }
    },
    mounted () {
      this.initDatetime()
    },
    methods: {
      initDatetime () {
        setInterval(() => {
          this.time = this.$moment().format('YYYY年M月D日 ddd hh:mm')
        }, 1000)
      },
      goRouter (i) {
        this.$router.push({name: i.router})
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/variables";
  .mainHeader-wrap {
    height: 68px;
    line-height: 66px;
    padding: 0 20px;
    background: url('../../static/images/main/header.png') center;
    .mainHeader-timer {
      position: absolute;
      font-size: 16px;
      img {
        float: left;
        margin-top: 21px;
        margin-right: 10px;
      }
    }
    .mainHeader-nav {
      width: 300px;
      display: flex;
      flex-wrap: nowrap;
      margin: 0 auto;
      li {
        width: 100px;
        text-align: center;
        span {
          display: inline-block;
          font-size: 26px;
          transition: .3s;
          &:hover {
            cursor: pointer;
            font-weight: bold;
            transform: scale(1.2);
          }
          &.selected {
            font-weight: bold;
            transform: scale(1.2);
          }
        }
      }
    }
    .mainHeader-warn {
      position: absolute;
      top: 0;
      right: 20px;
      li {
        span {
          font-size: 16px;
          text-align: center;
          &:before {
            display: inline-block;
            background: $panel-text-color;
            color: $panel-text-highlight-color;
            border-radius: 50px;
            height: 28px;
            width: 28px;
            line-height: 28px;
            font-size: 18px;
          }
        }
      }
    }

    .mainHeader-badge {
      line-height: 28px;
      margin-right: 10px;
    }
  }
</style>
