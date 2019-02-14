<template>
  <div class="content">
    <div class="box">
      <div class="modify">
        <span class="modify_name">修改昵称</span> <input class="modify_ipt" type="text" placeholder="请输入昵称" v-model="nikename" />
        <p class="txt">{{ txt }}</p>
      </div>
      <div class="btn">
        <button class="determine" @click="modifyNikename">确定</button> <button class="cancle" @click="isShow.isShow1 = !isShow.isShow1">取消</button>
      </div>
    </div>
    <errDialog :show.sync="showDialog" :singleButton="singleButton" class="djs-charge-dialog" :onClose="show"> <div>修改成功</div> </errDialog>
  </div>
</template>
<script>
import { modifyNikename } from '@/api/common/basicInfo'
import { mapGetters } from 'vuex'
import errDialog from '@/components/Dialog/Dialog'
export default {
  name: 'Name',
  data() {
    return {
      nikename: '',
      txt: '',
      singleButton: true,
      showDialog: false
    }
  },
  components: {
    errDialog
  },
  computed: {
    ...mapGetters(['user'])
  },
  props: ['isShow'],
  methods: {
    modifyNikename: function() {
      if (this.nikename) {
        let obj = {}
        obj.nikename = this.nikename
        obj.userName = this.user.userName
        modifyNikename(obj).then(res => {
          if (res.data.resultCode == 1) {
            this.showDialog = true
          }
        })
      } else {
        this.txt = '昵称不能为空'
      }
    },
    show: function() {
      this.isShow.isShow1 = !this.isShow.isShow1
      this.$emit('success')
      this.nikename = ''
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
.content {
  position: relative;
  .box {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 8px 0px rgba(205, 205, 205, 1);
    border-radius: 4px;
    border: 1px solid rgba(235, 235, 235, 1);
    padding: 40px 0 41px;
    .modify {
      margin-left: 193px;
      font-family: PingFangSC-Regular;
      .modify_name {
        font-size: $font-size-small;
        font-weight: 400;
        color: rgba(90, 90, 90, 1);
        line-height: 16px;
      }
      .txt {
        color: red;
        font-size: $font-size-small-s;
        margin-left: 80px;
      }
      .modify_ipt {
        width: 280px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(218, 218, 218, 1);
        margin-left: 12px;
        padding-left: 12px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 16px;
      }
    }
    .btn {
      margin-left: 196px;
      padding-top: 40px;
      button {
        display: inline-block;
        width: 160px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-radius: 4px;
        font-size: $font-size-medium;
        font-weight: 400;
        cursor: pointer;
      }
      .determine {
        background: rgba(251, 123, 31, 1);
        color: rgba(255, 255, 255, 1);
      }
      .cancle {
        margin-left: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 4px 8px 0px rgba(205, 205, 205, 1);
        color: rgba(251, 123, 31, 1);
      }
    }
  }
  .djs-charge-dialog {
    display: block;
    z-index: 1;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    div {
      text-align: center;
    }
  }
}
</style>
