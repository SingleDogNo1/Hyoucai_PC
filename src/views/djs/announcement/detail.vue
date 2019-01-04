<template>
  <div class="detail">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="网站公告" name="WZGG"></el-tab-pane>
      <el-tab-pane label="行业资讯" name="HYZX"></el-tab-pane>
      <el-tab-pane label="媒体报道" name="MTBD"></el-tab-pane>
    </el-tabs>
    <!-- <div class="crumbs">
      <router-link :to="{ name: 'index'}" class="back-home">首页</router-link>&gt;
      <router-link :to="{ name: 'announcement'}" class="back-home">网站公告</router-link>&gt;
      <a>新闻中心</a>
    </div>-->
    <article class="detail-content">
      <div class="title-wrap">
        <h2>{{title}}</h2>
        <p>
          <span class="origin">来源：汇通金融</span>
          <span class="click-count">点击量：{{clickCount}}</span>
          <span class="time">{{createTime}}</span>
        </p>
      </div>
      <section v-html="content"></section>
      <!-- <div class="footer">
        <share :config="config"></share>
        <a class="back-list">返回列表&gt;&gt;</a>
      </div>-->
    </article>
    <div class="actions">
      <a href="#" class="btn-prev" v-if="overMsg !== '0'">
        <span class="action">&lt; 上一篇</span>
        <span class="title">{{overTitle}}</span>
      </a>
      <a href="#" class="btn-next" v-if="nextMsg !== '0'">
        <span class="title">{{nextTitle}}</span>
        <span class="action">下一篇 &gt;</span>
      </a>
    </div>
  </div>
</template>

<script>
import { viewDetail } from '@/api/djs/announcement'
export default {
  data() {
    return {
      activeName: 'WZGG',
      config: {},
      title: '',
      clickCount: '',
      createTime: '',
      content: '',
      overMsg: '',
      overTitle: '',
      nextMsg: '',
      nextTitle: ''
    }
  },
  methods: {
    handleClick() {
      this.$router.push({ name: 'announcement', query: {paramCode: this.activeName}})
    },
    viewDetail() {
      this.activeName = this.$route.query.paramCode
      let postData = {
        id: this.$route.params.id
      }
      console.log(postData)
      viewDetail(postData).then(res => {
        let data = res.data
        this.title = data.title
        this.clickCount = data.clickCount
        this.createTime = data.createTime
        this.content = data.content
        this.overMsg = data.overMsg
        this.overTitle = data.overTitle
        this.nextMsg = data.nextMsg
        this.nextTitle = data.nextTitle
      })
    }
  },
  mounted () {
    this.viewDetail()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.detail {
  width: 1140px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  /deep/ .el-tabs__nav-wrap {
    .el-tabs__item {
      color: #5a5a5a;
      text-align: center;
    }
    .is-active {
      color: #fb891f;
    }
    .el-tabs__active-bar {
      background-color: #fb891f;
    }
    .el-tabs__active-bar {
      height: 1px;
    }
  }
  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }
  .crumbs {
    width: 100%;
    height: 54px;
    line-height: 54px;
    a {
      font-size: $font-size-small-s;
      color: #666666;
    }
    .back-home:hover {
      color: #fb891f;
    }
  }
  .detail-content {
    position: relative;
    display: block;
    border: 1px solid #ccc;
    border-top: 4px solid rgba(255, 176, 26, 1);
    padding: 10px 36px;
    background: #fff;
    min-height: 265px;
    .title-wrap {
      width: 100%;
      font-size: $font-size-small-s;
      height: 80px;
      font-style: normal;
      border-bottom: 1px solid #e3e3e3;
      h2 {
        width: 474px;
        margin: 0 auto;
        margin-top: 20px;
        font-size: $font-size-large-x;
        color: $color-text-gray;
        height: 24px;
        line-height: 24px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        width: 420px;
        height: 14px;
        line-height: 14px;
        margin: 0 auto;
        margin-top: 15px;
        text-align: center;
        font-size: $font-size-small-s;
        color: $color-text-s;
        span {
          display: inline-block;
          height: 100%;
        }
        .time,
        .click-count {
          margin-left: 40px;
        }
      }
    }
    section {
      margin-top: 30px;
    }
    .footer {
      margin-top: 65px;
      margin-bottom: 14px;
      width: 100%;
      height: 106px;
      overflow: hidden;
      position: relative;
      font-size: $font-size-small-s;
      .back-list {
        color: #e84518;
        position: absolute;
        right: 36px;
        bottom: 0;
      }
    }
  }
  .actions {
    display: flex;
    font-size: $font-size-small-s;
    overflow: hidden;
    height: 60px;
    line-height: 60px;
    border: 1px solid #ccc;
    border-top: none;
    padding: 0 30px;
    background: #fff;
    a {
      display: flex;
      width: 50%;
      height: 60px;
      color: $color-text-gray;
    }
    .btn-prev {
      text-align: left;
      .action {
        display: inline-block;
        width: 12%;
        height: 60px;
        margin-right: 1em;
        color: $color-text-s;
      }
      .title {
        display: inline-block;
        width: 80%;
        height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .btn-next {
      text-align: right;
      .action {
        display: inline-block;
        width: 12%;
        height: 60px;
        margin-left: 1em;
        color: $color-text-s;
      }
      .title {
        display: inline-block;
        width: 85%;
        height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    a:hover {
      color: $color-text-hover;
      .action {
        color: $color-text-hover;
      }
    }
  }
}
</style>
