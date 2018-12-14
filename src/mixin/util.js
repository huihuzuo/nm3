export default {
  methods: {
    //  拼接选定id
    buildId (array, key) {
      let id = key || 'id'
      let idArray = []
      array.map(item => {
        idArray.push(item[id])
      })
      return idArray.join(',')
    }
  }
}
