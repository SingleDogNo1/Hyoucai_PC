<template>
  <div class="risk_box">
    <div class="risk">
      <header ref="Title">
        <div class="head_gradient">{{ title }}</div>
      </header>
      <div v-if="!isShow" class="isShow">
        <section class="content">
          <div>
            1.我们将对您的风险承担能力进行评估,请根据您的自身实际情况如实填写问卷,以便我们了解您的风险承担类型,进而根据您的风险承担能力选择适合您的理财产品。
          </div>
          <div>2.评估结果仅供参考,不构成出借建议。为了及时了解您的风险承受能力,建议您持续做好动态评估,我们承诺对您的所有个人资料保密</div>
          <div class="content_text">本问卷包含10个问题，每个问题请根据您的自身实际情况选择一个选项。</div>
        </section>
        <el-form :model="questionsObj">
          <section class="problem_box" v-for="(item, index) in questionsObj.questions" :key="index">
            <p class="problem_title">{{ item.title }}</p>
            <el-radio-group v-model="radio[index]" @change="getChoice($event, index)">
              <el-radio class="matchClass" v-for="(answer, i) in item.answers" :key="i" :label="answer.score">{{ answer.des }}</el-radio>
            </el-radio-group>
          </section>
          <div class="submit_box"><div class="submit" :class="{ active: isColor }" @click="submit()">提交评测</div></div>
        </el-form>
      </div>
      <Result v-if="isShow" :resultTitle="resultTitle" :resultFont="resultFont" :resultType="resultType" @changeShow="changeShow()" />
    </div>
  </div>
