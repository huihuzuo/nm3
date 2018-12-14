import {uuid} from '../helper'

const layerName = 'segment-lines' // 事件关联的路线图层

export default {
  data () {
    return {
      freeHandCircle: null
    }
  },
  mounted () {},
  methods: {
    queryAlias (lxbm, sxxfx, qdzh, zdzh) {
      if (!qdzh || !zdzh || !lxbm) {
        this.$message({
          message: '缺少关键查询信息',
          type: 'warning'
        })
      }
      this.$fetch.getSegmentLine({
        layerName: 'GIS_LX',
        filter: (`LXDM='${lxbm}'` + (sxxfx ? ` AND SXXFX=${sxxfx}` : '')),
        startPos: qdzh,
        endPos: zdzh
      }).then(res => {
        if (res.data && res.data.features.length > 0) {
          const lines = res.data.features.map(_item => {
            _item.attributes.id = uuid()
            return _item
          })
          this._addlines(lines)
        }
      })
    },
    _addlines (lines) {
      this.$Maps.addPolylines(lines, {
        layerName: layerName,
        zoomToExtent: false,
        selectable: true,
        style: {
          stroke: {
            strokeColor: 'rgba(0, 92, 230, 1)',
            strokeWidth: 3
          }
        },
        selectStyle: {
          stroke: {
            strokeColor: 'rgba(255, 0, 0, 1)',
            strokeWidth: 3.5
          }
        }
      })
    },
    /**
     * 移除关联的路线图层
     */
    clearAlias () {
      if (!this.$Maps) return
      this.$Maps.removeLayerByLayerName(layerName)
    }
  },
  destroyed () {
    this.clearAlias(true)
  }
}
