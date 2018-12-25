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
                ><span class="el-icon-caret el-icon-caret-left"></span>元<span class="el-icon-caret el-icon-caret-right"></span></template
            ></el-input>
          </el-form-item>
          <el-form-item label="还款方式">
            <el-select v-model="caculator.type" placeholder="还款方式">
              <el-option label="等额本息" value="1"></el-option>
              <el-option label="先息后本" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-form-item>
        </div>
        <div>
          <el-form-item> <el-button type="primary" @click="onSubmit">开始计算</el-button> </el-form-item>
          <el-form-item> <el-button type="primary" @click="onSubmit">重置</el-button> </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'caculator',
  data() {
    return {
      caculator: {
        sum: '',
        rate: '',
        duration: '',
        type: '等额本息'
      }
    }
  },
  methods: {
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
            .el-form-item__content{
              width: 250px;
              .el-input-group__append{
                padding: 0 8px;
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
                background-color: #CDCDCD;
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
      }
    }
  }
}
</style>