</template>
<script>
import { saveEvaluatingResultApi } from '@/api/common/risk'
import { getAuth } from '@/assets/js/utils'
import Result from './Result.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      title: '风险评测',
      isShow: false,
      radio: [],
      scoreArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      questionsObj: {
        questions: [
          {
            title: '1.您的年龄是？',
            answers: [
              {
                des: 'A. 60岁以上',
                score: 1,
                flag: false
              },
              {
                des: 'B. 50 - 60岁',
                score: 2,
                flag: false
              },
              {
                des: 'C. 30 - 49岁',
                score: 3,
                flag: false
              },
              {
                des: 'D. 18 - 29岁',
                score: 5,
                flag: false
              }
            ]
          },
          {
            title: '2.您家庭年收入大概是多少？',
            answers: [
              {
                des: 'A. 小于5万',
                score: 1,
                flag: false
              },
              {
                des: 'B. 5 - 20万',
                score: 2,
                flag: false
              },
              {
                des: 'C. 10 - 50万',
                score: 3,
                flag: false
              },
              {
                des: 'D. 50 -100万',
                score: 4,
                flag: false
              },
              {
                des: 'E. 100万以上',
                score: 5,
                flag: false
              }
            ]
          },
          {
            title: '3.在您每年的家庭收入中，可用于出借的比例为？',
            answers: [
              {
                des: 'A. 10%以下',
                score: 1,
                flag: false
              },
              {
                des: 'B. 10% - 25%',
                score: 2,
                flag: false
              },
              {
                des: 'C. 25% - 50%',
                score: 3,
                flag: false
              },
              {
                des: 'D. 50%以上',
                score: 5,
                flag: false
              }
            ]
          },
          {
            title: '4.当选择一个网贷产品进行出借后,您通常会觉得：',
            answers: [
              {
                des: 'A. 对自己的决定很有信心和期待',
                score: 5,
                flag: false
              },
              {
                des: 'B. 轻松,基本持乐观态度',
                score: 3,
                flag: false
              },
              {
                des: 'C. 比较担心出借结果',
                score: 2,
                flag: false
              },
              {
                des: 'D. 非常担心出借结果',
                score: 1,
                flag: false
              }
            ]
          },
          {
            title: '5.当您进行出借时，需要明确可能获得出借收益，但同时也面临着出借风险。',
            answers: [
              {
                des: 'A. 清楚,能接受',
                score: 5,
                flag: false
              },
              {
                des: 'B. 不能接受',
                score: 1,
                flag: false
              }
            ]
          },
          {
            title: '6.您选择过哪些类型的金融产品？',
            answers: [
              {
                des: 'A. 只选择银行存款或购买国债等低风险且收益较稳定的产品',
                score: 1,
                flag: false
              },
              {
                des: 'B. 除银行外，少部分选择基金、P2P、股票等产品',
                score: 2,
                flag: false
              },
              {
                des: 'C. 资产均匀分布在国债、股票、基金、P2P等金融产品中',
                score: 3,
                flag: false
              },
              {
                des: 'D. 大部分选择基金、P2P、股票、期货、外汇等金融项目中，较少选择银行存款',
                score: 5,
                flag: false
              }
            ]
          },
          {
            title: '7.当选择非保本产品时，您会愿意接受下列哪项出借年限？',
            answers: [
              {
                des: 'A. 3年以上',
                score: 5,
                flag: false
              },
              {
                des: 'B. 2 - 3年',
                score: 3,
                flag: false
              },
              {
                des: 'C. 1 - 2年',
                score: 2,
                flag: false
              },
              {
                des: 'D. 1年以下',
                score: 1,
                flag: false
              }
            ]
          },
          {
            title: '8.您的出借目标是？',
            answers: [
              {
                des: 'A. 资产保值,我不愿意承担任何出借风险',
                score: 1,
                flag: false
              },
              {
                des: 'B. 尽可能保证本金安全,不在乎收益率比较低',
                score: 2,
                flag: false
              },
              {
                des: 'C. 产生较多的收益,可以承担一定的出借风险',
                score: 3,
                flag: false
              },
              {
                des: 'D. 实现资金大幅增长,愿意承担较大的出借风险',
                score: 5,
                flag: false
              }
            ]
          },
          {
            title: '9.您选择银行产品、基金专户、券商计划、信托计划等产品主要用于什么目的？',
            answers: [
              {
                des: 'A. 平时生活保障，赚点补贴家用',
                score: 2,
                flag: false
              },
              {
                des: 'B. 养老',
                score: 1,
                flag: false
              },
              {
                des: 'C. 资产增值',
                score: 5,
                flag: false
              },
              {
                des: 'D. 家庭富裕',
                score: 3,
                flag: false
              }
            ]
          },
          {
            title: '10.您选择的金融产品出现何种程度的波动时,您会呈现明显的焦虑？',
            answers: [
              {
                des: 'A. 本金无损失,但收益未达到预期',
                score: 1,
                flag: false
              },
              {
                des: 'B. 出现轻微本金损失',
                score: 2,
                flag: false
              },
              {
                des: 'C. 本金10%以内的损失',
                score: 3,
                flag: false
              },
              {
                des: 'D. 本金50%以上损失',
                score: 5,
                flag: false
              }
            ]
          }
        ]
      },
      isColor: false,
      resultType: '',
      authorization: getAuth(),
      resultTitle: '',
      resultFont: '',
      evaluatingResult: {}
    }
  },
  methods: {
    getChoice($event, index) {
      let scoreObj = {
        index: index,
        score: $event
      }
      this.isColor = false
      this.scoreArr[scoreObj.index] = scoreObj.score
      let scoreNum = 1
      this.scoreArr.map(item => {
        scoreNum *= item
      })
      if (scoreNum !== 0) {
        this.isColor = true
      }
      console.log(this.scoreArr, scoreNum)
    },
    changeShow() {
      this.isShow = false
      this.radio = []
      this.scoreArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.isColor = false
    },
    submit() {
      let totalScore = 0
      this.scoreArr.map(item => {
        totalScore += item
      })
      if (totalScore <= 10) {
        this.resultType = 'BSX'
        this.resultTitle = '保守型'
        this.resultFont =
          '出借人对风险非常敏感，风险承受度较低，对比收益更关心的是本金安全，出借时建议选择风险水平偏低的产品，适当回避风险的同时保证收益，跑赢通胀，故出借人在平台的最高出借金额不得超过10万元人民币，出借期限建议为3个月内（包括3个月）。<p style="text-align: center">本次测评有效期6个月</p>'
      } else if (totalScore > 10 && totalScore < 30) {
        this.resultType = 'WJX'
        this.resultTitle = '谨慎型'
        this.resultFont =
          '出借人能够承担较低的出借风险和波动，在出借时倾向以短期、持续、渐进的出借方式获取收益。故出借人在平台的最高出借金额不得超过20万元人民币，出借期限建议为3个月内（包括3个月）。<p style="text-align: center">本次测评有效期6个月</p>'
      } else if (totalScore >= 30 && totalScore < 42) {
        this.resultType = 'JJX'
        this.resultTitle = '积极型'
        this.resultFont =
          '出借人有一定的风险承受能力，对出借收益比较敏感，期望进行长期且持续的出借，愿意通过分散化的出借以取得出借组合的均衡发展。故出借人在平台的最高出借额不得超过50万元人民币，出借期限建议为3个月内（包括3个月）。<p style="text-align: center">本次测评有效期6个月</p>'
      } else if (totalScore >= 42 && totalScore < 50) {
        this.resultType = 'JQX'
        this.resultTitle = '进取型'
        this.resultFont =
          '出借人愿意通过承担较高的风险来换取更高的出借回报，在出借时倾向以流动性较低、收益较高的出借方式获取收益。故出借人在平台的最高出借额不得超过100万元人民币，出借期限建议为6个月内（包括6个月）。<p style="text-align: center">本次测评有效期6个月</p>'
      } else if (totalScore === 50) {
        this.resultType = 'JINX'
        this.resultTitle = '激进型'
        this.resultFont =
          '出借人有较高的风险承受能力，是富有冒险精神的激进型出借人，在出借收益波动的情况下，仍然能保持激进的出借理念。故出借人在平台的最高出借额不得超过500万元人民币，可选择任意出借期限的产品。<p style="text-align: center">本次测评有效期6个月</p>'
      }
      document.querySelector('.layout') && document.querySelector('.layout').scrollIntoView()
      let data = {
        evaluatingResult: this.resultType
      }
      if (this.isColor) {
        saveEvaluatingResultApi(data).then(() => {
          this.isShow = true
        })
      }
    }
  },
  components: {
    Result
  },
  computed: {
    ...mapGetters(['userBasicInfo'])
  },
  mounted() {
    if (this.$route.query.status) {
      // 判断是否风险测评
      this.isShow = true
      if (this.userBasicInfo.evaluatingResult) {
        switch (this.userBasicInfo.evaluatingResult.evaluatingCode) {
          case 'BSX':
            this.resultType = 'BSX'
            this.resultTitle = '保守型'
            this.resultFont =
              '出借人对风险非常敏感，风险承受度较低，对比收益更关心的是本金安全，出借时建议选择风险水平偏低的产品，适当回避风险的同时保证收益，跑赢通胀，故出借人在平台的最高出借金额不得超过10万元人民币，出借期限建议为3个月内（包括3个月）。<p style="text-align: center">本次测评有效期6个月</p>'
            break
          case 'WJX':
            this.resultType = 'WJX'
            this.resultTitle = '谨慎型'
            this.resultFont =
              '出借人能够承担较低的出借风险和波动，在出借时倾向以短期、持续、渐进的出借方式获取收益。故出借人在平台的最高出借金额不得超过20万元人民币，出借期限建议为3个月内（包括3个月）。<p style="text-align: center">本次测评有效期6个月</p>'
            break
          case 'JJX':
            this.resultType = 'JJX'
            this.resultTitle = '积极型'
            this.resultFont =
              '出借人有一定的风险承受能力，对出借收益比较敏感，期望进行长期且持续的出借，愿意通过分散化的出借以取得出借组合的均衡发展。故出借人在平台的最高出借额不得超过50万元人民币，出借期限建议为3个月内（包括3个月）。<p style="text-align: center">本次测评有效期6个月</p>'
            break
          case 'JQX':
            this.resultType = 'JQX'
            this.resultTitle = '进取型'
            this.resultFont =
              '出借人愿意通过承担较高的风险来换取更高的出借回报，在出借时倾向以流动性较低、收益较高的出借方式获取收益。故出借人在平台的最高出借额不得超过100万元人民币，出借期限建议为6个月内（包括6个月）。<p style="text-align: center">本次测评有效期6个月</p>'
            break
          case 'JINX':
            this.resultType = 'JINX'
            this.resultTitle = '激进型'
            this.resultFont =
              '出借人有较高的风险承受能力，是富有冒险精神的激进型出借人，在出借收益波动的情况下，仍然能保持激进的出借理念。故出借人在平台的最高出借额不得超过500万元人民币，可选择任意出借期限的产品。<p style="text-align: center">本次测评有效期6个月</p>'
            break
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.risk_box {
  padding-top: 30px;
  margin-bottom: 57px;
  font-weight: 400;
  .risk {
    background: rgba(255, 255, 255, 1);
    width: 1140px;
    border: 1px solid rgba(229, 229, 229, 1);
    margin: 0 auto;
    header {
      width: 1140px;
      height: 60px;
      line-height: 60px;
      box-shadow: 0px -3px 0px 0px rgba(251, 157, 31, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      .head_gradient {
        display: inline-block;
        width: 73px;
        height: 18px;
        font-size: $font-size-medium;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: $font-size-medium;
        margin-left: 30px;
      }
    }
    .content {
      width: 1054px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 30px;
      padding: 30px 0 0 30px;
      margin-bottom: 58px;
      .content_text {
        width: 645px;
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 17px;
        margin-top: 20px;
      }
    }
    .problem_box {
      margin-left: 30px;
      margin-bottom: 30px;
      .problem_title {
        margin-bottom: 10px;
        font-size: 16px;
        color: rgba(74, 74, 74, 1);
        line-height: 24px;
      }
      .matchClass {
        font-size: 14px;
        font-weight: 400;
        color: rgba(106, 106, 106, 1);
        line-height: 36px;
        display: block;
        margin-left: 1px;
        /deep/ .el-radio__input.is-checked + .el-radio__label {
          color: rgba(106, 106, 106, 1);
        }
        /deep/ .el-radio__inner {
          width: 16px;
          height: 16px;
          border: 1px solid rgba(251, 157, 31, 1);
        }
        /deep/ .el-radio__input.is-checked .el-radio__inner {
          background: #fff;
        }
        /deep/ .el-radio__input.is-checked .el-radio__inner::after {
          width: 6px;
          height: 6px;
          background: rgba(251, 157, 31, 1);
        }
      }
    }
    .submit_box {
      padding-top: 30px;
      .submit {
        width: 300px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #ccc;
        border-radius: 4px;
        margin: 0 auto 70px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
      }
      .active {
        background: rgba(251, 123, 31, 1);
        cursor: pointer;
      }
    }
  }
}
</style>
