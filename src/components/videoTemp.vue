<template>
  <div class="video-temp-wrap">
    <div class="index-video-wrap">
      <div class="index-video-wrap-title">
        <span class="iconfont icon-jiaotiaozhan"></span>
        <span>视频监控</span>
        <span class="iconfont icon-guanbi" @click="clickEvent('close')"></span>
        <span>|</span>
        <span class="iconfont icon-shipinliebiao" :class="showVideoList ? 'selected': ''"  @click="clickEvent('list')"></span>
      </div>
      <div class="content">
        <div class="video"><OBJECT class="VMSPlayWnd" ID="VMSPlayWnd" style="width:100%;height:100%;"
                                   CLASSID="clsid:E7396BA6-4ED5-4F04-82A5-19012556C4CE"/></div>
        <div class="video"><OBJECT class="VMSPlayWnd1" ID="VMSPlayWnd1" style="width:100%;height:100%;"
                                    CLASSID="clsid:E7396BA6-4ED5-4F04-82A5-19012556C4CE"/></div>
        <div class="video"><OBJECT class="VMSPlayWnd2" ID="VMSPlayWnd2" style="width:100%;height:100%;"
                                   CLASSID="clsid:E7396BA6-4ED5-4F04-82A5-19012556C4CE"/></div>
        <div class="video"><OBJECT class="VMSPlayWnd3" ID="VMSPlayWnd3" style="width:100%;height:100%;"
                                   CLASSID="clsid:E7396BA6-4ED5-4F04-82A5-19012556C4CE"/></div>
      </div>
    </div>
    <OBJECT ID="SinoVMS" style="width:0px;height:0px" align=left hspace=0
            vspace=0
            CLASSID="clsid:C2D2A8DE-4AEC-47D8-BEC6-E23DD41F6142"/>
    <div class="index-video-list-wrap" v-show="showVideoList">
      <div class="index-video-list-wrap-title iconfont icon-jiaotiaozhan">
        <span>视频监控</span>
        <span class="iconfont icon-guanbi" @click="clickEvent('Listclose')"></span>
      </div>
      <div class="choosed-video">
        <div v-for="item in choosedVideo"><span @click="removeChoosedVideo(item.video_id)" :title=item.name>x</span><font>{{item.name}}</font></div>
      </div>
      <div class="video-list-tree">
        <ul id="treeDemo" class="ztree"></ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        choosedVideo: [],
        showVideoList: false,
        loginState: '',
        treeObj: ''
      }
    },
    watch: {
      choosedVideo (val) {
        if (this.loginState === 0) {
          this.startPlay(val)
        } else {
          this.login()
        }
      }
    },
    created () {
      setTimeout(() => {
        this.loadVideoList()
        this.init()
      }, 2000)
    },
    mounted () {
    },
    methods: {
      removeChoosedVideo (id) {
        for (let i = 0; i < this.choosedVideo.length; i++) {
          if (this.choosedVideo[i]['video_id'] === id) {
            this.choosedVideo.splice(i, 1)
            this.updateCurrCliNode(id)
            return false
          }
        }
      },
      initTree (zNodes) {
        let setting = {
          check: {
            enable: true,
            nocheckInherit: false,
            chkStyle: 'checkbox'
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          view: {
            showIcon: false,
            showLine: false
          },
          callback: {
            onCheck: this.zTreeOnCheck
          }
        }
        this.treeObj = $.fn.zTree.init($('#treeDemo'), setting, zNodes)
      },
      zTreeOnCheck (event, treeId, treeNode) {
        if (!treeNode.checked) {
          this.removeChoosedVideo(treeNode.video_id)
          return false
        }
        if (this.choosedVideo.length >= 4) {
          treeNode.checked = false
          this.$message({
            message: '最多只能同时选择4个视频',
            type: 'warning'
          })
          return false
        }
        let obj = {}
        obj['video_id'] = treeNode.video_id
        obj['checked'] = true
        obj['name'] = treeNode.name
        this.choosedVideo.push(obj)
      },
      loadVideoList () {
        this.$fetch.videoList().then(res => {
          if (res.data.data !== null && res.data.data.length > 0) {
            let arr = res.data.data[0].children[0].children
            let len = 0
            if (arr.length > 3) {
              len = 4
            } else {
              len = arr.length
            }
            let obj = {}
            for (let i = 0; i < len; i++) {
              arr[i]['checked'] = true
              obj = {}
              obj['video_id'] = arr[i]['video_id']
              obj['checked'] = true
              obj['name'] = arr[i]['name']
              this.choosedVideo.push(obj)
            }
          }
          this.initTree(res.data.data)
        }).catch(error => {
          console.warn(error)
        })
      },
      clickEvent (alias) {
        switch (alias) {
          case 'list':
            this.showVideoList = true
            break
          case 'Listclose':
            this.showVideoList = false
            break
        }
      },
      updateCurrCliNode (id) {
        var nodes = this.treeObj.getNodes()
        this.getCurrClickNode(nodes, id)
      },
      getCurrClickNode (obj, id) {
        if (obj.length > 0) {
          obj.forEach((item) => {
            if (item['video_id'] === id) {
              item['checked'] = false
              this.treeObj.updateNode(item)
              return false
            }
            if (item['children'] !== null && item['children'].length > 0) {
              this.getCurrClickNode(item['children'], id)
            }
          })
        }
      },
      init () {
        if (window.ActiveXObject || 'ActiveXObject' in window) {
          if (this.loginState !== 0) {
            console.log(SinoVMS)
            var state = SinoVMS.init()
            if (state === 0) {
              this.login()
            } else {
              this.$message({
                showClose: true,
                message: '初始化控件失败',
                type: 'error'
              })
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: '该浏览器不支持ActiveX,请更换ie浏览器',
            type: 'error'
          })
        }
      },
      login () {
        var addr = '36.2.8.1'
        var port = '12021'
        var user = 'admin'
        var pwd = 'admin@jxlw'
        SinoVMS.TcpEnable(true)
        var state = SinoVMS.Login(addr, port, user, 'WEB', pwd)
        if (state === 0) {
          this.loginState = 0
          this.startPlay(this.choosedVideo)
        } else {
          this.$message({
            showClose: true,
            message: '登录失败',
            type: 'error'
          })
        }
      },
      startPlay (data) {
        try {
          let obj = [VMSPlayWnd.GetHWnd(), VMSPlayWnd1.GetHWnd(), VMSPlayWnd2.GetHWnd(), VMSPlayWnd3.GetHWnd()]
          for (let i = 0; i < data.length; i++) {
            $('.VMSPlayWnd' + i).css('display', 'block')
            SinoVMS.StartPlayEx(data[i]['video_id'], obj[i])
          }
          for (let j = data.length; j < 4; j++) {
            $('.VMSPlayWnd' + j).css('display', 'none')
          }
        } catch (e) {
          this.$message({
            showClose: true,
            message: '视频播放出错了',
            type: 'error'
          })
        }
      }
    },
    destroyed () {
      console.log(this.SinoVMS)
    },
    components: {
    }
  }
