<template>
  <div class="info-disclosure">
    <div class="bg-header">
      <h3>信息披露中心</h3>
      <div class="main-tabs">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="关于我们" name="GYWM"></el-tab-pane>
          <el-tab-pane label="运营数据" name="YYSJ"></el-tab-pane>
          <el-tab-pane label="运营报告" name="YYBG"></el-tab-pane>
          <el-tab-pane label="备案信息" name="BAXX"></el-tab-pane>
          <el-tab-pane label="产品相关" name="CPXG"></el-tab-pane>
          <el-tab-pane label="审核信息" name="SHXX"></el-tab-pane>
          <el-tab-pane label="政策法规" name="ZCFG"></el-tab-pane>
          <el-tab-pane label="法人承诺函" name="FRCNH"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="tab-content-wrap">
      <div class="tab-content" v-if="activeName === 'GYWM'">
        <el-tabs class="about-us-tab" v-model="aboutUsActiveName" type="border-card" @tab-click="handleItemClick(aboutUsActiveName)">
          <el-tab-pane label="公司简介" name="GSJJ">
            <div v-if="aboutUsActiveName === 'GSJJ'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司管理" name="GSGL">
            <div class="content" v-if="aboutUsActiveName === 'GSGL' && paramCode === 'PTXX'">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
            <div class="company-management" v-if="aboutUsActiveName === 'GSGL' && !paramCode">
              <div class="organizational-structure-wrap"><strong>组织架构</strong> <img src="./images/bg_organizational_structure.png" /></div>
              <div class="executive-team-wrap">
                <strong>高管团队</strong>
                <ul>
                  <li>
                    <img src="./images/icon_executive1.png" />
                    <p class="name">陈跃文</p>
                    <p class="position">首席执行官（CEO）</p>
                    <div class="desc-wrap">
                      <p class="desc">
                        华东师范大学硕士研究生学历，拥有工科硕士学位。在公司运营、营销及风控领域拥有超过10年的管理经验，擅长金融风险管理。历任GSK（葛兰素史克），Pfizer(辉瑞制药)金融事业部核心管理岗位，对公司治理有着极深的理解。
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src="./images/icon_executive2.png" />
                    <p class="name">傅伟菱</p>
                    <p class="position">首席风控官（CRO）</p>
                    <div class="desc-wrap">
                      <p class="desc">
                        拥有超过20年的风险管理经验，也是台湾最早一批加入信用卡风控领域的管理者，经历了台湾信用卡的成长及卡债风暴，积累丰富的行业经验，并且长期领导信贷风险团队取得骄人的成绩。曾任台湾汇丰银行个人零售部风险管理副理及资产管理公司法务催收资深协理。
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src="./images/icon_executive3.png" />
                    <p class="name">林崇钦</p>
                    <p class="position">首席风控官（CRO）</p>
                    <div class="desc-wrap">
                      <p class="desc">
                        从事金融业务风险管理25年。拥有15年以上外资银行消費金融与个人零售业务风险管理经验。曾任香港上海汇丰银行（台湾）信用卡中心消费金融信用风险管处副总裁、恒昌利通出借管理有限公司（北京）风险管理中心总监、达信卓惠金融信息服务（上海）有限公司风险管理中心总监。
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src="./images/icon_executive4.png" />
                    <p class="name">王东东</p>
                    <p class="position">首席财务官（CFO）</p>
                    <div class="desc-wrap">
                      <p class="desc">
                        拥有20年以上知名企业财务会计及审计工作经验，熟悉企业内部控制和税收筹划，毕业于江西财经大学会计专业，曾任江西省诚信税务师事务所副总经理，分管金融机构审计咨询服务。
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="employee-situation-wrap">
                <strong>员工情况</strong>
                <div class="chart-wrap">
                  <div class="age-chart-wrap">
                    <div class="age-chart" id="age-chart"></div>
                    <div class="desc">
                      <p class="title">年龄分布：</p>
                      <p>25岁以下，占比26%；</p>
                      <p>25-30岁，占比42%；</p>
                      <p>31-35岁，占比20%；</p>
                      <p>36岁以上12%；</p>
                    </div>
                  </div>
                  <div class="education-chart-wrap">
                    <div class="education-chart" id="education-chart"></div>
                    <div class="desc">
                      <p class="title">学历分布：</p>
                      <p>大学及本科，占比85%；</p>
                      <p>硕士及博士，占比11%；</p>
                      <p>其他，占比4%；</p>
                    </div>
                  </div>
                </div>
                <p class="tips">截止至2017年12月31日，公司员工总数达：180人</p>
              </div>
              <div class="shareholder-composition-wrap"><strong>股东组成</strong> <img src="./images/bg_shareholder.jpg" /></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="组织信息" name="ZZXX">
            <div v-if="aboutUsActiveName === 'ZZXX'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="发展事迹" name="FZSJ">
            <div v-if="aboutUsActiveName === 'FZSJ'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="合作伙伴" name="HZHB">
            <div v-if="aboutUsActiveName === 'HZHB'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="荣誉资质" name="ZZRY">
            <div v-if="aboutUsActiveName === 'ZZRY'" class="qualification-honor">
              <strong>荣誉资质</strong>
              <div class="img-list">
                <div class="img-item" v-for="(item, index) in imgList" :key="index">
                  <img :src="item.picUrl" @click="bigImg(index)" />
                  <p class="desc">{{ item.desc }}</p>
                </div>
              </div>
              <div class="img-mask" v-if="showBigImg" @click.stop="showBigImg = !showBigImg">
                <div class="close-wrap"><i @click.stop="close" class="el-icon-circle-close-outline close"></i></div>
                <img class="prev" @click.stop="prev" src="./images/icon_prev.png" />
                <div class="show-img"><img class="big-img" :src="imgList[num].picUrl" /></div>
                <img class="next" @click.stop="next" src="./images/icon_next.png" />
              </div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="关于汇有财" name="GYHYC">
            <div v-if="aboutUsActiveName === 'GYHYC'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="tab-content" v-if="activeName === 'YYSJ'">
        <div class="operation-data">
          <div class="operation-data-item">
            <div class="title">
              <p class="name">平台数据统计</p>
              <p class="deadline">数据截止至: {{ platformDataStatisticsEndTime }}</p>
            </div>
            <ul>
              <li>
                <p class="amount">{{ accumulatedLoanAmount }}</p>
                <p class="desc">累计借贷金额(万元)</p>
              </li>
              <li>
                <p class="amount">{{ accumulativeLoanCount }}</p>
                <p class="desc">累计借贷笔数(笔)</p>
              </li>
              <li>
                <p class="amount">{{ creditBalance }}</p>
                <p class="desc">借贷余额（万元）</p>
              </li>
              <li>
                <p class="amount">{{ loanBalanceCount }}</p>
                <p class="desc">借贷余额笔数（笔）</p>
              </li>
              <li>
                <p class="amount">{{ cumulativeNumberOfLender }}</p>
                <p class="desc">累计出借人数量（人）</p>
              </li>
              <li>
                <p class="amount">{{ cumulativeNumberOfBorrower }}</p>
                <p class="desc">累计借款人数量（人）</p>
              </li>
              <li>
                <p class="amount">{{ currentNumberOfLender }}</p>
                <p class="desc">当前出借人数量（人）</p>
              </li>
              <li>
                <p class="amount">{{ currentNumberOfBorrower }}</p>
                <p class="desc">当前借款人数量（人）</p>
              </li>
            </ul>
          </div>
          <div class="operation-data-item">
            <div class="title">
              <p class="name">借款数据统计</p>
              <p class="deadline">数据截止至: {{ loanStatisticsEndTime }}</p>
            </div>
            <ul>
              <li>
                <p class="amount">{{ proportionOfOutstandingAmountTopTenBorrower }}</p>
                <p class="desc">前十大借款人待还金额占比</p>
              </li>
              <li>
                <p class="amount">{{ proportionOfLargestSingleBorrowerOutstandingAmount }}</p>
                <p class="desc">最大单一借款人待还金额占比</p>
              </li>
              <li>
                <p class="amount">{{ numberOfLoanBalancesAmount }}</p>
                <p class="desc">关联关系借款余额（万元）</p>
              </li>
              <li>
                <p class="amount">{{ numberOfLoanBalances }}</p>
                <p class="desc">关联关系借款余额笔数(笔)</p>
              </li>
              <li>
                <p class="amount">{{ overdueAmount }}</p>
                <p class="desc">逾期金额(出借人到期未到账)(万元)</p>
              </li>
              <li>
                <p class="amount">{{ overdueCount }}</p>
                <p class="desc">逾期笔数(出借人到期未到账)(笔)</p>
              </li>
              <li>
                <p class="amount">{{ overdueAmountMoreThan90 }}</p>
                <p class="desc">逾期90天(不含)以上金额(万元)</p>
              </li>
              <li>
                <p class="amount">{{ overdueCountMoreThan90 }}</p>
                <p class="desc">逾期90天(不含)以上笔数(笔)</p>
              </li>
              <li>
                <p class="amount">{{ accumulativeCompensationAmount }}</p>
                <p class="desc">累计代偿金额(万元)</p>
              </li>
              <li>
                <p class="amount">{{ accumulativeCompensation }}</p>
                <p class="desc">累计代偿笔数(笔)</p>
              </li>
              <li>
                <p class="amount">{{ accumulativeLoanAmountPerCapita }}</p>
                <p class="desc">人均累计借款金额(元)</p>
              </li>
              <li>
                <p class="amount">{{ accumulativeOutLoanAmountPerCapita }}</p>
                <p class="desc">人均累计出借金额(元)</p>
              </li>
              <li>
                <p class="amount">{{ proportionOfLargestSingleLendingBalance }}</p>
                <p class="desc">最大单户出借余额占比</p>
              </li>
              <li>
                <p class="amount">{{ proportionOfLargestTenLendingBalance }}</p>
                <p class="desc">最大十户出借余额占比</p>
              </li>
            </ul>
          </div>
          <div class="operation-data-item">
            <div class="title">
              <p class="chart-name">P2P网贷出借终端分布</p>
              <p class="chart-name">P2P网贷出借人群性别比例</p>
            </div>
            <div class="chart-wrap">
              <div class="terminal-chart-wrap">
                <div class="terminal-chart" id="terminal-chart"></div>
                <div class="desc">
                  <ul>
                    <li><h2></h2></li>
                    <li>
                      <p>{{ lendingTerminalDistributeWeb }}%</p>
                      <span>web端</span>
                    </li>
                  </ul>
                  <ul>
                    <li><h2></h2></li>
                    <li>
                      <p>{{ lendingTerminalDistributeMobile }}%</p>
                      <span>移动端</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="gender-chart-wrap">
                <div class="gender-chart" id="gender-chart"></div>
                <div class="desc">
                  <ul>
                    <li><img class="man" src="./images/icon_man.png" /></li>
                    <li>
                      <p>{{ lendingGenderDistributeMale }}%</p>
                      <span>男</span>
                    </li>
                  </ul>
                  <ul>
                    <li><img class="women" src="./images/icon_women.png" /></li>
                    <li>
                      <p>{{ lendingGenderDistributeFemale }}%</p>
                      <span>女</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="operation-data-item">
            <div class="title">
              <p class="chart-name">P2P网贷出借金额区间的人数占比</p>
              <p class="chart-name">P2P网贷各年龄段人群出借对比</p>
            </div>
            <div class="chart-wrap">
              <div class="amount-chart-wrap">
                <div class="amount-chart" id="amount-chart"></div>
                <div class="amount-desc">
                  <ul>
                    <li><h2></h2></li>
                    <li>
                      <p>{{ lendingAmountDistribute1 }}%</p>
                      <span>1万以下</span>
                    </li>
                  </ul>
                  <ul>
                    <li><h2></h2></li>
                    <li>
                      <p>{{ lendingAmountDistribute5 }}%</p>
                      <span>1-5万</span>
                    </li>
                  </ul>
                  <ul>
                    <li><h2></h2></li>
                    <li>
                      <p>{{ lendingAmountDistribute10 }}%</p>
                      <span>5-10万</span>
                    </li>
                  </ul>
                  <ul>
                    <li><h2></h2></li>
                    <li>
                      <p>{{ lendingAmountDistribute20 }}%</p>
                      <span>10–20万</span>
                    </li>
                  </ul>
                  <ul>
                    <li><h2></h2></li>
                    <li>
                      <p>{{ lendingAmountDistributeAbove20 }}%</p>
                      <span>20万以上</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="lend-chart-wrap">
                <div class="lend-chart" id="lend-chart"></div>
                <div class="lend-desc">
                  <ul>
                    <li><h2></h2></li>
                    <li><p>投资金额(万)</p></li>
                  </ul>
                  <ul>
                    <li><h2></h2></li>
                    <li><p>人数占比(%)</p></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <img class="bg-legal-person" src="./images/bg_legal_person.png" />
        </div>
      </div>
      <div class="tab-content" v-if="activeName === 'YYBG'">
        <div class="operation-report">
          <ul>
            <li v-for="(item, index) in reportList" :key="index">
              <router-link :to="{ name: 'report', query: { index: index } }">
                <p class="year">{{ item.year }}</p>
                <p class="title">{{ item.title }}</p>
                <p class="time">{{ item.time }}</p>
              </router-link>
            </li>
          </ul>
          <img class="bg-legal-person" src="./images/bg_legal_person.png" />
        </div>
      </div>
      <div class="tab-content" v-if="activeName === 'BAXX'">
        <el-tabs class="about-us-tab" v-model="recordInfoActiveName" type="border-card" @tab-click="handleItemClick(recordInfoActiveName)">
          <el-tab-pane label="备案登记信息" name="BADJ">
            <div v-if="recordInfoActiveName === 'BADJ'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="资金存管信息" name="ZJCG">
            <div v-if="recordInfoActiveName === 'ZJCG'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="风险管理信息" name="FXGL">
            <div v-if="recordInfoActiveName === 'FXGL'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="公安网站备案" name="GAWZBA">
            <div v-if="recordInfoActiveName === 'GAWZBA'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="电信业务经营许可证" name="ICP">
            <div v-if="recordInfoActiveName === 'ICP'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="tab-content" v-if="activeName === 'CPXG'">
        <el-tabs class="about-us-tab" v-model="productAboutActiveName" type="border-card" @tab-click="handleItemClick(productAboutActiveName)">
          <el-tab-pane label="产品信息" name="CPXXTAB">
            <div v-if="productAboutActiveName === 'CPXXTAB'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="资费标准" name="ZFBZ">
            <div v-if="productAboutActiveName === 'ZFBZ'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="tab-content" v-if="activeName === 'SHXX'">
        <div class="review-info">
          <ul>
            <li @click="openPDF('auditReport2016.pdf')">
              <p class="year">2016年</p>
              <p class="title">财务审计报告</p>
              <p class="time">（1-12月份）</p>
            </li>
            <li @click="openPDF('auditReport2017.pdf')">
              <p class="year">2017年</p>
              <p class="title">财务审计报告</p>
              <p class="time">（1-12月份）</p>
            </li>
            <li></li>
            <li></li>
          </ul>
          <img class="bg-legal-person" src="./images/bg_legal_person.png" />
        </div>
      </div>
      <div class="tab-content policies" v-if="activeName === 'ZCFG'">
        <el-tabs class="about-us-tab" v-model="policiesActiveName" type="border-card" @tab-click="handleItemClick(policiesActiveName)">
          <el-tab-pane label="法律法规" name="FLFG">
            <div v-if="policiesActiveName === 'FLFG'">
              <div class="laws-wrap">
                <ul>
                  <li v-for="(item, index) in lawsList" :key="index">
                    <router-link class="title" :to="{ name: 'announcementDetail', params: { id: item.id }, query: { paramCode: activeName } }">
                      {{ item.title }}
                    </router-link>
                    <span class="time">{{ item.createTime }}</span>
                  </li>
                </ul>
              </div>
              <div class="pagination-wrapper" v-if="total > 1">
                <pagination
                  v-if="total"
                  :count-page="total"
                  :size-val="size"
                  :page-val="page"
                  @handleCurrentChange="handleCurrentChange"
                ></pagination>
              </div>
              <img v-if="isShowBg" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="出借人教育" name="CJRJY">
            <div v-if="policiesActiveName === 'CJRJY'" class="content">
              <div v-html="content"></div>
              <img class="bg-legal-person" src="./images/bg_legal_person.png" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="tab-content" v-if="activeName === 'FRCNH'">
        <div class="commitment-letter"><img src="./images/bg_commitment_letter.png" /> <img src="./images/bg_legal_person.png" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/graphic'
