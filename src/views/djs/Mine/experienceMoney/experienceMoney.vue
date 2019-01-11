<template>
  <div class="experience-money">
    <ul class="top">
      <li>
        <dl>
          <dt>{{ userTasteGoldInfo.amount | plusZero }}</dt>
          <dd>
            <p>当前可使用体验金(元)</p>
            <el-button type="primary" size="small" :disabled="userTasteGoldInfo.amount > 0 ? true : false || true">去使用</el-button>
          </dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>{{ income | plusZero }}</dt>
          <dd><p>累计体验金收益(元)</p></dd>
        </dl>
      </li>
    </ul>
    <div class="bottom">
      <el-tabs type="border-card" @tab-click="clickTab">
        <el-tab-pane label="在投体验金">
          <el-table v-if="userTasteGoldList.length" :data="userTasteGoldList" style="width: 100%">
            <el-table-column prop="amount" label="获取金额(元)"> </el-table-column>
            <el-table-column prop="investRate" label="历史平均年化收益率"> </el-table-column>
            <el-table-column prop="useStatus" label="状态">
              <template slot-scope="scope">
                <p v-if="scope.row.useStatus === 'TYNU'">未使用</p>
                <p v-else-if="scope.row.useStatus === 'TYIU'">正在计息</p>
                <p v-else-if="scope.row.useStatus === 'TYWU'">计息结束</p>
                <p v-else-if="scope.row.useStatus === 'TYOV'">已过期</p>
                <p>{{ scope.row.interestDateStart }}-{{ scope.row.interestDateEnd }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="expectedReturn" label="预期待收利息(元)"> </el-table-column>
          </el-table>
          <div v-else class="no-item">
            <img src="./image/no-item.png" alt="" />
            <p>当前暂无体验金</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="往期体验金">
          <el-table v-if="userUsedTasteGoldList.length" :data="userUsedTasteGoldList" style="width: 100%">
            <el-table-column prop="amount" label="获取金额(元)"> </el-table-column>
            <el-table-column prop="investRate" label="历史平均年化收益率"> </el-table-column>
            <el-table-column prop="useStatus" label="状态">
              <template slot-scope="scope">
                <p v-if="scope.row.useStatus === 'TYNU'">未使用</p>
                <p v-else-if="scope.row.useStatus === 'TYIU'">正在计息</p>
                <p v-else-if="scope.row.useStatus === 'TYWU'">计息结束</p>
                <p v-else-if="scope.row.useStatus === 'TYOV'">已过期</p>
                <p>{{ scope.row.interestDateStart }}-{{ scope.row.interestDateEnd }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="expectedReturn" label="预期待收利息(元)"> </el-table-column>
          </el-table>
          <div v-else class="no-item">
            <img src="./image/no-item.png" alt="" />
            <p>当前暂无体验金</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getTasteGoldUserUsable, getTasteGoldUserList } from '@/api/djs/Mine/experienceMoney'
import { getUser } from '@/assets/js/cache'
import { getAuth } from '@/assets/js/utils'

const ERR_OK = '1'
export default {
  name: 'experienceMoney',
  components: {},
  data() {
    return {
      userName: getUser().userName,
      authorization: getAuth(),
      userTasteGoldInfo: {
        amount: 0
      },
      income: 0.34,
      userTasteGoldList: [],
      userUsedTasteGoldList: []
    }
  },
  filters: {
    plusZero(value) {
      if (value == 0 || value.toString().indexOf('.') === -1) {
        return value.toFixed(2)
      } else {
        return value
      }
    }
  },
  methods: {
    clickTab(tab) {
      if (tab.paneName === '0') {
        this.getTasteGoldUserList('inuse')
      }
      if (tab.paneName === '1') {
        this.getTasteGoldUserList('useUp')
      }
    },
    getTasteGoldUserUsable() {
      let data = {
        username: this.userName,
        authorization: this.authorization
      }
      getTasteGoldUserUsable(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.userTasteGoldInfo = data.userTasteGoldInfo
          this.income = data.totalEarn
        }
      })
    },
    getTasteGoldUserList(status) {
      let data = {
        username: this.userName,
        authorization: this.authorization,
        status: status
      }
      getTasteGoldUserList(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          if (status === 'inuse') {
            this.userTasteGoldList = data.userTasteGoldList
          } else {
            this.userUsedTasteGoldList = data.userTasteGoldList
          }
        }
      })
    }
  },
  created() {
    this.getTasteGoldUserUsable()
    this.getTasteGoldUserList('inuse')
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';
.experience-money {
  .top {
    height: 210px;
    border: 1px solid #e5e5e5;
    border-top: 2px solid #f7be39;
    margin-bottom: 20px;
    overflow: hidden;
    font-size: 0;
    background-color: #fff;
    li {
      display: inline-block;
      width: 50%;
      vertical-align: top;
      margin-top: 64px;
      font-size: $font-size-small-s;
      text-align: center;
      color: $color-text;
      dl {
        dt {
          margin-bottom: 5px;
          font-size: 24px;
        }
        dd {
          p {
            + button {
              margin-top: 18px;
              padding: 9px 40px;
              background-color: #fb7b1f;
              &:disabled {
                background-color: #eee;
                border-color: #eee;
              }
            }
          }
        }
      }
      &:nth-of-type(1) {
        dl {
          dt {
            color: #fc5541;
          }
        }
      }
    }
  }
  .bottom {
    min-height: 580px;
    background-color: #fff;
    border: 1px solid #e3e3e3;
    /deep/ .el-tabs--border-card {
      height: 100%;
      box-shadow: none;
      border: 0;
      > .el-tabs__header {
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        border-color: rgba(229, 229, 229, 1);
        .el-tabs__item {
          height: 60px;
          line-height: 58px;
          padding: 0 40px;
          color: $color-text;
          font-size: $font-size-small-s;
          border-top: 2px solid transparent;
          &.is-active {
            border-top: 2px solid $color-tab-selected;
            color: $color-tab-selected;
          }
        }
      }
      > .el-tabs__content {
        .el-table {
          border: 1px solid #eee;
          border-bottom: 0;
          font-size: $font-size-small-ss;
          &::before {
            display: none;
          }
          .el-table__header {
            thead {
              tr {
                th {
                  background-color: rgba(0, 131, 254, 0.09);
                }
              }
            }
          }
          th {
            .cell {
              line-height: 20px;
              text-align: center;
              color: $color-text;
              font-weight: 400;
            }
          }
          td {
            height: 40px;
            padding: 0;
            cursor: pointer;
            .cell {
              line-height: 20px;
              text-align: center;
              color: #5a5a5a;
            }
          }
        }
        .no-item {
          box-sizing: border-box;
          height: 514px;
          padding-top: 194px;
          text-align: center;
          color: $color-text-s;
          font-size: $font-size-small-s;
          img {
            width: 73px;
            margin-bottom: 24px;
          }
        }
      }
    }
  }
}
</style>
