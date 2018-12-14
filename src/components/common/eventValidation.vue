<template>
  <div class="event-validation">
    <div class="event-validation-body">
      <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="82px" class="demo-ruleForm"
               v-if="showType === '1'">
        <h3>位置信息</h3>
        <span class="titafont tita-guanbi close" @click="close"></span>
        <div class="event-validation-outer">
          <el-form-item label="发生路段" prop="segment_code">
            <el-select v-model="ruleForm1.segment_code" placeholder="请选择发生路段"
                       @change="clickSegment(ruleForm1.segment_code)">
              <el-option v-for="segment in segments" :label="segment.segment_name" :key="segment.segment_code"
                         :value="segment.segment_code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件原因" prop="block_reason" required>
            <el-select v-model="ruleForm1.block_reason" placeholder="请选择事件原因">
              <el-option label="地质灾害" value="1"></el-option>
              <el-option label="重大灾害" value="2"></el-option>
              <el-option label="气象灾害" value="3"></el-option>
              <el-option label="事故灾害" value="4"></el-option>
              <el-option label="其他" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方向描述" required style="width: 100%">
            <el-col :span="11">
              <el-form-item prop="direction">
                <el-radio-group v-model="ruleForm1.direction">
                  <el-radio :label="1">上行</el-radio>
                  <el-radio :label="2">下行</el-radio>
                  <el-radio :label="3">双向</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="起止桩号">
            <el-col :span="11">
              <el-form-item prop="QDZH">
                <el-input v-model="ruleForm1.QDZH" placeholder="K" style="width: 80px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" style="margin-left: 8px">
              <el-form-item prop="ZDZH">
                <el-input v-model="ruleForm1.ZDZH" placeholder="K" style="width: 80px;"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="行政区划">
            <el-select v-model="ruleForm1.xzqh" multiple collapse-tags>
              <el-option v-for="distcode in distcodes" :label="distcode.xzqhmc" :key="distcode.xzqhbm"
                         :value="distcode.xzqhbm"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件等级" prop="block_status" required style="width: 100%">
            <el-radio-group v-model="ruleForm1.block_status">
              <el-radio :label="4">特大</el-radio>
              <el-radio :label="3">重大</el-radio>
              <el-radio :label="2">较大</el-radio>
              <el-radio :label="1">一般</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <h3>现场情况</h3>
        <div class="event-validation-outer">
          <el-form-item label="事件类型" prop="block_type" required
                        :style="{width: (ruleForm1.block_type === 1)?'100%':''}">
            <el-select v-model="ruleForm1.block_type" placeholder="请选择事件类型">
              <el-option label="公路事件" :value="1"></el-option>
              <el-option label="涉桥事件" :value="2"></el-option>
              <el-option label="涉隧事件" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="构造物编码" v-show="ruleForm1.block_type === 2 || ruleForm1.block_type === 3">
            <el-input v-model="ruleForm1.structure_id"></el-input>
          </el-form-item>
          <el-form-item label="现场照片" style="width: 100%;height: 50px;">
            <el-upload
              :action="actionUrl"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="fileList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="现场描述" prop="scene_desc" style="width: 100%;height: 50px;">
            <el-input
              type="textarea"
              :resize="'none'"
              placeholder="请输入现场描述"
              v-model="ruleForm1.scene_desc">
            </el-input>
          </el-form-item>
          <el-form-item label="处置措施" prop="measures" style="width: 100%;height: 50px;">
            <el-input
              type="textarea"
              :resize="'none'"
              placeholder="请输入处置措施"
              v-model="ruleForm1.measures">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="event-validation-button">
      <span>确认</span>
      <span>取消</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['detailArray'],
    data () {
      let validateZh = (rule, value, callback) => {
        let reg = /^[0-9.]*$/
        if (value === '') {
          callback(new Error('请输入桩号'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('桩号只能是数字'))
          } else {
            // switch (this.active) {
            //   case '1':
            //   case '2':
            //   case '4':
            //     if (this.qdzh < this.zdzh) {
            //       if (value < this.qdzh || value > this.zdzh) {
            //         callback(new Error(`请输入 ${this.qdzh} - ${this.zdzh} 之间的数`))
            //       } else {
            //         callback()
            //       }
            //     } else {
            //       if (value > this.qdzh || value < this.zdzh) {
            //         callback(new Error(`请输入 ${this.qdzh} - ${this.zdzh} 之间的数`))
            //       } else {
            //         callback()
            //       }
            //     }
            //     break
            // }
          }
        }
      }
      let validateTime = (rule, value, callback) => {
        if (value === null) {
          callback(new Error('请选择时间'))
        } else {
          callback()
        }
      }
      let validateNumber = (rule, value, callback) => {
        let reg = /^\+?[0-9][0-9]*$/
        if (!reg.test(value)) {
          callback(new Error('请输入正整数'))
        } else {
          callback()
        }
      }
      let nonIntegerNumber = (rule, value, callback) => {
        let reg = /^[0-9]+(.[0-9]{1,6})?$/
        if (!reg.test(value)) {
          callback(new Error('请输入数值'))
        } else {
          callback()
        }
      }
      return {
        currentState: 'add',  // 当前状态 添加 更新
        active: '1',
        showType: '1',
        actionUrl: config.service.SERVER_SERVICES + '/file/upload',
        sfzdm: '',
        distcodes: [],
        ruleForm1: {
          roadcode: '',
          roadname: '',
          segment_code: '',
          resume_time: '',
          block_reason: null,
          block_type: 1,
          direction_desc: '',
          direction: 1,
          QDZH: '',
          ZDZH: '',
          block_status: 1,
          detect_time: null,
          estimate_time: null,
          photo_list: '',
          scene_desc: '',
          measures: '',
          disposal_measures: '',
          structure_id: '',
          block_mileage: 0,
          sum_dead: 0,
          sum_wounded: 0,
          nei_pro_roadcode: '',
          nei_roadcode: '',
          ways: '',
          occupy: 0,
          sum_detain: 0,
          sum_destory: 0,
          xzqh: [],
          cure_unit: '',
          cure_phone: '',
          report_unit: '',
          report_user: '',
          report_user_phone: ''
        },
        rules: {
          QDZH: [
            {validator: validateZh, required: true, trigger: 'change'}
          ],
          ZDZH: [
            {validator: validateZh, required: true, trigger: 'change'}
          ],
          segment_code: [
            {required: true, message: '请选择发生路段', trigger: 'change'}
          ],
          scene_desc: [
            {required: true, message: '请输入现场描述', trigger: 'change'}
          ],
          direction_desc: [
            {required: true, message: '请输入方向描述', trigger: 'change'}
          ],
          detect_time: [
            {validator: validateTime, required: true, trigger: 'change'}
          ],
          estimate_time: [
            {validator: validateTime, required: true, trigger: 'change'}
          ],
          sum_dead: [
            {validator: validateNumber, required: true, trigger: 'change'}
          ],
          sum_wounded: [
            {validator: validateNumber, required: true, trigger: 'change'}
          ],
          maintain_desc: [
            {required: true, message: '请输入养护描述', trigger: 'change'}
          ],
          sfzdm: [
            {required: true, message: '请选择收费站', trigger: 'change'}
          ],
          starttime: [
            {validator: validateTime, required: true, trigger: 'change'}
          ],
          endtime: [
            {validator: validateTime, required: true, trigger: 'change'}
          ],
          startposition: [
            {required: true, message: '请填写管制开始站', trigger: 'change'}
          ],
          endposition: [
            {required: true, message: '请填写管制结束站', trigger: 'change'}
          ],
          plan_starttime: [
            {validator: validateTime, required: true, trigger: 'change'}
          ],
          plan_endtime: [
            {validator: validateTime, required: true, trigger: 'change'}
          ],
          occupy: [
            {validator: validateNumber, trigger: 'change'}
          ],
          sum_detain: [
            {validator: validateNumber, trigger: 'change'}
          ],
          sum_destory: [
            {validator: validateNumber, trigger: 'change'}
          ],
          block_mileage: [
            {validator: nonIntegerNumber, trigger: 'change'}
          ],
          maintain_length: [
            {validator: nonIntegerNumber, trigger: 'change'}
          ]
        },
        steps: [], // 标题步骤
        isShowReportContent: false,
        dialogImageUrl: '',
        dialogVisible: false,
        segments: [], // 路段select
        sfzs: [], // 收费站select
        qdzh: 0,
        zdzh: 9,
        fileList: [], // 交通事件现场照片list
        sfzInfoOne: {},
        updateSFZInfo: {},
        roadInfoOne: {},
        updateROADInfo: {}
      }
    },
    components: {
    },
    methods: {
      close () {
        this.$emit('close', false)
      }
    },
    watch: {
      detailArray: val => {
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables.scss";
  .event-validation {
    width: 100%;
    height: 100%;
    background: $panel-bg-color;
    box-shadow: 0 3px 8px 0 rgba(13, 4, 9, 0.08);
    border-radius: 6px;
    .el-input__inner,.el-textarea__inner,.el-upload--picture-card,.el-radio__inner{
      background: $panel-bg-color;
      border-color: $index-bg;
      color: $index-color;
    }
    .el-radio__label{
      color: $index-color;
    }
    .event-validation-body {
      margin-top: -1px;
      width: calc(100% + 13px);
      .demo-ruleForm{
        padding-top: 15px;
      }
      .el-tabs--border-card {
        border: none;
        box-shadow: none;
        -webkit-box-shadow: none;
      }
      .el-tabs {
        height: 100%;
        .el-tabs__content {
          height: calc(100% - 40px);
          overflow-x: hidden;
          overflow-y: auto;
          padding: 0;
          margin-top: 20px;
        }
      }
      .el-form {
        h3 {
          margin-bottom: 10px;
          margin-left: 20px;
          font-family: SimSun;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0;
          float: left;
          color: #20a0ff;
          padding-right: 25px;
          &:before {
            content: ' ';
            width: 2px;
            height: 12px;
            display: inline-block;
            background: #20a0ff;
            margin-right: 5px;
            float: left;
          }
        }
        .close{
          float: right;
          margin-right: 30px;
          cursor: pointer;
          transition: all .3s;
          &:hover{
            transform: rotate(180deg);
          }
        }
        .event-validation-outer{
          clear: both;
        }
        .el-form-item {
          width: calc(500px / 2);
          height: 30px;
          float: left;
          .el-select {
            .el-select__tags {
            }
          }
          .el-input {
            width: 275px;
            border-radius: 4px;
            font-size: 12px;
            .el-input__inner {
              padding: 0 10px;
              height: 33px;
            }
          }
          .el-date-editor {
            .el-input__inner {
              padding-left: 25px;
            }
          }
          .el-textarea {
            width: 275px;
            font-size: 12px;
          }
          .el-form-item__label {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 82px;
            height: 40px;
            font-family: SimSun;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0;
            color: $index-color!important;
          }
          .el-upload--picture-card {
            width: 50px;
            height: 50px;
            line-height: 50px;
            .el-icon-plus {
              margin-top: 10px;
              font-size: 12px;
            }
          }
          .el-upload-list__item {
            width: 50px;
            height: 50px;
            .el-icon-zoom-in {
              width: 4px;
              height: 4px;
              position: absolute;
              left: 4px;
              top: 14px;
            }
            .el-icon-delete {
              width: 4px;
              height: 4px;
              position: absolute;
              left: 25px;
              top: 14px;
            }
          }
        }
      }
      .report-content {
        width: 480px;
        background-color: #f6f8fd;
        border-radius: 4px;
        border: solid 1px #c9d3df;
        margin: 15px;
        padding: 15px 15px 40px 15px;
        div:nth-child(1) {
          font-size: 12px;
          line-height: 18px;
          font-family: STHeitiSC-Light;
          color: #1f2d3d;
        }
        div:nth-child(2) {
          float: right;
          width: 120px;
          height: 28px;
          font-family: STHeitiSC-Light;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 18px;
          span {
            width: 100%;
            display: block;
            text-align: center;
            color: #aeb2b9;
          }
        }
      }
    }

    .event-validation-button {
      border-top: 1px solid  $index-bg;
      width: 390px;
      height: 69px;
      /*line-height: 69px;*/
      background: $panel-bg-color;
      /*background: #ffffff;*/
      position: absolute;
      bottom: 10px;
      text-align: center;
     span{
       display: inline-block;
       height: 30px;
       line-height: 30px;
       padding: 0 10px;
       border-radius: 4px;
       text-align: center;
       margin: 24px 15px 0 15px;
       cursor: pointer;
       &:hover{
         background: #1b566d;
       }
     }
    }
    .el-button{
      background: $index-bg;
      color: $index-color;
    }
    .el-button--default{
      border-color: $index-bg;
    }
    .el-button.is-plain:hover{
      background: $panel-border-color;
    }
    .el-radio+.el-radio{
      margin-left: 22px;
    }
    .el-radio__inner{
      background: inherit!important;
    }
    .el-radio__inner::after{
      background: $index-color;
    }
  }
</style>
