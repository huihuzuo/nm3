export default {
  data () {
    return {
    }
  },
  methods: {
    markerCurrPagePoints (points, layerName, llng, llat) {
      points = points.map((el, index) => {
        let _object = {}
        if (el['geometry']) {
          _object = el
          _object['attributes']['layerName'] = layerName
          _object['attributes']['style'] = {
            zIndex: index,
            image: {
              type: 'icon',
              image: {
                imageSrc: './static/images/marker.png',
                imageAnchor: [0.5, 1]
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
          _object['attributes']['selectStyle'] = {
            zIndex: index,
            image: {
              type: 'icon',
              image: {
                imageSrc: './static/images/marker_hover.png',
                imageAnchor: [0.5, 1]
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
        } else {
          _object['attributes'] = el
          _object['attributes']['layerName'] = layerName
          _object['attributes']['style'] = {
            zIndex: index,
            image: {
              type: 'icon',
              image: {
                imageSrc: './static/images/marker.png',
                imageAnchor: [0.5, 1]
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
          _object['attributes']['selectStyle'] = {
            zIndex: index,
            image: {
              type: 'icon',
              image: {
                imageSrc: './static/images/marker_hover.png',
                imageAnchor: [0.5, 1]
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
          if (!llng && !llat) {
            llng = 'ptx'
            llat = 'pty'
          }
          _object['geometry'] = 'POINT(' + el[llng] + ' ' + el[llat] + ')'
          _object['geometryType'] = 'POINT'
          return _object
        }
      })
      if (points.length > 0) {
        this.$Maps.addPoints(points, {
          layerName: layerName,
          zoomToExtent: true,
          selectable: true
        })
      }
    }
  }
}
