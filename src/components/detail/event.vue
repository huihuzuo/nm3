<template>
  <div class="detail-event-wrap">
    <type-tab
      :data-types="dataTypes"
      @dataTypeChange="dataTypeChange"
      :distance-default="distanceDefault"
      @distanceTypeChange="distanceTypeChange"
      @zbssConfirm="zbssConfirm"
      @yxssConfirm="yxssConfirm"
    ></type-tab>
    <div class="detail-event-body"  v-if="datas.length >= 1">
      <ul class="clearfix">
        <li v-for="item in datas" :title="item.name || item.brief" @click="itemClick(item)" :class="item === currItem ? 'selected' : ''">{{item.name || item.eventName || item.brief}}</li>
      </ul>
      <detail-table :data="tableData" :field="field"></detail-table>
    </div>
    <div class="detail-event-body detail-zwsj" v-if="datas.length < 1">
    </div>
  </div>
</template>
<script>
  import typeTab from './typeTab'
  import detailTable from './detailTable'
  import * as api from '@/store/api'

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
        datas: [],
        dataStyle: {
        },
        tableData: [],
        field: [],
        currItem: {},
        zbssValue: 5,
        yxssValue: [0, 0],
        point: 'POINT 20(113.80994978780194 27.89254988391845)',
        lxbm: '',
        sxxfx: '',
        type: {
          GIS_BLOCK: 'block',
          EVENT_GAODE: 'event_gaode'
        },
        dataTypes: [
          {
            code: 'GIS_BLOCK',
            name: '行业'
          },
          {
            code: 'EVENT_GAODE',
            name: '高德'
          }
        ],
        dataType: 'GIS_BLOCK',
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
      roadDetail: function (v, ov) {
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
        this.point = 'POINT 20(' + this.roadDetail.ptx + ' ' + this.roadDetail.pty + ')'
        this.yxssValue = [Number(this.roadDetail.zxzh) - 5, Number(this.roadDetail.zxzh) + 5]
        this.lxbm = this.roadDetail.lxbm
        this.sxxfx = this.roadDetail.sxxfx
        this.getEventField({code: 'block'})
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
      this.point = 'POINT 20(' + this.roadDetail.ptx + ' ' + this.roadDetail.pty + ')'
      this.yxssValue = [Number(this.roadDetail.zxzh) - 5, Number(this.roadDetail.zxzh) + 5]
      this.lxbm = this.roadDetail.lxbm
      this.sxxfx = this.roadDetail.sxxfx
      this.getEventField({code: 'block'})
    },
    methods: {
      // 获取周边资源数据
      getZbData (_params) {
        api.getRIM(_params).then(res => {
          this.datas = res.data.result
          this.currItem = this.datas[0]
          if (this.datas.length !== 0) {
            this['get' + this.dataType + 'Detail'](this.currItem.id)
          } else {
            this.tableData = []
          }
        })
      },
      // 获取沿线设施
      getYxData (_params) {
        switch (this.type[this.dataType]) {
          case 'block':
            // 行业沿线搜索
            this.getAlongSearch(_params)
            break
          case 'event_gaode':
            // 高德事件沿线搜索
            this.getGaodeEventListInfo(_params)
            break
        }
      },
      // 行业沿线搜索
      getAlongSearch (_params) {
        api.getAlongSearch(_params).then(res => {
          this.datas = res.data.result
          this.currItem = this.datas[0]
          if (this.datas.length !== 0) {
            this['get' + this.dataType + 'Detail'](this.currItem.id)
          }
        })
      },
      // 高德事件沿线搜索
      getGaodeEventListInfo (_params) {
        api.getGaodeEventListInfo(_params).then(res => {
          this.datas = res.data.data
          this.currItem = this.datas[0]
          if (this.datas.length !== 0) {
            this['get' + this.dataType + 'Detail'](this.currItem.id)
          }
        })
      },
      // 获取字段信息
      getEventField (_params) {
        api.getEventField(_params).then(res => {
          this.field = res.data
          if (this.distanceType === '0') {
            this.getZbData({
              tables: this.dataType,
              center: this.point,
              distance: this.zbssValue,
              current: 1,
              limit: 10
            })
          } else {
            switch (this.type[this.dataType]) {
              case 'block':
                this.getYxData({
                  blockDirection: null,  // 上下行方向
                  districtId: '360000', // 行政区划编码
                  startPointNum: 86.386,
                  endPointNum: 87.812
                })
                break
              case 'event_gaode':
                this.getYxData({
                  lxbm: this.lxbm,
                  sxxfx: this.sxxfx,
                  zhfwMin: this.yxssValue[0],
                  zhfwMax: this.yxssValue[1]
                })
                break
            }
          }
        })
      },
      // 获取行业详情
      getGIS_BLOCKDetail (_id) {
        api.getBlockDetail({id: _id}).then(res => {
          if (res.data.result) {
            this.tableData = res.data.result
          } else {
            this.tableData = []
          }
        })
      },
      // 获取高德详情
      getEVENT_GAODEDetail (_id) {
        api.getGaodeEventById({id: _id}).then(res => {
          this.tableData = res.data.data
        })
      },
      // 点击切换数据源
      itemClick (item) {
        this.currItem = item
        this['get' + this.dataType + 'Detail'](item.id)
      },
      // 数据类型改变事件
      dataTypeChange (code) {
        this.dataType = code
        this.getEventField({code: this.type[code]})
      },
      // 距离类型改变事件
      distanceTypeChange (code) {
        this.distanceType = code
        this.getEventField({code: this.type[this.dataType]})
      },
      // 周边设施确认
      zbssConfirm (value) {
        this.zbssValue = value
        this.getEventField({code: this.type[this.dataType]})
      },
      // 沿线设施确认
      yxssConfirm (value) {
        this.yxssValue = value
        this.getEventField({code: this.type[this.dataType]})
      }
    },
    components: {
      typeTab,
      detailTable
    }
  }
</script>
<style lang="scss">
  .detail-event-wrap {
    padding: 10px;
    .detail-event-body {
      padding: 10px 0;
      clear: both;
      &.detail-zwsj {
        height: 420px;
        background: url('../../../static/images/zwsj2.png') no-repeat center;
      }
      ul {
        margin-bottom: 5px;
        li {
          width: 120px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          float: left;
          cursor: pointer;
          transition: .3s;
          padding: 0 10px;
          font-family: SimSun;
          &:hover {
            cursor: pointer;
            color: #b8deff;
          }
          &.selected {
            color: #b8deff;
            font-family: SimSun;
          }
        }
      }
    }
  }
</style>
