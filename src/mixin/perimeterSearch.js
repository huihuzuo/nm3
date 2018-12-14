const layerName = 'perimeter-points'

export default {
  data () {
    return {
      freeHandCircle: null
    }
  },
  mounted () {},
  methods: {
    createCircle (center) {
      this.destroyCircle(true)
      if (!this.freeHandCircle) {
        this.freeHandCircle = new ol.interaction.FreeHandCircle({
          style: {
            fill: {
              fillColor: 'rgba(67, 110, 238, 0)'
            },
            stroke: {
              strokeColor: 'rgba(115, 202, 235, 0.6)',
              strokeWidth: 2.5
            },
            image: {
              type: '',
              image: {
                fill: {
                  fillColor: 'rgba(2, 49, 66, 0.9)'
                },
                points: Infinity,
                radius: 4,
                stroke: {
                  strokeColor: 'rgba(115, 202, 235, 0.6)',
                  strokeWidth: 1.5
                }
              }
            }
          }
        })
        this.$Maps.addInteraction(this.freeHandCircle)
        this.freeHandCircle.createCircle(center, 5000)
        this.freeHandCircle.on('changeend', (event) => {
          this.$Maps.removeFeatureByLayerName(layerName)
          this.queryList(this.freeHandCircle.center_, this.freeHandCircle.radius)
        })
      } else {
        this.destroyCircle(true)
        this.createCircle(center)
      }
    },
    queryList (center, distance) {
      const tables = config.layerConfig.layers.filter(_item => _item.isOpen).map(_item => _item.layerName)
      this.$fetch.getPerimeterList({
        exclude: '',
        keywords: '',
        tables: tables.join(','),
        field: '',
        center: `POINT (${center[0]} ${center[1]})`,
        distance: distance / 1000,
        current: 1,
        limit: 100000
      }).then(res => {
        if (res.result && res.result.length > 0) {
          const points = res.result.map(item => {
            const featureConfig = config.layerConfig.getLayerConfigByLayerName(item.table, 'layers')
            item.style = {
              image: {
                type: 'icon',
                image: {
                  imageSrc: featureConfig.icons.icon,
                  imageAnchor: [0.5, 0.5]
                }
              }
            }
            item.selectStyle = {
              image: {
                type: 'icon',
                image: {
                  imageSrc: featureConfig.icons.hover,
                  imageAnchor: [0.5, 0.5]
                }
              }
            }
            const _item = {
              attributes: item,
              geometry: item.geometry,
              geometryType: item.geometryType
            }
            delete _item.attributes.geometry
            delete _item.attributes.geometryType
            return _item
          })
          this._addPoints(points)
        }
      })
    },
    _addPoints (points) {
      this.$Maps.addPoints(points, {
        layerName: layerName,
        zoomToExtent: true,
        selectable: true
      })
    },
    destroyCircle (flag) {
      if (flag) {
        this.$Maps.removeFeatureByLayerName(layerName)
        this.$ClearAllPopover()
      }
      this.freeHandCircle = this.getCircle()
      if (!this.freeHandCircle) return
      this.freeHandCircle.destroy()
      this.$Maps.removeInteraction(this.freeHandCircle)
      this.freeHandCircle = null
    },
    getCircle () {
      let _circle = null
      let interactions = this.$Maps.getInteractions().getArray()
      interactions.every(item => {
        if (item instanceof ol.interaction.FreeHandCircle) {
          _circle = item
          return false
        } else {
          return true
        }
      })
      return _circle
    }
  },
  destroyed () {
    this.destroyCircle(true)
  }
}