</script>
<style lang="scss">
  .video-temp-wrap {
    height: 100%;
    background-size: cover;
    overflow: hidden;
    .index-video-wrap{
      width: 508px;
      height: 358px;
      position: relative;
      background: rgba(2, 49, 66, 0.9);
      -webkit-box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
      box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
      .icon-jiaotiaozhan:before{
        margin: 0 10px;
        font-size: 16px;
      }
      .selected{
        color: #7adaff !important;
      }
      .index-video-wrap-title{
        width: 100%;
        height: 34px;
        font-family: ﻿SimSun;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 34px;
        letter-spacing: 0px;
        color: #6ecaed;
        span {
          display: inline-block;
          color: #5bb0d1;
        }

        span:nth-child(2){
          margin-right: 10px;
          font-size: 12px;
          font-family: SimSun;
        }

        span:nth-child(3){
          float: right;
          width: 14px;
          height: 12px;
          margin-right: 10px;
          font-size: 12px;
          &:hover {
            cursor: pointer;
            color: #7adaff;
          }
        }
        span:nth-child(4){
          float: right;
          width: 1px;
          height: 12px;
          margin-right: 10px;
          margin-top: -2px;
          font-size: 12px;
          color: rgba(32, 98, 125, 0.5);
        }
        span:nth-child(5){
          float: right;
          width: 14px;
          height: 12px;
          margin-right: 10px;
          font-size: 12px;
          &:hover {
            cursor: pointer;
            color: #7adaff;
          }
        }
      }
      .content{
        width: 100%;
        height: calc(100% - 34px);
        overflow: hidden;
        .video{
          width: calc((100% - 17px) / 2);
          height: calc((100% - 12px) / 2);
          float: left;
          background-color: #003447;
          margin-bottom: 5px;
          margin-left: 6px;
        }
        .video:nth-of-type(even){
          margin-left: 5px;
        }
      }
    }
    .index-video-list-wrap{
      width: 360px;
      bottom: 10px;
      z-index: 4;
      position: relative;
      float: right;
      top: 10px;
      right: 20px;
      pointer-events: auto;
      background: rgba(2, 49, 66, 0.9);
      -webkit-box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
      box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
      .icon-jiaotiaozhan:before{
        margin: 0 10px;
        font-size: 18px;
      }
      .ztree li span.button.noline_open{
        background: url('../../static/scripts/ztree/img/tucen.png') no-repeat;
      }
      .ztree li span.button.noline_close{
        background: url('../../static/scripts/ztree/img/tucen.png') no-repeat;
      }
      .ztree li span.button.chk.checkbox_false_full{
        background: url('../../static/scripts/ztree/img/fuxk.png') no-repeat;
      }
      .ztree li span.button.chk.checkbox_false_full_focus{
        background: url('../../static/scripts/ztree/img/fuxk.png') no-repeat;
      }
      .ztree li span.button.chk.checkbox_true_full{
        background: url('../../static/scripts/ztree/img/xuanzhong.png') no-repeat;
      }
      .ztree li span.button{
        border-radius: 0;
      }
      .ztree li span.button.chk.checkbox_true_full_focus{
        background: url('../../static/scripts/ztree/img/xuanzhong.png') no-repeat;
      }
      .index-video-list-wrap-title{
        width: 100%;
        height: 34px;
        font-size: 14px;
        line-height: 34px;
        border-bottom: 1px #1c729b solid;
        span{
          display: inline-block;
          cursor: pointer;
        }
        span:nth-child(2){
          float: right;
          width: 14px;
          height: 12px;
          margin-right: 10px;
          font-size: 13px;
          &:hover{
            color: #7adaff;
          }
        }
      }
      .choosed-video{
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 5px;
        color: #7adaff;
        div{
          display: inline-block;
          width: 163px;
          height: 26px;
          text-align: center;
          line-height: 26px;
          border-radius: 2px;
          border: solid 1px #1a5368;
          font-family: '宋体';
          cursor: pointer;
          position: relative;
          &:hover{
            color: #023243;
            background-color: #7ADAFF;
            span {
              display: block;
            }
          }
          span{
            display: inline-block;
            width: 16px;
            height: 16px;
            background-color: rgba(239, 75, 24, 1);
            position: absolute;
            right: -8px;
            top: -8px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            color: #FFF;
            line-height: 15px;
            text-align: center;
            display: none;
          }
          font{
            overflow: hidden;
            width: 100%;
            height: 21px;
            display: block;
          }
        }
        div:nth-child(odd){
          margin: 7px 5px 5px 10px;
        }
        div:nth-child(even){
          margin: 7px 10px 5px 5px;
        }
      }
      .video-list-tree{
        height: calc(100% - 34px - 86px);
        width: 100%;
        overflow: hidden;
        .ztree{
          width: 105%;
          height: 105%;
          overflow: scroll;
        }
      }
      .ztree li a.curSelectedNode{
        background: none !important;
        border: 0px #FFB951 solid !important;
      }
      .ztree li{
        line-height: 30px;
        a{
          padding: 6px 3px 0 0 !important;
        }
        span{
          color: #b8deff !important;
          margin-top: 14px;
        }
      }
    }
  }
</style>
