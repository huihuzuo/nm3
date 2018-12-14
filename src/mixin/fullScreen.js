import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      isFullScreen: state => state.tools.isFullScreen
    })
  },
  mounted () {
    this.onResize()
  },
  methods: {
    // 检查全屏状态
    checkFullScreen () {
      return document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || Boolean(document.msFullscreenElement) || document.mozFullScreen
    },
    // 全屏驱动
    fullScreen () {
      if (!this.checkFullScreen()) {
        this.requestFullScreen()
      } else {
        this.exitFullScreen()
      }
    },
    // 打开全屏
    requestFullScreen () {
      let docElm = document.documentElement
      let requestMethod = docElm.requestFullScreen || // W3C
        docElm.webkitRequestFullScreen || // FireFox
        docElm.mozRequestFullScreen || // Chrome等
        docElm.msRequestFullscreen // IE11
      if (requestMethod) {
        requestMethod.call(docElm)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        this.IEFix()
      }
    },
    // 退出全屏
    exitFullScreen () {
      let exitMethod = document.cancelFullScreen || // W3C
        document.mozCancelFullScreen || // FireFox
        document.webkitCancelFullScreen || // Chrome等
        document.msExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        this.IEFix()
      }
    },
    // 修复 IE
    IEFix () {
      /*  eslint-disable no-undef */
      let wscript = new ActiveXObject('WScript.Shell')
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    },
    // 窗口改变事件
    onResize () {
      window.onresize = () => {
        this.$store.dispatch('setIsFullScreen', this.checkFullScreen())
      }

      document.onkeydown = (e) => {
        let keyCode = window.event ? e.keyCode : e.which
        if (keyCode === 122) {
          return false
        }
      }
    }
  }
}
