export default {
  methods: {
    addContextMenu () {
      this.menu = new ol.control.ContextMenu({
        itemWidth: 150,
        itemHeight: 30,
        items: [
          {
            name: '周边搜索',
            alias: 'perimeter',
            iconType: 'iconfont',
            icon: 'icon-sousuo1',
            iconColor: '#2487bb'
          }
        ]
      })
      this.$Maps.map.addControl(this.menu)
      this.menu.on('before-show', this.menuBeforeShow_, this)
      this.menu.on('item-click', this.menuClickHandle_, this)
    },
    menuClickHandle_ (event, item) {
      switch (item['source']['alias']) {
        case 'perimeter':
          this.createCircle(this.$Maps.getEventCoordinate(event))
          break
        case 'clearMap':
          this.$Maps.removeAllLayer()
          break
      }
    },
    menuBeforeShow_ (event) {
      this.eventFeature = null
      let pixel = this.$Maps.getEventPixel(event)
      let feature = this.$Maps.forEachFeatureAtPixel(pixel, function (feature) {
        return feature
      })
      if (feature && feature.get('isPlot')) {
      } else {
        this.menu.update(this.menu.options['items'])
      }
    }
  }
}
