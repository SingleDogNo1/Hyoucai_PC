<template>
  <div class="risk_box">
    <div class="risk">
      <header ref="Title">
        <div class="head_gradient">{{title}}</div>
      </header>
      <section class="content">
        <div>1.以下问题是对您的风险承担能力进行评测,请根据您的自身实际情况如实填写问卷,以便我们了解您的风险承担类型,进而根据您的风险承担能力选择适合您的理财产品。</div>
        <div>2.如果您的有关情况发生了重大改变,再次购买理财产品请主动重新进行风险评测。</div>
        <div>3.本问卷最终解释权归汇有财所有,若您对本问卷的内容有任何疑问,欢迎咨询汇有财客服。</div>
        <div class="content_text">本问卷包含10个问题，每个问题请根据您的自身实际情况选择一个选项。</div>
      </section>
      <section class="problem_box" v-for="(item,index) in questions" :key="index">
        <p>{{item.title}}</p>
        <el-radio-group v-model="radio">
          <el-radio
            v-model="radio"
            :class="matchClass"
            v-for="(answer, i) in item.answers"
            :key="i"
            :label="answer"
          >{{answer.des}}</el-radio>
        </el-radio-group>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '风险评测',
      radio2: 4,
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.risk_box {
  background: rgba(255, 255, 255, 1);
  padding-top: 30px;
  .risk {
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
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: $font-size-medium;
        margin-left: 30px;
      }
    }
    .content {
      width: 1054px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 30px;
      padding: 30px 0 0 30px;
      .content_text {
        width: 645px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 17px;
        margin-top: 20px;
      }
    }
  }
}
</style>
