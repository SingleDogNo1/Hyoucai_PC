<template>
  <div class="announcement">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="网站公告" name="first">
        <ul class="list">
          <li>
            <router-link :to="{ name: 'announcementDetail', params: { id: 1 } }">
              <span class="title">关于汇有财存管系统浏览器兼容性问题的公告</span> <span class="time">2018-12-19</span>
            </router-link>
          </li>
          <li>
            <a href="#"> <span class="title">关于汇有财存管系统浏览器兼容性问题的公告</span> <span class="time">2018-12-19</span> </a>
          </li>
          <li>
            <a href="#"> <span class="title">关于汇有财存管系统浏览器兼容性问题的公告</span> <span class="time">2018-12-19</span> </a>
          </li>
          <li>
            <a href="#"> <span class="title">关于汇有财存管系统浏览器兼容性问题的公告</span> <span class="time">2018-12-19</span> </a>
          </li>
          <li>
            <a href="#"> <span class="title">关于汇有财存管系统浏览器兼容性问题的公告</span> <span class="time">2018-12-19</span> </a>
          </li>
          <li>
            <a href="#"> <span class="title">关于汇有财存管系统浏览器兼容性问题的公告</span> <span class="time">2018-12-19</span> </a>
          </li>
          <li>
            <a href="#"> <span class="title">关于汇有财存管系统浏览器兼容性问题的公告</span> <span class="time">2018-12-19</span> </a>
          </li>
          <li>
            <a href="#"> <span class="title">关于汇有财存管系统浏览器兼容性问题的公告</span> <span class="time">2018-12-19</span> </a>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="行业资讯" name="second">行业资讯</el-tab-pane>
      <el-tab-pane label="媒体报道" name="third">媒体报道</el-tab-pane>
    </el-tabs>
    <div class="pagination-wrapper">
      <pagination :total-count="total" :size-val="size" :page-val="page" @handleCurrentChange="handleCurrentChange"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'

export default {
  data() {
    return {
      activeName: 'first',
      page: 1,
      size: 10,
      total: 100
    }
  },
  methods: {
    handleClick() {}
  },
  components: {
    pagination
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.announcement {
  width: 1140px;
  margin: 0 auto;
  margin-top: 30px;
  /deep/ .el-tabs__nav-wrap {
    .el-tabs__item {
      color: #5a5a5a;
      text-align: center;
    }
    .is-active {
      color: $color-tab-selected;
    }
    .el-tabs__active-bar {
      background-color: $color-tab-selected;
    }
    .el-tabs__active-bar {
      height: 1px;
    }
  }
  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__content {
    .list {
      margin-top: 5px;
      border: 1px solid #e3e3e3;
      padding-left: 20px;
      li {
        position: relative;
        height: 47px;
        line-height: 47px;
        border-bottom: 1px dotted #e3e3e3;
        a {
          display: flex;
          width: 100%;
          height: 47px;
          line-height: 47px;
          color: #5a5a5a;
          font-size: $font-size-small-s;
          .title {
            display: inline-block;
            width: 70%;
            height: 47px;
            margin-left: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time {
            display: inline-block;
            width: 25%;
            height: 47px;
            text-align: right;
          }
        }
        a:before {
          position: absolute;
          top: 22px;
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          background-color: #5a5a5a;
          border-radius: 50%;
        }
        a:hover {
          color: $color-text-hover;
        }
      }
      li:last-child {
        border-bottom: 0;
      }
    }
  }
  .pagination-wrapper {
    margin-top: 20px;
    margin-bottom: 15px;
  }
}
</style>
