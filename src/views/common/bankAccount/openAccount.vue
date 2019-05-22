<template>
  <div>
    <!-- 主体部分开始 -->
    <div class="user_reg">
      <div class="user_reg_second">
        <div class="formBox" id="second">
          <h1>开通银行存管电子账户</h1>
          <div class="open_pic">
            <ul class="pic">
              <li></li>
              <li><img height="45.6" width="45.6" src="../bankAccount/deposit.png" /></li>
              <li></li>
            </ul>
            <ul class="pic">
              <li></li>
              <li><img height="45.6" width="45.6" src="../bankAccount/auth.png" /></li>
              <li></li>
            </ul>
            <ul class="words">
              <li><h2>实名开户</h2></li>
            </ul>
            <ul class="words">
              <li><h2>业务授权</h2></li>
            </ul>
          </div>
          <div class="form-data">
            <p class="username">
              <i class="iconfont icon-user"></i
              ><input type="text" :disabled="formData.name.disabled" v-model="formData.name.val" ref="userNameRef" placeholder="请输入姓名" />
            </p>
            <p class="id-card">
              <i class="iconfont icon-certificate"></i
              ><input type="text" :disabled="formData.idCard.disabled" v-model="formData.idCard.val" ref="idCatdRef" placeholder="请输入身份证号" />
            </p>
            <p class="mobile">
              <i class="iconfont icon-phone1"></i>
              <input type="text" :disabled="formData.mobile.disabled" v-model="formData.mobile.val" placeholder="请输入开户手机号" />
            </p>

            <div id="support-bank" @click="bankDialogVisible = true">查看支持银行<em class="iconfont icon-changjianwenti userBank-find"></em></div>
            <dl>
              <dt><i :class="checkAgree ? 'icon-Check' : 'icon-choose'" class="iconfont" @click="checkAgree = !checkAgree"></i></dt>
              <dd>
                我已阅读并同意<a href="javascript:;" @click="agreeDialogVisible = true" class="agre_find"
                  >《江西银行网络交易资金账户服务第三方协议》</a
                >和<a href="javascript:;" @click="agreeDialogVisible = true" class="agre_find">《用户授权协议》</a>
              </dd>
            </dl>
            <h3 v-if="errorMsg != ''">{{ errorMsg }}</h3>
            <p class="text"></p>
            <button
              type="submit"
              :class="!checkAgree || formData.name.val == '' || formData.idCard.val == '' ? 'disabled' : ''"
              :disabled="!checkAgree || formData.name.val == '' || formData.idCard.val == ''"
              id="submit"
              @click="clickNext"
            >
              下一步
            </button>
            <p class="open_tip">
              温馨提示：<br />
              1.请保持你的姓名、手机号和借记卡预留信息一致。<br />
              2.绑定银行卡后，您进行充值和提现时使用此卡。
            </p>
          </div>
        </div>
      </div>
      <div id="openAccount"></div>
    </div>

    <!--银行卡信息弹窗-->
    <el-dialog title="" :visible.sync="bankDialogVisible" width="768px" center>
      <div class="userSupportBank_icon">
        <ul class="userSupportBank_icon_in">
          <li v-for="(item, index) in backList" :key="index">
            <img :src="item.iconUrl" />
            <h2>
              <strong>{{ item.bankName }}</strong
              ><br /><span>单笔限额：&nbsp;{{ item.onceLimit }}</span>
            </h2>
          </li>
        </ul>
      </div>
      <div class="userSupportBank_tip">
        <span>温馨提示</span>
        <p>1.上表中的银行支持快捷充值。</p>
        <p>2.充值限额请参考上表，具体额度以发卡银行为准，如果您在发卡银行设置的支付金额低于此表限额，以您的设置为准。</p>
      </div>
    </el-dialog>

    <!--协议弹窗-->
    <div class="userAuthority" v-if="agreeDialogVisible == true">
      <section class="userAuthority_in">
        <div class="hd">
          <div class="userAuthority_closeBox" id="userAuthority_closeBox"><i class="iconfont icon-guanbi"></i></div>
          <ul>
            <li :class="agreeSelectTab ? 'on' : ''" @click="agreeSelectTab = true">江西银行网络交易资金账户服务第三方协议</li>
            <li :class="!agreeSelectTab ? 'on' : ''" @click="agreeSelectTab = false">用户授权协议</li>
          </ul>
        </div>
        <div class="bd">
          <div class="bd-01" v-if="agreeSelectTab">
            <div class="account_service">
              <h3>甲方（委托人的客户）：</h3>
              <h3>甲方声明：</h3>
              <p>
                兹声明甲方在申请办理客户交易结算资金账户服务业务前已仔细阅读并理解《江西银行网络交易资金账户服务三方协议》，<b>甲方已明确知晓丙方仅负责网络交易资金账户服务，甲方与乙方的交易争议或纠纷与丙方无关。</b>即丙方按照甲方或甲方通过乙方提交的申请或指令办理充值、提现等资金划转业务。甲方在使用网络交易资金账户服务时，自行决定是否与交易对方进行交易，且自行承担与此相关的所有风险；<b>甲方确认，丙方对甲方的交易不承担任何担保责任，也对甲方的任何损失不承担责任；丙方不介入平台方的基础交易以及用户的投融资相关活动，不负责审核乙方平台所提供融资人和融资项目的真实性和合法性、不保障融资人和融资项目必然还款、也不保障甲方能够获得乙方融资项目下的本金和预期收益，不对任何基础交易及用户承担担保责任，亦不对基础交易的任何一方的损失承担赔偿责任。甲方知晓并确认，一旦甲方通过互联网点击确认或以其他方式选择接受本协议或甲方使用网络交易资金账户服务，即表示甲方同意接受上述声明和本协议的全部约定内容，</b>愿意履行和承担本协议中约定的权利和义务，确认承担由此产生的一切责任。
              </p>
              <h3>乙方(委托人)：</h3>
              <h3>丙方（存管人）：江西银行股份有限公司</h3>
              <h3>鉴于：</h3>
              <p>
                甲方是乙方平台成功注册的用户，乙方和丙方连通网络交易账户管理平台，乙方和丙方已签订《资金存管业务支付结算服务合作协议》（以下称“《合作协议》”）。
              </p>
              <p>
                为此，甲、乙、丙三方依据《中华人民共和国合同法》、《中华人民共和国商业银行法》、结合乙方交易及结算规则、丙方账户管理及结算规则和其他有关法律、法规、规章以及相关规定，就甲方在乙方进行网络借贷交易，丙方为乙方客户开立存管子帐户（以下称“账户”），提供交易结算资金账户服务，及其他相关事宜达成《江西银行网络交易资金账户服务三方协议》（以下称“本协议”），供三方共同遵守，如乙丙双方签署的《合作协议》与本协议不一致的，以本协议为准。
              </p>
              <p>
                为了保障甲方的合法权益，请甲方在注册或使用丙方账户服务前，详细阅读本协议。<b
                  >甲方注册或使用账户时，即表示甲方已充分知晓并理解本协议之含义，并在此基础上接受本协议之全部内容，否则您应立即停止使用本服务和使用账户，并不进行下一步的操作。</b
                >
              </p>

              <h3>一、定义及解释</h3>
              <p>1、<b>甲方是指</b>委托人的客户包括出借人、借款人及担保人等。</p>
              <p>2、<b>乙方（委托人）</b>即网络借贷信息中介机构，是指依法设立，专门从事网络借贷信息中介业务活动的金融信息中介公司。</p>
              <p>3、<b>丙方（存管人）</b>是指为网络借贷业务提供资金存管服务的商业银行。</p>
              <p>
                4、<b>网络借贷资金存管业务</b>是指商业银行作为存管人接受委托人的委托，按照法律法规规定和合同约定，履行网络借贷资金存管专用账户的开立与销户、资金保管、资金清算、账务核对、提供信息报告等职责的业务。
              </p>
              <p>5、<b>汇总账户</b>指存管人为委托人开立的资金存管汇总账户。</p>
              <p>
                6、<b>子帐户</b>指存管人为出借人、借款人及担保人等在资金存管汇总账户下开立的子帐户，确保客户网络借贷资金分账管理；子帐户仅具备记账功能的虚拟账户。
              </p>
              <p>7、<b>出借人</b>指经委托人提供的信息中介服务，出借资金给借款人的自然人、法人或其他组织。</p>
              <p>8、<b>借款人</b>指在委托人运营平台发布借款需求信息，从出借人处借入资金的自然人、法人或其他组织。</p>
              <p>9、<b>担保人</b>指为委托人运营平台发布的网络借贷项目提供担保的自然人、法人或其他组织。</p>
              <p>10、<b>委托人运营平台</b>指委托人运营并提供网络借贷信息中介服务的网站、APP或其他移动端平台等。</p>
              <p>11、<b>三码</b>认证中三码指客户姓名、身份证号（或护照号等其他有效身份证件号码）及银行卡号。</p>
              <p>12、<b>四码</b>认证中四码指三码及银行卡预留手机号。</p>
              <p>
                13、<b>密码</b>指乙方用以识别甲方身份与指令要求甲方提供的代码或口令。包括登录密码、交易密码、动态密码等多个种类，具体业务中使用的密码类别以丙方要求为准。
              </p>
              <p>
                14、<b>绑定手机号码</b>是指甲方在申请开立存管帐户时，指定的关联存管帐户的手机号码，用于接收授权码、短信验证码以及交易提示短信等。丙方认为必要时，可通过此手机号码向甲方核实身份信息和交易信息。
              </p>

              <h3>二、资金存管专用账户管理及服务</h3>
              <p>
                丙方应根据银监会、中国互联网金融协会、中国人民银行等监管机构相关法律法规，对甲方网络借贷资金和乙方自有资金进行分账管理，安全保管网络借贷资金。
              </p>
              <p>
                丙方为乙方开立网络借贷资金存管汇总账户和自有资金账户，为甲方开立子帐户并提供开户、银行卡/银行账户绑定及解除绑定、账户信息变更、冻结、解冻、销户服务。
              </p>
              <p>
                甲方在丙方自有网站或移动客户端开立子帐户时，应根据丙方要求提供三码、四码认证信息或线下人工审核的相关营业执照等资料。丙方保证甲方交易密码安全性，不以任何方式向第三方泄露甲方的验证指令。
              </p>
              <p>
                丙方网贷资金存管系统应具备账户信息管理的功能、查询的功能等，包括但不限于账户信息、交易密码或其他指令验证方式等信息维护，并对网络借贷资金存管专用账户内的资金履行安全保管责任，确保委托人不能非法挪用客户资金。
              </p>
              <p>出借人出借资金时，存管人应支持资金从出借人子账户直接进入借款人子账户，但不应支持资金通过其他方账户中转</p>

              <h3>三、资金管理</h3>
              <p>
                丙方通过自身支付通道或使用符合中国人民银行支付管理相关规定的第三方机构提供的支付通道为甲方提供充值、出借、提现、还款、代偿、缴费、业务授权/取消业务授权等功能，
              </p>
              <p>
                丙方根据法律法规与本协议约定，按照甲方发出的指令或业务授权指令，办理网络借贷资金的清算支付工作。丙方保证甲方交易密码安全性，不以任何方式向第三方泄露甲方的验证指令。
              </p>
              <p>乙方仅能发起与甲方约定的服务费用、标的成立放款等划拨指令。</p>

              <h3>四、甲方权利义务</h3>
              <p>
                1、甲方具有相应合法的出借或融资等资格，不存在法律、法规、规章、其他规范性文件和乙方交易规则禁止或限制其在乙方进行网络借贷交易的情形，甲方的角色包括但不限于出借人、融资人、担保人、渠道方及其他与本借贷项目相关的主体等。
              </p>
              <p>
                2、甲方有义务保证其向乙方、丙方提供的所有身份证件、资料、信息的合法性与准确性，因甲方提供上述信息有误导致的一切责任，由甲方承担。如甲方资料发生变化时，甲方必须按照约定的要求，及时通知乙方和丙方。
              </p>
              <p>
                3、甲方保证其存管资金的合法合规，并有义务配合丙方做好反洗钱和反恐融资等工作，因甲方原因导致丙方反洗钱和反恐融资工作履行不到位、造成不良影响的，丙方有权依法追究甲方责任。
              </p>
              <p>4、甲方有权利要求乙方向其揭示网络借贷交易风险，甲方已明确知晓并愿意承担网络借贷交易风险。</p>
              <p>
                5、甲方已明确知晓丙方仅负责网络借贷交易资金账户服务，即按照甲方申请与指令办理账户开立、绑卡、解绑卡、充值、转账、提现等业务；甲方确认，丙方对甲方的交易不承担任何担保责任，对甲方的任何损失不承担责任；丙方不介入平台方的基础交易以及用户的投融资相关活动，不负责审核乙方平台所提供融资人和融资项目的真实性和合法性、不保障融资人和融资项目必然还款、也不保障甲方能够获得乙方融资项目下的本金和预期收益，不对任何基础交易及用户承担担保责任，亦不对基础交易的任何一方的损失承担赔偿责任。
              </p>
              <p>
                6、甲方有义务遵守相关的法律、法规及乙方交易规则，甲方已详细阅读本协议所有条款，准确理解其含义。甲方在使用网络交易资金账户服务的过程中，甲方同意并授权丙方将其的相关信息（包括但不限于甲方的姓名/名称、身份证号码/营业执照号码、联系方式、交易主体、交易类型、交易流水号、交易数额、交易时间等）用于丙方的数据分析、产品设计时使用以及为本协议目的的其他使用，丙方承诺在使用甲方的数据时，对甲方的信息进行保密。甲方确认，其在使用网络交易资金账户服务时，甲方已了解并接受本条款。
              </p>
              <p>
                7、甲方确认知晓用户号和密码、存管子帐户和密码的重要性。任何使用甲方密码进行的交易委托或资金划转均视为甲方本人所为和有效的甲方指令。由于甲方未尽到防范风险的义务造成其用户号及密码失密及其他非乙方、丙方原因而导致的甲方损失，乙方、丙方不承担任何责任。
              </p>
              <p>8、甲方应根据丙方要求将子帐户绑定不具备透支功能的银行卡/账户。</p>

              <h3>五、乙方权利义务</h3>
              <p>1、乙方是依法设立的网络借贷平台的运营商，具有相应的资格开展网络借贷相关业务。</p>
              <p>2、乙方根据乙方平台规则对甲方和融资项目进行审核，乙方应该承担甲方在乙方平台进行出借、融资所引发的经济纠纷及法律责任。</p>
              <p>3、乙方知晓，乙方仅能发起与甲方约定的服务费用、标的成立放款等划拨指令。</p>
              <p>4、乙方不应以任何方式截取、破解甲方的指令和信息，并遵守有关的法律、法规及交易和结算规则。</p>
              <p>5、乙方已详细阅读本协议所有条款，准确理解其含义，特别是其中有关丙方的责任条款，并同意本协议所有条款。</p>
              <p>
                6、乙方有义务配合丙方做好反洗钱和反恐融资等工作，因乙方原因导致丙方反洗钱和反恐融资工作履行不到位、造成不良影响的，丙方有权依法追究乙方责任。
              </p>
              <p>
                7、乙方确认，其通过平台发送给丙方的指令如涉及到甲方，乙方承诺该指令已事先取得了甲方的有效授权，并承担未取得有效授权造成的一切损失。
              </p>
              <p>8、乙方无权代理甲方开户及无权委托除存管人外的第三方代理甲方开户。</p>

              <h3>六、丙方权利义务</h3>
              <p>
                1、丙方为中华人民共和国境内依法设立并取得企业法人资格及商业银行经营许可证的商业银行，能够履行客户网络交易结算资金的账户服务及清算职责。丙方仅按照本协议条款规定的内容承担资金划转和清算职责。丙方按照办理资金存管专用账户的要求为甲方和乙方开立资金存管汇总账户、子帐户与自有资金账户，根据相关法律法规履行反洗钱和反恐融资职责。
              </p>
              <p>
                2、丙方具有开展客户交易结算资金账户服务的必要条件，能够按照甲方或甲方通过乙方发送的指令办理子账户开立、绑卡、解绑卡、充值、转账、提现、冻结、解冻、出借、还款、代偿、缴费等服务。
              </p>
              <p>3、丙方在严格遵循国家有关法律、法规以及规章的前提下，为甲方办理交易结算资金账户服务等业务。</p>
              <p>4、丙方有义务为乙方开立网络借贷资金存管汇总账户和自有资金账户，为甲方开立子账户。</p>
              <p>5、丙方有权利要求甲方提供子帐户开立需要的相关信息，甲方应保证所提供信息的准确性与合法性。</p>
              <p>
                6、丙方不承担借款项目及借贷交易信息真实性的审核责任，不对网络借贷信息数据的真实性、准确性和完整性负责，因乙方故意欺诈、伪造数据或数据发生错误导致的业务风险和损失，由乙方承担相应责任。
              </p>
              <p>7、丙方为甲方法人或其他组织客户开立账户时有权利根据丙方实际情况采取首笔认证或线下认证、或安全性不低于上述方式验证。</p>
              <p>
                8、丙方有权利依据法律法规及行业规范，披露委托人客户交易结算资金的保管及使用情况；丙方有权要求乙方向丙方披露相关信息，包括但不限于委托人基本信息、经营情况、借贷项目信息、借款人基本信息及参与方信息等。丙方因为业务开展过程中收集的甲方信息保密，除法律法规规定和合同约定，不应将客户信息用于其他用途。
              </p>
              <p>9、丙方不允许乙方及第三方代理甲方开户。</p>

              <h3>七、附则</h3>
              <p>
                1、本协议由甲方通过乙方服务渠道界面操作阅读，各方在该服务界面进行的任何形式的确认，包括但不限于数字证书、密码、点击确认等形式均视为各方的可靠电子签名。本协议经甲方通过上述方式确认同意签署并于系统记录的签约日期之日起发生法律效力。
              </p>
              <p>
                2、甲方使用存管子帐户时，如非丙方过错而发生的数据电文错误或者对甲方指令识别、处理或执行错误时，丙方对因该项错误的发生所导致的损失和其他不利后果不承担责任。
              </p>
              <p>
                3、对于不可抗力(包括但不限于战争、自然灾害、电力供应中断、火灾、地震等)、意外事件或乙方无法控制的其他情况所造成的损失，丙方不承担责任。
              </p>
              <p>
                4、如乙方未能通过监管机构备案或监管机构要求丙方停止为乙方提供资金存管服务的丙方不承担责任。甲乙双方之间的责任纠纷由双方自行解决，丙方不承担责任。
              </p>
              <p>5、如乙方出现和丙方签订的《合作协议》约定的丙方有权解除或终止协议的情形，丙方有权终止本协议，违约责任由乙方承担。</p>
              <p>
                6、<b>丙方有权根据需要不时修改、增加或删减本协议。</b>如本协议条款或本平台各项规则有任何变动，甲方有义务注意该等内容更新后协议的展示。一经本平台公示，视为已经通知到甲方本人，且无需单独另行通知甲方和乙方。若甲方在本协议及各类规则变更后继续使用丙方网络交易资金服务等的，视为甲方已认真阅读、充分理解并同意接受修改后的本协议及各类规则，且甲方承诺遵守修改后的本协议及各类规则内容，并承担相应的义务和责任。若甲方不同意修改后的本协议及各类规则内容，应立即停止使用本服务。
              </p>
              <p>
                7、本协议生效后，若有关法律法规、规章制度出台或修订，相关条款按新出台或修订的法律法规、规章制度办理；本协议中如有与未来出台或修订的法律法规、规章制度存在冲突或不一致的条款，自相关法律法规、规章制度生效之日起即可确认此类条款自始无效，但本协议其他条款继续有效。
              </p>
              <p>
                8、本协议引起的或与本协议有关的任何争议，由协议签订各方协商解决；协商不成的，应向丙方所在地法院起诉。争议期间，各方仍应履行未涉争议的条款。
              </p>
              <br /><br />
            </div>
          </div>
          <div class="bd-02" v-if="!agreeSelectTab">
            <div class="account_service">
              <center>用户授权协议</center>
              <h4>一、定义及解释</h4>
              <p>
                （1）网络借贷平台（下称“平台”）由江西汇通金融信息服务有限公司（下称“江西汇通”）负责运营。《江西银行网络交易资金账户服务三方协议》（下称“三方协议”）三方为平台注册用户（下称“用户”）、江西汇通、江西银行，本协议对用户、江西汇通均具有约束力的文件，具有合同上的法律效力。
              </p>
              <h4>二、声明与授权</h4>
              <p>
                （一）用户同意，在使用《三方协议》项下的服务时的意思表示均出自于用户本人的真实意愿。同时用户确保在使用服务时所填写的信息均真实有效，否则因此导致的责任由用户自行承担
              </p>
              <p>
                （二）用户在此授权，江西银行有权根据用户在平台方的投融资活动、指令及平台方的指令，对用户的电子账户进行免密操作，以便用户在平台上正常开展投融资活动。
              </p>
              <p>
                （三）用户同意，江西银行可以根据用户在平台上设置的内容或用户事先授权给平台方的内容从用户的存管电子账户扣款（包括向用户收取相应的服务费用）。
              </p>
              <p>
                （四）用户同意，江西银行仅对因错误执行平台方的指令承担责任，对于因平台方发送指令错误或迟延，或平台方未取得用户的事先授权而发送指令，导致用户的电子账户或银行账户发生的资金损失，江西银行不承担任何责任，用户应该与平台方或交易对方自行解决前述纠纷。用户理解并明白江西银行仅在此过程中仅根据平台方扣款指令划扣相应款项，除江西银行错误执行指令外，用户不得据此向江西银行主张任何索赔或补偿。
              </p>
              <p>
                （五）用户同意，开通《三方协议》项下的服务后，当江西银行自用户的电子账户中划扣相应款项的情况下，若因平台方未能及时出具账单，或账单逾期、错误导致您未能及时偿付相关款项而产生违约金或者多扣、重复扣款的，因此导致的所有责任及损失，均由用户与平台方自行协商解决。
              </p>
              <h4>三、其他</h4>
              <p>
                本协议依附于《三方协议》而存在，未尽事宜均以江西银行或平台方不时更新公布的《三方协议》及相关规则为补充；本协议与《三方协议》及相关规则不一致的地方，以本协议为准。本协议中的所有术语，除非另有说明，否则其定义与三方协议的定义相同。
              </p>
              <br /><br />
            </div>
          </div>
        </div>
        <!--我已阅读-->
        <div class="ready_xieyi"><a id="userAuthority_ready" @click="agreeDialogVisible = false">我已阅读</a></div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
