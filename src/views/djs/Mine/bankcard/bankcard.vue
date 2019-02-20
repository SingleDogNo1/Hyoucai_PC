<template>
  <div class="bankcard">
    <div class="title">
      <span>我的银行卡</span>
    </div>
    <template v-if="bankcardList.length > 0">
      <div class="card-item" v-for="(item, index) in bankcardList" :key="index">
        <header>
          <div class="bank-name">
            <img :src="item.iconUrl" :alt="item.bankName" /> <span>{{ item.bankName }}</span>
          </div>
          <div class="card-type">储蓄卡</div>
        </header>
        <section>{{ item.cardNo | encrypt }}</section>
        <footer @click="unbind">解绑</footer>
      </div>
    </template>
    <div class="no-card" v-else>
      <div class="wrap">
        <button @click="toBindCard"><img src="./images/icon_nocard.png"/><span>添加银行卡</span></button>
      </div>
    </div>
    <bankcard-dialog :show.sync="showDialog">
      <div class="dialog-text">{{dialogMsg}}</div>
    </bankcard-dialog>
  </div>
</template>

<script>
import bankcardDialog from '@/components/Dialog/Dialog'
import { getUserBankCardList, prevChangeBankcard } from '@/api/djs/Mine/bankcard'
import { mapGetters } from 'vuex'

export default {
  name: 'bankcard',
  mixins: [],
  components: {
    bankcardDialog
  },
  data() {
    return {
      bankcardList: [],
      showDialog: false,
      dialogMsg: ''
    }
  },
  filters: {
    encrypt(value) {
      return `${value.slice(0, 4)}  ••••  ••••  ${value.slice(-4)}`
    }
  },
  methods: {
    unbind() {
      prevChangeBankcard({
        bankCardNo: this.bankcardList[0].cardNo
      }).then(res => {
        if (res.data.canModify) {
          // userChangeBankCard({
          //   bankCardNo: this.bankcardList[0].cardNo
          // }).then(res => {
          //   console.log(res)
          this.toBindCard()
          //})
        } else {
          this.showDialog = true
          this.dialogMsg = res.data.message
        }
      })
    },
    toBindCard() {
      this.$router.push({
        name: 'addBankCard'
      })
    }
  },
  computed: {
    ...mapGetters(['user', 'userBasicInfo'])
  },
  created() {
    getUserBankCardList({
      userName: this.user.userName
    }).then(res => {
      if (res.data.list && res.data.list.length > 0) {
        this.bankcardList = res.data.list
      }
    })
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
@import '../../../../assets/css/mixins';

.bankcard {
  background: #fff;
  height: 100%;
  border: 1px solid #e5e5e5;
  border-top: 2px solid $color-theme;
  padding: 0 30px;
  .title {
    line-height: 50px;
    color: $color-text;
    font-size: $font-size-small;
    margin-bottom: 20px;
  }
  .card-item {
    @include cube(380px, 200px);
    box-shadow: 1px 1px 2px 0 #5a5a5a;
    border-radius: 4px;
    border: 1px solid #e3e3e3;
    padding: 30px;
    header {
      position: relative;
      .bank-name {
        img {
          @include square(22px);
        }
        span {
          margin-left: 10px;
          font-size: $font-size-small;
          line-height: 22px;
        }
      }
      .card-type {
        position: absolute;
        font-size: $font-size-small-s;
        right: 0;
        top: 0;
      }
    }
    section {
      margin-top: 35px;
      font-size: $font-size-small;
      color: $color-text;
    }
    footer {
      margin-top: 40px;
      text-align: end;
      color: #db011b;
      cursor: pointer;
    }
  }
  .no-card {
    width: 100%;
    height: 700px;
    .wrap {
      width: 380px;
      height: 200px;
      padding: 70px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 1px 1px 2px 0px rgba(218, 218, 218, 1);
      border-radius: 4px;
      border: 1px solid rgba(227, 227, 227, 1);
      button {
        width: 100%;
        height: 52px;
        margin: 0 auto;
        background: #fff;
        cursor: pointer;
        img {
          display: inline-block;
          width: 50px;
          height: 50px;
          margin-right: 12px;
        }
        span {
          display: inline-block;
          height: 50px;
          line-height: 50px;
        }
      }
    }
  }
}
</style>
