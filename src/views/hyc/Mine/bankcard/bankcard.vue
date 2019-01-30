<template>
  <div class="bankcard">
    <div class="title">
      <span v-if="bankcardInfo.cardNo">我的银行卡</span>
      <span v-else>绑定银行卡</span>
    </div>
    <div class="card-item" v-if="bankcardInfo.cardNo">
      <header>
        <div class="bank-name">
          <img :src="bankcardInfo.iconUrl" :alt="bankcardInfo.openBankName" />
          <span>{{ bankcardInfo.bankName }}</span>
        </div>
        <div class="card-type">储蓄卡</div>
      </header>
      <section>{{ user.userBasicInfo.escrowAccountInfo.bankCard | encrypt }}</section>
      <footer @click="unbind">解绑</footer>
    </div>
    <div class="no-card" v-else>
      <div class="wrap">
        <button @click="toBindCard"><img src="./images/icon_nocard.png"/><span>添加银行卡</span></button>
      </div>
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
  filters: {
    encrypt(value) {
      return `${value.slice(0, 4)}  ••••  ••••  ${value.slice(-4)}`
    }
  },
  methods: {
    postcall(url, params, target) {
      let tempform = document.createElement('form')
      tempform.setAttribute('name', 'form')
      tempform.action = url
      tempform.method = 'post'
      tempform.style.display = 'none'
      if (target) {
        tempform.target = target
      }

      for (let x in params) {
        let opt = document.createElement('input')
        opt.setAttribute('name', x)
        opt.setAttribute('value', params[x])
        tempform.appendChild(opt)
      }
      let opt = document.createElement('input')
      opt.type = 'submit'
      opt.setAttribute('id', '_submit')
      tempform.appendChild(opt)
      document.body.appendChild(tempform)
      tempform.submit()
      document.body.removeChild(tempform)
    },
    unbind() {
      unbindCardApi({
        retUrl: window.location.href
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.postcall(res.data.data.redirectUrl, res.data.data.paramReq)
        } else if (res.data.resultCode === '60007' || res.data.resultCode === '60008') {
          // TODO 这个异常的处理方式和下面的异常是否相同？？
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
      userName: this.user.user.userName
    }).then(res => {
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
      color: #db011b;
      cursor: pointer;
    }
  }
  .no-card {
    width: 100%;
    height: 700px;
    line-height: 700px;
    .wrap {
      width: 200px;
      height: 50px;
      margin: 0 auto;
      button {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #fff;
        cursor: pointer;
        img {
          display: inline-block;
          width: 50px;
          height: 50px;
          margin-right: 12px;
        }
        span{
          display: inline-block;
          height: 100%;
          line-height: 50px;
        }
      }
    }
  }
  .dialog-msg {
    text-align: center;
  }
}
</style>