input:disabled {
  background-color: rgb(235, 235, 228);
}
.form-data {
  width: 284px;
  margin: 0 auto;
}
/*登录注册页面公共样式*/
.user_reg {
  width: 1140px;
  margin: 60px auto;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  overflow: hidden;
  form {
    display: none;
  }

  .user_reg_second {
    height: 670px;
  }

  .formBox {
    width: 331px;
    padding-bottom: 20px;
    position: relative;
    margin: 0 auto;
    h1 {
      padding: 40px 0 52.7px;
      font-size: 20px;
      color: #4a4a4a;
      line-height: 20px;
      text-align: center;
      font-weight: bold;
    }

    .open_pic {
      height: 70px;
      width: 331px;
      margin-bottom: 50px;
      ul {
        display: inline-block;
        width: 49%;
        &.pic {
          height: 41px;
          li {
            float: left;
          }
        }
      }

      ul:nth-of-type(1) li:nth-of-type(1) {
        background-image: linear-gradient(90deg, rgba(0, 185, 255, 0) 6%, #0083fe 100%);
        height: 2px;
        width: 61.5px;
        margin: 25px 5px 0 0;
      }

      ul:nth-of-type(1) li:nth-of-type(3) {
        background: #0083fe;
        height: 2px;
        width: 39.5px;
        margin: 25px 0 0 5px;
      }

      ul:nth-of-type(2) li:nth-of-type(1) {
        opacity: 0.3;
        background: #0083fe;
        height: 2px;
        width: 39.5px;
        margin: 25px 5px 0 0;
      }

      ul:nth-of-type(2) li:nth-of-type(3) {
        opacity: 0.3;
        background-image: linear-gradient(-90deg, rgba(0, 185, 255, 0) 6%, #0083fe 100%);
        height: 2px;
        width: 61.5px;
        margin: 25px 0 0 5px;
      }

      ul:nth-of-type(2) li img {
        opacity: 0.5;
      }

      ul.words {
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        margin-top: 14px;
      }

      ul:nth-of-type(3) li {
        padding-left: 19px;
      }

      ul:nth-of-type(4) li {
        padding-right: 19px;
      }

      ul:nth-of-type(3) {
        color: #4a4a4a;
      }

      ul:nth-of-type(4) {
        color: #9b9b9b;
      }

      ul.words li h2 {
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }
    }

    input {
      border: 1px solid #cdcdcd;
      outline: none;
      border-radius: 4px;
      height: 16px;
      padding: 10px;
      font-size: 14px;
      width: 262px;
      text-indent: 42px;
      &:focus {
        border: 1px solid #fab645;
      }
    }

    p,
    .sex {
      display: block;
      margin-bottom: 10px;
      position: relative;
    }

    p > i {
      position: absolute;
      left: 8px;
      top: 10px;
      font-size: 18px;
      color: #cecece;
      border-right: 1px solid #cecece;
      height: 23px;
      width: 26px;
    }

    .sex .sexInput {
      i {
        position: absolute;
        font-size: 18px;
        color: #cecece;
        height: 23px;
        width: 26px;
      }
      .icon-sex {
        left: 8px;
        top: 10px;
        border-right: 1px solid #cecece;
      }
      .icon-xiala {
        right: 8px;
        top: 10px;
        border: 0;
      }
    }

    p.text {
      font-size: 12px;
      margin-bottom: 10px;
    }

    .sex {
      position: relative;
    }

    .sexDlg {
      display: none;
      position: absolute;
      top: 37px;
      width: 284px;
      height: 40px;
      line-height: 40px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.17);
      border-radius: 2px;
      z-index: 9999;

      a {
        font-size: 14px;
        color: #9b9b9b;
        &.man {
          padding: 0 30px 0 12px;
        }
        &:hover {
          color: #fb891f;
        }
      }
    }

    p .userBank-find {
      position: absolute;
      right: -24px;
      top: 12px;
      font-size: 20px;
      color: #fab645;
    }

    h3 {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #e84518;
      background: #ffe5e5;
      color: #e84518;
      border-radius: 5px;
      font-size: 12px;
    }

    h3.on {
      display: block;
    }

    button {
      margin-bottom: 10px;
      background: #fb891f;
      border-radius: 4px;
      width: 284px;
      line-height: 38px;
      font-size: 18px;
      color: #fff;
      border: none;
      outline: none;
      cursor: pointer;
      transition: background, 0.5s;
    }

    button.disabled {
      background: #fb891f;
      opacity: 0.6;
    }

    .open_tip {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0;
      line-height: 18px;
      margin-top: 20px;
    }

    .mobileCode input {
      text-indent: 0px;
    }

    .mobileCode a {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 118px;
      line-height: 38px;
      font-size: 14px;
      color: #fab645;
      text-align: center;
    }

    .mobileCode a.disabled {
      color: #b1b1b1;
    }

    .mobileCode a .codeBorder {
      font-size: 12px;
      font-family: arial;
      border-left: 1px solid #cdcdcd;
      padding-left: 10px;
    }

    dl {
      display: block;
      height: 44px;
      text-align: center;
      padding: 20px 16px;
    }

    dl dt {
      overflow: hidden;
      float: left;
      width: 15px;
    }

    dl dt i {
      padding-right: 5px;
      cursor: pointer;
      color: #0083fe;
      font-size: 15px;
    }

    dl dt i.icon-weixuan {
      color: #b1b1b1;
      font-size: 24px;
    }

    dl dt i.icon-danxuan {
      font-size: 24px;
    }

    dl dd {
      float: left;
      width: 90%;
      color: #4a4a4a;
      font-size: 14px;
      text-align: left;
      padding-left: 8px;
    }

    dl a {
      color: #099ef5;
    }
  }
}

.account_service {
  width: 100%;
  margin: 0px auto;
  height: 448px;
  h3 {
    margin: 20px 0 20px 20px;
    color: #000;
    font-weight: 600;
    font-size: 15px;
  }
  p {
    margin: 20px 0 20px 20px;
  }
  h4 {
    color: #000;
    font-weight: 600;
    font-size: 16px;
  }
}

#support-bank {
  line-height: 1;
  margin: 10px 0;
  font-size: 12px;
  text-align: right;
  cursor: pointer;
  color: #9b9b9b;
}

