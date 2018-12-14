export default {
  data () {
    return {
    }
  },
  methods: {
    /**
     * 根据配置叠加图层
     * @param config
     * @param isClear
     */
    addOverlayLayer (config, isClear) {
      if (isClear) this.removerLayer(config['layerName'])
      switch (config['layerType']) {
        case 'TileArcGISRest':
          this.$Maps.createTitleLayer(config['layerName'], config)
          break
        case 'TileWMS':
          this.$Maps.createTileWMSLayer(config['layerName'], config)
          break
        case 'TileXYZ':
          this.$Maps.createXYZLayer(config['layerName'], config)
          break
        case 'ImageWMS':
          this.$Maps.createImageWMSLayer(config['layerName'], config)
          break
      }
    },
    /**
     * 移除图层
     * @param layerName
     */
    removerLayer (layerName) {
      if (layerName) {
        this.$Maps.removeLayerByLayerName(layerName)
      }
    },

    /**
     * 获取动态图层参数
     * @param dynamicInfo
     * @param where
     * @returns {null}
     */
    getDynamicLayerConfig (dynamicInfo, where) {
      try {
        let [dynamicLayersParams, uniqueValueInfos] = [[], []]
        if (dynamicInfo && dynamicInfo['field'] && dynamicInfo['uniqueValueInfos']) {
          if (dynamicInfo['uniqueValueInfos'] && Array.isArray(dynamicInfo['uniqueValueInfos'])) {
            uniqueValueInfos = dynamicInfo['uniqueValueInfos'].map(item => {
              let object = {
                value: ((item['value'] ? item['value'] : '1') + ''),
                symbol: {
                  type: 'esriSLS',
                  style: 'esriSLSSolid',
                  width: 4,
                  color: [0, 255, 0, 255],
                  outline: {
                    type: 'esriSLS',
                    style: 'esriSLSSolid',
                    width: (item['width'] ? item['width'] : 4),
                    color: [0, 255, 0, 255]
                  }
                }
              }
              if (item['color'] && Array.isArray(item['color'])) {
                if (item['color'][3] <= 1) item['color'][3] = item['color'][3] * 255
                object['symbol']['color'] = item['color']
              }
              return object
            })
          }
          let dynamicLayersJson = [
            {
              id: 1,
              source: {
                type: 'dataLayer',
                dataSource: {
                  type: 'table',
                  dataSourceName: 'GL_NB_GS', // TODO 注意dataSource和workspaceId
                  workspaceId: 'NBWorkspaceID'
                }
              },
              definitionExpression: where,
              drawingInfo: {
                renderer: {
                  type: 'uniqueValue',
                  field1: dynamicInfo.field,
                  defaultSymbol: {
                    type: 'esriSFS',
                    style: 'esriSLSSolid',
                    color: [255, 0, 0, 255],
                    width: 5,
                    outline: {
                      type: 'esriSLS',
                      style: 'esriSLSSolid',
                      width: 5,
                      color: [255, 0, 0, 255]
                    }
                  },
                  uniqueValueInfos: uniqueValueInfos
                }
              }
            }
          ]
          dynamicLayersParams = JSON.stringify(dynamicLayersJson)
        }
        return dynamicLayersParams
      } catch (error) {
        console.log(error)
      }
    }
  }
}
