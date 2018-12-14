import {merge, formatWKT} from '@/helper'
import filters from '@/filters/filters'

const _options = {
  geomType: 'WKT',
  zoomToExtent: true,
  selectable: true
}

const _overLayOptions = {
  zoomToExtent: true,
  selectable: true,
  orderBy: false,
  style: {
    color: '#F61717',
    selectColor: '#1b9de8',
    element: {
      className: 'icon-map4',
      fontSize: '28px'
    }
  }
}

const getClassName = (point) => {
  if (point['EVENT_TYPE'] === 0) { // 报警
    switch (point['WARN_LEVEL']) {
      case 1: // 特别严重
        return 'warn-red-point'
      case 2: // 严重
        return 'warn-orange-point'
      case 3: // 一般
        return 'warn-blue-point'
    }
  } else if (point['EVENT_TYPE'] === 1) { // 事件
    switch (point['SJDJ']) {
      case 1: // 一级
        return 'warn-red-point'
      case 2: // 二级
        return 'warn-yellow-point'
      case 3: // 三级
        return 'warn-orange-point'
      case 4: // 四级
        return 'warn-blue-point'
      case 5: // 未分类
        return 'warn-violet-point'
    }
  }
}

export default {
  methods: {

    /**
     * 添加单点
     * @param point
     * @param params
     */
    addPoint (point, params) {
      const _params = merge(_options, params)
      this.$Maps.addPoint(point, _params)
    },

    /**
     * 添加多点
     * @param points
     * @param params
     * @param isOverlay
     */
    addPoints (points, params, isOverlay) {
      if (points.length > 0) {
        if (!isOverlay) {
          this._addPoints(points, merge(_options, params))
        } else {
          this._addOverLayPoints(points, merge(_overLayOptions, params))
        }
      }
    },

    _addPoints (points, params) {
      points = points.map((item, index) => {
        let _object = item
        _object.attributes['id'] = _object.attributes['ID'] || _object.attributes['id']
        _object.attributes['layerName'] = 'disposal'
        _object.attributes['style'] = {
          image: {
            type: 'icon',
            image: {
              imageSrc: './static/images/map_position.png',
              imageAnchor: [0.5, 1.1]
            }
          },
          text: {
            textFont: 'normal lighter 14px Arial',
            textOverflow: false,
            text: (index + 1).toString(),
            textOffsetX: 3,
            textOffsetY: -18,
            textFill: {
              fillColor: '#FFF'
            }
          }
        }
        _object.attributes['selectStyle'] = {
          image: {
            type: 'icon',
            image: {
              imageSrc: './static/images/map_position_hover.png',
              imageAnchor: [0.5, 1.1]
            }
          },
          text: {
            textFont: 'normal lighter 14px Arial',
            textOverflow: false,
            text: (index + 1).toString(),
            textOffsetX: 3,
            textOffsetY: -18,
            textFill: {
              fillColor: '#FFF'
            }
          }
        }
        return _object
      })
      this.$Maps.addPoints(points, params)
    },

    _addOverLayPoints (points, params) {
      if (points.length > 0) {
        for (let i = 0; i < points.length; i++) {
          points[i]['attributes']['id'] = points[i]['attributes']['ID']
          points[i]['attributes']['layerName'] = params['layerName']
          const el = document.createElement('span')
          el.className = 'warn-point-base ' + getClassName(points[i]['attributes'])
          points[i]['attributes']['style'] = {
            color: '#F61717',
            selectColor: '#1b9de8',
            element: el
          }
        }
      }
      console.info(merge(_overLayOptions, params))
      this.$Maps.addOverlayPoints(points, merge(_overLayOptions, params))
    },

    /**
     * 处理列表点击事件
     * @param item
     * @param index
     */
    handleClick (item, index) {
      let tools = []
      // 区分不同状况下显示按钮
      switch (item.attributes['EVENT_STATUS']) {
        case 1:
        case 2:
          tools = [{
            name: '确认',
            icon: 'icon-queren1'
          }, {
            name: '取消',
            icon: 'icon-quxiao'
          }]
          break
        case 3:
          tools = [{
            name: '详情',
            icon: 'icon-xiangqing2'
          }, {
            name: '恢复',
            icon: 'icon-huifu'
          }]
          break
        case 4:
        case 5:
          tools = [{
            name: '详情',
            icon: 'icon-xiangqing2'
          }, {
            name: '解除',
            icon: 'icon-ic_block_black_px'
          }]
          break
        case 6:
          tools = [{
            name: '详情',
            icon: 'icon-xiangqing2'
          }]
          break
      }
      this.$ShowPopover('common', this.$Maps.getMap(), {
        className: 'disposalCurrentPopover',
        id: item.attributes['ID'],
        layerName: 'disposalPopupIndex',
        coordinates: formatWKT(item.geometry),
        properties: item.attributes,
        dangerouslyUseHTMLString: true,
        name: item.attributes['LXBM'] + ' ' + item.attributes['LXMC'],
        code: filters.formatSxxfx(item.attributes['SXXFX']),
        tools: tools,
        content: '<div>桩号 ' + filters.formatZh(item.attributes['QDZH']) + ' 至 ' + filters.formatZh(item.attributes['ZDZH']) + '</div>' +
        '<div>' + item.attributes['EVENT_DESC'] + '</div>'
      })
    },

    /**
     * 处理鼠标移入事件
     * @param item
     * @param index
     */
    handleMouseOver (item, index) {
      this.$Maps.highLightFeature(item.attributes['ID'])
    },

    /**
     * 处理鼠标移出事件
     * @param item
     * @param index
     */
    handleMouseOut (item, index) {
      this.$Maps.unHighLightFeature(item.attributes['ID'])
    }
  },
  destroyed () {
    [...this.layerNames].forEach(layerName => {
      if (layerName) {
        this.$Maps.removeFeatureByLayerName(layerName)
        this.$Maps.removeOverlayByLayerName(layerName)
      }
    })
    if (config.popup) {
      config.Maps.removeOverlay(config.popup)
    }
  }
}
