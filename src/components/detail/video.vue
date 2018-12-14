<template>
  <div class="detail-video-wrap">
    <div class="in-station-wrap-name">
      <span class="iconfont icon-jiaotiaozhan">视频点</span>
      <type-tab
          :show-type="false"
          :distance-default="distanceDefault"
          @distanceTypeChange="distanceTypeChange"
          @zbssConfirm="zbssConfirm"
          @yxssConfirm="yxssConfirm"></type-tab>
    </div>

    <div class="detail-video-body" v-if="datas.length >= 1">
      <ul class="clearfix">
        <li
          v-for="item in datas"
          :title="item.name || item.ysmc"
          @click="itemClick(item)"
          :class="item === currItem ? 'selected' : ''">{{item.name || item.ysmc}}</li>
      </ul>
      <div class="detail-video-player">
        <OBJECT class="VMSPlayDetail" ID="VMSPlayDetail" style="width:100%;height:100%;"
                CLASSID="clsid:E7396BA6-4ED5-4F04-82A5-19012556C4CE"/>
       </div>
      <OBJECT ID="SinoVMS" style="width:0px;height:0px" align=left hspace=0
              vspace=0
              CLASSID="clsid:C2D2A8DE-4AEC-47D8-BEC6-E23DD41F6142"/>
      <detail-table :data="tableData" :field="field"></detail-table>
    </div>
    <div class="detail-video-body detail-zwsj" v-if="datas.length < 1">
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
        tableData: [],
        field: [],
        currItem: {},
        zbssValue: 5,
        yxssValue: [0, 0],
        point: 'POINT (115.35980401 2029.32696026)',
        lxbm: '',
        type: {
          GIS_SPD: 'video'
        },
        code: {
          GIS_SPD: 'id'
        },
        dataType: 'GIS_SPD',
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
        distanceType: '1',
        loginState: false,
        i: 0,
        state: null
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
      this.yxssValue = [Number(this.roadDetail.zxzh) - 5, Number(this.roadDetail.zxzh) + 5]
      this.point = 'POINT (' + this.roadDetail.ptx + ' ' + this.roadDetail.pty + ')'
      this.lxbm = this.roadDetail.lxbm
      this.getField({code: 'video'})
    },
    methods: {
      // 获取周边资源数据
      getZbData (_params) {
        api.getRIM(_params).then(res => {
          this.datas = res.data.result
          if (this.datas.length < 1) return
          this.currItem = this.datas[0]
          this['get' + this.dataType + 'Detail'](this.currItem.id)
        })
      },
      // 获取沿线设施数据
      getYxData (_params) {
        api.getStructureList(_params).then(res => {
          this.datas = res.data.rows
          if (this.datas.length < 1) return
          this.currItem = this.datas[0]
          this['get' + this.dataType + 'Detail'](this.currItem[this.code[this.dataType]])
        })
      },
      // 获取字段信息
      getField (_params) {
        api.getField(_params).then(res => {
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
            this.getYxData({
              current: 1,
              limit: 10,
              type: this.type[this.dataType],
              params: {
                lxbm: this.lxbm,
                zhfwMin: this.yxssValue[0],
                zhfwMax: this.yxssValue[1]
              }
            })
          }
        })
      },
      // 获取视频点详情
      getGIS_SPDDetail (_id) {
        api.getSpdDetail({id: _id}).then(res => {
          this.tableData = res.data
          if (this.tableData.video_id && !config.service.videoConfig.demonstration) {
            console.info('true')
            this.init(this.tableData.video_id)
          } else { // test
            console.info('test')
            this.init(config.service.videoConfig.video_id)
          }
        })
      },
      // 列表点击事件
      itemClick (item) {
        this.currItem = item
        this['get' + this.dataType + 'Detail'](this.distanceType === '0' ? item.id : this.currItem[this.code[this.dataType]])
      },
      // 距离类型改变事件
      distanceTypeChange (code) {
        this.distanceType = code
        this.getField({code: this.type[this.dataType]})
      },
      // 周边设施确认
      zbssConfirm (value) {
        this.zbssValue = value
        this.getField({code: this.type[this.dataType]})
      },
      // 沿线设施确认
      yxssConfirm (value) {
        this.yxssValue = value
        this.getField({code: this.type[this.dataType]})
      },
      // 视频初始化
      init (videoId) {
        if (window.ActiveXObject || 'ActiveXObject' in window) {
          if (!this.loginState) {
            const state = SinoVMS.init()
            if (state === 0) {
              if (this.state !== 0) {
                this.login(videoId)
              }
            } else {
              this.$message({
                showClose: true,
                message: '初始化控件失败',
                type: 'error'
              })
            }
          } else {
            this.startPlay(videoId)
          }
        } else {
          this.$message({
            showClose: true,
            message: '该浏览器不支持ActiveX,请更换ie浏览器',
            type: 'error'
          })
        }
      },
      // 视频登录
      login (videoId) {
        const { addr, port, user, pwd } = config.service.videoConfig
        SinoVMS.TcpEnable(true)
        do {
          this.state = SinoVMS.Login(addr, port, user, 'WEB', pwd)
          this.i++
        }
        while (this.state !== 0 && this.i < 3)
        if (this.state === 0) {
          this.loginState = true
          this.startPlay(videoId)
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '登录失败',
            type: 'error'
          })
        }
      },
      startPlay (video) {
        try {
          SinoVMS.StartPlayEx(video, VMSPlayDetail.GetHWnd())
        } catch (e) {
          this.$message({
            showClose: true,
            message: '网络出错',
            type: 'error'
          })
        }
      }
    },
    components: {
      typeTab,
      detailTable
    }
  }
</script>
<style lang="scss">
  .detail-video-wrap {
    .slider-wrap {
      top: 0 !important
    }
    .in-station-wrap-name {
      line-height: 44px;
      height: 44px;
      width: 570px;
      background-color: rgba(2, 35, 47, 0.6);
      box-shadow: 0px 1px 1px 0px
      rgba(27, 107, 148, 0.31);
      .icon-jiaotiaozhan {
        padding: 0 10px;
        display: inline-block;
        font-size: 14px;
        &:before {
          margin-right: 5px;
        }
      }
      .type-tab-wrap {
        float: right;
        .distance-type {
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

    .detail-video-body {
      clear: both;
      padding: 10px;
      &.detail-zwsj {
        height: 420px;
        background: url('../../../static/images/zwsj2.png') no-repeat center;
      }
      ul {
        margin-bottom: 5px;
        li {
          width: 110px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          float: left;
          transition: .3s;
          font-family: SimSun;
          &:hover {
            cursor: pointer;
            color: #b8deff;
          }
          &.selected {
            color: #b8deff;
          }
        }
      }
      .detail-video-player {
        height: 280px;
        margin-bottom: 10px;
      }
    }
  }
</style>
