<template>
  <div class="detail-table-wrap">
    <table>
      <tr v-for="(index) in dataLength()">
        <th :title="field[index * 2 - 2].name"><span>{{field[index * 2 - 2].name}}</span></th>
        <td :title="data[field[index * 2 - 2].code]"><span>{{data[field[index * 2 - 2].code]}}</span></td>

        <th v-if="field[index * 2 - 1] !== undefined" :title="field[index * 2 - 1].name"><span>{{field[index * 2 - 1].name}}</span></th>
        <td v-if="field[index * 2 - 1] !== undefined" :title="data[field[index * 2 - 1].code]"><span>{{data[field[index * 2 - 1].code]}}</span></td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    props: {
      field: {
        type: [Object, Array],
        default: function () {
          return []
        }
      },
      data: {
        type: [Object, Array],
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        dataLength () {
          return Math.ceil(this.field.length / 2)
        }
      }
    }
  }
</script>
<style lang="scss">
  .detail-table-wrap {
    table {
      width: 550px;
      border-collapse: collapse;
      line-height: 32px;
      tr {
        th {
          position: relative;
          color: #5194ae;
          padding: 0 10px 0 5px;
          width: 120px;
          span {
            width: 104px;
          }
          &:after {
            content: ':';
            position: absolute;
            right: 10px;
            height: 30px;
            top: 50%;
            margin-top: -16px;
          }
        }
        td {
          width: 155px;
          padding: 0 5px;
          color: #7adaff;
          span {
            width: 144px;
          }
        }
        th, td {
          text-align: left;
          border: 1px solid rgba(32, 98, 125, 0.6);
          height: 30px;
          line-height: 30px;
          span {
            display: inline-block;
            float: left;
            font-family: SimSun;
            font-size: 12px;
            font-weight: 400;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
