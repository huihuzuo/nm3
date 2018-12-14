<template>
  <panel class="layerStatisticTree" title="图层" @onClose="handleClose">
    <div class="layers-body" slot="body">
      <ul ref="layerTree" class="ztree"></ul>
    </div>
  </panel>
</template>
<style lang="scss">
  .layerStatisticTree {
    position: absolute;
    right: 10px;
    top: 80px;
    bottom: 20px;
    z-index: 3;
    .layers-body {
      overflow: auto;
      height: 100%;
      width: 430px;
      padding-left: 10px;
      .ztree {
        margin: 0;
        padding: 5px;
        color: #333;
        width: calc(100% - 70px);
      }
    }
    input[type=range] {
      -webkit-appearance: none; /*清除系统默认样式*/
      width: 100%;
      background: #1f4d5e; /*设置左边颜色为#61bd12，右边颜色为#ddd*/
      height: 3px; /*横条的高度*/
    }
    /*拖动块的样式*/
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none; /*清除系统默认样式*/
      height: 10px; /*拖动块高度*/
      width: 10px; /*拖动块宽度*/
      background: #fff; /*拖动块背景*/
      border-radius: 50%; /*外观设置为圆形*/
      border: solid 1px #ddd; /*设置边框*/
    }
    output {
      display: block !important;
      font-size: 12px !important;
      font-weight: bold !important;
      text-align: center !important;
      width: 100% !important;
      line-height: 0 !important;
    }
    .ztree li a {
      height: 30px !important;
      line-height: 30px !important;
      color: #7adaff !important;
    }

    .ztree li a.curSelectedNode {
      padding-top: 0px;
      background-color: transparent;
      color: black;
      height: 16px;
      border: 1px transparent solid;
      opacity: 0.8;
    }

    .ztree .level0 .ico_close, .ztree .level0 .ico_open {
      height: 11px;
      width: 12px;
      margin-right: 5px;
      margin-top: 9px;
      background: url("../../static/images/treeImg/tree_icon1.png");
    }
    .ztree .level1 > a span.ico_close {
      margin-left: 2px;
      position: relative;
      left: 1px;
      width: 11px;
      right: 3px;
      margin-right: 4px;
      background: url("../../static/images/treeImg/tree_icon2.png");
      background-position: -13px 0 !important;
      height: 11px;
    }
    .ztree .level1 > a span.ico_open {
      margin-left: 2px;
      position: relative;
      left: 1px;
      width: 11px;
      right: 3px;
      margin-right: 4px;
      background: url("../../static/images/treeImg/tree_icon2.png");
      background-position: 0 0 !important;
      height: 11px;
    }

    .ztree li span.button.switch {
      margin-top: 6px;
      display: none;
    }

    .ztree li span.button.chk {
      margin: 7px 3px 0 0;
    }

    .slider-div {
      height: 40px;
      width: 308px;
      line-height: 40px;
      background: #011d27;
      margin-top: 10px;
      padding-left: 20px;
      span {
        color: rgba(122, 218, 255, 0.6);
      }
      .slider-right {
        float: right;
        width: 200px;
        display: inline-block;
      }
    }
    .ztree-legend {
      margin-bottom: 10px;
      padding-left: 40px !important;
      li {
        line-height: 27px;
        .defaultLegend {
          position: relative;
          width: 10px;
          height: 10px;
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
    .sf-color-block {
      &:hover {
        cursor: pointer;
      }
    }
    .sf-color-block-unselected {
      background-color: #e1e1e1 !important;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        thematicSource: {}, // 存放专题图数据源
        layerSource: [],    // 放图层数据堆栈,
        zTreeObj: '',
        id: '',
        editStr: '',
        slider: {},
        options: {},
        indexnum: '',        // 从堆栈中移除的内容
        layerType: {
          itemName: '',
          itemCode: '',
          chooseObj: [],
          selectedTreeNode: {},
          jsdj: []
        },
        arcgislayer: [],
        selectedTreeNode: {}
      }
    },
    mounted () {
      this.$fetch.getLayersTree().then(res => {
        // 初始化树
        this.initTree(res)
      })
    },
    methods: {
      handleClose () {
        this.$store.dispatch('layersState', false)
      },
      // 初始化ztree
      initTree (zNodes) {
        const setting = {
          data: {
            simpleData: {
              enable: true
            }
          },
          check: {
            enable: true
          },
          callback: {
            onExpand: this.zTreeOnExpand,
            onCollapse: this.zTreeOnCollapse,
            onCheck: this.zTreeOnCheck,
            onNodeCreated: this.onNodeCreated,
            onClick: this.onNodeClick
          },
          view: {
            addHoverDom: this.addHoverDom,        // 显示用户自定义控件
            removeHoverDom: this.removeHoverDom,  // 移除自定义控件
            showIcon: this.showIconForTree,
            nameIsHTML: true
          }
        }
        this.zTreeObj = $.fn.zTree.init($(this.$refs.layerTree), setting, zNodes)
        const _checked = this.zTreeObj.getCheckedNodes()
        if (_checked && Array.isArray(_checked) && _checked.length > 0) {
          _checked.forEach(_check => {
            this.zTreeOnCheck('', 'ztree', _check)
          })
        }
      },
      onNodeClick (event, treeId, treeNode, clickFlag) {
        if (treeNode.children.length > 0) {
          if (!treeNode.open) {
            this.zTreeObj.expandNode(treeNode, true, true, true)
          } else {
            this.zTreeObj.expandNode(treeNode, false, false, false)
          }
        }
      },
      // 展开节点
      zTreeOnExpand (event, treeId, treeNode) {
        $('#' + treeNode.tId + '_a').css('color', '#1b9de8')
      },
      // 折叠节点
      zTreeOnCollapse (event, treeId, treeNode) {
        $('#' + treeNode.tId + '_a').css('color', '#000')
      },
      // 勾选事件
      zTreeOnCheck (event, treeId, treeNode) {
        // 对设置图层透明度的滑块进行添加
        let zTreeObj = this.zTreeObj
        this.treeNode = treeNode
        this.restoreSelected(treeNode)
        if (this.selectedTreeNode[treeNode.id] === undefined) {
          this.$set(this.selectedTreeNode, treeNode.id, treeNode.checked)
        } else {
          this.selectedTreeNode[treeNode.id] = treeNode.checked
        }
        if (treeNode.checked) {
          $('#' + treeNode.tId + '_a').css('color', '#1b9de8')
          if (treeNode.transparent) {
            $('#slide_' + treeNode.tId).css('display', 'block')
            $('#legends_' + treeNode.tId).show()
            // this.sliderV()
          }
        } else {
          // 移除滑块
          $('#' + treeNode.tId + '_a').css('color', '#000')
          if (treeNode.transparent) {
            $('#slide_' + treeNode.tId).css('display', 'none')
          }
          $('#legends_' + treeNode.tId).remove()
          config.Maps.removeTileLayerByLayerName(treeNode.id)
        }

        if (treeNode.checked) {
          this.layerSource.push({
            pId: treeNode.id,
            treeNode: treeNode
          })
          // 选中多个时清空上个数据（只有一个选中时不做处理）
          if (this.layerSource.length > 1 && treeNode.layerType === 1) {
            this.clear(this.layerSource[this.layerSource.length - 2].treeNode)
          }
        } else {
          // 取消选中时清空此数据
          this.clear(treeNode)
          // 从堆栈中删除
          for (let i = 0; i < this.layerSource.length; i++) {
            if (this.layerSource[i].pId === treeNode.id) {
              this.indexnum = this.layerSource.indexOf(this.layerSource[i])
            }
          }
          if (this.indexnum > -1) {
            this.layerSource.splice(this.indexnum, 1)
          }
        }

        // 判断如果堆栈中还有数据再查询堆栈的最后一个数据(并且数据不能是入栈的最后一个数据)
        if (this.layerSource.length > 0 && (treeNode.layerType === 1 || treeNode.layerType === 7)) {
          this.query(this.layerSource[this.layerSource.length - 1].treeNode)
        } else if (treeNode.checked) {
          if (this.layerSource.length > 1) {
            if (this.layerSource[this.layerSource.length - 2].treeNode.layerType === 1 || this.layerSource[this.layerSource.length - 2].treeNode.layerType === 7) {
            }
          }
          this.query(treeNode)
        }

        // 对选中的需要显示时间的进行时间的添加
        let nameElement = $('#' + treeNode.tId + '_a')
        let titles = nameElement.prop('title')
        if (treeNode.checked) {
          // let currentLayer = api.getDisplayTimeById(treeNode.id)
          // if (currentLayer) {
          // api.getTimeByUrl(currentLayer['serviceUrl'], currentLayer['type']).then(function (time) {
          //   treeNode.name = treeNode.name + '(' + time + ')'
          //   zTreeObj.updateNode(treeNode)
          //   nameElement.prop(titles, treeNode.name)
          // })
          // }
        } else { // 将时间移除
          let index = treeNode.name.indexOf('(')
          if (index !== -1) {
            treeNode.name = treeNode.name.substring(0, index)
            zTreeObj.updateNode(treeNode)
            nameElement.prop(titles, treeNode.name)
          }
        }
      },
      // 添加滑块
      addSlider (_treeNode) {
        $('#' + _treeNode.tId).append('<div style="display: none" id="slide_' +
          _treeNode.tId + '"  class="slider-div" >' + '<span>图层不透明度：</span>' +
          '<div class="slider-right"><div style="width: 20px; float: left; color: rgba(122, 218, 255, 0.6);">o</div>' +
          '<div style="width: 135px;float: left;">' +
          '<input data-id="' + _treeNode.id + '" type="range" min="0" max="100"' +
          ' stop="100" value="100"  /><output id="js-output"></output></div>' +
          '<div style="width: 20px; color: rgba(122, 218, 255, 0.6);">100%</div></div>' + '</div>')
      },
      // 初始化滑块
      sliderV () {
        $(function () {
          let $document = $(document)
          let selector = '[data-rangeslider]'
          let $element = $(selector)
          let textContent = ('textContent' in document) ? 'textContent' : 'innerText'

          function valueOutput (element, layerId) {
            const value = element.value
            const output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0]
            output[textContent] = value + '%'
            const layer = config.Maps.getLayerByName(layerId)
            if (layer) {
              layer.setOpacity(value / 100)
            }
          }

          $document.on('input', 'input[type="range"], ' + selector, function (e) {
            valueOutput(e.target, $(e.target).attr('data-id'))
          })
          $element.rangeslider({
            polyfill: true,
            onInit: function () {
              valueOutput(this.$element[0])
            },
            onSlide: function (position, value) {
              console.log(value)
            },
            onSlideEnd: function (position, value) {
              console.log(value)
            }
          })
        })
      },
      // 添加图例
      layerLegends (_treeNode) {
        const that = this
        if (_treeNode.children === undefined || _treeNode.children === null) {
          if (_treeNode.legends !== null && _treeNode.legends.length > 0) {
            let aObj = $('#' + _treeNode.tId)
            let html = '<ul class="ztree-legend" id="legends_' + _treeNode.tId + '">'
            this.layerType.jsdj = []
            for (let i = 0; i < _treeNode.legends.length; i++) {
              this.layerType.jsdj.push({
                name: _treeNode.legends[i].legendName,
                code: _treeNode.legends[i].legendKey
              })
              if (_treeNode.legends[i].type === 0) {
                html += '<li class="legend" data-lenged="' + _treeNode.legends[i]['legendKey'] + '">' +
                  '<span class="defaultLegend sf-color-block" data-lenged="' + _treeNode.legends[i]['legendKey'] + '"' +
                  ' itemCode="' + _treeNode.legends[i].legendKey + '" itemName="' + _treeNode.legends[i].legendName + '"' +
                  ' colorname="' + _treeNode.legends[i].color + '" value="true" style="background-color: ' + _treeNode.legends[i].color + ';"></span>' +
                  '<span>' + _treeNode.legends[i].legendName + '</span></li>'
              } else if (_treeNode.legends[i].type === 1) {
                html += '<li class="legend" data-lenged="' + _treeNode.legends[i]['legendKey'] + '">' +
                  '<span class="sf-color-block" data-lenged="' + _treeNode.legends[i]['legendKey'] + '"' +
                  ' itemCode="' + _treeNode.legends[i].legendKey + '" itemName="' + _treeNode.legends[i].legendName + '"' +
                  ' colorname="' + _treeNode.legends[i].color + '" value="true" style="width: ' + _treeNode.legends[i].legendW + 'px;height:' +
                  _treeNode.legends[i].legendH + 'px; background-color: ' + _treeNode.legends[i].color + '; border-radius: 5px;position: relative;display: inline-block;margin-right: 10px;">' +
                  '</span><span>' + _treeNode.legends[i].legendName + '</span></li>'
              } else if (_treeNode.legends[i].type === 2) {
                html += '<li class="legend" data-lenged="' + _treeNode.legends[i]['legendKey'] + '">' +
                  '<span class="defaultLegend sf-color-block" data-lenged="' + _treeNode.legends[i]['legendKey'] + '"' +
                  ' width="' + '" itemCode="' + _treeNode.legends[i].legendKey + '" itemName="' + _treeNode.legends[i].legendName + '" colorname="' +
                  _treeNode.legends[i].color + '" value="true" style="width: ' + _treeNode.legends[i].legendW + 'px;height:' + _treeNode.legends[i].legendH +
                  'px; background-color: ' + _treeNode.legends[i].color + ';"></span><span>' + _treeNode.legends[i].legendName + '</span></li>'
              }
            }
            html += '</ul>'
            aObj.append(html)
            if (this.checkSelectAble(_treeNode)) {
              $(aObj).find('#legends_' + _treeNode.tId).on('click', function (event) {
                let ev = event || window.event
                let target = ev.target || ev.srcElement
                const _node = target.nodeName.toLowerCase()
                if (_node === 'li') {
                  $(target).find('.sf-color-block').toggleClass('sf-color-block-unselected')
                  that.$set(_treeNode, 'isSelected', true)
                  if ($(target).find('.sf-color-block').hasClass('sf-color-block-unselected')) {
                    that.filterCurrentLengeds(_treeNode, $(target).find('.sf-color-block').attr('data-lenged'), false)
                  } else {
                    that.filterCurrentLengeds(_treeNode, $(target).find('.sf-color-block').attr('data-lenged'), true)
                  }
                } else if (_node === 'span' && $(target).hasClass('sf-color-block')) {
                  $(target).toggleClass('sf-color-block-unselected')
                  that.$set(_treeNode, 'isSelected', false)
                  if ($(target).hasClass('sf-color-block-unselected')) {
                    that.filterCurrentLengeds(_treeNode, $(target).attr('data-lenged'), false)
                  } else {
                    that.filterCurrentLengeds(_treeNode, $(target).attr('data-lenged'), true)
                  }
                }
                that.addTileLayer(_treeNode)
              })
            }
          }
        }
      },
      /**
       * 恢复所有全选状态
       * @param _treeNode
       */
      restoreSelected (_treeNode) {
        if (_treeNode && _treeNode['legends']) {
          const legends = _treeNode['legends']
          legends.forEach((item, index) => {
            this.$set(_treeNode['legends'][index], 'sf__is__selected', true)
          })
        }
      },
      /**
       * 改变当前操作的状态
       * @param _treeNode
       * @param key
       * @param flag
       */
      filterCurrentLengeds (_treeNode, key, flag) {
        if (_treeNode && _treeNode['legends']) {
          const legends = _treeNode['legends']
          legends.every((item, index) => {
            if (item && item['legendKey'] === key) {
              this.$set(_treeNode['legends'][index], 'sf__is__selected', flag)
              return false
            } else {
              return true
            }
          })
        }
      },
      // ztree只添加一次
      onNodeCreated (event, treeId, treeNode) {
        if (treeNode.transparent) {
          // 对设置图层透明度的滑块进行添加
          this.addSlider(treeNode)
        }
      },
      // 用户自定义控件
      addHoverDom (treeId, treeNode) {
        if (treeNode.description !== null && treeNode.description.length > 0) {
          let aObj = $('#' + treeNode.tId + '_a')
          let aObjTop = aObj.offset().top
          if ($('#treeDetail_' + treeNode.id).length > 0) return
          this.editStr =
            '<div class="tree-detail" id="treeDetail_' + treeNode.id + '">'
          for (let i = 0; i < treeNode.description.length; i++) {
            this.editStr += '<div>' +
              '<div style="font-size: 14px; font-family: \'微软雅黑\'; color: #2a2a2a; font-weight: block;">' + treeNode.description[i].label + ':</div> '
            if (treeNode.description[i].content !== null) {
              this.editStr += '<div style="font-size: 12px; color: #2a2a2a; font-family: \'宋体\'; ">' + treeNode.description[i].content + '</div>'
            }
            if (treeNode.description[i].target !== null) {
              this.editStr += '<div><a href="' + treeNode.description[i].target + '" target="_blank">' + treeNode.description[i].target + '</a></div> '
            }
            this.editStr += '</div>'
          }
          this.editStr += '</div>' +
            $('body').append(this.editStr)
          $('#treeDetail_' + treeNode.id).css({
            top: aObjTop
          })
        }
      },
      // 移除自定义控件
      removeHoverDom (treeId, treeNode) {
        $('#treeDetail_' + treeNode.id).remove()
      },
      // 根据勾选事件获得的堆栈数据进行查询（永远只查询最后一个）
      query (_treeNode) {
        this.clear(_treeNode)
        if (_treeNode.checked) {
          switch (_treeNode.layerType) {
            case 1: // 统计服务
              this.checkServiceLayer(_treeNode)
              break
            case 2: // arcgis专题服务
              this.addTileLayer(_treeNode)
              break
            case 3: // 热力图
              break
            case 4:
              break
            case 5:
              break
            case 7:
              break
            case 8:
              this.checkTileArcgisService(_treeNode)
              break
            default:
              break
          }
          this.layerType.selectedTreeNode = _treeNode
          // 添加图例
          this.layerLegends(_treeNode)
        }
      },
      showIconForTree (treeId, treeNode) {
        if (treeNode.level === 2) {
          return false
        } else if (treeNode.level === 3) {
          return false
        } else {
          return true
        }
      },
      // 清空上次查询
      clear (_treeNode) {
        if (!_treeNode.checked) {
          console.log(_treeNode)
        }
      },
      // 根据项目服务组织数据源生成专题图（饼状图、柱状图、散点图、热力图）
      checkServiceLayer () {
      },
      checkSelectAble (_treeNode) {
        const _check = config.statisticsLayerList.find(item => item['id'] === _treeNode['id'])
        if (_check && _check['legendClick']) {
          return true
        } else {
          return false
        }
      },
      checkTileArcgisService (treeNode) {},
      // 加载气象专题图
      addTileLayer (treeNode) {
        this.arcgislayer.push(treeNode.id)
        const params = {
          layerName: treeNode.id
        }
        if (this.checkSelectAble(treeNode)) {
          params.layerDefs = this._getArcMapServiceParams(treeNode)
        } else {
          if (treeNode.params && Array.isArray(treeNode.params) && treeNode.params[0] && treeNode.params[0]['value']) {
            params.layerDefs = treeNode.params[0]['value']
          }
        }
        params['token'] = config.token
        this.$Maps.createTitleLayer(treeNode.id, {
          layerName: 'condition_road',
          layerType: 'TileArcGISRest',
          visible: true,
          create: true,
          layerParams: params,
          layerUrl: treeNode.serviceUrl
        })
      },
      _getArcMapServiceParams (_treeNode) {
        let layerDefs_ = ''
        const defs_ = []
        const _layerConfig = this._getLayerConfig(_treeNode)
        if (_treeNode && _treeNode['legends']) {
          const legends = _treeNode['legends']
          legends.forEach((item) => {
            if (item['sf__is__selected']) {
              defs_.push(item['legendKey'])
            }
          })
        }
        if (defs_.length > 0 && _layerConfig && _layerConfig['layers'].length > 0) {
          _layerConfig['layers'].forEach(item => {
            layerDefs_ = item + ':' + _layerConfig['field'] + ' IN (' + defs_.join(', ') + ')'
          })
        }
        return layerDefs_
      },

      /**
       * 获取当前图层配置
       * @param _treeNode
       * @returns {*}
       * @private
       */
      _getLayerConfig (_treeNode) {
        let current_
        config.statisticsLayerList.every(item => {
          if (item['id'] === _treeNode.id) {
            current_ = item
            return false
          } else {
            return true
          }
        })
        return current_
      }
    }
  }
</script>
