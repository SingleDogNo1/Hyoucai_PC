<template>
  <div class="content-box">
    <div class="content">
      <header>
        <span>《三方协议》</span>
        <button class="cancel">取消</button>
      </header>
      <section>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">基本信息</span>
        </p>
        <div class="essential-information">
          <div class="txt">
            <p>
              <span class="left">项目名称：</span>
              <span class="right">JY00000000001</span>
            </p>
            <p>
              <span class="left">还款方式：</span>
              <span class="right">按月还息，到期还本</span>
            </p>
          </div>
          <div class="txt">
            <p>
              <span class="left">合同编号：</span>
              <span class="right">2017051202J</span>
            </p>
            <p>
              <span class="left">融资金额：</span>
              <span class="right">1,000,000元</span>
            </p>
          </div>
          <div class="txt">
            <p>
              <span class="left">借贷期限：</span>
              <span class="right">6个月</span>
            </p>
            <p>
              <span class="left">历史年化收益率：</span>
              <span class="right">5.0%</span>
            </p>
          </div>
        </div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">审核信息</span>
        </p>
        <table class="examine">
          <tr class="examine-title">
            <td>身份信息</td>
            <td>认证情况</td>
            <td>身份信息</td>
            <td>认证情况</td>
          </tr>
          <tr>
            <td>身份证认证</td>
            <td>
              <img src="./image/bg.png">
            </td>
            <td>运营商认证</td>
            <td>中国移动运营商认证通过</td>
          </tr>
          <tr>
            <td>学信网认证</td>
            <td>白领</td>
            <td>脸识别</td>
            <td>
              <img src="./image/bg.png">
            </td>
          </tr>
          <tr>
            <td>签约</td>
            <td>
              <img src="./image/bg.png">
            </td>
            <td>银行卡认证</td>
            <td>6228 **** **** 1234银行卡账户、开户名、开户手机、身份证号认证成功</td>
          </tr>
          <tr>
            <td>互联网资讯报告</td>
            <td>
              <img src="./image/bg.png">
            </td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">还款来源</span>
        </p>
        <div class="repayment">借款人固定工作收入</div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">相关费用</span>
        </p>
        <table class="examine cost">
          <tr class="examine-title">
            <td class="left">相关操作</td>
            <td class="right">收费标准</td>
          </tr>
          <tr>
            <td>转让手续费</td>
            <td>按每笔转让收取，费用为年化金额0.6%</td>
          </tr>
          <tr>
            <td>提现／充值／投资</td>
            <td>免费</td>
          </tr>
        </table>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">借款人信息</span>
        </p>
        <div class="borrower">
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">借款人姓名：</span>
              <span class="right"></span>
            </p>
            <p class="borrower-box-center">
              <span class="left">性别：</span>
              <span class="right"></span>
            </p>
            <p>
              <span class="left">身份证号：</span>
              <span class="right"></span>
            </p>
          </div>
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">年龄：</span>
              <span class="right"></span>
            </p>
            <p class="borrower-box-center">
              <span class="left">行业：</span>
              <span class="right"></span>
            </p>
            <p>
              <span class="left">居住地址：</span>
              <span class="right"></span>
            </p>
          </div>
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">婚姻状况：</span>
              <span class="right"></span>
            </p>
            <p class="borrower-box-center">
              <span class="left">月收入：</span>
              <span class="right"></span>
            </p>
            <p>
              <span class="left">借款金额：</span>
              <span class="right"></span>
            </p>
          </div>
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">借款用途：</span>
              <span class="right"></span>
            </p>
            <p class="borrower-box-center">
              <span class="left">借款主体性质：</span>
              <span class="right"></span>
            </p>
            <p>
              <span class="left">借款期限：</span>
              <span class="right"></span>
            </p>
          </div>
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">还款来源：</span>
              <span class="right"></span>
            </p>
            <p class="borrower-box-center">
              <span class="left">逾期金额：</span>
              <span class="right"></span>
            </p>
            <p></p>
          </div>
          <p class="borrower-txt">
            <span class="left">征信报告：</span>
            <span class="right">核查人银行征信报告，该借款人近6个月无逾</span>
          </p>
          <p class="borrower-txt">
            <span class="left">在其他网络借贷平台借款情况：</span>
            <span class="right">借款人保证在不同网络借贷信息中介机构平台借款总余额与本合同借款金额合计总额不超过人民币100万元</span>
          </p>
        </div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">贷后情况</span>
        </p>
        <div class="situation">
          <div class="situation-div situation-left">
            <p>
              <span class="left">平台历史逾期次数：</span>
              <span class="right">0次</span>
            </p>
            <p>
              <span class="left">借款人还款能力变化情况：</span>
              <span class="right">未发现异常</span>
            </p>
          </div>
          <div class="situation-div situation-center">
            <p>
              <span class="left">平台历史逾期金额：</span>
              <span class="right">0.00元</span>
            </p>
            <p>
              <span class="left">借款人涉诉情况：</span>
              <span class="right">未发现新增涉诉</span>
            </p>
          </div>
          <div class="situation-div situation-right">
            <p>
              <span class="left">借款资金运用情况：</span>
              <span class="right">未发现挪用</span>
            </p>
            <p>
              <span class="left">借款人受行政处罚情况：</span>
              <span class="right">未发现新增行政处罚</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectDetal',
  data() {
    return {
      flag: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
.content-box {
  padding: 120px 200px 110px;
  background: rgba(227, 227, 227, 1);
  .content {
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    border: 1px solid rgba(229, 229, 229, 1);
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: $font-size-small;
    min-width: 1100px;
    header {
      height: 61px;
      line-height: 61px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      color: rgba(0, 131, 254, 1);
      padding-left: 30px;
      position: relative;
      .cancel {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 29px;
        height: 29px;
        border-radius: 50%;
        border: 1px solid rgba(74, 74, 74, 1);
        cursor: pointer;
      }
    }
    section {
      padding-top: 24px;
      padding-left: 50px;
      .title {
        .title-boder {
          display: inline-block;
          width: 6px;
          height: 16px;
          background: rgba(251, 157, 31, 1);
          vertical-align: middle;
        }
        .title-text {
          display: inline-block;
          font-size: 16px;
          color: rgba(74, 74, 74, 1);
          line-height: 22px;
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      .essential-information {
        display: flex;
        margin: 11px 112px 0 0;
        justify-content: space-between;
        margin-bottom: 39px;
        .txt {
          height: 80px;
          font-size: $font-size-small;
          color: rgba(155, 155, 155, 1);
          line-height: 40px;
          .right {
            color: rgba(74, 74, 74, 1);
          }
        }
      }
      .examine {
        margin: 21px 0 32px;
        width: 90%;
        tr {
          width: 100%;
          td {
            width: 25%;
            height: 40px;
            line-height: 40px;
            border: 1px solid rgba(227, 227, 227, 1);
            text-align: center;
            color: rgba(155, 155, 155, 1);
            font-size: $font-size-small-s;
            line-height: 12px;
            img {
              width: 24px;
              height: 17px;
              border-radius: 2px;
              vertical-align: middle;
            }
          }
          .left {
            width: 30%;
          }
        }
        .examine-title {
          background: rgba(240, 247, 255, 1);
          td {
            color: rgba(74, 74, 74, 1);
          }
        }
      }
      .repayment {
        font-size: 14px;
        color: rgba(155, 155, 155, 1);
        line-height: 14px;
        margin: 20px 0 58px;
      }
      .cost {
        margin: 25px 0 61px;
      }
      .borrower {
        margin: 19px 0 50px;
        font-size: $font-size-small-s;
        .borrower-box {
          height: 30px;
          line-height: 30px;
          display: flex;
          .borrower-box-left {
            width: 196px;
            height: 210px;
          }
          .borrower-box-center {
            width: 140px;
            height: 150px;
            margin-left: 150px;
            margin-right: 150px;
          }
        }
        .left {
          color: rgba(155, 155, 155, 1);
        }
        .borrower-txt {
          height: 30px;
          line-height: 30px;
        }
      }
      .situation {
        margin: 10px 0 36px;
        display: flex;
        font-size: $font-size-small;
        .situation-left {
          width: 272px;
          height: 80px;
        }
        .situation-div {
          color: rgba(155, 155, 155, 1);
          line-height: 40px;
          .right {
            color: rgba(74, 74, 74, 1);
          }
        }
        .situation-center {
          margin: 0 98px 0 106px;
        }
      }
    }
  }
}
</style>
