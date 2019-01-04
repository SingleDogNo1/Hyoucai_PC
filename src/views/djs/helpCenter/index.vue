<template>
  <div class="help-center">
    <div class="container">
      <div class="nav-wrap">
        <p class="title-wrap">
          <i class="iconfont icon-help"></i>
          <span class="title">帮助中心</span>
        </p>
        <ul class="nav-list">
          <li
            v-for="(item, index) in QAList"
            :key="index"
            @click="clickItem(item.dicCode)"
            :class="{ 'on': current === item.dicCode }"
          >{{item.dicName}}</li>
        </ul>
      </div>
      <div class="content-wrap">
        <p class="title">常见问题</p>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="index + 1" v-for="(item, index) in QAContentList" :key="index">
            <template slot="title">
              <div class="header-wrap">
                <i class="header-icon icon-question"></i>
                <span class="text">{{item.question}}</span>
              </div>
            </template>
            <div class="answer-wrap">
              <i class="icon-answer"></i>
              <p class="answer-content" v-html="item.answer"></p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="activity-popup"></div>
  </div>
</template>

<script>
import { queryQAType, queryQuestionAnswer } from '@/api/djs/helpCenter'
export default {
  data() {
    return {
      current: '',
      activeNames: '1',
      QAList: [],
      QAContentList: [],
      helpCode: '',
      curPage: '1',
      maxLine: '10'
    }
  },
  methods: {
    handleChange() {},
    getQueryQAType() {
      this.QAList = JSON.parse(localStorage.getItem('QAList'))
      this.current = this.QAList[0].dicCode
      this.clickItem(this.current)
    },
    queryQuestionAnswer(data) {
      queryQuestionAnswer(data).then(res => {
        let data = res.data
        this.QAContentList = data.list
      })
    },
    clickItem(dicCode) {
      this.current = dicCode
      let postData = {
        helpCode: dicCode,
        curPage: this.curPage,
        maxLine: this.maxLine
      }
      this.queryQuestionAnswer(postData)
    }
  },
  mounted() {
    this.getQueryQAType()
  },
  watch: {
    $route() {
      // 刷新参数放到这里里面去触发就可以刷新相同界面了
      this.current = this.$route.query.helpCode
      this.clickItem(this.current)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.help-center {
  width: 100%;
  background: #f4f4f4;
  .container {
    width: 1140px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 28px;
    display: flex;
    justify-content: space-between;
    .nav-wrap {
      width: 274px;
      height: 756px;
      background: #fff;
      border: 1px solid rgba(235, 235, 235, 1);
      .title-wrap {
        height: 72px;
        line-height: 72px;
        display: flex;
        border-bottom: 1px solid rgba(235, 235, 235, 1);
        .icon-help {
          display: inline-block;
          font-size: 26px;
          color: #fb9d1f;
          margin-left: 40px;
        }
        .title {
          display: inline-block;
          margin-left: 4px;
          font-size: $font-size-medium;
          color: $color-text;
        }
      }
      .nav-list {
        li {
          height: 40px;
          line-height: 40px;
          font-size: $font-size-small-s;
          color: #6a6a6a;
          padding-left: 68px;
          border-left: 4px solid #fff;
        }
        li:hover,
        li.on {
          background: rgba(251, 157, 31, 0.1);
          border-left: 4px solid #fb9d1f;
        }
      }
    }
    .content-wrap {
      width: 838px;
      padding: 14px 28px 108px 28px;
      background: #fff;
      border: 1px solid rgba(235, 235, 235, 1);
      border-top: 2px solid #f7be39;
      .title {
        font-size: $font-size-small;
        color: #5a5a5a;
        margin-bottom: 25px;
      }
      .el-collapse {
        border-top: 0;
        border-bottom: 0;
        .el-collapse-item {
          margin-bottom: 20px;
          /deep/ .el-collapse-item__header {
            position: relative;
            //padding: 15px;
            border: 1px solid rgba(227, 227, 227, 1);
            //border-bottom: 0;
            .header-wrap {
              width: 100%;
              padding: 0 15px;
              .icon-question {
                position: absolute;
                left: 15px;
                top: 15px;
                width: 20px;
                height: 20px;
                background: url('./images/icon_question.png') center center no-repeat;
                background-size: 100% 100%;
                margin-right: 8px;
              }
              .text {
                display: inline-block;
                width: 600px;
                margin-left: 28px;
              }
            }
            .el-icon-arrow-right {
              position: absolute;
              right: 0;
              top: 15px;
              width: 20px;
              height: 20px;
              background: url('./images/icon_open.png') center center no-repeat;
              background-size: 100% 100%;
            }
            .el-icon-arrow-right:before {
              display: none;
            }
            .el-collapse-item__arrow.is-active {
              width: 20px;
              height: 20px;
              background: url('./images/icon_collapse.png') center center no-repeat;
              background-size: 100% 100%;
              transform: none;
            }
          }
          /deep/ .el-collapse-item__header:hover {
            background: rgba(251, 157, 31, 0.1);
          }
          /deep/ .el-collapse-item__wrap {
            border: 1px solid rgba(227, 227, 227, 1);
            border-top: 0;
            background: rgba(248, 248, 251, 1);
            .el-collapse-item__content {
              padding: 0;
              .answer-wrap {
                position: relative;
                padding: 15px 30px 15px 30px;
                margin-left: 15px;
                .icon-answer {
                  position: absolute;
                  left: 0;
                  top: 18px;
                  width: 20px;
                  height: 20px;
                  background: url('./images/icon_answer.png') center center no-repeat;
                  background-size: 100% 100%;
                  margin-right: 8px;
                }
                .answer-content {
                  overflow-wrap: break-word;
                }
              }
            }
          }
        }
      }
    }
  }
  // .activity-popup {
  //   position: fixed;
  //   z-index: 1000;
  //   top: 0;
  //   right: 0;
  //   left: 0;
  //   bottom: 0;
  //   width: 500px;
  //   height: 380px;
  // }
}
</style>