import { getList } from '@/api/hyc/announcement'
import { getOperationalData } from '@/api/hyc/infoDisclosure'
import Pagination from '@/components/pagination/pagination'
export default {
  data() {
    return {
      activeName: 'GYWM',
      aboutUsActiveName: 'GSJJ',
      recordInfoActiveName: 'BADJ',
      productAboutActiveName: 'CPXXTAB',
      policiesActiveName: 'FLFG',
      showBigImg: false,
      num: 0,
      page: 1,
      size: 10,
      total: 0,
      imgList: [
        {
          picUrl: require('./images/bg_honor1.png'),
          desc: '营业执照'
        },
        {
          picUrl: require('./images/bg_honor2.png'),
          desc: '江西银行存管合同'
        },
        {
          picUrl: require('./images/bg_honor3.png'),
          desc: '江西银行存管合同'
        },
        {
          picUrl: require('./images/bg_honor4.png'),
          desc: '安全联盟实名认证'
        },
        {
          picUrl: require('./images/bg_honor5.png'),
          desc: '互联网行业认证'
        },
        {
          picUrl: require('./images/bg_honor6.png'),
          desc: '验资报告'
        },
        {
          picUrl: require('./images/bg_honor7.png'),
          desc: '金融理财金貔貅奖'
        },
        {
          picUrl: require('./images/bg_honor8.png'),
          desc: '可信网站认证'
        },
        {
          picUrl: require('./images/bg_honor9.png'),
          desc: '信息安全等级保护三级认证（2017年）'
        },
        {
          picUrl: require('./images/bg_honor10.png'),
          desc: 'AAA级信用企业'
        },
        {
          picUrl: require('./images/bg_honor11.png'),
          desc: '信息安全等级保护三级认证（2018年）'
        }
      ],
      content: '',
      reportList: [
        {
          year: '2017',
          title: '——第一季度运营报告——',
          time: '2017.01.01-2017.03.31'
        },
        {
          year: '2017',
          title: '——第二季度运营报告——',
          time: '2017.04.01-2017.06.30'
        },
        {
          year: '2017',
          title: '——第三季度运营报告——',
          time: '2017.07.01-2017.09.30'
        },
        {
          year: '2017',
          title: '——第四季度运营报告——',
          time: '2017.10.01-2017.12.31'
        },
        {
          year: '2018',
          title: '——第一季度运营报告——',
          time: '2018.01.01-2018.03.31'
        },
        {
          year: '2018',
          title: '——上半年度运营报告——',
          time: '2018.01.01-2018.06.30'
        },
        {
          year: '2018',
          title: '——7月运营报告——',
          time: '2018.07.01-2018.07.31'
        },
        {
          year: '2018',
          title: '——8月运营报告——',
          time: '2018.08.01-2018.08.31'
        },
        {
          year: '2018',
          title: '——9月运营报告——',
          time: '2018.09.01-2018.09.30'
        },
        {
          year: '2018',
          title: '——10月运营报告——',
          time: '2018.10.01-2018.10.31'
        },
        {
          year: '2017',
          title: '——11月运营报告——',
          time: '2018.11.01-2018.11.30'
        }
      ],
      lawsList: [],
      paramCode: '',
      isShowBg: false,
      accumulatedLoanAmount: '',
      accumulativeCompensation: '',
      accumulativeCompensationAmount: '',
      accumulativeLoanAmountPerCapita: '',
      accumulativeLoanCount: '',
      accumulativeOutLoanAmountPerCapita: '',
      creditBalance: '',
      cumulativeNumberOfBorrower: '',
      cumulativeNumberOfLender: '',
      currentNumberOfBorrower: '',
      currentNumberOfLender: '',
      lendingAgeDistributeAmount18: '',
      lendingAgeDistributeAmount20: '',
      lendingAgeDistributeAmount30: '',
      lendingAgeDistributeAmount40: '',
      lendingAgeDistributeAmount50: '',
      lendingAgeDistributePer18: '',
      lendingAgeDistributePer20: '',
      lendingAgeDistributePer30: '',
      lendingAgeDistributePer40: '',
      lendingAgeDistributePer50: '',
      lendingAmountDistribute1: '',
      lendingAmountDistribute5: '',
      lendingAmountDistribute10: '',
      lendingAmountDistribute20: '',
      lendingAmountDistributeAbove20: '',
      lendingGenderDistributeFemale: '',
      lendingGenderDistributeMale: '',
      lendingTerminalDistributeMobile: '',
      lendingTerminalDistributeWeb: '',
      loanBalanceCount: '',
      loanStatisticsEndTime: '',
      numberOfLoanBalances: '',
      numberOfLoanBalancesAmount: '',
      overdueAmount: '',
      overdueAmountMoreThan90: '',
      overdueCount: '',
      overdueCountMoreThan90: '',
      platformDataStatisticsEndTime: '',
      proportionOfLargestSingleBorrowerOutstandingAmount: '',
      proportionOfLargestSingleLendingBalance: '',
      proportionOfLargestTenLendingBalance: '',
      proportionOfOutstandingAmountTopTenBorrower: ''
    }
  },
  methods: {
    handleClick() {
      this.page = 1
      if (this.activeName === 'GYWM') {
        this.aboutUsActiveName = 'GSJJ'
        this.handleItemClick(this.aboutUsActiveName)
      }
      if (this.activeName === 'YYSJ') {
        //this.handleItemClick(this.activeName)
        this.handleOperationalData()
      }
      if (this.activeName === 'BAXX') {
        this.recordInfoActiveName = 'BADJ'
        this.handleItemClick(this.recordInfoActiveName)
      }
      if (this.activeName === 'CPXG') {
        this.productAboutActiveName = 'CPXXTAB'
        this.handleItemClick(this.productAboutActiveName)
      }
      if (this.activeName === 'ZCFG') {
        this.policiesActiveName = 'FLFG'
        this.handleItemClick(this.policiesActiveName)
      }
    },
    handleItemClick(tabItem) {
      this.paramCode = ''
      if (tabItem === 'GSGL' && !this.paramCode) {
        setTimeout(() => {
          const ageChart = echarts.init(document.getElementById('age-chart'))
          ageChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#FA8B2F', '#FFD665', '#FB6E4A', '#FFB368'],
            legend: {
              orient: 'vertical',
              x: 'center',
              y: 'center',
              itemWidth: 10,
              itemHeight: 10,
              data: ['25-30岁', '25岁以下', '31-35岁', '36岁以上']
            },
            series: [
              {
                name: '年龄分布',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    position: 'outer', //标签的位置
                    textStyle: {
                      fontWeight: 100,
                      fontSize: 12 //文字的字体大小
                    },
                    formatter: '{d}%',
                    padding: [0, -20]
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  { value: 42, name: '25-30岁' },
                  { value: 26, name: '25岁以下' },
                  { value: 20, name: '31-35岁' },
                  { value: 12, name: '36岁以上' }
                ]
              }
            ]
          })
          ageChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
          ageChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
          const educationChart = echarts.init(document.getElementById('education-chart'))
          educationChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#48AFFF', '#4ABBF7', '#76DDFB'],
            legend: {
              orient: 'vertical',
              x: 'center',
              y: 'center',
              itemWidth: 10,
              itemHeight: 10,
              data: ['大学及本科', '硕士及博士', '其他']
            },
            series: [
              {
                name: '学历分布',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    position: 'outer', //标签的位置
                    textStyle: {
                      fontWeight: 100,
                      fontSize: 12 //文字的字体大小
                    },
                    formatter: '{d}%'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [{ value: 85, name: '大学及本科' }, { value: 11, name: '硕士及博士' }, { value: 4, name: '其他' }]
              }
            ]
          })
          educationChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
          educationChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
        }, 200)
      }
      let postData = {
        curPage: this.page,
        maxLine: this.size,
        paramCode: tabItem
      }
      getList(postData).then(res => {
        let data = res.data
        if (data.zxdtMtbdlist.length > 0) {
          this.content = data.zxdtMtbdlist[0].content
          if (tabItem === 'FLFG') {
            this.lawsList = data.zxdtMtbdlist
            this.total = parseInt(data.countPage)
            this.page = parseInt(data.curPage)
            this.isShowBg = true
          }
        }
      })
    },
    bigImg(index) {
      this.showBigImg = true
      this.num = index
    },
    prev() {
      if (this.num == 0) {
        this.num = 11
      }
      this.num--
    },
    next() {
      if (this.num == 10) {
        this.num = -1
      }
      this.num++
    },
    close() {
      this.showBigImg = false
    },
    handleOperationalData() {
      getOperationalData().then(res => {
        let data = res.data.data
        this.accumulatedLoanAmount = data.accumulatedLoanAmount
        this.accumulativeCompensation = data.accumulativeCompensation
        this.accumulativeCompensationAmount = data.accumulativeCompensationAmount
        this.accumulativeLoanAmountPerCapita = data.accumulativeLoanAmountPerCapita
        this.accumulativeLoanCount = data.accumulativeLoanCount
        this.accumulativeOutLoanAmountPerCapita = data.accumulativeOutLoanAmountPerCapita
        this.creditBalance = data.creditBalance
        this.cumulativeNumberOfBorrower = data.cumulativeNumberOfBorrower
        this.cumulativeNumberOfLender = data.cumulativeNumberOfLender
        this.currentNumberOfBorrower = data.currentNumberOfBorrower
        this.currentNumberOfLender = data.currentNumberOfLender
        this.lendingAgeDistributeAmount18 = data.lendingAgeDistributeAmount18
        this.lendingAgeDistributeAmount20 = data.lendingAgeDistributeAmount20
        this.lendingAgeDistributeAmount30 = data.lendingAgeDistributeAmount30
        this.lendingAgeDistributeAmount40 = data.lendingAgeDistributeAmount40
        this.lendingAgeDistributeAmount50 = data.lendingAgeDistributeAmount50
        this.lendingAgeDistributePer18 = data.lendingAgeDistributePer18
        this.lendingAgeDistributePer20 = data.lendingAgeDistributePer20
        this.lendingAgeDistributePer30 = data.lendingAgeDistributePer30
        this.lendingAgeDistributePer40 = data.lendingAgeDistributePer40
        this.lendingAgeDistributePer50 = data.lendingAgeDistributePer50
        this.lendingAmountDistribute1 = data.lendingAmountDistribute1
        this.lendingAmountDistribute5 = data.lendingAmountDistribute5
        this.lendingAmountDistribute10 = data.lendingAmountDistribute10
        this.lendingAmountDistribute20 = data.lendingAmountDistribute20
        this.lendingAmountDistributeAbove20 = data.lendingAmountDistributeAbove20
        this.lendingGenderDistributeFemale = data.lendingGenderDistributeFemale
        this.lendingGenderDistributeMale = data.lendingGenderDistributeMale
        this.lendingTerminalDistributeMobile = data.lendingTerminalDistributeMobile
        this.lendingTerminalDistributeWeb = data.lendingTerminalDistributeWeb
        this.loanBalanceCount = data.loanBalanceCount
        this.loanStatisticsEndTime = data.loanStatisticsEndTime
        this.numberOfLoanBalances = data.numberOfLoanBalances
        this.numberOfLoanBalancesAmount = data.numberOfLoanBalancesAmount
        this.overdueAmount = data.overdueAmount
        this.overdueAmountMoreThan90 = data.overdueAmountMoreThan90
        this.overdueCount = data.overdueCount
        this.overdueCountMoreThan90 = data.overdueCountMoreThan90
        this.platformDataStatisticsEndTime = data.platformDataStatisticsEndTime
        this.proportionOfLargestSingleBorrowerOutstandingAmount = data.proportionOfLargestSingleBorrowerOutstandingAmount
        this.proportionOfLargestSingleLendingBalance = data.proportionOfLargestSingleLendingBalance
        this.proportionOfLargestTenLendingBalance = data.proportionOfLargestTenLendingBalance
        this.proportionOfOutstandingAmountTopTenBorrower = data.proportionOfOutstandingAmountTopTenBorrower
        setTimeout(() => {
          const terminalChart = echarts.init(document.getElementById('terminal-chart'))
          terminalChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#FED842', '#FF7F24'],
            legend: {
              show: false,
              orient: 'vertical',
              x: 'center',
              y: 'center',
              itemWidth: 10,
              itemHeight: 10,
              data: ['移动端', 'web端']
            },
            series: [
              {
                name: '终端分布',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  { value: parseFloat(this.lendingTerminalDistributeMobile), name: '移动端' },
                  { value: parseFloat(this.lendingTerminalDistributeWeb), name: 'web端' }
                ]
              }
            ]
          })
          terminalChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
          terminalChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
          const genderChart = echarts.init(document.getElementById('gender-chart'))
          genderChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#22C9FF', '#FF5178'],
            legend: {
              show: false,
              orient: 'vertical',
              x: 'center',
              y: 'center',
              itemWidth: 10,
              itemHeight: 10,
              data: ['男', '女']
            },
            series: [
              {
                name: '性别比例',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  { value: parseFloat(this.lendingGenderDistributeMale), name: '男' },
                  { value: parseFloat(this.lendingGenderDistributeFemale), name: '女' }
                ]
              }
            ]
          })
          genderChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
          genderChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
          const amountChart = echarts.init(document.getElementById('amount-chart'))
          amountChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#FA600C', '#099EF5', '#66CAFD', '#8DE540', '#F9DB45'],
            legend: {
              show: false,
              orient: 'vertical',
              x: 'center',
              y: 'center',
              itemWidth: 10,
              itemHeight: 10,
              data: ['1万以下', '1-5万', '5-10万', '10–20万', '20万以上']
            },
            series: [
              {
                name: '金额区间',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  { value: parseFloat(this.lendingAmountDistribute1), name: '1万以下' },
                  { value: parseFloat(this.lendingAmountDistribute5), name: '1-5万' },
                  { value: parseFloat(this.lendingAmountDistribute10), name: '5-10万' },
                  { value: parseFloat(this.lendingAmountDistribute20), name: '10–20万' },
                  { value: parseFloat(this.lendingAmountDistributeAbove20), name: '20万以上' }
                ]
              }
            ]
          })
          amountChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
          amountChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
          const lendChart = echarts.init(document.getElementById('lend-chart'))
          lendChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: ['18-19', '20-29', '30-39', '40-49', '50以上'],
                axisLabel: {
                  interval: 0 //0：全部显示，1：间隔为1显示对应类目，2：依次类推，（简单试一下就明白了，这样说是不是有点抽象）
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '投资金额',
                min: 0,
                max: 12000,
                interval: 3000,
                axisLabel: {
                  formatter: '{value} 万'
                },
                axisTick: {
                  show: false
                }
              },
              {
                // Secondary yAxis
                type: 'value',
                name: '人数百分比',
                min: 0,
                max: 100,
                interval: 25,
                axisLabel: {
                  formatter: '{value} %'
                },
                axisTick: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: '投资金额',
                type: 'bar',
                barWidth: '40%',
                data: [
                  parseFloat(this.lendingAgeDistributeAmount18),
                  parseFloat(this.lendingAgeDistributeAmount20),
                  parseFloat(this.lendingAgeDistributeAmount30),
                  parseFloat(this.lendingAgeDistributeAmount40),
                  parseFloat(this.lendingAgeDistributeAmount50)
                ],
                tooltip: {
                  valueSuffix: '万'
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#68EFF3' }, { offset: 1, color: '#2FA9FF' }])
                  }
                }
              },
              {
                name: '人数百分比',
                type: 'line',
                barWidth: '60%',
                yAxisIndex: 1,
                smooth: true,
                data: [
                  parseFloat(this.lendingAgeDistributePer18),
                  parseFloat(this.lendingAgeDistributePer20),
                  parseFloat(this.lendingAgeDistributePer30),
                  parseFloat(this.lendingAgeDistributePer40),
                  parseFloat(this.lendingAgeDistributePer50)
                ],
                itemStyle: {
                  normal: {
                    color: ['#FF5178']
                  }
                }
              }
            ]
          })
        }, 200)
      })
    },
    openPDF(url) {
      window.open(`/pdf/${url}`)
    },
    handleCurrentChange(val) {
      this.page = val
      this.handleItemClick(this.policiesActiveName)
    },
    init() {
      if (this.$route.query.paramCode === 'PTXX') {
        this.aboutUsActiveName = 'GSGL'
      }
      if (this.$route.query.paramCode === 'HZHB') {
        this.aboutUsActiveName = 'HZHB'
      }
      if (this.$route.query.paramCode === 'FZSJ') {
        this.aboutUsActiveName = 'FZSJ'
      }
      if (this.$route.query.paramCode === 'ZZRY') {
        this.aboutUsActiveName = 'ZZRY'
      }
      if (this.$route.query.paramCode === 'CJRJY') {
        this.activeName = 'ZCFG'
        this.policiesActiveName = 'CJRJY'
      }
      if (this.$route.query.paramCode === 'GSJJ') {
        this.activeName = 'GYWM'
        this.aboutUsActiveName = 'GSJJ'
      }
      if (this.$route.query.paramCode === 'YYSJ') {
        this.activeName = 'YYSJ'
        this.handleOperationalData()
      }
      if (this.$route.query.paramCode === 'ZJCG') {
        this.activeName = 'BAXX'
        this.recordInfoActiveName = 'ZJCG'
      }
      this.paramCode = this.$route.query.paramCode
      if (this.paramCode) {
        let postData = {
          curPage: this.page,
          maxLine: this.size,
          paramCode: this.paramCode
        }
        getList(postData).then(res => {
          let data = res.data
          if (data.zxdtMtbdlist.length > 0) {
            this.content = data.zxdtMtbdlist[0].content
          }
        })
      } else {
        this.handleItemClick(this.aboutUsActiveName)
      }
    }
  },
  mounted() {
    this.init()
  },
  components: {
    Pagination
  },
  watch: {
    $route() {
      // 刷新参数放到这里里面去触发就可以刷新相同界面了
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.info-disclosure {
  .bg-header {
    width: 100%;
    height: 200px;
    background: url('./images/bg_header.png') center center no-repeat;
    padding-top: 32px;
    h3 {
      width: 184px;
      margin: 0 auto;
      text-align: center;
      font-size: $font-size-large-xxx;
      color: rgba(255, 255, 255, 1);
    }
    .main-tabs {
      width: 1140px;
      margin: 0 auto;
      padding: 0 20px;
      margin-top: 43px;
      .el-tabs {
        /deep/ .el-tabs__header {
          border-bottom: 0;
          margin-bottom: 0;
          .el-tabs__nav {
            border: 0;
            .el-tabs__item {
              width: 119px;
              height: 44px;
              line-height: 43px;
              text-align: center;
              border: 1px solid #fff;
              margin-right: 21px;
              color: #fff;
              padding: 0;
              border-radius: 4px;
              font-size: $font-size-medium;
              &:last-child {
                margin-right: 0;
              }
            }
            .el-tabs__item:hover {
              background: #fff;
              color: #fb7b1f;
            }
            .el-tabs__item.is-active {
              background: #fff;
              color: #fb7b1f;
            }
          }
        }
      }
    }
  }
  .tab-content-wrap {
    width: 1140px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 47px;
    padding: 0 12px;
    .about-us-tab {
      /deep/ .el-tabs__header {
        background-color: #fff;
        /deep/ .el-tabs__item {
          height: 60px;
          line-height: 60px;
          font-size: $font-size-small-s;
          color: $color-text-s;
          &.is-active {
            box-shadow: inset 0 2px 0 0 #fb9d1f;
            color: #fb891f;
          }
        }
      }
      .company-management {
        .organizational-structure-wrap {
          margin-top: 38px;
          strong {
            display: block;
            width: 105px;
            height: 43px;
            font-size: $font-size-large-xx;
            color: $color-text;
            margin: 0 auto;
            font-weight: 500;
            border-bottom: 2px solid #fb891f;
          }
          img {
            display: block;
            margin: 0 auto;
            margin-top: 50px;
            width: 890px;
            height: 355px;
          }
        }
        .executive-team-wrap {
          margin-top: 50px;
          strong {
            display: block;
            width: 105px;
            height: 43px;
            font-size: $font-size-large-xx;
            color: $color-text;
            margin: 0 auto;
            font-weight: 500;
            border-bottom: 2px solid #fb891f;
          }
          ul {
            width: 1000px;
            margin: 0 auto;
            margin-top: 30px;
            margin-bottom: 100px;
            display: flex;
            flex-wrap: wrap;
            li {
              position: relative;
              width: 320px;
              margin-bottom: 40px;
              img {
                position: relative;
                display: block;
                width: 152px;
                height: 152px;
                margin: 0 auto;
                margin-top: 29px;
                border-radius: 50%;
                overflow: hidden;
                cursor: pointer;
              }
              .name {
                position: relative;
                width: 152px;
                text-align: center;
                font-size: $font-size-large;
                color: $color-text;
                margin: 0 auto;
                margin-top: 8px;
              }
              .position {
                position: relative;
                width: 152px;
                text-align: center;
                font-size: $font-size-small;
                color: $color-text-gray;
                margin: 0 auto;
                margin-top: 2px;
              }
              .desc-wrap {
                opacity: 0;
                position: absolute;
                z-index: -1;
                .desc {
                  margin: 250px auto 0 auto;
                  font-size: $font-size-small-s;
                  color: $color-text;
                  line-height: 24px;
                  font-weight: 400;
                  padding: 0 20px 14px 20px;
                }
              }
              &:hover {
                img {
                  z-index: 3;
                  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
                }
                .name {
                  z-index: 3;
                }
                .position {
                  z-index: 3;
                }
                .desc-wrap {
                  position: absolute;
                  overflow: hidden;
                  width: 100%;
                  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
                  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
                  top: 0;
                  left: 0%;
                  background-color: #ffffff;
                  opacity: 1;
                  z-index: 2;
                  border-top-left-radius: 4px;
                  border-top-right-radius: 4px;
                  transition: all 0.3s;
                  border: 1px solid #e0e0e0;
                  border-top: 8px solid #f8be38;
                }
              }
            }
          }
        }
        .employee-situation-wrap {
          padding: 0 80px;
          strong {
            display: block;
            width: 105px;
            height: 43px;
            font-size: $font-size-large-xx;
            color: $color-text;
            margin: 0 auto;
            font-weight: 500;
            border-bottom: 2px solid #fb891f;
          }
          .chart-wrap {
            margin-top: 30px;
            display: flex;
            flex: 1;
            justify-content: space-between;
            height: 266px;
            .age-chart-wrap,
            .education-chart-wrap {
              display: flex;
              flex: 1;
              height: 266px;
              .age-chart,
              .education-chart {
                display: inline-block;
                width: 250px;
                height: 250px;
                margin-right: 10px;
              }
              .desc {
                width: 45%;
                margin-top: 58px;
                .title {
                  font-size: $font-size-medium;
                  color: $color-text;
                  font-weight: 600;
                  margin-bottom: 6px;
                }
                p {
                  font-size: $font-size-small;
                  color: $color-text;
                  margin-bottom: 2px;
                }
              }
            }
          }
          .tips {
            width: 327px;
            height: 20px;
            line-height: 20px;
            margin: 0 auto;
            font-size: $font-size-small-s;
            color: #a5a5a5;
            text-align: center;
          }
        }
        .shareholder-composition-wrap {
          margin-top: 70px;
          margin-bottom: 72px;
          strong {
            display: block;
            width: 105px;
            height: 43px;
            font-size: $font-size-large-xx;
            color: $color-text;
            margin: 0 auto;
            font-weight: 500;
            border-bottom: 2px solid #fb891f;
          }
          img {
            display: block;
            width: 840px;
            margin: 0 auto;
            margin-top: 60px;
          }
        }
      }
      .qualification-honor {
        padding-top: 34px;
        strong {
          display: block;
          width: 105px;
          height: 43px;
          font-size: $font-size-large-xx;
          color: $color-text;
          margin: 0 auto;
          font-weight: 500;
          border-bottom: 2px solid #fb891f;
        }
        .img-list {
          margin: 0 auto;
          margin-top: 67px;
          width: 1035px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .img-item {
            width: 310px;
            margin-right: 50px;
            margin-bottom: 50px;
            img {
              width: 305px;
              height: 410px;
            }
            .desc {
              font-size: 17px;
              color: $color-text;
              text-align: center;
              margin-top: 12px;
            }
            &:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
        .img-mask {
          position: fixed;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 100000;
          background: rgba(0, 0, 0, 0.66);
          .show-img {
            height: 815px;
            width: 607px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .big-img {
            width: 100%;
            height: 100%;
          }
          .close-wrap {
            position: absolute;
            width: 607px;
            left: 50%;
            top: 4%;
            transform: translate(-50%, -50%);
            .close {
              position: absolute;
              top: 0;
              right: 0;
              color: #fff;
              font-size: 30px;
            }
          }
          .prev {
            position: absolute;
            top: 50%;
            left: 10%;
            width: 40px;
            transform: translate(10px, -50%);
          }
          .next {
            width: 40px;
            transform: translate(10px, -50%);
            position: absolute;
            top: 50%;
            right: 10%;
          }
        }
      }
    }
    .operation-data {
      width: 1140px;
      margin: 0 auto;
      .operation-data-item {
        width: 100%;
        background: #fff;
        box-shadow: inset 0px 2px 0px 0px rgba(247, 190, 57, 1);
        border: 1px solid rgba(229, 229, 229, 1);
        margin-bottom: 32px;
        .title {
          padding: 17px 19px 22px 19px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f1f1f7;
          .name {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium-x;
            color: $color-text;
          }
          .deadline {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-small-ss;
            color: $color-text;
          }
          .chart-name {
            width: 50%;
            text-align: center;
            font-size: $font-size-medium-x;
            color: $color-text;
          }
        }
        ul {
          margin: 50px 118px 14px 118px;
          display: flex;
          flex-wrap: wrap;
          li {
            width: 190px;
            margin-right: 154px;
            margin-bottom: 32px;
            .amount {
              font-size: $font-size-medium;
              color: $color-text;
              margin-bottom: 10px;
              text-align: center;
            }
            .desc {
              font-size: $font-size-small-ss;
              color: $color-text-s;
              text-align: center;
            }
            &:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
        .chart-wrap {
          padding: 0 96px 0 141px;
          margin-top: 30px;
          margin-bottom: 30px;
          display: flex;
          flex: 1;
          justify-content: space-between;
          height: 266px;
          .terminal-chart-wrap,
          .gender-chart-wrap,
          .amount-chart-wrap,
          .lend-chart-wrap {
            display: flex;
            flex: 1;
            height: 266px;
            margin-right: 170px;
            .terminal-chart,
            .gender-chart,
            .amount-chart,
            .lend-chart {
              display: inline-block;
              width: 250px;
              height: 250px;
              margin-right: 10px;
            }
            .desc,
            .amount-desc {
              width: 12%;
              margin-top: 46px;
              ul {
                height: 60px;
                padding-bottom: 40px;
                margin: 0;
                flex-wrap: nowrap;
                justify-content: space-between;
                li {
                  display: inline-block;
                  vertical-align: middle;
                  width: 25px;
                  margin-right: 10px;
                  &:nth-child(2) {
                    width: 70px;
                  }
                  p {
                    font-size: $font-size-medium;
                    color: #5a5a5a;
                  }
                  span {
                    font-size: $font-size-small-ss;
                    color: #5a5a5a;
                  }
                }
                &:nth-child(1) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #ff7f24;
                    margin-top: 14px;
                  }
                  .man {
                    display: block;
                    width: 19px;
                    height: 29px;
                    max-width: 19px;
                    margin-top: 6px;
                  }
                }
                &:nth-child(2) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #fed842;
                    margin-top: 14px;
                  }
                  .women {
                    display: block;
                    width: 19px;
                    height: 29px;
                    max-width: 19px;
                    margin-top: 6px;
                  }
                }
              }
            }
            .amount-desc {
              margin-top: 0;
              ul {
                height: 40px;
                padding-bottom: 14px;
                &:nth-child(1) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #fa600c;
                    margin-top: 14px;
                  }
                }
                &:nth-child(2) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #099ef5;
                    margin-top: 14px;
                  }
                }
                &:nth-child(3) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #66cafd;
                    margin-top: 14px;
                  }
                }
                &:nth-child(4) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #8de540;
                    margin-top: 14px;
                  }
                }
                &:nth-child(5) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #f9db45;
                    margin-top: 14px;
                  }
                }
              }
            }
            .lend-desc {
              margin-top: 110px;
              ul {
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin: 0;
                height: 40px;
                padding-bottom: 14px;
                li {
                  display: inline-block;
                  vertical-align: middle;
                  width: 25px;
                  margin-right: 2px;
                  &:nth-child(2) {
                    width: 82px;
                  }
                  p {
                    font-size: $font-size-small-s;
                    color: #5a5a5a;
                  }
                }
                &:nth-child(1) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #23c9ff;
                    margin-top: 2px;
                  }
                }
                &:nth-child(2) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #ff5178;
                    margin-top: 2px;
                  }
                }
              }
            }
            .lend-chart {
              width: 380px;
              height: 250px;
            }
          }
          .amount-chart-wrap {
            margin-right: 82px;
          }
        }
      }
      .bg-legal-person {
        margin-top: 0;
      }
    }
    .operation-report {
      width: 1140px;
      margin: 0 auto;
      margin-top: 30px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 370px;
          height: 270px;
          color: #fff;
          margin-right: 15px;
          margin-bottom: 15px;
          text-align: center;
          cursor: pointer;
          a {
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
            .year {
              font-size: 80px;
              padding-top: 40px;
            }
            .title {
              font-size: $font-size-medium;
              margin-top: 0px;
            }
            .time {
              font-size: $font-size-medium;
              margin-top: 12px;
            }
          }
          &:nth-child(1) {
            background: url('./images/bg_report1.png') center center no-repeat;
          }
          &:nth-child(2) {
            background: url('./images/bg_report2.png') center center no-repeat;
          }
          &:nth-child(3) {
            background: url('./images/bg_report3.png') center center no-repeat;
            margin-right: 0;
          }
          &:nth-child(4) {
            background: url('./images/bg_report4.png') center center no-repeat;
          }
          &:nth-child(5) {
            background: url('./images/bg_report5.png') center center no-repeat;
          }
          &:nth-child(6) {
            background: url('./images/bg_report6.png') center center no-repeat;
            margin-right: 0;
          }
          &:nth-child(7) {
            background: url('./images/bg_report1.png') center center no-repeat;
          }
          &:nth-child(8) {
            background: url('./images/bg_report2.png') center center no-repeat;
          }
          &:nth-child(9) {
            background: url('./images/bg_report3.png') center center no-repeat;
            margin-right: 0;
          }
          &:nth-child(10) {
            background: url('./images/bg_report4.png') center center no-repeat;
          }
          &:nth-child(11) {
            background: url('./images/bg_report5.png') center center no-repeat;
          }
        }
      }
    }
    .review-info {
      width: 1140px;
      margin: 0 auto;
      margin-top: 30px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 370px;
          height: 270px;
          color: #fff;
          margin-right: 15px;
          margin-bottom: 15px;
          text-align: center;
          .year {
            font-size: 32px;
            padding-top: 78px;
          }
          .title {
            font-size: 36px;
            margin-top: 2px;
          }
          .time {
            font-size: $font-size-medium-x;
            margin-top: 2px;
          }
          &:nth-child(1) {
            background: url('./images/bg_review_item1.png') center center no-repeat;
            cursor: pointer;
          }
          &:nth-child(2) {
            background: url('./images/bg_review_item1.png') center center no-repeat;
            cursor: pointer;
          }
          &:nth-child(3) {
            background: url('./images/bg_review_item3.png') center center no-repeat;
            margin-right: 0;
          }
          &:nth-child(4) {
            background: url('./images/bg_review_item4.png') center center no-repeat;
          }
        }
      }
    }
    .policies {
      /deep/ .el-tabs__content {
        padding: 0;
        background: #fff;
        .laws-wrap {
          ul {
            background: #fff;
            width: 100%;
            li {
              display: flex;
              height: 65px;
              line-height: 65px;
              border-bottom: 1px dashed #cccccc;
              width: 100%;
              box-sizing: border-box;
              padding: 0 30px;
              justify-content: space-between;
              .title {
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: inherit;
              }
              &:hover {
                a {
                  color: #efa21c;
                }
              }
            }
          }
        }
        .pagination-wrapper {
          padding: 20px;
          margin-bottom: 15px;
        }
      }
    }
    .commitment-letter {
      width: 1140px;
      margin: 0 auto;
      img {
        margin-bottom: 10px;
      }
    }
    .bg-legal-person {
      margin-top: 20px;
    }
    .content {
      margin: 20px;
      min-height: 265px;
      .bg-legal-person {
        margin-top: 20px;
      }
    }
  }
}
</style>
