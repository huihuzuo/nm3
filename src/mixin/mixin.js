export default {
  methods: {
    beforeEnter: function (el) {
      el.style.visibility = 'hidden'
      el.style.transform = 'rotateX(360deg)'
    },
    enter: function (el, done) {
      let delay = el.dataset.index * 150
      let $el = $(el)
      setTimeout(function () {
        $el.velocity({ rotateX: '0deg' }, { visibility: 'visible' }, { complete: done })
      }, delay)
    },
    leave: function (el, done) {
      el.style.display = 'none'
      done()
    }
  }
}
