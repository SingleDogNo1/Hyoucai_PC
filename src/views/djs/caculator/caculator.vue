<template>
  <div class="wrapper">
    <h3>收益计算器</h3>
    <div class="top">
      <div class="operate-wrapper">
        <el-form :inline="true" :model="caculator" class="demo-form-inline">
          <div class="input-wrapper">
            <el-form-item label="出借金额">
              <el-input v-model="caculator.sum" placeholder="出借金额"
                ><template slot="append"
                  >元</template
                ></el-input
              >
            </el-form-item>
            <el-form-item label="历史平均年化收益率">
              <el-input v-model="caculator.rate" placeholder="历史平均年化收益率"
                ><template slot="append"
                  >%</template
                ></el-input
              >
            </el-form-item>
          </div>
          <div class="input-wrapper">
            <el-form-item label="出借期限">
              <el-input v-model="caculator.duration" placeholder="出借期限"
                ><template slot="append"
                  ><span class="el-icon-caret el-icon-caret-left" @click="changeDuration"></span><i>{{ durationText }}</i
                  ><span class="el-icon-caret el-icon-caret-right" @click="changeDuration"></span></template
              ></el-input>
            </el-form-item>
            <el-form-item label="还款方式">
              <el-select v-model="caculator.type" placeholder="还款方式">
                <el-option v-for="(type, i) in types" :key="i" :label="type.label" :value="type.value"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-form-item>
          </div>
          <div class="btn-wrapper">
            <el-form-item> <el-button type="primary" @click="onSubmit">开始计算</el-button> </el-form-item>
            <el-form-item> <el-button type="primary" @click="onSubmit">重置</el-button> </el-form-item>
          </div>
        </el-form>
        <p class="tip light-tip">公式：本金*(年化收益率／12)*投资期限</p>
        <p class="tip black-tip">提示：收益仅供参考，实际收益以最终投资结果为准。</p>
      </div>
      <ul class="result-wrapper">
        <li>
          <dl>
            <dt>预期收益</dt>
            <dd>{{}}元</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>本息合计</dt>
            <dd>{{}}元</dd>
          </dl>
        </li>
      </ul>
    </div>
    <h3>回款明细</h3>
    <el-table :data="tableData" class="caculator-table">
      <el-table-column prop="date" label="期数"> </el-table-column>
      <el-table-column prop="name" label="回款本息(元)"> </el-table-column>
      <el-table-column prop="address" label="回款本金(元)"> </el-table-column>
      <el-table-column prop="address" label="利息(元)"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'caculator',
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
      caculator: {
        sum: '',
        rate: '',
        duration: '',
        type: '等额本息'
      },
      durationText: '月',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  watch: {
    durationText(val) {
      if (val === '日') {
        this.caculator.type = '先息后本'
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
    caculator: {
      handler(val) {
        if (val.type === '等额本息') {
          this.durationText = '月'
        }
      },
      deep: true
    }
  },
  methods: {
    changeDuration() {
      if (this.durationText === '月') {
        this.durationText = '日'
      } else {
        this.durationText = '月'
      }
    },
    onSubmit() {
      console.log('submit!')
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
      background-color: #eee;
      /deep/ .el-form--inline {
        > div {
          &.input-wrapper {
            display: flex;
            .el-form-item {
              flex: 1;
              .el-form-item__label {
                font-size: 18px;
              }
              .el-form-item__content {
                width: 250px;
                .el-input-group__append {
                  padding: 0 8px;
                  background-color: #f8f8f8;
                  span {
                    color: #cdcdcd;
                    cursor: pointer;
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
                text-align: right;
              }
            }
          }
          &.btn-wrapper {
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
  .caculator-table {
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
