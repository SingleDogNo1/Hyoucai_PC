<template>
  <div class="wrapper">
    <h3>收益计算器</h3>
    <div class="top">
      <div class="operate-wrapper">
        <el-form :inline="true" :model="calculator" class="demo-form-inline">
          <div class="input-wrapper">
            <el-form-item label="出借金额">
              <input type="text" @input="inputSum" placeholder="出借金额" ref="refSum" />
              <div class="unit">元</div>
              <p>
                <em v-if="errMsg.errSum">{{ errMsg.errSum }}</em>
              </p>
            </el-form-item>
            <el-form-item label="历史平均年化收益率">
              <input type="text" @input="inputRate" placeholder="历史平均年化收益率" ref="refRate" />
              <div class="unit">%</div>
              <p>
                <em v-if="errMsg.errRate">{{ errMsg.errRate }}</em>
              </p>
            </el-form-item>
          </div>
          <div class="input-wrapper">
            <el-form-item label="出借期限">
              <input type="text" @input="inputDuration" placeholder="出借期限" ref="refDuration" />
              <div class="unit">
                <span class="el-icon-caret el-icon-caret-left" @click="changeDuration"></span> <i>{{ termType | termFilter }}</i>
                <span class="el-icon-caret el-icon-caret-right" @click="changeDuration"></span>
              </div>
              <p v-if="errMsg.errDuration">
                <em>{{ errMsg.errDuration }}</em>
              </p>
            </el-form-item>
            <el-form-item label="还款方式">
              <el-select v-model.trim="calculator.type" placeholder="还款方式">
                <el-option v-for="(type, i) in types" :key="i" :label="type.label" :value="type.value"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-form-item>
          </div>
          <div class="btn-wrapper">
            <el-form-item> <el-button type="primary" @click="submitCalc">开始计算</el-button> </el-form-item>
            <el-form-item> <el-button type="primary" @click="resetCalc">重置</el-button> </el-form-item>
          </div>
        </el-form>
        <!--<p class="tip light-tip">公式：本金*(年化收益率／12)*投资期限</p>-->
        <p class="tip black-tip">提示：收益仅供参考，实际收益以最终投资结果为准。</p>
      </div>
      <ul class="result-wrapper">
        <li>
          <dl>
            <dt>预期收益</dt>
            <dd>{{ expectedRevenue }}元</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>本息合计</dt>
            <dd>{{ totalSum }}元</dd>
          </dl>
        </li>
      </ul>
    </div>
    <!--v-if="calculator.type === 1"-->
    <h3>回款明细</h3>
    <el-table :data="tableData" class="calculator-table">
      <el-table-column prop="term" label="期数"></el-table-column>
      <el-table-column prop="totalPrincipalInterest" label="回款本息(元)"></el-table-column>
      <el-table-column prop="principal" label="回款本金(元)"></el-table-column>
      <el-table-column prop="interest" label="利息(元)"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { calculator } from '@/api/common/calculator'
import { getRetBaseURL } from '@/assets/js/utils'