#support-bank em {
  color: #fb891f;
  font-size: 12px;
}

.isBlock {
  display: block !important;
  z-index: 999;
}
.userSupportBank_icon ul {
  width: 100%;
  &::after {
    content: ' ';
    display: block;
    clear: both;
  }
  li {
    width: 23%;
    float: left;
    display: block;
    padding-left: 10px;
    padding-bottom: 30px;
    img {
      width: 38px;
      vertical-align: top;
    }
    h2 {
      width: 112px;
      display: inline-block;
      padding-left: 8px;
      text-align: left;
      margin-top: -3px;
      line-height: 18px;
    }
    strong {
      font-size: 16px;
      color: #4a4a4a;
      font-weight: normal;
    }
    span {
      font-size: 12px;
      color: #4a4a4a;
    }
  }
}

.userSupportBank {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.3s;
  background: rgba(0, 0, 0, 0.4);
}

.userSupportBank.on {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.userSupportBank_in {
  width: 768px;
  height: 478px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  margin: auto;
  box-shadow: 0 1px 20px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #ececec;
  border-radius: 8px;
  background: #fff;
}

.userSupportBank_in .closeBox {
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  top: -8px;
  left: 95%;
}

.userSupportBank_in .closeBox i {
  display: block;
  width: 50px;
  text-align: center;
  line-height: 50px;
  color: #4a4a4a;
  font-size: 16px;
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.3s;
}

.userSupportBank_in .closeBox i:hover {
  transform: rotate(360deg);
}

.userAuthority {
  z-index: 999;
  position: fixed;
  width: 100%;
  height: 600px;
  top: 8%;
  left: 0%;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.3s;
}

.userAuthority .userAuthority_in {
  width: 1138px;
  background-color: #fff;
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  margin: auto;
}

.userAuthority .userAuthority_in .hd {
  height: 52px;
  position: relative;
}

.userAuthority .userAuthority_in .hd ul {
  width: 100%;
  float: left;
  border-right: 1px solid #eee;
  background: #f8f8f8;
}

.userAuthority .userAuthority_in .hd ul li {
  float: left;
  width: 50%;
  text-align: center;
  line-height: 52px;
  cursor: pointer;
  font-size: 16px;
}

.userAuthority .userAuthority_in .hd ul li.on {
  background: #fff;
  border-top: 4px solid #ffb01a;
  color: #000;
  font-weight: bold;
}

.userAuthority .userAuthority_in .hd ul li:hover {
  color: #333;
}

.userAuthority .userAuthority_in .bd {
  min-height: 458px;
  padding: 30px;
  overflow-y: scroll;
}

.userAuthority .userAuthority_in .ready_xieyi {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  bottom: 0px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 2px 2px 20px 5px rgba(120, 120, 120, 0.3);
}

.userAuthority .userAuthority_in .ready_xieyi a {
  width: 120px;
  display: block;
  text-align: center;
  background: #ffb01a;
  color: #fff;
  line-height: 30px;
  border-radius: 4px;
  margin: 6px auto;
}

.userAuthority .account_service {
  width: 100%;
  margin: 0px auto;
  height: 448px;
}

.userAuthority .account_service h3 {
  margin: 20px 0 20px 20px;
  color: #000;
  font-weight: 600;
  font-size: 15px;
}

.userAuthority .account_service p {
  margin: 20px 0 20px 20px;
}

.userAuthority .account_service h4 {
  color: #000;
  font-weight: 600;
  font-size: 16px;
}

/deep/ .el-dialog--center .el-dialog__body {
  padding-right: 0 !important;
}

/deep/ .el-dialog__headerbtn .el-dialog__close {
  color: #4a4a4a !important;
}
</style>

<script type="text/javascript">
import accountApi from '@/api/common/openAccount'
import { tansactionPwd } from '@/api/common/basicInfo'
import { isChName, isIdcard } from '@/assets/js/regular'
import { mapGetters } from 'vuex'
import { postcall } from '@/assets/js/utils'

export default {
  components: {},
  data() {
    return {
      formData: {
        name: {
          val: '',
          disabled: false
        },
        idCard: {
          val: '',
          disabled: false
        },
        mobile: {
          val: '',
          disabled: true
        }
      },
      iface: '',
      bankDialogVisible: false,
      agreeDialogVisible: false,
      backList: [],
      agreeSelectTab: true,
      checkAgree: true,
      errorStatus: false,
      errorMsg: '',
      status: 'OpenAccount',
      retUrl: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.formData.mobile.val = this.user.mobile

    let userInfoData = {
      userName: this.user.userName
    }
    this.userInfoCompleteNotice(userInfoData)

    this.supportBankList()
  },
  methods: {
    // ! 用户信息完善提醒
    userInfoCompleteNotice: function(obj) {
      accountApi.userInfoCompleteNotice(obj).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          if (data.data.status === 'OPEN_ACCOUNT' || data.data.status === 'SET_PASSWORD') {
            this.basicInfo()
          } else if (data.data.status === 'SIGN_PROTOCOL' || data.data.status === 'EVALUATE' || data.data.status === 'COMPLETE') {
            this.$router.push({ name: 'sign' })
          }
        }
      })
    },
    basicInfo: function() {
      accountApi.basicInfo({ _auth: true }).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          if (!data.data.isOpenAccount) {
            var isMobileReadonly = data.data.isMobileEdit === '0'
            if (!isMobileReadonly) {
              this.formData.mobile.disabled = false
            }
          } else if (!data.data.isSetPassword) {
            this.status = 'SetPassword'
            this.formData.name.val = data.data.name
            this.formData.name.disabled = true
            this.formData.idCard.val = data.data.identityNo
            this.formData.idCard.disabled = true
            this.formData.mobile.val = data.data.mobile
          }
        }
      })
    },
    supportBankList: function() {
      accountApi.supportBankList({ _auth: true }).then(res => {
        let data = res.data.data
        this.backList = data.list
      })
    },
    clickNext: function() {
      if (this.status === 'OpenAccount') {
        this.openAccount()
      } else if (this.status === 'SetPassword') {
        this.setPwd()
      }
    },
    openAccount() {
      if (!isChName(this.formData.name.val)) {
        this.errorMsg = '请输入正确的姓名!!'
        this.$refs.userNameRef.focus()
        return false
      }

      if (!isIdcard(this.formData.idCard.val)) {
        this.errorMsg = '请输入正确的身份证号!!'
        this.$refs.idCatdRef.focus()
        return false
      }

      this.errorMsg = ''

      let postParams = {
        _auth: true,
        _type: 'post',
        name: this.formData.name.val,
        mobile: this.formData.mobile.val,
        identityNo: this.formData.idCard.val
      }
      this.userInfoAuth(postParams)
    },
    userInfoAuth: function(params) {
      accountApi.userInfoAuth(params).then(res => {
        let data = res.data
        if (data.data.isSuccess === '1') {
          let params = {
            _auth: true,
            _type: 'post',
            name: this.formData.name.val,
            mobile: this.formData.mobile.val,
            retUrl: location.href,
            gender: data.data.gender
          }

          accountApi.accountOpenEncryptPage(params).then(res => {
            let accountData = res.data
            if (accountData.resultCode === '1') {
              postcall(accountData.data.redirectUrl, accountData.data.paramReq)
            } else {
              this.errorMsg = accountData.resultMsg
            }
          })
        } else {
          this.errorMsg = data.data.message
        }
      })
    },
    setPwd() {
      tansactionPwd({
        retUrl: this.retUrl === '' ? location.href : this.retUrl
      }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        if (resultCode === '1') {
          let option = data.data.paramReq
          postcall(data.data.redirectUrl, option)
        }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'easyDetail' || from.name === 'optionalDetail') {
        vm.retUrl = from.fullPath
      }
    })
  }
}
</script>
