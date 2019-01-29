<template>
  <div class="bankcard">
    <div class="title">我的银行卡</div>
    <div class="card-item">
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
    </div>
</template>

<script>
import { getUserBankCardInfo, changeBankcard } from '@/api/hyc/Mine/bankcard'
import { mapState } from 'vuex'

export default {
  name: 'bankcard',
  mixins: [],
  components: {},
  data() {
    return {
      bankcardInfo: {}
    }
  },
  props: {},
  watch: {},
  methods: {
    unbind() {
      changeBankcard({
        retUrl: window.location.href
      }).then(res => {
        if (res.data.data.resultCode === '1') {
          console.log(res)
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
  },
  mounted() {
    console.log(this.user.userBasicInfo.escrowAccountInfo.bankCard)
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
}
</style>
