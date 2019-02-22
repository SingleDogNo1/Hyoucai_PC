<template>
  <div class="app-container">
    <div class="container u_top ">
      <div class="u_agreement"><p>债权转让协议</p></div>
      <div class="u_content">
        <p class="u_explain">
          本债权转让协议（下称“本协议”）由以下各方于【<em class="year1">{{ relation.signYear }}</em
          >】年【<em class="mon1">{{ relation.signMonth }}</em
          >】月【<em class="day1">{{ relation.signDay }}</em
          >】日签订:
        </p>
        <p class="u_explain s_t">
          债权出让人：【<em class="">{{ relation.partyA }}</em
          >】（下称“甲方”）
        </p>
        <p class="u_explain s_t">
          注册号：【<em class="userNameA">{{ relation.userNameA }}</em
          >】
        </p>
        <p class="u_explain s_t">
          债权受让人：【<em class="name2">{{ relation.partyB }}</em
          >】（下称“乙方”）
        </p>
        <p class="u_explain s_t">
          注册号：【<em class="userNameDjs">{{ relation.userNameDjs }}</em
          >】
        </p>
        <p class="u_explain s_t">居间服务人：江西汇通金融信息服务有限公司（下称“丙方”）</p>
        <p class="ele add_t">鉴于</p>
        <span>1.</span>
        <p class="f_o">
          甲方与借款人于【<em class="year2">{{ relation.signLoanYear }}</em
          >】年【<em class="mon2">{{ relation.signLoanMonth }}</em
          >】月【<em class="day2">{{ relation.signLoanDay }}</em
          >】日签订《借款协议》（下称“《借款协议》”,协议编号为【<em class="agreementNum">{{ relation.appNo }}</em
          >】），将一定金额的款项出借给借款人，甲方有意通过丙方合法经营的汇有财网站（网址：【<a
            href="http://www.hyoucai.cn"
            style="color: blue;"
            target="_blank"
            >http://www.hyoucai.cn</a
          >】或【<a href="http://www.hyoucai.com" style="color: blue;" target="_blank">http://www.hyoucai.com</a
          >】，下称“汇有财”）转让其在《借款协议》项下的全部或部分债权（下称“转让债权”）；
        </p>
        <span>2.</span>
        <p class="f_o">乙方愿意受让甲方拟转让的债权，同意接受《借款协议》的全部条款；</p>
        <span>3.</span>
        <p class="f_o">
          丙方系依法成立并合法存续的企业法人，有权提供网络借贷居间服务。
          现甲方、乙方和丙方经过友好协商，在平等、自愿的基础上就债权转让事宜达成如下协议，以兹共同遵守。
        </p>
        <h3>第一条 转让债权</h3>
        <span>1.1</span>
        <p class="f_d">甲方拟转让《借款协议》项下债权的基本信息如下：</p>

        <p class="f_o">
          （1） 转让债权金额：【<em class="money1">{{ relation.attornBondAmount }}</em
          >】
        </p>
        <p class="f_o">
          （2） 年化利率：【<em class="rate1">{{ relation.rateYear }}</em
          >】
        </p>
        <p class="f_o">
          （3） 还款方式：【<em class="hkfs">{{ relation.repayType }}</em
          >】
        </p>
        <p class="f_o">
          （4） 借款期限：【<em class="jkqx">{{ relation.loanTerm }}</em
          >】
        </p>
        <p class="f_o">
          （5） 剩余期限：【<em class="syqx">{{ relation.residualTerm }}</em
          >】
        </p>
        <p class="f_o">
          （6） 最终到期日：【<em class="zzdqr">{{ relation.lastDueDate }}</em
          >】
        </p>
        <span>1.2</span>
        <p class="f_d">
          乙方同意按照本协议约定的条件，以人民币 【<em class="money1">{{ relation.attornBondAmount }}</em
          >】元（大写：人民币【<em class="dxje">{{ relation.attornPriceCapital }}</em
          >】，下称“转让价款”）受让甲方在《借款协议》项下人民币 【<em class="money1">{{ relation.attornBondAmount }}</em
          >】元 （大写：人民币【<em class="dxje">{{ relation.attornPriceCapital }}</em
          >】）的债权。
        </p>
        <h3>第二条 转让款支付方式</h3>
        <p class="ele">
          甲乙双方一致同意并确认遵照汇有财平台的规则和说明进行本协议项下债权的转让和价款支付，并且乙方不可撤销地授权汇有财平台或其合作机构直接从乙方账户中划转相关款项，代乙方向甲方支付转让价款；甲方同意上述转让价款划转完成即视为乙方完成债权转让价款的支付。
          如果为了履行本协议而需要甲方和/或乙方另行向汇有财或其合作机构出具与款项支付或划转有关的授权文件，则甲和乙应签署并出具该等授权文件。
        </p>
        <h3>第三条 债权转让的收益</h3>
        <span>3.1</span>
        <p class="f_d">
          甲乙双方一致同意自乙方完成转让价款支付之日起，乙方将在其受让债权份额内取代甲方成为新的债权人，享受债权人依据《借款协议》享有的权益。
        </p>
        <span>3.2</span>
        <p class="f_d">转让债权在转移之前的相应收益归甲方所有，在转移之后的收益等全部权益由乙方享有。</p>
        <h3>第四条 居间服务费用</h3>
        <p class="ele">
          甲乙双方同意，丙方可按照本协议第一条约定的转让价款的【<em class="rate2">{{ relation.serviceCharge }}</em
          >】%收取本协议项下债权转让的居间服务费用，且该居间服务费用应当由【乙】方承担，乙方应在支付债权转让款的同时向丙方支付居间费。
        </p>
        <h3>第五条 甲乙双方声明和保证</h3>
        <span>5.1</span>
        <p class="f_d">
          甲乙双方均具有完全民事权利能力和完全民事行为能力，能够独立承担民事责任， 签订和履行本协议不会违反对其有约束力的法律法规或监管规定，也不违反
          任何约束或影响双方或其资产的裁决、命令、协议、或承诺。
        </p>
        <span>5.2</span>
        <p class="f_d">
          甲方声明本协议项下转让债权系其真实、合法、有效拥有的债权，甲方对该等债权享有完全的所有权，甲方未在该等出让债权上设定质权或其他担保物权或任
          何第三方权利，该等出让债权亦不存在被法院保全、查封等权利限制情况。
        </p>
        <span>5.3</span>
        <p class="f_d">甲方保证在签署本协议之前，未就本协议项下债权与第三方签订债权转让协议，也未设置任何权利障碍。</p>
        <span>5.4</span>
        <p class="f_d">
          乙方保证用于购买转让债权的资金是其自有或其有权处分的合法资金，如果第三人对该资金归属、合法性等问题提出异议，乙方保证负责协调解决并承担相关
          责任，与甲方或者汇有财平台无关。
        </p>
        <span>5.5</span>
        <p class="f_d">
          甲乙双方在此确认，丙方并没有以任何方式为甲方或乙方履行本协议提供任何保证或担保，也没有为《借款协议》的借款人履行其在《借款协议》项下的义务
          提供任何保证和担保。
        </p>
        <span>5.6</span>
        <p class="f_d">
          在签署本协议前，乙方已经详细了解转让债权的相关情况以及汇有财平台的有关业务规则和交易说明，对受让债权可能存在的风险以及受让该等借款债权后的
          所有权利、义务有了充分、全面的认识，清楚知悉其中的出借风险，经独立、审慎判断后做出出借决定，自愿签署本协议并承担出借风险。
        </p>
        <h3>第六条 债权转让通知及方式</h3>
        <p class="ele">
          甲方在此不可撤销地授权丙方以书面形式通知《借款协议》的借款人，告知本协议项下债权转让行为的发生。为履行本条款，甲方应给予丙方充分的配合，包括但不限于根据丙方的要求签署为履行本条款而应签署的所有文件。
        </p>
        <h3>第七条 保密</h3>
        <p class="ele">
          本协议任意一方未按协议约定履行义务或违反约定的，应当承担由此给守约方造成的一切损失，包括但不限于守约方为实现权利而支付的律师费、诉讼费等。
        </p>
        <h3>第八条 违约责任</h3>
        <p class="ele">
          本协议任何一方未按协议约定履行义务或违反约定的，应当承担由此给守约方造成的一切损失，包括但不限于守约方为实现权利支付的调查费、律师费、诉讼费等。
        </p>
        <h3>第九条 法律适用及争议解决</h3>
        <span>9.1</span>
        <p class="f_d">本协议的订立、效力、解释、履行、修改、终止以及争议的处理等，均适用中国的法律。</p>
        <span>9.2</span>
        <p class="f_d">
          本协议各方在履行本协议中发生任何争议应当友好协商解决，争议发生15个工作日后仍无法协商解决的，任何一方均有权向债权出让人注册地（公司）/户籍所在地（自然人）有管辖权的人民法院提起诉讼。
        </p>
        <h3>第十条 本协议的生效及效力</h3>
        <span>10.1</span>
        <p class="f_d">本协议自各方签署之日起生效。</p>
        <span>10.2</span>
        <p class="f_d">
          协议生效后，甲乙双方以本协议为依据形成真实、合法、有效的债权转让行为。任何法定或《借款协议》约定的与所转让债权相关的权利及义务应于本协议生效后一并由乙方享有及承担。
        </p>
        <h3>第十一条 其他</h3>
        <span>11.1</span>
        <p class="f_d">本协议由甲方委托丙方在汇有财平台签署，乙方通过登录网站，以点击确认的方式进行签署。</p>
        <span>11.2</span>
        <p class="f_d">如在协议履行过程中产生的争议均不影响本协议其他条款的履行及效力。</p>
        <span>11.3</span>
        <p class="f_d">如本协议中的任何条款因违反适用的法律法规被认定无效的，均不影响本协议其他条款及《借款协议》的效力。</p>
        <span>11.4</span>
        <p class="f_d">本协议各条款的标题仅为参照方便而设，并不限制或从其他角度影响本协议条款的含义和诠释。</p>
        <span>11.5</span>
        <p class="f_d">
          协议各方同意本协议以电子版本生成，由汇有财平台代为保管并保存在汇有财平台为此设立的服务器上备查，协议对各方均具有法律约束力。
        </p>
        <table class="t_f">
          <tr>
            <td>甲方：</td>
            <td class="r_se"></td>
            <td>乙方：</td>
            <td></td>
          </tr>
          <tr class="se_t">
            <td>日期：</td>
            <td class="r_se">
              <em class="name1">{{ relation.partyA }}</em>
            </td>
            <td>日期：</td>
            <td>
              <em class="name2">{{ relation.partyB }}</em>
            </td>
          </tr>
          <tr>
            <td colspan="4">丙方：江西汇通金融信息服务有限公司</td>
          </tr>
          <tr>
            <td>日期：</td>
            <td class="cachel"><img v-if="relation.userNameA" src="./cachel.png" style="width:120px" alt="" /></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { bondProtocol } from '@/api/djs/agreement'

export default {
  name: 'agreement',
  data() {
    return {
      relationId: this.$route.query.relationId,
      relation: {}
    }
  },
  methods: {
    loadData() {
      bondProtocol({ relationId: this.relationId }).then(res => {
        if (res.data.resultCode === '1') {
          this.relation = res.data
        }
      })
    }
  },
  created() {
    if (this.relationId) {
      this.loadData()
    }
  }
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
.container .u_content tr td {
  width: 25%;
  padding: 0 20px;
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
