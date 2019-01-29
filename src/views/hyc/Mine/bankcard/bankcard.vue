<template>
  <div class="bankcard">
    <div class="title">
      <span v-if="bankcardInfo.openBankName">我的银行卡</span>
      <span v-else>绑定银行卡</span>
    </div>
    <div class="card-item" v-if="bankcardInfo.openBankName">
      <header>
        <div class="bank-name">
          <img :src="bankcardInfo.iconUrl" :alt="bankcardInfo.openBankName" />
          <span>{{ bankcardInfo.bankName }}</span>
        </div>
        <div class="card-type">储蓄卡</div>
      </header>
      <section>{{ user.userBasicInfo.escrowAccountInfo.bankCard  }}</section>
      <footer @click="unbind">解绑</footer>
    </div>
    <div class="no-card" v-else>
      <button @click="toBindCard">添加银行卡</button>
    </div>

    <bankcard-dialog
      :show.sync="bankcardDialog">
      <div class="dialog-msg">{{bankcardMsg}}</div>
    </bankcard-dialog>
  </div>
</template>

<script>
import { getUserBankCardInfo, unbindCardApi, bindCardApi } from '@/api/hyc/Mine/bankcard'
import { mapState } from 'vuex'
import bankcardDialog from '@/components/Dialog/Dialog'

export default {
  name: 'bankcard',
  mixins: [],
  components: {
    bankcardDialog
  },
  data() {
    return {
      bankcardInfo: {},
      bankcardDialog: false,
      bankcardMsg: ''
    }
  },
  props: {},
  watch: {},
  methods: {
    unbind() {
      unbindCardApi({
        retUrl: window.location.href
      }).then(res => {
        console.log(res)
        if (res.data.resultCode === '1') {
          // success
          // TODO linkto bank page
        } else if (res.data.resultCode === '60007' || res.data.resultCode === '60008') {
          //"60007","账面余额不为0，不能解除绑定" ;"60008","有债权关系不能解绑"
          this.bankcardDialog = true
          this.bankcardMsg = res.data.resultMsg
        } else {
          this.bankcardDialog = true
          this.bankcardMsg = res.data.resultMsg
        }
      })
    },
    toBindCard() {
      bindCardApi({
        retUrl: window.location.href
      }).then(res => {
        console.log(res)
        if (res.data.resultCode === '1') {
          // success
        } else {
          this.bankcardDialog = true
          this.bankcardMsg = res.data.resultMsg
        }
      })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    getUserBankCardInfo({
      userName: this.user.userName
    }).then(res => {
      console.log(res.data.data)
      if (res.data.resultCode === '1') {
        this.bankcardInfo = res.data.data
      }
    })
  }
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
      color: $color-theme;
      cursor: pointer;
    }
  }
  .no-card {
    width: 100%;
    height: 700px;
    background: #000;
  }
  .dialog-msg {
    text-align: center;
  }
}
</style>
