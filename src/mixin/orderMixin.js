export default {
  data () {
    return {
      height: 0,
      limit: 10,
      current: 1,
      total: 0,
      selectId: '',
      sourcesId: ''
    }
  },
  created () {
    this.height = ($(window).height() - 212) / 2
  },
  methods: {
    /**
     * 后台查询  公用方法
     */
    queryParams (from, current, limit) {
      from.current = current
      from.limit = limit
      return from
    },
    onResize (height) {
      this.height = height
    },
    menuClick (code) {
      console.log(code + 'Handle')
      this[code + 'Handle']()
    },
    search (form) {
      let queryParams = this.queryParams(form, this.current, this.limit)
      this.spinShow = true
      return this.queryList(queryParams)
    },
    onChange (pageNumber) {
      this.current = pageNumber
      let queryParams = this.queryParams(this.form, pageNumber, this.limit)
      this.spinShow = true
      return this.queryList(queryParams)
    }
  }
}
