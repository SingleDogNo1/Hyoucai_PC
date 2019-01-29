<template>
  <div class="bankcard">
    <div class="title">我的银行卡</div>
    <div class="card-item" v-for="(item, index) in bankcardList" :key="index">
      <header>
        <div class="bank-name">
          <img :src="item.iconUrl" :alt="item.bankName">
          <span>{{ item.bankName }}</span>
        </div>
        <div class="card-type">储蓄卡</div>
      </header>
      <section v-html="item.cardNo"></section>
      <footer @click="unbind">解绑</footer>
    </div>
  </div>
</template>

<script>
import { getUserBankCardList, prevChangeBankcard } from '@/api/djs/Mine/bankcard'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    getUserBankCardList({
      userName: this.user.userName
    }).then(res => {
      if (res.data.list && res.data.list.length > 0) {
        this.bankcardList = res.data.list
        this.bankcardList.forEach(val => {
          let no = val.cardNo
          let len = no.length
          val.cardNo =
            '<span>' +
            no.substring(0, 4) +
            '</span><span class="point">····</span><span class="point">····</span><span>' +
            no.substring(len - 4, len) +
            '</span>'
        })
        console.log('this.bankcardList===', this.bankcardList)
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
      display: flex;
      margin-top: 15px;
      font-size: $font-size-small;
      color: $color-text;
      align-items: center;
      /deep/ span {
        display: inline-block;
        margin-right: 16px;
      }
      /deep/ span.point {
        height: 52px;
        line-height: 47px;
        font-size: 40px;
      }
    }
    footer {
      margin-top: 40px;
      text-align: end;
      color: #DB011B;
      cursor: pointer;
    }
  }
}
</style>
