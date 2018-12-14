<template>
  <div class="sf-top-tool">
    <ul class="tool-content clearfix">
      <li
        class="sub-tool"
        :key="item.alias"
        v-for="item in toolList">
        <span
          class="tools-item iconfont"
          :class="item.icon"
          @click="handleClick_(item)">
          {{item.name}}
          <span v-if="item.children && item.children.length > 0" class="el-icon-arrow-down"></span>
        </span>
        <ul class="clearfix sub-tool-children" v-if="item.children && item.children.length > 0">
          <li
            class="sub-tool-children"
            v-for="child in item.children"
            @click="handleClick_(child)">
            <span class="iconfont" :class="child.icon">{{child.name}}</span>
          </li>
        </ul>
      </li>
      <road-state
        @close="hideRoadState"
        v-if="showRoadState"></road-state>
    </ul>
  </div>
</template>
<script>
  import roadState from './roadState'
  export default {
    name: 'tool-box',
    data () {
      return {
        tooltip: null,
        showRoadState: false,
        measureTool: null,
        toolList: [
          {
            name: '路况',
            icon: 'icon-lukuang1',
            alias: 'roadState',
            selected: false
          }
          // {
          //   name: '工具',
          //   icon: 'icon-gongjuxiang',
          //   alias: 'toolBox',
          //   selected: false,
          //   children: [
          //     {
          //       name: '测距',
          //       icon: 'icon-ceju',
          //       alias: 'measureLenght'
          //     },
          //     {
          //       name: '测面',
          //       icon: 'icon-cemian',
          //       alias: 'measureArea'
          //     },
          //     {
          //       name: '清图',
          //       icon: 'icon-qingli',
          //       alias: 'clearMap'
          //     }
          //   ]
          // }
        ]
      }
    },
    methods: {
      handleClick_ (item) {
        console.log(item)
        switch (item['alias']) {
          case 'roadState':
            this.showRoadState = !this.showRoadState
            break
          case 'clearMap':
            this.$Maps.removeAllLayer()
            break
          case 'measureLenght':
            this.getMeasure()
            this.measureTool.setTool(true, 'measureLength', false)
            break
          case 'measureArea':
            this.getMeasure()
            this.measureTool.setTool(true, 'measureArea', false)
            break
        }
      },
      getMeasure () {
        if (this.$Maps && !this.measureTool) {
          const interactions = this.$Maps.getInteractions().getArray()
          interactions.every(inter => {
            if (inter && inter instanceof ol.interaction.MeasureTool) {
              this.measureTool = inter
              return false
            } else {
              return true
            }
          })
        }
        return this.measureTool
      },
      hideRoadState () {
        this.showRoadState = false
      }
    },
    components: {
      roadState
    }
  }
</script>
<style lang="scss">
  .sf-top-tool {
    width: auto;
    position: absolute;
    top: 20px;
    right: 20px;
    color: #747474;
    background-color: #FFFFFF;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
    .tool-content {
      height: 32px;
      line-height: 32px;
      list-style: none;
      background: #fff;
      border-radius: 4px;
      padding: 0;
      box-shadow: 1px 1px 3px #c8c6c7;
      transition: opacity .2s ease-in-out;
      > li {
        ul {
          padding: 0;
          background: #fff;
          box-shadow: 1px 1px 3px #c8c6c7;
          overflow: hidden;
          height: 0;
          opacity: 0;
          transition: opacity .2s ease-in-out;
        }
        &:hover {
          ul {
            opacity: 1;
            height: auto;
          }
        }
        > .tools-item {
          text-align: center;
          font-size: 14px;
          position: relative;
          &:after {
            position: absolute;
            right: 0;
            top: 8px;
            content: " ";
            width: 1px;
            height: 16px;
            background: #ccc;
          }
          &:before {
            font-size: 16px;
            margin-right: 10px;
          }
          .el-icon-arrow-down {
            display: inline-block;
            padding: 0 0px 0 3px;
            height: auto;
            color: #747474;
            text-align: center;
          }
        }

        > .tools-item:first-child {
          &:after {
            display: none;
          }
        }
      }
      .sub-tool {
        display: inline-block;
        float: left;
        height: 32px;
        text-align: center;
        .tools-item {
          display: inline-block;
          padding: 0 13px 0 10px;
          height: 32px;
          color: #747474;
          text-align: left;
          transition: background-color .2s ease-in-out, color .2s ease-in-out;
          &:hover {
            cursor: pointer;
            color: #fff;
            background-color: #1b9de8;
          }
        }
        &-children {
          li {
            span {
              display: inline-block;
              padding: 0 13px 0 10px;
              height: 32px;
              color: #747474;
              text-align: center;
              font-size: 14px;
              transition: background-color .2s ease-in-out, color .2s ease-in-out;
              &:before {
                font-size: 16px;
                margin-right: 10px;
              }
            }
            &:hover {
              span {
                color: #fff;
              }
              cursor: pointer;
              background-color: #1b9de8;
            }
          }
        }
      }
    }
  }
</style>
