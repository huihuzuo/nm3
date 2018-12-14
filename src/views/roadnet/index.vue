<template>
  <div class="monit-wrap">
    <panel>
      <div class="monit-wrap-all">
        <div class="panel-title top-title">
          <div class="title"><span>路况</span></div>
        </div>

        <div class="panel-title-wrap">
          <div class="panel-counts">
            <ul>
              <li v-for="item in counts" @click="detailClick(item)">
                <div class="panel-number">
                  <countTo :startVal="0" :endVal='Math.floor(item.yxlc)' :duration='3000'></countTo>
                  <span class="small-unit">km</span>
                </div>
                <div class="panel-label">{{item.lable}}</div>
              </li>
            </ul>
          </div>
        </div>

        <div class="panel-title bottom-title">
          <div class="title"><span class="no-title"></span></div>
        </div>
      </div>

      <div class="monit-wrap-all">
        <div class="panel-title top-title">
          <div class="title"><span>管制</span></div>
        </div>

        <div class="panel-title-wrap">
          <div class="monit-wrap-content-title">
            <div class="monit-content-title">
              <span class="monitIcon titafont tita-biaoqian"></span><span>收费站</span>
            </div>
            <div class="panel-counts">
              <ul>
                <li v-for="item in gzCounts">
                  <div class="panel-number">
                    <countTo :startVal="0" :endVal='Math.floor(item.yxlc)' :duration='3000'></countTo>
                    <span class="small-unit">座</span>
                  </div>
                  <div class="panel-label clWidth">{{item.lable}}</div>
                </li>
              </ul>
            </div>
          </div>

          <div class="monit-wrap-content-title">
            <div class="monit-content-title">
              <span class="monitIcon titafont tita-biaoqian"></span><span>道路</span>
            </div>
            <div class="cartogram">
              <div class="cartogram-legend">
                <span class="cartogram-label cartogram-title">事件</span>
                <span class="cartogram-label cartogram-title">影响里程</span>
              </div>
              <div class="cartogram-statistics">
                <two-sides-statistics-adjacent :list="list2"></two-sides-statistics-adjacent>
              </div>
              <div class="cartogram-legend-unit">
                <span class="cartogram-label">(起)</span>
                <span class="cartogram-label">(km)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-title bottom-title">
          <div class="title"><span class="no-title"></span></div>
        </div>
      </div>

      <div class="monit-wrap-all">

        <div class="panel-title top-title">
          <div class="title"><span>阻断</span></div>
        </div>

        <div class="panel-title-wrap">
          <div class="monit-wrap-content-title">
            <div class="monit-content-title">
              <span class="monitIcon titafont tita-biaoqian"></span><span>等级</span>
            </div>
            <div class="panel-counts">
              <ul>
                <li v-for="item in eventLevel.value" @click="detailClick(item)">
                  <div class="panel-number">
                    <countTo :startVal="0" :endVal='Math.floor(item.num)' :duration='3000'></countTo>
                    <span class="small-unit">起</span>
                  </div>
                  <div class="panel-label" :style="{color: djColor[item.lable]}">{{item.lable}}</div>
                </li>
              </ul>
            </div>
          </div>

          <div class="monit-wrap-content-title">
            <div class="monit-content-title">
              <span class="monitIcon titafont tita-biaoqian"></span><span>阻断类型</span>
            </div>
            <div class="panel-counts">
              <ul>
                <li v-for="item in eventInfo.value" @click="detailClick(item)">
                  <div class="panel-number">
                    <countTo :startVal="0" :endVal='Math.floor(item.num)' :duration='3000'></countTo>
                    <span class="small-unit">起</span>
                  </div>
                  <div class="panel-label">{{item.lable}}</div>
                </li>
              </ul>
            </div>
          </div>

          <div class="monit-wrap-content-title" v-for="item in data">
            <div class="monit-content-title">
              <span class="monitIcon titafont tita-biaoqian"></span><span>{{item.lable}} / 起</span>
            </div>
            <div class="monit-body">
              <ul class="monit-ul clearfix">
                <li v-for="value in item.value">
                  <div style="display: inline-block" :style="{color: djColor[value.lable]}">{{value.lable}}</div><span class="gs">{{value.num}}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="panel-title bottom-title">
          <div class="title"><span class="no-title"></span></div>
        </div>

      </div>
    </panel>
  </div>