const ERR_OK = '1'
export default {
  name: 'calculator',
  data() {
    return {
      types: [
        {
          label: '等额本息',
          value: 1
        },
        {
          label: '先息后本',
          value: 2
        }
      ],
      calculator: {
        sum: '',
        rate: '',
        duration: '',
        type: 2
      },
      termType: window.location.href.indexOf('hyc') > -1 ? 2 : 1, // 判断平台
      expectedRevenue: 0,
      totalSum: 0,
      tableData: [],
      system: getRetBaseURL(),
      errMsg: {
        errSum: '',
        errRate: '',
        errDuration: ''
      }
    }
  },
  watch: {
    termType(val) {
      if (val === 1) {
        this.calculator.type = 2
        this.types = [
          {
            label: '先息后本',
            value: 2
          }
        ]
      } else {
        this.types = [
          {
            label: '等额本息',
            value: 1
          },
          {
            label: '先息后本',
            value: 2
          }
        ]
      }
    },
    'calculator.type'(val) {
      if (val === 1) {
        this.termType = 2
      }
    }
  },
  filters: {
    termFilter(val) {
      if (val === 1) {
        return '日'
      } else {
        return '月'
      }
    }
  },
  methods: {
    changeDuration() {
      if (this.termType === 2) {
        this.termType = 1
      } else {
        this.termType = 2
      }
    },
    inputSum(e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      e.target.value = e.target.value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.calculator.sum = e.target.value
    },
    inputRate(e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      e.target.value = e.target.value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.calculator.rate = e.target.value
    },
    inputDuration(e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      e.target.value = e.target.value.replace(/\./g, '')
      e.target.value = e.target.value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.calculator.duration = e.target.value
    },
    submitCalc() {
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (!reg.test(this.calculator.sum)) {
        this.errMsg.errSum = '请输入正确的出借金额'
        return
      } else {
        this.errMsg.errSum = ''
      }

      if (!reg.test(this.calculator.rate)) {
        this.errMsg.errRate = '请输入正确的历史平均年化收益率'
        return
      } else {
        this.errMsg.errRate = ''
      }
      if (!reg.test(this.calculator.duration)) {
        this.errMsg.errDuration = '请输入正确的出借期限'
        return
      } else {
        this.errMsg.errDuration = ''
      }

      let params = {
        amount: this.calculator.sum,
        yearRate: this.calculator.rate,
        calcDate: this.calculator.duration,
        termType: this.termType,
        repayment: this.calculator.type
      }
      calculator(params).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          let result = data.incomeCalculatorBean
          this.expectedRevenue = result.allInterest
          this.totalSum = result.totalPrincipalInterest
          this.tableData = result.incomePlanList
        }
      })
    },
    resetCalc() {
      this.calculator = {
        sum: '',
        rate: '',
        duration: '',
        type: 2
      }
      this.$refs.refSum.value = ''
      this.$refs.refRate.value = ''
      this.$refs.refDuration.value = ''
      this.errMsg = {
        errSum: '',
        errRate: '',
        errDuration: ''
      }
      this.termType = window.location.href.indexOf('hyc') > -1 ? 2 : 1
      if (this.termType === 1) {
        this.types = [
          {
            label: '先息后本',
            value: 2
          }
        ]
      } else {
        this.calculator.type = 1
        this.types = [
          {
            label: '等额本息',
            value: 1
          },
          {
            label: '先息后本',
            value: 2
          }
        ]
      }
      this.expectedRevenue = 0
      this.totalSum = 0
      this.tableData = []
    }
  },
  created() {
    let system = this.system
    if (system.indexOf('djs') > 0) {
      // 点金石
      this.calculator.type = 2
      this.types = [
        {
          label: '先息后本',
          value: 2
        }
      ]
    } else {
      // 汇有财
      this.calculator.type = 1
      this.types = [
        {
          label: '等额本息',
          value: 1
        },
        {
          label: '先息后本',
          value: 2
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 1140px;
  margin: 20px auto 40px;
  padding: 30px 60px 65px;
  background-color: #fff;
  border: 1px solid rgba(227, 227, 227, 1);
  border-top: 1px solid rgba(247, 190, 57, 1);
  h3 {
    margin-bottom: 30px;
    font-size: 18px;
    color: rgba(74, 74, 74, 1);
    line-height: 18px;
  }
  .top {
    margin-bottom: 50px;
    border-radius: 4px;
    border: 1px solid rgba(227, 227, 227, 1);
    box-shadow: 1px 1px 2px 0px rgba(218, 218, 218, 1);
    .operate-wrapper {
      padding: 63px 60px 15px;
      background-color: #fbfbfb;
      /deep/ .el-form--inline {
        > div {
          &.input-wrapper {
            display: flex;
            .el-form-item {
              flex: 1;
              margin-bottom: 62px;
              .el-form-item__label {
                font-size: 18px;
              }
              .el-form-item__content {
                position: relative;
                width: 250px;
                display: inline-table;
                input {
                  display: table-cell;
                  vertical-align: middle;
                  box-sizing: border-box;
                  width: 100%;
                  height: 40px;
                  line-height: 40px;
                  padding: 0 15px;
                  outline: none;
                  border: 1px solid #dcdfe6;
                  border-radius: 4px;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                  background-color: #fff;
                  &:focus {
                    border-color: #f7be39;
                  }
                }
                .el-select {
                  input {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                  }
                }
                ::-webkit-input-placeholder {
                  color: #dcdfe6;
                }
                :-moz-placeholder {
                  color: #dcdfe6;
                }
                ::-moz-placeholder {
                  color: #dcdfe6;
                }
                :-ms-input-placeholder {
                  color: #dcdfe6;
                }
                .unit {
                  display: table-cell;
                  vertical-align: middle;
                  height: 38px;
                  line-height: 38px;
                  padding: 0 8px;
                  color: #cdcdcd;
                  background-color: #f8f8f8;
                  border: 1px solid #dcdfe6;
                  border-left: 0;
                  border-radius: 4px;
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                }
                .el-input-group__append {
                  padding: 0 8px;
                  background-color: #f8f8f8;
                  color: #cdcdcd;
                  cursor: pointer;
                }
                p {
                  position: absolute;
                  left: 0;
                  top: 40px;
                  width: 100%;
                  text-align: center;
                  em {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 100%;
                    margin: 10px 0;
                    border: 1px solid #e84518;
                    background: #ffe5e5;
                    border-radius: 5px;
                    font-size: 12px;
                    color: #e84518;
                  }
                }
              }
            }
            .el-select {
              width: 250px;
              .el-input__suffix {
                height: 38px;
                padding: 0 2px;
                top: 1px;
                right: 1px;
                border-left: 1px solid #dcdfe6;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                background-color: #f8f8fb;
              }
            }
            &:nth-of-type(1) {
              text-align: left;
            }
            &:nth-of-type(2) {
              .el-form-item {
                &:nth-of-type(2) {
                  text-align: right;
                  .el-form-item__content {
                    margin-right: 16px;
                  }
                }
              }
            }
          }
        }
        .btn-wrapper {
          margin: 18px 0;
          padding-left: 85px;
          .el-form-item {
            .el-form-item__content {
              width: 250px;
              button {
                width: 100%;
              }
            }
            &:nth-of-type(2) {
              margin-left: 60px;
              button {
                background-color: #099ef5;
                border-color: #099ef5;
              }
            }
          }
        }
      }
      .tip {
        margin-left: 85px;
        font-size: 14px;
        line-height: 20px;
        &.light-tip {
          margin-bottom: 10px;
          color: rgba(155, 155, 155, 1);
        }
        &.black-tip {
          color: rgba(74, 74, 74, 1);
        }
      }
    }
    .result-wrapper {
      padding: 56px 0 34px 145px;
      font-size: 0;
      border-top: 1px solid rgba(227, 227, 227, 1);
      li {
        display: inline-block;
        vertical-align: top;
        &:first-child {
          margin-right: 214px;
        }
        dl {
          text-align: left;
          dt {
            margin-bottom: 34px;
            font-size: 18px;
            color: rgba(74, 74, 74, 1);
          }
          dd {
            font-size: 24px;
            font-weight: 600;
            color: rgba(74, 74, 74, 1);
            line-height: 24px;
          }
        }
      }
    }
  }
  .calculator-table {
    border-radius: 4px;
    border: 1px solid rgba(227, 227, 227, 1);
    border-bottom: 0;
    /deep/ .el-table__header-wrapper {
      .el-table__header {
        thead {
          color: rgba(74, 74, 74, 1);
          th {
            font-weight: 400;
            background-color: rgba(245, 245, 245, 1);
          }
        }
      }
    }
  }
  /deep/ .el-table {
    th {
      text-align: center;
    }
    td {
      text-align: center;
      border-bottom: 1px solid rgba(227, 227, 227, 1);
    }
  }
}
</style>
