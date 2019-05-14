<template>
    <div class="realNameAccount">
      <div class="main">
        <h3>开通汇有财账户</h3>
        <div class="progress-bar">
          <div class="progress" :class="{ active: $route.path==='/realNameAccount/realNameAuth'}">
            <div class="progress-img">
              <div class="line left"></div>
              <img src="./realName.png" alt="">
              <div class="line right"></div>
            </div>
            <span>实名</span>
          </div>
          <div class="progress" :class="{ active: $route.path==='/realNameAccount/bindCard'}">
            <div class="progress-img">
              <div class="line left"></div>
              <img src="./bindCard.png" alt="">
              <div class="line right"></div>
            </div>
            <span>绑卡</span>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.realNameAccount {
  background: rgb(244, 244, 244);
  .main {
    background: #fff;
    width: 1140px;
    margin: 20px auto 30px;
    padding: 20px 0;
    h3 {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin: 20px auto;
    }
    .progress-bar {
      display: flex;
      justify-content: center;
      margin: 50px auto;
      .progress {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 -15px;
        &.active .progress-img .line {
          opacity: 1;
        }
        &.active span {
          color: #4a4a4a;
        }
        .progress-img {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          .line {
            width: 62px;
            height: 2px;
            opacity: 0.3;
            &.left {
              background: linear-gradient(90deg, rgba(0, 185, 255, 0) 0%, rgba(0, 131, 254, 1) 100%);
            }
            &.right {
              background: linear-gradient(90deg, rgba(0, 131, 254, 1) 0%, rgba(0, 185, 255, 0) 100%);
            }
          }
          img {
            width: 51px;
            height: 51px;
            margin: 0 5px;
          }
        }
        span {
          color: #9b9b9b;
        }
      }
    }
  }
}
</style>
