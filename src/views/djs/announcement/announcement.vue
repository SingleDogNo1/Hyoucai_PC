<template>
  <div class="announcement" v-cloak>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="网站公告" name="WZGG">
        <ul class="list">
          <li v-for="(item, index) in list" :key="index">
            <router-link :to="{ name: 'announcementDetail', params: { id: item.id }, query: { paramCode: activeName } }">
              <span class="title">{{ item.title }}</span> <span class="time">{{ item.showDate || item.createTime }}</span>
            </router-link>
          </li>
        </ul>
        <div class="pagination-wrapper">
          <pagination v-if="total" :count-page="total" :size-val="size" :page-val="page" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="行业资讯" name="HYZX">
        <ul class="list">
          <li v-for="(item, index) in list" :key="index">
            <router-link :to="{ name: 'announcementDetail', params: { id: item.id }, query: { paramCode: activeName } }">
              <span class="title">{{ item.title }}</span> <span class="time">{{ item.showDate || item.createTime }}</span>
            </router-link>
          </li>
        </ul>
        <div class="pagination-wrapper">
          <pagination v-if="total" :count-page="total" :size-val="size" :page-val="page" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="媒体报道" name="MTBD">
        <ul class="list">
          <li v-for="(item, index) in list" :key="index">
            <router-link :to="{ name: 'announcementDetail', params: { id: item.id }, query: { paramCode: activeName } }">
              <span class="title">{{ item.title }}</span> <span class="time">{{ item.showDate || item.createTime }}</span>
            </router-link>
          </li>
        </ul>
        <div class="pagination-wrapper">
          <pagination v-if="total" :count-page="total" :size-val="size" :page-val="page" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import moment from 'moment'
import Pagination from '@/components/pagination/pagination'
import { getList } from '@/api/djs/announcement'

export default {
  data() {
    return {
      activeName: 'WZGG',
      page: 1,
      size: 10,
      total: 0,
      list: []
    }
  },
  methods: {
    handleClick() {
      this.page = 1
      this.getList()
      //this.page = 1
      //this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    getList() {
      let postData = {
        curPage: this.page,
        maxLine: this.size,
        paramCode: this.activeName
      }
      getList(postData).then(res => {
        let data = res.data
        this.list = data.zxdtMtbdlist
        this.list.forEach(val => {
          val.createTime = moment(val.createTime).format('YYYY-MM-DD')
        })
        this.total = parseInt(data.countPage)
        this.page = parseInt(data.curPage)
      })
    }
  },
  components: {
    Pagination
  },
  mounted() {
    this.activeName = this.$route.query.paramCode || 'WZGG'
    this.getList()
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
      padding: 0;
      color: #5a5a5a;
      margin-right: 40px;
      text-align: center;
      -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        color: $color-tab-selected;
        border-bottom: 1px solid $color-tab-selected;
      }
      &:nth-last() {
        margin-right: 0;
      }
    }
    .is-active {
      color: $color-tab-selected;
      border-bottom: 1px solid $color-tab-selected;
    }
    .el-tabs__active-bar {
      background-color: $color-tab-selected;
    }
    .el-tabs__active-bar {
      display: none;
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
      background: #fff;
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
