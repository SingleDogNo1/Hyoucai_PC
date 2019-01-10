<template>
  <div class="satefy">
    <img src="./safe_banner.png" alt class="safe_banner" />
    <div class="depository">
      <div class="depo_bank"><img src="./depo_bank.png" alt /></div>
    </div>
    <div class="multiple">
      <div class="multiple_title">
        <div class="title_boder title_top"></div>
        <div class="title_boder title_right"></div>
        <div class="title_boder title_bottom"></div>
        <div class="title_boder title_left"></div>
        <div class="title_font">多重风控措施</div>
      </div>
    </div>
    <div class="risk_mana">
      <div class="examine">
        <div class="examine_div filtration"></div>
        <div class="examine_div analysis"></div>
        <div class="examine_div docking"></div>
        <div class="examine_div review"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { zxdtMtbdMsg } from '@/api/common/safe'
export default {
  name: 'safetyMeasures',
  data() {
    return {}
  },
  methods: {
    zxdtMtbdMsg: function() {
      let obj = {}
      obj.paramCode = 'AQCS'
      zxdtMtbdMsg(obj).then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.zxdtMtbdMsg()
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.satefy {
  .safe_banner {
    font-size: 0;
    width: 100%;
  }
  .depository {
    background-image: url('./depository.png');
    .depo_bank {
      display: inline-block;
      margin: 269px 852px 616px;
      width: 216px;
      height: 45px;
      text-align: center;
      vertical-align: middle;
    }
  }
  .multiple {
    height: 750px;
    background: rgba(15, 234, 208, 1);
    padding-top: 61px;
    .multiple_title {
      width: 400px;
      height: 100px;
      border: 1px solid rgba(255, 255, 255, 0.28);
      margin: 0 auto;
      position: relative;
      .title_boder {
        position: absolute;
        width: 13px;
        height: 13px;
      }
      .title_top {
        left: 0;
        top: 0;
        border-left: 4px solid rgba(255, 255, 255, 1);
        border-top: 4px solid rgba(255, 255, 255, 1);
      }
      .title_right {
        top: 0;
        right: 0;
        border-top: 4px solid rgba(255, 255, 255, 1);
        border-right: 4px solid rgba(255, 255, 255, 1);
      }
      .title_bottom {
        right: 0;
        bottom: 0;
        border-right: 4px solid rgba(255, 255, 255, 1);
        border-bottom: 4px solid rgba(255, 255, 255, 1);
      }
      .title_left {
        bottom: 0;
        left: 0;
        border-bottom: 4px solid rgba(255, 255, 255, 1);
        border-left: 4px solid rgba(255, 255, 255, 1);
      }
      .title_font {
        width: 288px;
        height: 48px;
        font-size: 48px;
        font-family: FZZZHUNHJW--GB1-0;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: 48px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
  }
  .risk_mana {
    background-image: url('./risk_mana.png');
    padding-top: 274px;
    .examine {
      margin-left: 470px;
      .examine_div {
        width: 45px;
        height: 45px;
        margin-top: 26px;
      }
      .filtration {
      }
    }
  }
}
</style>
