<template>
  <div class="mini-panel-wrap">
    <div class="left-panel-box">
      <div class="s-panel-body">
        <div class="s-panel" id="s-panel">
          <div class="panel-title top-title" v-if="title === ''">
            <div class="title no-title"><span></span></div>
          </div>
          <div class="panel-title top-title" v-if="title !== ''">
            <div class="title">
              <span class="title-line" :class="'title-line' + className"></span>
              <span class="title-name" :id="'title-name' + className">{{title}}</span>
              <span class="title-line" :class="'title-line' + className"></span>
            </div>
          </div>
          <div class="panel-title-center-wrap">
            <slot></slot>
          </div>
          <!--<div class="panel-title bottom-title">
            <div class="title no-title"><span></span></div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panel',
    props: {
      title: {
        type: String,
        default: function () {
          return ''
        }
      },
      className: {
        type: String,
        default: function () {
          return 'mini-panel-box'
        },
        required: true
      }
    },
    mounted () {
      this.setLineWidth()
    },
    watch: {},
    methods: {
      close () {
        this.$emit('onClose')
      },
      setLineWidth () {
        if (this.title) {
          let titleNameWidth = document.getElementById('title-name' + this.className).offsetWidth
          let titleLineWidth = ((340 - titleNameWidth - 44) / 2)
          document.getElementsByClassName('title-line' + this.className)[0].style.width = titleLineWidth + 'px'
          document.getElementsByClassName('title-line' + this.className)[1].style.width = titleLineWidth + 'px'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables.scss";

  .mini-panel-wrap {
    .left-panel-box {
      height: 100%;
      .s-panel-body {
        //overflow: hidden;
        width:100%;
        height:100%;
        //width: 300px;
        margin: auto;
        .s-panel {
          margin-bottom: 10px;
          .panel-title-center-wrap {
            width:100%;
            margin-top:-14px;
            //padding-left:10px;
          }
          .panel-title {
            text-align: center;
            position: relative;
            &:before, &:after {
              position: absolute;
              display: inline-block;
              content: ' ';
              //height: 16px;
              //width: 16px;
            }
            &:before {
              left: 0;
            }

            &:after {
              right: 0;
            }

            .title {
              position: relative;
              height: 16px;
              &:before, &:after {
                position: absolute;
                display: inline-block;
                content: ' ';
                height: 15px;
              }
              &:before {
                left: 0;
              }
              &:after {
                right: 0;
              }
              &.no-title {
                &:before, &:after {
                  //width: 163px !important;
                }
                span {
                  display: none !important;
                }
              }
              .title-name {
                padding: 0 15px;
                position: relative;
                height: 20px;
                line-height: 20px;
                float: left;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: bold;
                color: #585858;

                &:before, &:after {
                  position: absolute;
                  top: 8px;
                  display: inline-block;
                  content: ' ';
                  height: 5px;
                  width: 5px;
                  border-radius: 5px;
                  background: #bdc9e1;
                }
                &:before {
                  left: 0;
                }
                &:after {
                  right: 0;
                }
              }
              .no-title {
                &:before, &:after {
                  display: none;
                }
              }
            }

            &.top-title {
              padding: 7px 22px 0px;
              &:before {
                top: 7px;
                background: url('../../../static/images/corner.png') no-repeat;
              }
              &:after {
                top: 7px;
                background: url('../../../static/images/corner.png') no-repeat -17px 0;
              }
              .title {
                .title-line {
                  // border-top: 1px solid #124a68;
                  height: 1px;
                  display: inline-block;
                  float: left;
                  top: 10px;
                  position: relative;
                }
                &:before, &:after {
                  border-top: 1px solid #124a68;
                  /*width: 125px;*/
                }
                span {
                  display: inline-block;
                  transform: translate(0, -10px);
                }
              }
            }
            &.bottom-title {
              padding: 0px 22px 7px;
              //margin-top: -30px;
              &:before {
                bottom: 7px;
                background: url('../../../static/images/corner.png') no-repeat 0 -17px;
              }
              &:after {
                bottom: 7px;
                background: url('../../../static/images/corner.png') no-repeat -17px -17px;
              }
              .title {
                &:before, &:after {
                  // border-bottom: 1px solid #124a68;
                  width: 163px;
                }
                span {
                  display: inline-block;
                  transform: translate(0, 5px);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
