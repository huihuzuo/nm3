const getClassName = (point) => {
  switch (point['EVENT_TYPE']) {
    case 1: // 突发性地质灾害
      return 'titafont tita-tufa_dizhizaihai'
    case 2: // 突发性重大灾害
      return 'titafont tita-tufa_zhongdazaihai'
    case 3: // 突发性气象灾害
      return 'titafont tita-tufa_qixiangzaihai'
    case 4: // 突发性事故灾害
      return 'titafont tita-tufa_shiguzaihai'
    case 5: // 其他
      return 'titafont tita-tufa_qita'
  }
}

export default {
  methods: {
    _addCommonPoints (data, params) {
      let points = []
      if (data.length > 0) {
        let obj = {}
        for (let i = 0; i < data.length; i++) {
          obj = {}
          obj['attributes'] = data[i]
          obj.attributes['style'] = {
            image: {
              type: 'icon',
              image: {
                imageSrc: 'static/images/map_position.png',
                imageAnchor: [0.5, 1.1]
              }
            },
            text: {
              textFont: 'normal lighter 14px Arial',
              textOverflow: false,
              text: (i + 1).toString(),
              textOffsetX: 3,
              textOffsetY: -18,
              textFill: {
                fillColor: '#FFF'
              }
            }
          }
          obj.attributes['selectStyle'] = {
            image: {
              type: 'icon',
              image: {
                imageSrc: 'static/images/map_position_hover.png',
                imageAnchor: [0.5, 1.1]
              }
            },
            text: {
              textFont: 'normal lighter 14px Arial',
              textOverflow: false,
              text: (i + 1).toString(),
              textOffsetX: 3,
              textOffsetY: -18,
              textFill: {
                fillColor: '#FFF'
              }
            }
          }
          obj['geometry'] = 'POINT (' + data[i].ptx + ' ' + data[i].pty + ')'
          obj['geometryType'] = 'Point'
          points.push(obj)
        }
        this.$Maps.addPoints(points, params)
      }
    },
    _addPerimeterPoints (data, params) {
      let points = []
      if (data.length > 0) {
        let obj = {}
        for (let i = 0; i < data.length; i++) {
          obj = {}
          delete data[i]['attributes']['geometry']
          obj['attributes'] = data[i]['attributes']
          obj.attributes['style'] = {
            image: {
              type: 'icon',
              image: {
                imageSrc: 'static/images/map_position.png',
                imageAnchor: [0.5, 1]
              }
            },
            text: {
              textFont: 'normal lighter 14px Arial',
              textOverflow: false,
              text: (i + 1).toString(),
              textOffsetX: 3,
              textOffsetY: -18,
              textFill: {
                fillColor: '#FFF'
              }
            }
          }
          obj.attributes['selectStyle'] = {
            image: {
              type: 'icon',
              image: {
                imageSrc: 'static/images/map_position_hover.png',
                imageAnchor: [0.5, 1]
              }
            },
            text: {
              textFont: 'normal lighter 14px Arial',
              textOverflow: false,
              text: (i + 1).toString(),
              textOffsetX: 3,
              textOffsetY: -18,
              textFill: {
                fillColor: '#FFF'
              }
            }
          }
          obj['geometry'] = 'POINT (' + data[i]['geometry'][0] + ' ' + data[i]['geometry'][1] + ')'
          obj['geometryType'] = 'Point'
          points.push(obj)
        }
        this.$Maps.addPoints(points, params)
      }
    },
    _addSuddenBlockEventPoints (data, params) {
      if (data != null && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]['EVENT_TYPE'])
          data[i]['geometryType'] = 'Point'
          data[i]['attributes']['layerName'] = params['layerName']
          data[i].attributes['style'] = {
            color: 'red',
            element: {
              className: getClassName(data[i]['attributes']),
              fontSize: '28px'
            }
          }
          this.list[i].attributes['selectStyle'] = {
            color: 'yellow',
            element: {
              className: getClassName(data[i]['attributes']),
              fontSize: '28px'
            }
          }
        }
        this.$Maps.addOverlayPoints(data, params)
      }
    }
  }
}
