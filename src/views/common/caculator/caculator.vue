<template>
  <div class="wrapper">
    <h3>收益计算</h3>
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
                ><span class="el-icon-caret el-icon-caret-left" @click="changeDuration"></span><i>{{durationText}}</i><span class="el-icon-caret el-icon-caret-right" @click="changeDuration"></span></template
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
      <p class="light-tip">公式：本金*(年化收益率／12)*投资期限</p>
    </div>
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
      durationText: '月'

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
      handler(val){
        if (val.type === '等额本息') {
          this.durationText = '月'
        }
      },
      deep:true
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
  .operate-wrapper {
    padding: 63px 60px 15px;
    background-color: #eee;
    /deep/ .el-form--inline {
      > div {
        &.input-wrapper {
          display: flex;
          .el-form-item {
            flex: 1;
            .el-form-item__label{
              font-size: 18px;
            }
            .el-form-item__content{
              width: 250px;
              .el-input-group__append{
                padding: 0 8px;
                background-color: #f8f8f8;
                span{
                  color: #CDCDCD;
                  cursor: pointer;
                }
              }
            }
            .el-select {
              width: 250px;
              .el-input__suffix{
                height: 38px;
                padding: 0 2px;
                top: 1px;
                right: 1px;
                border-left: 1px solid #dcdfe6;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                background-color: #F8F8FB;
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
        &.btn-wrapper{
          margin: 18px 0;
          padding-left: 85px;
          .el-form-item{
            .el-form-item__content{
              width: 250px;
              button{
                width: 100%;
              }
            }
            &:nth-of-type(2){
              margin-left: 60px;
              button{
                background-color: #099EF5;
                border-color: #099EF5;
              }
            }
          }
        }
      }
    }
  }

}
</style>
