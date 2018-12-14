/**
 * Created by FDD on 2017/11/9.
 * @desc 右键功能
 */
import { getControlElement, showControl, hideControl } from '../index'
class ContextMenu extends ol.control.Control {
  constructor (options = {}) {
    let className = (options.className !== undefined ? options.className : 'context-menu-content')
    let element = getControlElement(options)
    element.className = className
    const render = options.render
    const target = options.target
    super({
      element,
      render,
      target
    })

    /**
     * 配置相关
     * @type {{}}
     */
    this.options = options

    /**
     * 控件容器类名
     * @type {string}
     * @private
     */
    this.className_ = className

    /**
     * 地图容器
     * @type {null}
     */
    this.mapContent = null

    /**
     * 鼠标右键的位置
     * @type {Array}
     */
    this.pixel = []
  }
  /**
   * 初始化dom
   * @param items
   */
  initDomInternal (items) {
    if (this.getMap()) {
      this.mapContent = this.getMap().getViewport()
      this.mapContent.addEventListener('contextmenu', this.mouseDownHandle_.bind(this))
      this.mapContent.addEventListener('mousedown', this.hide.bind(this))
    }
  }

  /**
   * 初始化事件
   * @param event
   * @private
   */
  mouseDownHandle_ (event) {
    let that = this
    event.stopPropagation()
    event.preventDefault()
    if (event.button === 2) {
      that.pixel = this.getMap().getEventPixel(event)
      that.options['beforeShow'](event)
      window.setTimeout(() => {
        that.show(that.pixel)
      }, 50)
    }
  }

  handleItemClick_ (event, item) {
    if (item && item['callback'] && typeof item['callback'] === 'function') {
      item['callback'](event, {
        source: item,
        pixel: this.getCurrentPixel(),
        coordinates: this.getCurrentCoordinates()
      })
    } else {
    }
    window.setTimeout(() => {
      this.hide()
    }, 50)
  }

  /**
   * showMenu
   * @param position
   */
  show (position) {
    if (!position || !position[0]) return
    showControl()
    this.element.style.display = 'block'
    this.element.style.top = position[1] + 25 + 'px'
    this.element.style.left = position[0] - 25 + 'px'
    let aDoc = this.getMap().getSize()
    let maxWidth = aDoc[0] - this.element.offsetWidth
    let maxHeight = aDoc[1] - this.element.offsetHeight
    if (this.element.offsetTop > maxHeight) {
      this.element.style.top = maxHeight + 'px'
    }
    if (this.element.offsetLeft > maxWidth) {
      this.element.style.left = maxWidth + 'px'
    }
  }

  /**
   * hideMenu
   */
  hide (event) {
    hideControl()
    this.element.style.display = 'none'
    this.pixel = []
  }

  /**
   * 获取鼠标右键位置的像素坐标
   * @returns {ol.Pixel|*|Array}
   */
  getCurrentPixel () {
    return this.pixel
  }

  /**
   * 获取鼠标点击位置的地图坐标
   * @returns {ol.Coordinate}
   */
  getCurrentCoordinates () {
    return (this.getMap().getCoordinateFromPixel(this.getCurrentPixel()))
  }

  /**
   * setMap
   * @param map
   */
  setMap (map) {
    ol.control.Control.prototype.setMap.call(this, map)
    if (map && map instanceof ol.Map) {
      this.initDomInternal(this.options['items'])
    }
  }
}
export default ContextMenu
