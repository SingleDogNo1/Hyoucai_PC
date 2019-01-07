<template>
  <div class="app-container">
    <div class="container u_top ">
      <div class="u_agreement">
        <p>自动投资服务条款</p>
      </div>
      <div class="u_content">
        <h3 class="b_s">本息复投规则：</h3>
        <div class="s_s" style="width:auto;height:290px;">
          <p class="s_notice">本息复投规则：</p>
          <p class="s_username">根据贵方签署的“点金石”用户协议中相关规定，在贵方注册成为用户后并选择各类产品，贵方已经充分理解并接受各类具体规则。鉴于贵方投资的项目即将到期，贵方可选择到期后将所得全部本金及收益再次投入到点金石网站平台发布的各类产品中。复投无次数限制，复投产品到期后自动复投再下一期，如需终止本息复投规则，可根据对话框选择不再复投。
            如贵方选择了本息复投服务视为将本金及收益按照选择的产品规则再次计算收益，所有服务规则以贵方选择的产品具体规定为准。
          </p>
          <p class="s_username">如贵方选择了本息复投服务视为将本金及收益按照选择的产品规则再次计算收益，所有服务规则以贵方选择的产品具体规定为准。</p>
        </div>

        <h3 class="b_s">本金复投规则：</h3>
        <div class="s_s" style="width:auto;height:290px;">
          <p class="s_notice">本金复投规则：</p>
          <p class="s_username">根据贵方签署的“点金石”用户协议中相关规定，在贵方注册成为用户后并选择各类产品，贵方已经充分理解并接受各类具体规则。鉴于贵方投资的项目即将到期，贵方可选择到期后将所得全部本金再次投入到点金石网站平台发布的各类产品中。复投无次数限制，复投产品到期后自动复投再下一期，如需终止本金复投规则，可根据对话框选择不再复投。
          </p>

          <p  class="s_username">
            如贵方选择了本金复投服务视为将本金按照选择的产品规则再次计算收益，所有服务规则以贵方选择的产品具体规定为准。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'agreement'
}
</script>

<style scoped lang="scss">
.container.u_top {
  width: 1140px;
  margin: 0 auto;
  padding: 0 65px;
  border-top: 2px solid #ce9b37;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  min-height: 800px;
  margin-bottom: 90px;
  background-color: #fff;
  margin-top: 30px;
}
.container .u_agreement {
  height: 90px;
  border-bottom: 1px solid #ccc;
}
.container .u_agreement p {
  line-height: 90px;
  text-align: center;
  font-size: 24px;
  color: #333;
}
.container .u_content {
  margin-top: 35px;
  margin-bottom: 90px;
}
.container .u_content .u_explain {
  text-align: left;
  color: #666;
  font-size: 14px;
}
.container .u_content h3 {
  font-size: 18px;
  color: #333;
  margin-top: 35px;
  margin-bottom: 10px;
}
.container .u_content .b_o {
  margin-top: 110px;
  margin-bottom: 25px;
}
.container .u_content ul {
  list-style-type: decimal;
}
.container .u_content ul li {
  font-size: 14px;
  color: #666;
  margin-left: 15px;
}
.container .u_content .ele {
  font-size: 14px;
}
.container .u_content span {
  float: left;
  margin-right: 6px;
  color: #666;
  font-size: 14px;
}
.container .u_content .f_o {
  margin-left: 25px;
  font-size: 14px;
  color: #666;
  margin-bottom: 3px;
  line-height: 19px;
}
.container .u_content .f_d {
  margin-left: 26px;
  font-size: 14px;
  color: #666;
  margin-bottom: 3px;
  line-height: 19px;
}
.container .u_content .add_t {
  margin-top: 36px;
  margin-bottom: 15px;
  font-size: 16px;
}
.container .u_content .add_b {
  margin-top: 40px;
}
.container .u_content .s_t {
  margin-top: 11px;
}
.container .u_content .t_f {
  border: 1px solid #ccc;
  width: 974px;
  height: 198px;
  margin-top: 20px;
}
.container .u_content .t_f .se_t {
  border-bottom: 1px solid #ccc;
}
.container .u_content .t_f .r_se {
  border-right: 1px solid #ccc;
}
.container .u_content .b_s {
  margin-top: 53px;
}
.container .u_content .s_s {
  border: 1px solid #ccc;
  width: 630px;
  height: 422px;
  padding-top: 40px;
  padding-left: 25px;
  padding-right: 25px;
  line-height: 24px;
}
.container .u_content .s_notice {
  margin-bottom: 40px;
  text-align: center;
  font-size: 14px;
}
.container .u_content .s_con {
  font-size: 14px;
}
.container .u_content .s_s .r_name {
  text-align: right;
  font-size: 14px;
}
</style>