</template>

<script>
  import monitList from './monitList'
  import twoSidesStatisticsAdjacent from '../../components/main/twoSidesStatisticsAdjacent'

  export default {
    data () {
      return {
        monitShow: false,
        monitTitle: '',
        list2: {
          column: 1,
          content: [
            {
              label: '管制道路',
              leftContent: [
                {
                  value: 12,
                  unit: '起',
                  color: '#fa3601'
                }
              ],
              rightContent: [
                {
                  value: 300,
                  unit: 'km',
                  color: '#fa3601'
                }
              ]
            },
            {
              label: '禁止通行',
              leftContent: [
                {
                  value: 15,
                  unit: '起',
                  color: '#ff8a00'
                }
              ],
              rightContent: [
                {
                  value: 32,
                  unit: 'km',
                  color: '#ff8a00'
                }
              ]
            },
            {
              label: '半幅封闭',
              leftContent: [
                {
                  value: 7,
                  unit: '起',
                  color: '#ffc200'
                }
              ],
              rightContent: [
                {
                  value: 6,
                  unit: 'km',
                  color: '#ffc200'
                }
              ]
            },
            {
              label: '半幅部分车道封闭',
              leftContent: [
                {
                  value: 7,
                  unit: '起',
                  color: '#0099f7'
                }
              ],
              rightContent: [
                {
                  value: 6,
                  unit: 'km',
                  color: '#0099f7'
                }
              ]
            }
          ]
        },
        counts: [
          {'lable': '总里程', 'yxlc': 2541, 'unit': '公里'},
          {'lable': '中断里程', 'yxlc': 241, 'unit': '公里'},
          {'lable': '缓行里程', 'yxlc': 541, 'unit': '公里'}
        ],
        gzCounts: [
          {'lable': '管制收费站', 'yxlc': 241, 'unit': '座'},
          {'lable': '禁止所有车辆', 'yxlc': 41, 'unit': '座'},
          {'lable': '禁止七座(含七座)', 'yxlc': 173, 'unit': '座'}
        ],
        textColor: {
          '总里程': '#0f0',
          '中断里程': '#0f0',
          '缓行里程': '#0f0'
        },
        gzColor: {
          '管制收费站': '#E74926',
          '禁止所有车辆': '#E74926',
          '禁止七座(含七座)': '#E74926'
        },
        djColor: {
          '一级': '#E74926',
          '二级': '#F08F35',
          '三级': '#F6C443',
          '四级': '#4298F0'
        },
        eventLevel: {
          'lable': '等级',
          'value': [
            {'lable': '一级', 'num': 21, 'unit': '起'},
            {'lable': '二级', 'num': 41, 'unit': '起'},
            {'lable': '三级', 'num': 53, 'unit': '起'},
            {'lable': '四级', 'num': 4, 'unit': '起'}
          ]
        },
        eventInfo: {
          'lable': '阻断类型',
          'value': [
            {'lable': '涉桥', 'num': 21, 'unit': '起'},
            {'lable': '涉隧', 'num': 11, 'unit': '起'},
            {'lable': '跨省', 'num': 53, 'unit': '起'}
          ]
        },
        data: [
          {
            'lable': '事故类型',
            'value': [
              {'lable': '事故灾害', 'num': 21, 'unit': '起'},
              {'lable': '气象灾害', 'num': 11, 'unit': '起'},
              {'lable': '地质灾害', 'num': 53, 'unit': '起'},
              {'lable': '重大灾害', 'num': 4, 'unit': '起'},
              {'lable': '其他', 'num': 31, 'unit': '起'}
            ]
          }
        ]
      }
    },
    methods: {
      detailClick (item) {
        console.log(item)
        this.$store.dispatch('SHOW_MONIT_LIST', {'monitListShow': true, 'monitTitle': item.lable})
      }
    },
    components: {
      monitList,
      twoSidesStatisticsAdjacent
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";

  .monit-wrap {
    margin: 20px;
    .panel-label {
      border: none !important;
    }
    .monit-wrap-all {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .clWidth {
        max-width: 112px !important;
      }
      .panel-title {
        .top {
          &:before {
            width: 135px !important;
          }
          &:after {
            width: 135px !important;
          }
        }
      }

      .monit-wrap-content-title {

        .monit-content-title {
          height: 40px;
          line-height: 40px;
          text-align: left;
          span {
            color: $panel-text-color !important;
          }
          .monitIcon {
            padding: 0 10px;
          }
        }
      }
      .monit-body {
        .monit-ul {
          margin: 0 15px;
          flex-wrap: wrap;
          display: flex;
          li {
            width: 168px;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            cursor: pointer;
            transition: .3s;
            border-radius: 3px;
            text-align: left;
            &.single-line {
              width: 336px;
            }
            .gs {
              color: $panel-text-highlight-color;
              float: right;
            }
            &:hover {
              background: $panel-hover-bg-color;
            }
          }
        }
      }
      .cartogram{
        width: 100%;
        line-height: 22px;
        .cartogram-legend{
          width: 100%;
          height: 22px;
          .cartogram-label{
            width: 50%;
            height: 100%;
            display: inline-block;
            float: left;
            text-align: center;
          }
          .cartogram-title{
            font-size: 14px;
            color: $panel-text-color;
            background: url('../../../static/images/sjbq.png') no-repeat 24px 0;
          }
          .cartogram-label-type{
            width: 50%;
            display: inline-block;
            float: left;
            text-align: center;
            &:last-child{
              .cartogram-label-type-num{
                color: #ff0402!important;
              }
            }
            .cartogram-label-type-title{
              color: $panel-text-color;
              font-size: 14px;
            }
            .cartogram-label-type-num{
              font-size: 16px;
            }
            .cartogram-label-type-unit{
              color: $panel-text-color;
              font-size: 12px;
            }
          }
        }
        .cartogram-statistics{
          .twoSidesStatisticsLabelAdjacent-wrap-item-left {
            width: calc((100% - 85px) / 2) !important;
            .twoSidesStatisticsLabelAdjacent-wrap-item-left-label-num{
              float: left;
              color: #fff;
              font-size: 16px;
            }
          }
          .twoSidesStatisticsLabelAdjacent-wrap-item-right {
            width: calc((100% - 85px) / 2) !important;
            .twoSidesStatisticsLabelAdjacent-wrap-item-right-label-num{
              float: right;
              color: #fff;
              font-size: 16px;
            }
          }
          .twoSidesStatisticsLabelAdjacent-wrap-item-label{
            width: 65px !important;
          }
          .twoSidesStatisticsLabelAdjacent-wrap-list:last-child{
            .twoSidesStatisticsLabelAdjacent-wrap-item-label{
              height: 50px;
              overflow: hidden;
              line-height: 20px;
            }
            .twoSidesStatisticsLabelAdjacent-wrap-item-left{
              height: 40px;
              overflow: hidden;
              line-height: 20px;
            }
            .twoSidesStatisticsLabelAdjacent-wrap-item-right{
              height: 40px;
              overflow: hidden;
              line-height: 20px;
            }
          }

        }
        .cartogram-legend-unit{
          height: 37px;
          line-height: 37px;
          width: 308px;
          margin: auto;
          .cartogram-label:nth-child(1){
            height: 100%;
            display: inline-block;
            float: left;
            text-align: left;
          }
          .cartogram-label:nth-child(2){
            height: 100%;
            display: inline-block;
            float: right;
            text-align: right;
          }
        }
      }

      .monit-three {
        display: flex;
        flex-wrap: wrap;
        .monit-l, .monit-r {
          width: 133px;
          ul {
            li {
              border-radius: 3px;
              transition: .3s;
              span {
                font-size: 18px;
                font-weight: bold;
              }
              &:last-child {
                margin-top: 15px;
                line-height: 30px;
                height: 30px;
              }
              &:first-child {
                &:hover {
                  background: none;
                  cursor: default;
                }
              }
              &:hover {
                background: $panel-hover-bg-color;
                cursor: pointer;
              }
            }
          }
        }
        .monit-c {
          width: 100px;
        }
        ul {
          li {
            height: 30px;
            line-height: 30px;
            &:first-child {
              margin-bottom: 10px;
            }
            &:last-child {
              margin-top: 10px;
              height: 60px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
</style>
