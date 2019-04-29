<template>
  <div class="form">
    <el-row>
      <el-col :span="9" class="row-title">充值金额</el-col>
      <el-col :span="6" class="row-value"><i class="iconfont icon-user"></i> <input type="tel" v-model="userName" placeholder="请输入充值金额" maxlength="11" /></el-col>
      <el-col :span="9" class="row-suffix">元 <span class="suffix">（100元起充）</span></el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="row-title">手机号</el-col>
      <el-col :span="6" class="row-value"><span>杨**</span></el-col>
      <el-col :span="9" class="row-suffix"></el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="row-title">银行卡</el-col>
      <el-col :span="6" class="row-value"><i class="iconfont icon-Bankcard"></i> <input type="tel" v-model="userName" placeholder="请输入银行卡号" maxlength="11" /></el-col>
      <el-col :span="9" class="row-suffix" style="position:relative">
        <span class="mark">?</span>
        <div class="bankList">
          <p>绑卡支持以下银行</p>
          <div class="banks">
            <div class="bank"  v-for="bank in bankList" :key="bank.bankCode">
              <img :src="bank.iconUrl" alt="">
              <span>{{bank.bankName}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="row-title">开户银行</el-col>
      <el-col :span="6" class="row-value"></el-col>
      <el-col :span="9" class="row-suffix"></el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="row-title">手机号</el-col>
      <el-col :span="6" class="row-value"><i class="iconfont icon-phone"></i> <input type="tel" v-model="userName" placeholder="请输入银行卡预留手机号" maxlength="11" /></el-col>
      <el-col :span="9" class="row-suffix"></el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="row-title">验证码</el-col>
      <el-col :span="6" class="row-value"><i class="iconfont icon-validation"></i> <input type="tel" v-model="userName" placeholder="请输入验证码" maxlength="11" /></el-col>
      <el-col :span="9" class="row-suffix"></el-col>
    </el-row>
    <el-row class="btn">
      <el-col :span="6" :offset="9"><el-button type="primary" disabled>确认绑卡</el-button></el-col>
    </el-row>
    <el-row class="tips">
      <el-col :span="6" :offset="9" >
        <p>温馨提示：</p>
        <p>为了您的账户提现快速到账，请您绑定一类卡</p>
        <p>点击了解何为一类卡>></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { supportBankList } from '@/api/djs/addBankCard'
export default {
  name: 'bindCard',
  data() {
    return {
      bankList: []
    }
  },
  created() {
    supportBankList().then(res => {
      if (res.data.resultCode === '1') {
        this.bankList = res.data.list
      }
    })
  }
}
</script>

<style scoped lang="scss">
.form {
  margin: 0 auto;
  .el-row {
    margin: 15px 0;
    line-height: 40px;
    .row-title {
      font-size: 18px;
      font-weight: 500;
      text-align: right;
      padding-right: 10px;
    }
    .row-value {
      width: 284px;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 1);
      position: relative;
      i {
        display: inline-block;
        position: absolute;
        top: 5px;
        width: 40px;
        border-right: 1px solid;
        border-image: linear-gradient(180deg, rgba(169, 169, 169, 0), rgba(226, 226, 226, 0.96), rgba(151, 151, 151, 0)) 1 1;
        font-size: 20px;
        color: #cecece;
        line-height: 30px;
        text-align: center;
      }
      input {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 4px 0 4px 52px;
        border: 1px solid rgba(227, 227, 227, 1);
        border-radius: 2px;
        &:focus {
          border-color: #fb7b1f;
        }
      }
    }
    .row-suffix {
      padding-left: 10px;
      span.suffix {
        font-size: 13px;
        color: rgb(205, 205, 205);
      }
      span.mark {
        display: inline-block;
        border: 1px solid rgb(205, 205, 205);
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        color: rgb(205, 205, 205);
        cursor: pointer;
      }
      span.mark:hover + .bankList {
        display: block;
      }
      .bankList {
        display: block;
        padding: 15px;
        font-size: 12px;
        position: absolute;
        z-index: 10000;
        top: -68px;
        left: 44px;
        width: 218px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        box-shadow: 1px 1px 2px 0px rgba(218, 218, 218, 1);
        border: 1px solid rgba(227, 227, 227, 1);
        &:before {
          position: absolute;
          top: 83px;
          left: -9px;
          content: '';
          width: 0;
          height: 0;
          /*border-top: 5px solid transparent;*/
          border-right: 10px solid red;
          /*border-bottom: 5px solid transparent;*/
        }
        .banks {
          display: flex;
          flex-wrap: wrap;
          .bank {
            width: 90px;
            height: 31px;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }

    &.btn {
      margin-top: 30px;
      .el-button {
        width: 100%;
        font-size: 18px;
      }
    }
    &.tips {
      margin-top: 32px;
      margin-bottom: 40px;
      p {
        font-size: 14px;
        line-height: 24px;
        color: #9b9b9b;
      }
    }
  }
}
</style>
