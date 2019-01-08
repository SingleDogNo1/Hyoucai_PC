<template>
  <div class="bankcard">
    <div class="title">我的银行卡</div>
    <div class="card-item" v-for="(item, index) in bankcardList" :key="index">
      <header>
        <div class="bank-name">
          <img :src="item.iconUrl" :alt="item.bankName" /> <span>{{ item.bankName }}</span>
        </div>
        <div class="card-type">储蓄卡</div>
      </header>
      <section>{{ item.cardNo }}</section>
      <footer @click="unbind">解绑</footer>
    </div>
  </div>
</template>

<script>
import { getUserBankCardList, prevChangeBankcard } from '@/api/djs/Mine/bankcard'

export default {
  name: 'bankcard',
  mixins: [],
  components: {},
  data() {
    return {
      bankcardList: []
    }
  },
  props: {},
  watch: {},
  methods: {
    unbind() {
      prevChangeBankcard({
        bankCardNo: this.bankcardList[0].cardNo
      }).then(res => {
        if (!res.data.canModify) {
          alert(res.data.message)
          return false
        }
      })
    }
  },
  computed: {},
  created() {
    getUserBankCardList({
      // TODO mock-data will be del
      userName: 'djs213718xa'
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
      color: $color-theme;
      cursor: pointer;
    }
  }
}
</style>
