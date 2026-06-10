import type { GanttTemplate } from '../types'

export const ganttTemplates: GanttTemplate[] = [
  {
    id: 'blank',
    name: '空白模板',
    description: '从零开始创建甘特图',
    code: `gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 阶段一
    任务1             :a1, 2024-01-01, 7d
    任务2             :a2, after a1, 5d

    section 阶段二
    任务3             :b1, after a2, 10d
    任务4             :b2, after b1, 7d`,
  },
  {
    id: 'software-dev',
    name: '软件开发项目',
    description: '典型的软件开发项目甘特图模板',
    code: `gantt
    title 软件开发项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 需求分析
    需求调研           :a1, 2024-01-01, 10d
    需求文档编写        :a2, after a1, 5d
    需求评审           :milestone, after a2, 0d

    section 设计
    系统架构设计        :b1, after a2, 7d
    数据库设计         :b2, after b1, 5d
    UI/UX 设计        :b3, after b1, 7d

    section 开发
    后端开发           :c1, after b2, 20d
    前端开发           :c2, after b3, 18d
    API 集成          :c3, after c1, 7d

    section 测试
    单元测试           :d1, after c1, 10d
    集成测试           :d2, after c3, 7d
    用户验收测试        :d3, after d2, 5d

    section 部署
    生产环境部署        :e1, after d3, 3d
    项目上线           :milestone, after e1, 0d`,
  },
  {
    id: 'marketing',
    name: '市场营销计划',
    description: '市场营销活动甘特图模板',
    code: `gantt
    title 市场营销活动计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 策划阶段
    市场调研           :a1, 2024-03-01, 7d
    目标受众分析        :a2, after a1, 5d
    营销策略制定        :a3, after a2, 5d

    section 内容制作
    文案撰写           :b1, after a3, 7d
    视觉设计           :b2, after a3, 10d
    视频制作           :b3, after b1, 8d

    section 推广执行
    社交媒体投放        :c1, after b2, 14d
    邮件营销           :c2, after b1, 10d
    KOL 合作          :c3, after b3, 7d

    section 效果评估
    数据收集           :d1, after c1, 5d
    ROI 分析          :d2, after d1, 3d
    报告撰写           :d3, after d2, 2d`,
  },
  {
    id: 'construction',
    name: '建筑工程项目',
    description: '建筑工程项目甘特图模板',
    code: `gantt
    title 建筑工程项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 前期准备
    地质勘察           :a1, 2024-06-01, 10d
    施工图设计         :a2, after a1, 15d
    施工许可证办理      :a3, after a2, 10d

    section 基础工程
    场地平整           :b1, after a3, 5d
    基坑开挖           :b2, after b1, 10d
    基础浇筑           :b3, after b2, 12d

    section 主体工程
    框架结构           :c1, after b3, 30d
    墙体砌筑           :c2, after c1, 20d
    屋面工程           :c3, after c2, 10d

    section 装饰工程
    外墙装饰           :d1, after c3, 15d
    内部装修           :d2, after c3, 25d
    设备安装           :d3, after d1, 10d

    section 竣工验收
    竣工清理           :e1, after d3, 5d
    验收检查           :milestone, after e1, 0d`,
  },
  {
    id: 'product-launch',
    name: '产品发布计划',
    description: '新产品从研发到上市的完整流程',
    code: `gantt
    title 产品发布计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 产品规划
    市场需求分析        :a1, 2024-02-01, 10d
    竞品调研           :a2, after a1, 7d
    产品方案评审        :milestone, after a2, 0d

    section 研发阶段
    原型设计           :b1, after a2, 12d
    功能开发           :b2, after b1, 25d
    内部测试           :b3, after b2, 10d

    section 上市准备
    定价策略制定        :c1, after b2, 5d
    营销物料制作        :c2, after b2, 10d
    渠道铺设           :c3, after c1, 8d

    section 正式发布
    发布会筹备         :d1, after c2, 7d
    产品上线           :milestone, after d1, 0d
    售后体系搭建        :d2, after d1, 10d`,
  },
  {
    id: 'event-planning',
    name: '活动策划',
    description: '大型活动/会议策划与执行',
    code: `gantt
    title 大型活动策划方案
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 前期筹备
    活动方案策划        :a1, 2024-05-01, 7d
    预算编制与审批       :a2, after a1, 5d
    场地预订           :a3, after a2, 3d

    section 资源准备
    供应商筛选         :b1, after a3, 7d
    舞台搭建方案        :b2, after b1, 5d
    物料采购           :b3, after b1, 10d

    section 宣传推广
    宣传方案制定        :c1, after a3, 5d
    线上推广           :c2, after c1, 14d
    媒体邀请           :c3, after c1, 7d

    section 现场执行
    场地布置           :d1, after b3, 3d
    彩排演练           :d2, after d1, 2d
    活动正式举办        :milestone, after d2, 0d

    section 后续总结
    费用结算           :e1, after d2, 5d
    活动复盘           :e2, after e1, 3d`,
  },
  {
    id: 'education-course',
    name: '教育培训课程',
    description: '课程开发与教学计划安排',
    code: `gantt
    title 教育培训课程计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 课程设计
    教学目标制定        :a1, 2024-09-01, 5d
    课程大纲编写        :a2, after a1, 7d
    教材选编           :a3, after a2, 10d

    section 备课阶段
    课件制作           :b1, after a3, 12d
    实验方案设计        :b2, after a3, 8d
    试讲与修改         :b3, after b1, 5d

    section 教学实施
    第一阶段授课        :c1, after b3, 15d
    期中考核           :milestone, after c1, 0d
    第二阶段授课        :c2, after c1, 15d

    section 考核评估
    期末考试           :d1, after c2, 3d
    成绩评定           :d2, after d1, 5d
    教学总结           :d3, after d2, 3d`,
  },
  {
    id: 'hr-recruitment',
    name: '招聘计划',
    description: '企业人才招聘全流程管理',
    code: `gantt
    title 人才招聘计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 需求确认
    岗位需求收集        :a1, 2024-03-01, 5d
    岗位说明书编写       :a2, after a1, 3d
    招聘预算审批        :a3, after a2, 3d

    section 渠道拓展
    招聘渠道选择        :b1, after a3, 3d
    职位发布           :b2, after b1, 2d
    校园招聘安排        :b3, after b2, 10d

    section 筛选面试
    简历筛选           :c1, after b2, 15d
    初试安排           :c2, after c1, 10d
    复试与终面         :c3, after c2, 7d

    section 录用入职
    Offer 发放         :d1, after c3, 3d
    背景调查           :d2, after d1, 5d
    入职培训           :d3, after d2, 3d`,
  },
  {
    id: 'data-project',
    name: '数据分析项目',
    description: '数据分析与BI项目实施流程',
    code: `gantt
    title 数据分析项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 需求调研
    业务需求访谈        :a1, 2024-04-01, 7d
    数据源梳理         :a2, after a1, 5d
    可行性评估         :a3, after a2, 3d

    section 数据准备
    数据采集           :b1, after a3, 10d
    数据清洗           :b2, after b1, 8d
    数据仓库建模        :b3, after b2, 7d

    section 分析建模
    指标体系设计        :c1, after b3, 5d
    分析模型构建        :c2, after c1, 12d
    模型验证与调优       :c3, after c2, 7d

    section 成果交付
    可视化报表开发       :d1, after c3, 10d
    用户培训           :d2, after d1, 3d
    项目验收           :milestone, after d2, 0d`,
  },
  {
    id: 'manufacturing',
    name: '生产制造计划',
    description: '制造业生产排程与交付管理',
    code: `gantt
    title 生产制造计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 订单处理
    订单评审           :a1, 2024-01-15, 3d
    生产计划编制        :a2, after a1, 5d
    物料需求分析        :a3, after a2, 3d

    section 采购备料
    供应商询价         :b1, after a3, 5d
    采购下单           :b2, after b1, 3d
    来料检验           :b3, after b2, 7d

    section 生产制造
    首件试制           :c1, after b3, 3d
    批量生产           :c2, after c1, 15d
    过程检验           :c3, after c2, 3d

    section 交付阶段
    成品检验           :d1, after c3, 2d
    包装入库           :d2, after d1, 2d
    发货交付           :d3, after d2, 3d`,
  },
  {
    id: 'server-migration',
    name: '系统迁移项目',
    description: '服务器/系统迁移升级计划',
    code: `gantt
    title 系统迁移项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 评估规划
    现有系统评估        :a1, 2024-07-01, 7d
    迁移方案设计        :a2, after a1, 10d
    风险评估与预案      :a3, after a2, 5d

    section 环境准备
    新环境搭建         :b1, after a3, 10d
    网络配置           :b2, after b1, 5d
    安全策略部署        :b3, after b2, 5d

    section 数据迁移
    数据备份           :c1, after b3, 3d
    数据迁移测试        :c2, after c1, 7d
    数据一致性校验       :c3, after c2, 3d

    section 切换验证
    灰度切换           :d1, after c3, 5d
    全量切换           :d2, after d1, 2d
    稳定性监控         :d3, after d2, 7d

    section 收尾
    旧系统下线         :e1, after d3, 3d
    项目总结           :e2, after e1, 2d`,
  },
  {
    id: 'research-project',
    name: '科研项目',
    description: '学术研究项目进度管理',
    code: `gantt
    title 科研项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 课题立项
    文献综述           :a1, 2024-01-01, 20d
    研究方案设计        :a2, after a1, 10d
    开题报告评审        :milestone, after a2, 0d

    section 实验研究
    实验设备准备        :b1, after a2, 7d
    实验数据采集        :b2, after b1, 30d
    数据分析           :b3, after b2, 15d

    section 论文撰写
    论文初稿           :c1, after b3, 20d
    导师审阅修改        :c2, after c1, 10d
    论文投稿           :milestone, after c2, 0d

    section 结题阶段
    答辩准备           :d1, after c2, 10d
    项目结题报告        :d2, after d1, 7d
    成果发布           :d3, after d2, 5d`,
  },
  {
    id: 'startup-roadmap',
    name: '创业路线图',
    description: '创业公司从0到1的发展规划',
    code: `gantt
    title 创业路线图
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 市场验证
    用户痛点调研        :a1, 2024-01-01, 14d
    竞品分析           :a2, after a1, 7d
    MVP 方案确定       :milestone, after a2, 0d

    section 产品开发
    产品原型设计        :b1, after a2, 10d
    核心功能开发        :b2, after b1, 30d
    内测与迭代         :b3, after b2, 14d

    section 早期运营
    种子用户获取        :c1, after b2, 20d
    用户反馈收集        :c2, after c1, 10d
    产品优化迭代        :c3, after c2, 14d

    section 融资发展
    商业计划书编写       :d1, after b3, 10d
    投资人对接         :d2, after d1, 20d
    融资完成           :milestone, after d2, 0d`,
  },
  {
    id: 'mobile-app',
    name: '移动应用开发',
    description: 'App从设计到上线的完整流程',
    code: `gantt
    title 移动应用开发计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 产品设计
    用户调研           :a1, 2024-03-01, 7d
    交互原型设计        :a2, after a1, 10d
    视觉设计           :a3, after a2, 12d

    section 开发阶段
    架构搭建           :b1, after a2, 5d
    iOS 开发           :b2, after b1, 25d
    Android 开发       :b3, after b1, 25d
    后端 API 开发      :b4, after b1, 20d

    section 测试优化
    功能测试           :c1, after b2, 10d
    性能优化           :c2, after c1, 7d
    兼容性测试         :c3, after c2, 5d

    section 上线发布
    应用商店审核        :d1, after c3, 7d
    灰度发布           :d2, after d1, 5d
    正式上线           :milestone, after d2, 0d`,
  },
  {
    id: 'annual-plan',
    name: '年度工作计划',
    description: '企业年度工作规划与目标分解',
    code: `gantt
    title 年度工作计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section Q1 规划
    年度目标制定        :a1, 2024-01-01, 10d
    预算编制           :a2, after a1, 7d
    团队组建与调整       :a3, after a2, 10d

    section Q2 执行
    核心项目启动        :b1, 2024-04-01, 30d
    中期检查与调整       :b2, after b1, 5d
    能力提升培训        :b3, after b2, 10d

    section Q3 攻坚
    重点任务突破        :c1, 2024-07-01, 30d
    跨部门协作         :c2, after c1, 15d
    阶段性总结         :c3, after c2, 5d

    section Q4 收官
    年度目标冲刺        :d1, 2024-10-01, 30d
    绩效考核           :d2, after d1, 10d
    年度总结与展望       :d3, after d2, 7d`,
  },
  {
    id: 'supply-chain',
    name: '供应链管理',
    description: '供应链优化与物流管理项目',
    code: `gantt
    title 供应链优化项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 现状分析
    供应链诊断         :a1, 2024-02-01, 10d
    数据收集与分析       :a2, after a1, 7d
    痛点梳理           :a3, after a2, 5d

    section 方案设计
    供应商评估         :b1, after a3, 10d
    物流网络优化        :b2, after a3, 12d
    库存策略制定        :b3, after b1, 7d

    section 系统建设
    供应链系统选型       :c1, after b3, 7d
    系统实施部署        :c2, after c1, 20d
    数据迁移与测试       :c3, after c2, 10d

    section 运营优化
    试运行            :d1, after c3, 14d
    流程优化调整        :d2, after d1, 7d
    全面推广           :milestone, after d2, 0d`,
  },
]
