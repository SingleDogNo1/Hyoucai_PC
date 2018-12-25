<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="网站公告" name="first">
        <!-- <li>
            <a href="#" class="title">关于汇有财存管系统浏览器兼容性问题的公告</a>
            <span>2018-12-19</span>
        </li>-->
        <div class="list">
          <el-row :gutter="20">
            <el-col :span="20">
              <a href="#" class="title">关于汇有财存管系统浏览器兼容性问题的公告</a>
            </el-col>
            <el-col :span="4">
              <span>2018-12-19</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <a href="#" class="title">关于汇有财存管系统浏览器兼容性问题的公告</a>
            </el-col>
            <el-col :span="4">
              <span>2018-12-19</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <a href="#" class="title">关于汇有财存管系统浏览器兼容性问题的公告</a>
            </el-col>
            <el-col :span="4">
              <span>2018-12-19</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <a href="#" class="title">关于汇有财存管系统浏览器兼容性问题的公告</a>
            </el-col>
            <el-col :span="4">
              <span>2018-12-19</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <a href="#" class="title">关于汇有财存管系统浏览器兼容性问题的公告</a>
            </el-col>
            <el-col :span="4">
              <span>2018-12-19</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <a href="#" class="title">关于汇有财存管系统浏览器兼容性问题的公告</a>
            </el-col>
            <el-col :span="4">
              <span>2018-12-19</span>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="行业资讯" name="second">行业资讯</el-tab-pane>
      <el-tab-pane label="媒体报道" name="third">媒体报道</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: 'first'
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 1140px;
  margin: 0 auto;
  margin-top: 20px;
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
  }
  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__content {
    .list {
      width: 1140px;
      height: 400px;
      margin-top: 5px;
      border: 1px solid #e3e3e3;
      padding-left: 40px;
      .el-row {
        height: 47px;
        line-height: 47px;
        border-bottom: 1px dotted #e3e3e3;
        .el-col {
          a {
            display: block;
            width: 100%;
            color: #5A5A5A;
          }
        }
      }
      .el-row:before {
        position: absolute;
        top: 20px;
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: #000;
        border-radius: 50%;
      }
      li {
        .title {
          width: 670px;
          display: inline-block;
          margin-left: 15px;
        }
      }
    }
  }
}
</style>

