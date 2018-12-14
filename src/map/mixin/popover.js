import _showPopover from '../popover'
import { formatWKT, getLayerNameFrom$F } from '@/helper'
import filters from '@/filters/filters'
import '../../assets/scss/common/popover.scss'
const isClearObject = [
  'geometry',
  'map',
  'element',
  'offset',
  'positioning',
  'params'
]

const weatherUnits = {
  '10010105': {
    label: '能见度',
    unit: 'km'
  },
  '10010103': {
    label: '降水量',
    unit: 'mm'
  },
  '10010104': {
    label: '风速',
    unit: 'm/s'
  },
  '10010110': {
    label: '温度',
    unit: '℃'
  }
}

export default {
  methods: {
    /**
     * 开启事件监听
     */
    onEvent () {
      this.$Maps.on('overlay:onmouseleft', event => {
        if (event.value) {
          this.showPopover('overlay:onmouseleft', event.value, event.value.getPosition())
        } else if (config.popup) {
          this.$Maps.removeOverlay(config.popup)
          config.popup = null
        }
      })
      this.$Maps.on('click', event => {
        console.log(event)
        let feature = this.$Maps.forEachFeatureAtPixel(event.pixel, feature => {
          return feature
        })
        if (!feature && config.popup) {
          this.$Maps.removeOverlay(config.popup)
          config.popup = null
        } else if (feature && feature instanceof ol.Feature) {
          this.showPopover('feature:onselect', feature, event.coordinate)
        }
      })
    },

    /**
     * 显示气泡
     * @param type
     * @param value
     * @param _coordinates
     */
    showPopover (type, value, _coordinates) {
      try {
        let coordinates = this.getCoordinates(type, value, _coordinates)
        let properties = this.getProperties(type, value)
        if (!properties['id'] && properties['ID']) properties['id'] = properties['ID']
        if (properties && properties['id'] && properties['layerName'] && coordinates) {
          this.matchConfig(properties, coordinates)
        }
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * 匹配相关配置
     * @param properties
     * @param coordinates
     */
    matchConfig (properties, coordinates) {
      if (properties.layerName) {
        coordinates = (coordinates instanceof Array) ? coordinates : formatWKT(coordinates)
        let pixel = this.$Maps.getMap().getPixelFromCoordinate(coordinates)
        let x = pixel[0]
        let y = pixel[1]
        let x1 = document.body.clientWidth - x
        let y1 = document.body.clientHeight - y
        let componentTemp = 'arrowLeft'
        let offset = [200, 175]
        // right: [-200, 180]
        // top:  offset: [0, 327],
        // left:  [200, 175],
        // bottom:  offset: [3, -40],
        // arrowLeftTop: [200, 275]
        // arrowLeftBottom: offset: [200, 0]
        // arrowRightTop: [-200, 0],
        // arrowRightBottom  offset: [-200, 0]
        if (x < 726 && y < 298) {
          offset = [200, 275]
          componentTemp = 'arrowLeftTop'
        }
        if (x1 < 346 && y < 298) {
          offset = [-200, 278]
          componentTemp = 'arrowRightTop'
        }
        if (x > 726 && x1 > 346 && y < 298) {
          offset = [0, 327]
          componentTemp = 'arrowTop'
        }
        if (x < 726 && y1 < 298) {
          offset = [200, 0]
          componentTemp = 'arrowLeftBottom'
        }
        if (x1 < 346 && y1 < 298) {
          offset = [-200, 0]
          componentTemp = 'arrowRightBottom'
        }
        if (x > 726 && x1 > 346 && y1 < 298) {
          offset = [3, -40]
          componentTemp = 'arrowBottom'
        }
        console.log(componentTemp)
        config.currPopoverId = properties['id']
        const _tools = [
          {
            name: '搜周边',
            alias: 'perimeter-search',
            icon: 'icon-sousuo1'
          },
          {
            name: '详情',
            alias: 'detail',
            icon: 'icon-xiangqing1'
          }
        ]
        switch (properties.layerName) {
          case 'BaiduTrafficPoint':
            _showPopover(componentTemp, this.$Maps.getMap(), {
              className: 'disposalCurrentPopover',
              id: properties['id'],
              layerName: properties['layerName'],
              coordinates: coordinates,
              properties: properties,
              offset: offset,
              dangerouslyUseHTMLString: true,
              tools: _tools,
              content: '<div><ul>' +
                '<li>路线编码：' + properties['lxbm'] + '</li>' +
                '<li>路线名称：' + properties['lxmc'] + '</li>' +
              '<li>影响范围：' + filters.formatZh(properties['qdzh']) + ' 至 ' + filters.formatZh(properties['zdzh']) + '</li>' +
              '<li>拥堵里程：<span>' + filters.keepDecimal(properties['ydlc'], 2) + '</span> 公里' + '</li>' +
              '<li>发布时间：<span>' + filters.dateFormat(properties['sjsj']) + '</span>' + '</li>' +
              '</ul></div>',
              zoomToExtent: false
            })
            break
          case 'GaodeTrafficPoint':
            _showPopover(componentTemp, this.$Maps.getMap(), {
              className: 'disposalCurrentPopover',
              id: properties['id'],
              layerName: properties['layerName'],
              coordinates: coordinates,
              properties: properties,
              offset: offset,
              dangerouslyUseHTMLString: true,
              name: properties['lxbm'],
              code: properties['lxmc'],
              tools: _tools,
              content: '<div><ul>' +
                '<li>路线编码：' + properties['lxbm'] + '</li>' +
                '<li>路线名称：' + properties['lxmc'] + '</li>' +
                '<li>发布时间：' + filters.dateFormat(properties['pubTime']) + '</li>' +
                '<li>中心桩号：' + filters.formatZh(properties['zh']) + '</li>' +
                '<li>拥堵距离：<span>' + filters.keepDecimal(properties['jamDist'], 2) + '</span> 米' + '</li>' +
                '<li>当前车速：<span>' + filters.keepDecimal(properties['jamSpeed'], 2) + '</span> km/h' + '</li>' +
                '</ul></div>',
              zoomToExtent: false
            })
            break
          case 'perimeter-points':
            _showPopover(componentTemp, this.$Maps.getMap(), {
              className: 'disposalCurrentPopover',
              id: properties['id'],
              offset: offset,
              layerName: properties['layerName'],
              coordinates: coordinates,
              properties: properties,
              dangerouslyUseHTMLString: true,
              tools: _tools.filter(_item => _item.alias === 'perimeter-search'),
              content: '<div><ul>' +
                '<li>路线编码：' + properties['lxbm'] + '</li>' +
                '<li>路线名称：' + properties['lxmc'] + '</li>' +
              '<li>设施名称： ' + properties['name'] + '</li>' +
              '<li>设施编码： ' + properties['code'] + '</li>' +
              '<li>所在位置： ' + properties['address'] + '</li>' +
              '</ul></div>',
              zoomToExtent: false
            })
            break
          case 'JiaodiaozhanTrafficPoint':
            _showPopover(componentTemp, this.$Maps.getMap(), {
              className: 'disposalCurrentPopover',
              id: properties['id'],
              layerName: properties['layerName'],
              coordinates: coordinates,
              properties: properties,
              dangerouslyUseHTMLString: true,
              code: '',
              offset: offset,
              tools: _tools,
              content: '<div><ul>' +
                '<li>路线编码：' + properties['lxbm'] + '</li>' +
                '<li>路线名称：' + properties['lxmc'] + '</li>' +
                '<li>要素名称：' + properties['gczmc'] + '</li>' +
              '<li>观测范围：' + filters.formatZh(properties['qdzh']) + ' 至 ' + filters.formatZh(properties['zdzh']) + '</li>' +
              '<li>流量/饱和度：' + properties['jdc_dl'] + ' / ' + properties['yjd'] + '</li>' +
              '<li>观测时间：' + properties['data_time'] + '</li>' +
              '</ul></div>',
              zoomToExtent: false
            })
            break
          case 'LuwanEventPoint':
            _showPopover(componentTemp, this.$Maps.getMap(), {
              className: 'disposalCurrentPopover',
              id: properties['id'],
              layerName: properties['layerName'],
              coordinates: coordinates,
              properties: properties,
              offset: offset,
              dangerouslyUseHTMLString: true,
              name: properties['eventName'],
              code: '',
              tools: _tools,
              content: '<div><ul>' +
                '<li>事件名称：' + properties['eventName'] + '</li>' +
                '<li>路线编号：' + properties['roadNumber'] + '</li>' +
              '<li>桩号范围：' + filters.formatZh(properties['_roadStart']) + ' 至 ' + filters.formatZh(properties['_roadEnd']) + '</li>' +
              '<li>发生时间：' + properties['detectTime'] + '</li>' +
              '<li>预计恢复：' + filters.formatTime(properties['planTimeNew']) + '</li>' +
              '<li>事件描述：' + properties['sceneDesc'] + '</li>' +
              '</ul></div>',
              zoomToExtent: false
            })
            break
          case 'GaodeEventPoint':
            _showPopover(componentTemp, this.$Maps.getMap(), {
              className: 'disposalCurrentPopover',
              id: properties['id'],
              layerName: properties['layerName'],
              coordinates: coordinates,
              properties: properties,
              dangerouslyUseHTMLString: true,
              offset: offset,
              tools: _tools,
              content: '<div><ul>' +
              '<li>事件描述：' + properties['brief'] + '</li>' +
              '<li>发生时间：' + properties['startTime'] + '</li>' +
              '<li>更新时间：' + properties['updateTime'] + '</li>' +
              '<li>预计恢复：' + filters.formatTime(properties['endTime']) + '</li>' +
              '<li>现场描述：' + properties['eventOverview'] + '</li>' +
              '</ul></div>',
              zoomToExtent: false
            })
            break
          case 'weatherPoints':
            const units = weatherUnits[properties['lx']]
            _showPopover(componentTemp, this.$Maps.getMap(), {
              className: 'disposalCurrentPopover',
              id: properties['id'],
              layerName: properties['layerName'],
              coordinates: coordinates,
              properties: properties,
              dangerouslyUseHTMLString: true,
              offset: offset,
              tools: _tools,
              content: '<div><ul>' +
              '<li>影响范围：' + filters.formatZh(properties['qdzh']) + ' 至 ' + filters.formatZh(properties['zdzh']) + '</li>' +
              '<li>更新时间：' + properties['data_time'] + '</li>' +
              '<li>拥堵里程：' + filters.keepDecimal(properties['yxlc'], 2) + '公里</li>' +
              `<li>${units.label}：${filters.keepDecimal(properties['sz'], 2)} ${units.unit}</li>` +
              '</ul></div>',
              zoomToExtent: false
            })
            break
          default:
            console.table(properties)
        }
      }
    },

    /**
     * 获取气泡锚点坐标（点获取空间位置，线要素获取当前点击位置坐标距离线要素
     * 上最近的一个坐标，暂未考虑面要素，对于overlay直接获取其锚点）
     * @param type
     * @param value
     * @param _coordinates
     * @returns {Array}
     */
    getCoordinates (type, value, _coordinates) {
      let coordinates = []
      if (type === 'feature:onselect') {
        if (value && value instanceof ol.Feature && value.getProperties()) {
          if (value.getGeometry().getType() === 'MultiLineString' || value.getGeometry().getType() === 'lineString') {
            // getClosestPoint
            coordinates = value.getGeometry().getClosestPoint(_coordinates)
          } else if (value.getGeometry().getType() === 'Point') {
            coordinates = value.getGeometry().getCoordinates()
          }
        }
      } else if (type === 'overlay:onmouseleft') {
        coordinates = value.getPosition()
      }
      return coordinates
    },

    /**
     * 获取要素属性信息
     * @param type
     * @param value
     * @returns {*}
     */
    getProperties (type, value) {
      let properties
      if (type === 'feature:onselect') {
        properties = value.getProperties()
        let $LY = getLayerNameFrom$F(value)
        if ($LY) {
          properties['layerName'] = $LY
          let $CF = config.layerConfig.getLayerConfigByLayerName(properties['layerName'], 'layers')
          if ($CF) {
            if (value.getId()) {
              properties['id'] = value.getId()
            } else {
              throw new Error('无图层信息')
            }
          }
        }
      } else if (type === 'overlay:onmouseleft') {
        properties = value.getProperties()
      }
      return this.clearObject(type, properties)
    },

    /**
     * 去除不相关键值
     * @param type
     * @param object
     * @returns {*}
     */
    clearObject (type, object) {
      isClearObject.forEach(key => {
        if (object.hasOwnProperty(key)) {
          delete object[key]
        }
      })
      return object
    }
  }
}
