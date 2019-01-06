<template>
  <div class="info-disclosure">
    <div class="bg-header">
      <h3>信息披露中心</h3>
      <div class="main-tabs">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="关于我们" name="GYWM">
          </el-tab-pane>
          <el-tab-pane label="运营数据" name="YYSJ">
          </el-tab-pane>
          <el-tab-pane label="运营报告" name="YYBG">
          </el-tab-pane>
          <el-tab-pane label="备案信息" name="BAXX">
          </el-tab-pane>
          <el-tab-pane label="产品相关" name="CPXG">
          </el-tab-pane>
          <el-tab-pane label="审核信息" name="SHXX">
          </el-tab-pane>
          <el-tab-pane label="政策法规" name="ZCFG">
          </el-tab-pane>
          <el-tab-pane label="法人承诺函" name="FRCNH">
          </el-tab-pane>
        </el-tabs> 
      </div> 
    </div>
    <div class="tab-content-wrap">
      <div class="tab-content" v-if="activeName === 'GYWM'">
         <el-tabs class="about-us-tab" v-model="aboutUsActiveName" type="border-card" @tab-click="handleAboutUsClick">
          <el-tab-pane label="公司简介" name="GSJJ">
            <div class="company-introduction">
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司管理" name="GSGL">
            <div class="company-management">
              <div class="organizational-structure-wrap">
                <strong>组织架构</strong>
                <img src="./images/bg_organizational_structure.png"/>
              </div>
              <div class="executive-team-wrap">
                <strong>高管团队</strong>
                <ul>
                  <li>
                    <img src="./images/icon_executive1.png"/>
                    <p class="name">陈跃文</p>
                    <p class="position">首席执行官（CEO）</p>
                    <div class="desc-wrap">
                      <p class="desc">
                        华东师范大学硕士研究生学历，拥有工科硕士学位。在公司运营、营销及风控领域拥有超过10年的管理经验，擅长金融风险管理。历任GSK（葛兰素史克），Pfizer(辉瑞制药)金融事业部核心管理岗位，对公司治理有着极深的理解。
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src="./images/icon_executive2.png"/>
                    <p class="name">傅伟菱</p>
                    <p class="position">首席风控官（CRO）</p>
                    <div class="desc-wrap">
                      <p class="desc">
                        拥有超过20年的风险管理经验，也是台湾最早一批加入信用卡风控领域的管理者，经历了台湾信用卡的成长及卡债风暴，积累丰富的行业经验，并且长期领导信贷风险团队取得骄人的成绩。曾任台湾汇丰银行个人零售部风险管理副理及资产管理公司法务催收资深协理。
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src="./images/icon_executive3.png"/>
                    <p class="name">林崇钦</p>
                    <p class="position">首席风控官（CRO）</p>
                    <div class="desc-wrap">
                      <p class="desc">
                        从事金融业务风险管理25年。拥有15年以上外资银行消費金融与个人零售业务风险管理经验。曾任香港上海汇丰银行（台湾）信用卡中心消费金融信用风险管处副总裁、恒昌利通出借管理有限公司（北京）风险管理中心总监、达信卓惠金融信息服务（上海）有限公司风险管理中心总监。
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src="./images/icon_executive4.png"/>
                    <p class="name">王东东</p>
                    <p class="position"> 首席财务官（CFO）</p>
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
                      <p>大学及本科，占比85%； </p>
                      <p>硕士及博士，占比11%； </p>
                      <p>其他，占比4%；</p>
                    </div>
                  </div>
                </div>
                <p class="tips">截止至2017年12月31日，公司员工总数达：180人</p>
              </div>
              <div class="shareholder-composition-wrap">
                <strong>股东组成</strong>
                <img src="./images/bg_shareholder.jpg"/>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="组织信息" name="ZZXX">组织信息</el-tab-pane>
          <el-tab-pane label="发展事迹" name="FZSJ">发展事迹</el-tab-pane>
          <el-tab-pane label="合作伙伴" name="HZHB">合作伙伴</el-tab-pane>
          <el-tab-pane label="资质荣誉" name="ZZRY">
            <div class="qualification-honor">
              <strong>资质荣誉</strong>
              <div class="img-list">
                <div class="img-item" v-for="(item,index) in imgList" :key="index">
                  <img :src="item.picUrl" @click="bigImg(index)">
                  <p class="desc">{{item.desc}}</p>
                </div>
              </div>
              <div class="img-mask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
                <div class="close-wrap">
                  <i @click.stop="close" class="el-icon-circle-close-outline close"></i>
                </div>
                <img class="prev"  @click.stop="prev" src="./images/icon_prev.png">
                <div class="show-img" >
                  <img class="big-img" :src="imgList[num].picUrl">
                </div>
                <img class="next"  @click.stop="next" src="./images/icon_next.png">
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关于汇有财" name="GYHYC">关于汇有财</el-tab-pane>
        </el-tabs>
      </div>
      <div class="tab-content" v-if="activeName === 'YYSJ'">
        <div class="operation-data">
          <div class="operation-data-item">
            <div class="title">
              <p class="name">运营数据</p>
              <p class="deadline">数据截止至: 2017-07-31</p>
            </div>
            <ul>
              <li>
                <p class="amount">146,896,864.70</p>
                <p class="desc">累计成交金额(万元)</p>
              </li>
              <li>
                <p class="amount">93,316.24</p>
                <p class="desc">当年成交笔数(万元）</p>
              </li>
              <li>
                <p class="amount">1,973,316.24</p>
                <p class="desc">待还余额(万元) </p>
              </li>
              <li>
                <p class="amount">13,316.24</p>
                <p class="desc">累计成交笔数</p>
              </li>
              <li>
                <p class="amount">146,896,864.70</p>
                <p class="desc">投资端注册人数</p>
              </li>
              <li>
                <p class="amount">1,973,316.24</p>
                <p class="desc">代偿笔数</p>
              </li>
              <li>
                <p class="amount">1,973,316.24</p>
                <p class="desc">在投余额(万元）</p>
              </li>
              <li>
                <p class="amount">13,316.24</p>
                <p class="desc">投资人总数</p>
              </li>
              <li>
                <p class="amount">93,316.2</p>
                <p class="desc">已代偿金额(万元)</p>
              </li>
              <li>
                <p class="amount">1,973,316.24</p>
                <p class="desc">当年成交金额(万元）</p>
              </li>
              <li>
                <p class="amount">1,973,316.24</p>
                <p class="desc">借款人总数</p>
              </li>
            </ul>
          </div>
          <div class="operation-data-item">
            <div class="title">
              <p class="name">借款数据</p>
              <p class="deadline">数据截止至: 2017年7月31日</p>
            </div>
            <ul>
              <li>
                <p class="amount">146,896,864.70</p>
                <p class="desc">最大单户借款余额(万元) </p>
              </li>
              <li>
                <p class="amount">1,973,316.24</p>
                <p class="desc">最大十户借款余额占比(万元) </p>
              </li>
              <li>
                <p class="amount">0</p>
                <p class="desc">90天以上累计逾期率</p>
              </li>
              <li>
                <p class="amount">13,316.24</p>
                <p class="desc">最大单户借款余额占比</p>
              </li>
              <li>
                <p class="amount">0</p>
                <p class="desc">90天以上到期催收金额(万元) </p>
              </li>
              <li>
                <p class="amount">0</p>
                <p class="desc">逾期项目笔数占比</p>
              </li>
              <li>
                <p class="amount">1,973,316.24</p>
                <p class="desc">最大十户借款余额(万元)</p>
              </li>
              <li>
                <p class="amount">0</p>
                <p class="desc">90天以上逾期率</p>
              </li>
            </ul>
          </div>
          <div class="operation-data-item">
            <div class="title">
              <p class="chart-name">P2P网贷投资终端分布</p>
              <p class="chart-name">P2P网贷投资人群性别比例</p>
            </div>
            <div class="chart-wrap">
              <div class="terminal-chart-wrap">
                <div class="terminal-chart" id="terminal-chart"></div>
                <div class="desc">
                  <ul>
                      <li><h2></h2></li>
                      <li><p>34.29%</p><span>PC端</span></li>
                  </ul>
                  <ul>
                      <li><h2></h2></li>
                      <li><p>65.71%</p><span>移动端</span></li>
                  </ul>
                </div>
              </div>
              <div class="gender-chart-wrap">
                <div class="gender-chart" id="gender-chart"></div>
                <div class="desc">
                  <ul>
                      <li><img class="man" src="./images/icon_man.png"/></li>
                      <li><p>74%</p><span>男</span></li>
                  </ul>
                  <ul>
                      <li><img class="women" src="./images/icon_women.png"/></li>
                      <li><p>26%</p><span>女</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="operation-data-item">
            <div class="title">
              <p class="chart-name">P2P网贷出借金额区间的人数占比</p>
              <p class="chart-name">P2P网贷各年龄段人群投资对比</p>
            </div>
            <div class="chart-wrap">
              <div class="amount-chart-wrap">
                <div class="amount-chart" id="amount-chart"></div>
                <div class="amount-desc">
                  <ul>
                      <li><h2></h2></li>
                      <li><p>46.46%</p><span>1万以下</span></li>
                  </ul>
                  <ul>
                      <li><h2></h2></li>
                      <li><p>40%</p><span>1-5万</span></li>
                  </ul>
                  <ul>
                      <li><h2></h2></li>
                      <li><p>9.56%</p><span>5-10万</span></li>
                  </ul>
                  <ul>
                      <li><h2></h2></li>
                      <li><p>3.16%</p><span>10–20万</span></li>
                  </ul>
                  <ul>
                      <li><h2></h2></li>
                      <li><p>1.01%</p><span>20万以上</span></li>
                  </ul>
                </div>
              </div>
              <div class="lend-chart-wrap">
                <div class="lend-chart" id="lend-chart"></div>
                <div class="desc">
                  <ul>
                      <li><h2></h2></li>
                      <li><p>46.46%</p><span>1万以下</span></li>
                  </ul>
                  <ul>
                      <li><h2></h2></li>
                      <li><p>40%</p><span>1-5万</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content" v-if="activeName === 'YYBG'">33</div>
      <div class="tab-content" v-if="activeName === 'BAXX'">44</div>
      <div class="tab-content" v-if="activeName === 'CPXG'">55</div>
      <div class="tab-content" v-if="activeName === 'SHXX'">66</div>
      <div class="tab-content" v-if="activeName === 'ZCFG'">77</div>
      <div class="tab-content" v-if="activeName === 'FRCNH'">88</div>
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
import { getList } from '@/api/djs/announcement'
export default {
  data() {
    return {
      activeName: 'YYSJ',
      aboutUsActiveName: 'ZZRY',
      showBigImg:false,
      num:0,
      imgList:[{
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
      ]
    }
  },
  methods: {
    handleClick() {
      if(this.activeName === 'YYSJ') {
        setTimeout( ()=> {
            const terminalChart = echarts.init(document.getElementById('terminal-chart'))
              terminalChart.setOption({
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color: ['#FED842', '#FF7F24'],
                legend: {
                  show: false,
                  orient: 'vertical',
                  x: 'right',
                  y: 'center',
                  itemWidth: 10,
                  itemHeight: 10,
                  data:['PC端','移动端']
                },
                series: [
                  {
                    name:'终端分布',
                    type:'pie',
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
                    data:[
                      {value:26, name:'PC端'},
                      {value:74, name:'移动端'},
                    ]
                  }
                ]
              })
            const genderChart = echarts.init(document.getElementById('gender-chart'))
              genderChart.setOption({
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color: ['#FF5178', '#22C9FF'],
                legend: {
                  show: false,
                  orient: 'vertical',
                  x: 'center',
                  y: 'center',
                  itemWidth: 10,
                  itemHeight: 10,
                  data:['女','男']
                },
                series: [
                  {
                    name:'性别比例',
                    type:'pie',
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
                    data:[
                      {value:26, name:'女'},
                      {value:74, name:'男'},
                    ]
                  }
                ]
              })
            const amountChart = echarts.init(document.getElementById('amount-chart'))
              amountChart.setOption({
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color: ['#FA600C', '#099EF5', '#66CAFD', '#8DE540', '#F9DB45'],
                legend: {
                  show: false,
                  orient: 'vertical',
                  x: 'center',
                  y: 'center',
                  itemWidth: 10,
                  itemHeight: 10,
                  data:['1万以下','1-5万', '5-10万', '10–20万', '20万以上']
                },
                series: [
                  {
                    name:'金额区间',
                    type:'pie',
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
                    data:[
                      {value:46.46, name:'1万以下'},
                      {value:40, name:'1-5万'},
                      {value:9.56, name:'5-10万'},
                      {value:3.16, name:'10–20万'},
                      {value:1.01, name:'20万以上'}
                    ]
                  }
                ]
              })
            const lendChart = echarts.init(document.getElementById('lend-chart'))
              lendChart.setOption({
                tooltip:{
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
                xAxis : [
                    {
                        type : 'category',
                        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:[10, 52, 200, 334, 390, 330, 220],
                        itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#68EFF3'},
                                    {offset: 1, color: '#2FA9FF'}

                                ]
                            )
                          }
                        }
                    }
                ]
              })
          },200)
      }
    },
    handleAboutUsClick() {
      if(this.aboutUsActiveName === 'GSGL') {
        setTimeout( ()=> {
            const ageChart = echarts.init(document.getElementById('age-chart'))
              ageChart.setOption({
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color: ['#FA8B2F', '#FB6E4A', '#FFD665', '#FFB368'],
                legend: {
                  orient: 'vertical',
                  x: 'center',
                  y: 'center',
                  itemWidth: 10,
                  itemHeight: 10,
                  data:['25岁以下','25-30岁','31-35岁','36岁以上']
                },
                series: [
                  {
                    name:'年龄分布',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                        show:true,
                        position:'outer', //标签的位置
                        textStyle : {
                            fontWeight : 100 ,
                            fontSize : 12    //文字的字体大小
                        },
                        formatter:'{d}%',
                      padding: [0, -20],
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
                    data:[
                      {value:20, name:'31-35岁'},
                      {value:42, name:'25-30岁'},
                      {value:26, name:'25岁以下'},
                      {value:12, name:'36岁以上'}
                    ]
                  }
                ]
              })
            const educationChart = echarts.init(document.getElementById('education-chart'))
              console.log('educationChart===', educationChart)
              educationChart.setOption({
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color: ['#48AFFF', '#76DDFB', '#4ABBF7'],
                legend: {
                  orient: 'vertical',
                  x: 'center',
                  y: 'center',
                  itemWidth: 10,
                  itemHeight: 10,
                  data:['大学及本科','硕士及博士','其他']
                },
                series: [
                  {
                    name:'学历分布',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                        show:true,
                        position:'outer', //标签的位置
                        textStyle : {
                            fontWeight : 100 ,
                            fontSize : 12    //文字的字体大小
                        },
                        formatter:'{d}%'
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
                    data:[
                      {value:4, name:'其他'},
                      {value:11, name:'硕士及博士'},
                      {value:85, name:'大学及本科'}
                    ]
                  }
                ]
              })
          },200)
      }
      let postData = {
        curPage: this.page,
        maxLine: this.size,
        paramCode: this.aboutUsActiveName
      }
      getList(postData).then(res => {
        let data = res.data
      })
    },
    bigImg(index) {
      this.showBigImg = true
      this.num = index
    },
    prev() {
      if(this.num == 0) {
          this.num = 11
      }
      this.num--
    },
    next() {
      if(this.num == 10) {
          this.num=-1
      }
      this.num++
    },
    close() {
      this.showBigImg = false
    }
  },
  mounted() {
  },
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
      color:rgba(255,255,255,1);
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
              line-height: 44px;
              text-align: center;
              border: 1px solid #fff;
              margin-right: 21px;
              color: #fff;
              padding: 0;
              border-radius:4px;
              font-size: $font-size-medium;
              &:last-child {
                margin-right: 0;
              }
            }
            .el-tabs__item:hover {
              background: #fff;
              color: #FB7B1F;
            }
            .el-tabs__item.is-active {
              background: #fff;
              color: #FB7B1F;
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
      /deep/ .el-tabs__item {
        height: 60px;
        line-height: 58px;
        font-size: $font-size-small-s;
        color: $color-text-s;
        &.is-active {
          box-shadow: inset 0 2px 0 0 #FB9D1F;
          color: #FB891F;
        }
      }
      .company-introduction {

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
            border-bottom: 2px solid #FB891F;
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
            border-bottom: 2px solid #FB891F;
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
                  line-height:24px;
                  font-weight:400;
                  padding: 0 25px 14px 25px;
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
            border-bottom: 2px solid #FB891F;
          }
          .chart-wrap {
            margin-top: 30px;
            display: flex;
            flex: 1;
            justify-content: space-between;
            height: 266px;
            .age-chart-wrap, .education-chart-wrap {
              display: flex;
              flex: 1;
              height: 266px;
              .age-chart, .education-chart {
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
            border-bottom: 2px solid #FB891F;
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
          border-bottom: 2px solid #FB891F;
        }
        .img-list {
          margin: 0 auto;
          margin-top: 67px;
          width: 1035px;
          display: flex;
          flex-direction:row;
          flex-wrap:wrap;
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
          background: rgba(0,0,0,0.66); 
          .show-img {
            height: 815px;
            width: 607px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
          }
          .big-img {
            width: 100%;
            height: 100%;
          }
          .close-wrap {
            position: absolute;
            width: 607px;
            left: 50%;
            top: 8%;
            transform: translate(-50%,-50%);
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
            transform: translate(10px,-50%);
          }
          .next {
            width: 40px;
            transform: translate(10px,-50%);
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
        box-shadow: inset 0px 2px 0px 0px rgba(247,190,57,1);
        border: 1px solid rgba(229,229,229,1);
        margin-bottom: 32px;
        .title {
          padding: 17px 19px 22px 19px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #F1F1F7;
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
            width: 155px;
            margin-right: 216px;
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
          .terminal-chart-wrap, .gender-chart-wrap, .amount-chart-wrap, .lend-chart-wrap {
            display: flex;
            flex: 1;
            height: 266px;
            margin-right: 170px;
            .terminal-chart, .gender-chart, .amount-chart, .lend-chart {
              display: inline-block;
              width: 250px;
              height: 250px;
              margin-right: 10px;
            }
            .desc, .amount-desc {
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
                    background: #FF7F24;
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
                    background: #FED842;
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
                    background: #FA600C;
                    margin-top: 14px;
                  }
                }
                &:nth-child(2) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #099EF5;
                    margin-top: 14px;
                  }
                }
                &:nth-child(3) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #66CAFD;
                    margin-top: 14px;
                  }
                }
                &:nth-child(4) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #8DE540;
                    margin-top: 14px;
                  }
                }
                &:nth-child(5) {
                  h2 {
                    height: 16px;
                    width: 16px;
                    background: #F9DB45;
                    margin-top: 14px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
