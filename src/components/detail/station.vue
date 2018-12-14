<template>
  <div class="in-station-wrap">
    <div class="in-station-wrap-name">
      <span class="iconfont icon-danchuangyangshi">交调站点</span>
      <div class="station-qh">
        <type-tab
          :show-type="false"
          :distance-default="distanceDefault"
          @distanceTypeChange="distanceTypeChange"
          @zbssConfirm="zbssConfirm"
          @yxssConfirm="yxssConfirm"></type-tab>
      </div>
    </div>
    <div class="in-station-body" v-if="dataTypes.length >= 1">
      <div class="event-type">
        <div v-for="type in dataTypes"
             :class="type.value === dataType ? 'selected' : ''"
             @click="dataTypeClick(type)"><span>{{type.name}}</span></div>
      </div>

      <div class="in-station-table">
        <detail-table :data="data" :field="field"></detail-table>
      </div>

      <div class="in-station-traffic-statistical">
        <div id="jtl_line"></div>
      </div>

      <div class="in-station-traffic-style">
        <div id="traffic_pie"></div>
      </div>
    </div>

    <div class="in-station-body detail-zwsj" v-if="dataTypes.length < 1"></div>

  </div>
</template>

<script>
  import * as api from '@/store/api'
  import typeTab from './typeTab'
  import detailTable from './detailTable'
  import moment from 'moment'
  export default {
    props: {
      roadDetail: {
        type: [Object],
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        zbssValue: 5,
        yxssValue: [0, 0],
        point: 'POINT (114.77891 25.614875)',
        dataTypes: [],
        dataType: '',
        lxbm: '',
        jtlData: [],
        data: [],
        field: [],
        getPieData: [],
        getLineData: [],
        pieLegend: [],
        tableType: 'GIS_JDZ',
        distanceDefault: [
          {
            min: 0,
            max: 0,
            value: 0
          },
          {
            min: 0,
            max: 0,
            value: [0, 0]
          }
        ],
        distanceType: '1'
      }
    },
    watch: {
      data: function (v, ov) {
        if (v.length === 0) return
        setTimeout(() => {
          let parmas = {
            parameter: {
              gczbs: v.gczbs,
              year: 2018,
              startTime: moment().add(-1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
              endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            type: 'time'
          }
          this.getPieLineChart(parmas)
        }, 500)
      }
    },
    mounted () {
      this.distanceDefault = [
        {
          min: 0.5,
          max: 20,
          value: this.zbssValue
        },
        {
          min: this.roadDetail.qdzh,
          max: this.roadDetail.zdzh,
          value: [Number(this.roadDetail.zxzh) - 5, Number(this.roadDetail.zxzh) + 5]
        }
      ]
      this.point = 'POINT (' + this.roadDetail.ptx + ' ' + this.roadDetail.pty + ')'
      this.yxssValue = [Number(this.roadDetail.zxzh) - 5, Number(this.roadDetail.zxzh) + 5]
      this.lxbm = this.roadDetail.lxbm
      this.getField({code: 'jtl'})
    },
    methods: {
      // 获取周边资源数据
      getZbData (_params) {
        api.getRIM(_params).then(res => {
          let datas = res.data.result
          if (datas.length !== 0) {
            let dataTypes = []
            for (let i = 0; i < datas.length; i++) {
              dataTypes.push(
                {
                  name: datas[i].name,
                  value: datas[i].id
                }
              )
            }
            this.dataTypes = dataTypes
            this.dataType = dataTypes[0].value
            this.zbssDetail({id: this.dataType})
            setTimeout(() => {
              let parmas = {
                parameter: {
                  gczbs: this.data.gczbs,
                  year: 2018,
                  startTime: moment().add(-1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                  endTime: moment().format('YYYY-MM-DD HH:mm:ss')
                },
                type: 'time'
              }
              this.getPieLineChart(parmas)
            }, 500)
          } else {
            this.dataTypes = []
            this.data = []
          }
        })
      },
      zbssDetail (_params) {
        api.getJtlDetail(_params).then(res => {
          if (res.data === '') {
            this.data = []
          } else {
            this.data = res.data
          }
        })
      },
      getYxData (_params) {
        this.getList(_params)
      },
      // 数据列表
      getList (_params) {
        api.getStaticon(_params).then(res => {
          this.jtlData = res.data.rows
          if (res.data.rows.length !== 0) {
            this.data = res.data.rows[0]
            this.dataType = res.data.rows[0].id
            if (this.jtlData.length !== 0) {
              this.getYS(this.jtlData)
              // setTimeout(() => {
              //   let parmas = {
              //     parameter: {
              //       gczbs: this.data.gczbs,
              //       year: 2018,
              //       startTime: moment().add(-1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
              //       endTime: moment().format('YYYY-MM-DD HH:mm:ss')
              //     },
              //     type: 'time'
              //   }
              //   this.getPieLineChart(parmas)
              // }, 500)
            } else {
              this.dataTypes = []
            }
          } else {
            this.dataTypes = []
            this.data = []
          }
        })
      },
      // 数据列表 表头数据
      getYS (data) {
        let dataTypes = []
        for (let i = 0; i < data.length; i++) {
          dataTypes.push(
            {
              name: data[i].ysmc,
              value: data[i].id
            }
          )
          this.dataTypes = dataTypes
        }
      },
      // 对应字段数据
      getField (_params) {
        api.getField(_params).then(res => {
          this.field = res.data
          if (this.distanceType === '0') {
            this.getZbData({
              tables: this.tableType,
              center: this.point,
              distance: this.zbssValue,
              current: 1,
              limit: 10
            })
          } else {
            this.getYxData({
              current: 1,
              limit: 10,
              params: {
                lxbm: this.lxbm,
                zhfwMin: this.yxssValue[0],
                zhfwMax: this.yxssValue[1]
              }
            })
          }
        })
      },
      // 数据切换
      dataTypeClick (type) {
        this.dataType = type.value
        this.zbssDetail({id: type.value})
      },
      // 距离类型改变事件
      distanceTypeChange (code) {
        this.distanceType = code
        this.getField({code: 'jtl'})
      },
      // 周边设施确认
      zbssConfirm (value) {
        this.zbssValue = value
        this.getField({code: 'jtl'})
      },
      // 沿线设施确认
      yxssConfirm (value) {
        this.yxssValue = value
        this.getField({code: 'jtl'})
      },
      // 获取饼图与折线图数据
      getPieLineChart (parmas) {
        api.getPieLineChart(parmas).then(res => {
          let getPieData = res.data.piechart.records
          let getLineData = res.data.polylinde.records
          this.getLineSeries(getLineData)
          this.getPieSeries(getPieData)
        })
      },
      // 格式化折线图数据
      getLineSeries (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].data) {
            data[i].data = JSON.parse(data[i].data)
          } else {
            data[i].data = []
          }
          data[i].type = 'line'
          delete data[i].dashStyle
        }
        this.getLineData = data
        this.initLineChart()
      },
      // 格式化饼图数据
      getPieSeries (data) {
        let pieData = []
        let pieLegend = []
        data = data[0].data
        for (let i = 0; i < data.length; i++) {
          pieData.push(
            {value: data[i][1], name: data[i][0]}
          )
          pieLegend.push(data[i][0])
        }
        this.getPieData = pieData
        this.pieLegend = pieLegend
        this.initPieChart()
      },
      // 生成折线图
      initLineChart () {
        let myChart = this.$echarts.init(document.getElementById('jtl_line'))
        let colors = ['#4E9169', '#7adaff']
        let option = {
          color: colors,
          title: {
            text: '交通流量实时数据统计',
            textStyle: {
              color: '#2c99c3'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['当前时间', '查询时间'],
            left: 'right',
            top: '20px',
            textStyle: {
              color: 'rgba(122, 218, 255, 0.84)'
            }
          },
          xAxis: {
            type: 'category',
            data: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
            axisLine: {
              lineStyle: {
                color: '#7adaff'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            name: '辆',
            nameTextStyle: {
              align: 'left'
            },
            data: ['0', '50', '100', '150', '200'],
            axisLine: {
              show: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisTick: {
              show: false
            },
            formatter: {},
            splitLine: {
              lineStyle: {
                color: '#20627d'
              }
            }
          },
          series: this.getLineData
        }
        myChart.setOption(option)
      },
      // 生成饼图
      initPieChart () {
        let myChart = this.$echarts.init(document.getElementById('traffic_pie'))
        let colors = ['#d7533e', '#6dcbd6', '#98ffd7', '#ffffff', '#85edfa', '#ddbd68', '#d8ba8e', '#0aa2b9', '#be8b82']
        let option = {
          color: colors,
          title: {
            text: '车辆类型统计',
            left: 'left',
            textStyle: {
              color: '#2c99c3'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            top: '30%',
            right: '25%',
            width: '200px',
            padding: 10,
            itemWidth: 14,
            itemHeight: 11,
            itemGap: 13,
            data: this.pieLegend,
            textStyle: {
              color: '#50afff',
              padding: [0, 5]
            }
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['20%', '50%'],
              label: {
                normal: {
                  show: false
                }
              },
              data: this.getPieData
            }
          ]
        }
        myChart.setOption(option)
      }
    },
    components: {
      typeTab,
      detailTable
    }
  }
</script>

<style lang="scss">
  .in-station-wrap {
    .in-station-wrap-name {
      line-height: 44px;
      height: 44px;
      width: 570px;
      background-color: rgba(2, 35, 47, 0.6);
      box-shadow: 0px 1px 1px 0px
      rgba(27, 107, 148, 0.31);
      .iconfont {
        font-size: 14px;
        padding: 0 10px;
        &:before {
          margin-right: 5px;
        }
      }
      .station-qh{
        float: right;
        .type-tab-wrap .distance-type {
          height: 44px !important;
          line-height: 44px !important;
          div:last-child {
            &:after {
              margin-top: 16px !important;
            }
          }
        }
      }
    }
    .in-station-body {
      padding: 10px;
      &.detail-zwsj {
        height: 420px;
        background: url('../../../static/images/zwsj2.png') no-repeat center;
      }
      .event-type {
        border-radius: 4px;
        line-height: 28px;
        margin: 10px 0;
        div {
          position: relative;
          display: inline-block;
          width: 110px;
          span {
            position: relative;
          }
          &.selected {
            color: #b8deff;
            &:before {
              position: absolute;
              left: 0;
              top: 0;
              display: inline-block;
              content: ' ';
              width: 124px;
              height: 28px;
              border-radius: 50%/50%;
              filter: blur(10px);
            }
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
      .in-station-table {
        width: 550px;
        margin-bottom: 15px;
        table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid rgba(32, 98, 125, 0.6);
          tr {
            line-height: 30px;
            th {
              position: relative;
              color: #5194ae;
              &:after {
                content: ':';
                position: absolute;
                right: 10px;
              }
            }
            td {
              color: #7adaff;
            }
          }
        }
      }

      .in-station-traffic-statistical {
        border-bottom: 1px solid rgba(80, 175, 255, 0.2);
        margin-bottom: 15px;
        #jtl_line {
          width: 550px;
          height: 300px;
          color: #7adaff;
        }
      }
      .in-station-traffic-style {
        #traffic_pie {
          width: 550px;
          height: 300px;
          color: #7adaff;
        }
      }
    }

  }
</style>
