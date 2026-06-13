// Helper: generate date string offset from today
function d(offset = 0) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
export const templateCategories = [
    { id: 'project', name: '项目管理', icon: 'project', color: '#4f46e5' },
    { id: 'business', name: '商业运营', icon: 'business', color: '#0891b2' },
    { id: 'engineering', name: '工程制造', icon: 'engineering', color: '#2d7a5f' },
    { id: 'tech', name: '技术开发', icon: 'tech', color: '#7c3aed' },
    { id: 'hr', name: '人力资源', icon: 'hr', color: '#c2410c' },
    { id: 'education', name: '教育科研', icon: 'education', color: '#0d9488' },
    { id: 'event', name: '活动策划', icon: 'event', color: '#db2777' },
    { id: 'planning', name: '规划计划', icon: 'planning', color: '#5b5f73' },
];
export const blankTemplate = {
    id: 'blank',
    name: '空白模板',
    description: '从零开始创建甘特图',
    category: 'planning',
    code: `gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 阶段一
    任务1             :a1, ${d()}, 7d
    任务2             :a2, after a1, 5d

    section 阶段二
    任务3             :b1, after a2, 10d
    任务4             :b2, after b1, 7d`,
};
export const ganttTemplates = [
    // ── 项目管理 ──
    {
        id: 'software-dev',
        name: '软件开发项目',
        description: '典型的软件开发项目甘特图模板',
        category: 'project',
        code: `gantt
    title 软件开发项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 需求分析
    需求调研           :a1, ${d()}, 10d
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
        id: 'product-launch',
        name: '产品发布计划',
        description: '新产品从研发到上市的完整流程',
        category: 'project',
        code: `gantt
    title 产品发布计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 产品规划
    市场需求分析        :a1, ${d()}, 10d
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
        id: 'startup-roadmap',
        name: '创业路线图',
        description: '创业公司从0到1的发展规划',
        category: 'project',
        code: `gantt
    title 创业路线图
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 市场验证
    用户痛点调研        :a1, ${d()}, 14d
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
        id: 'product-redesign',
        name: '产品改版',
        description: '现有产品升级改版项目',
        category: 'project',
        code: `gantt
    title 产品改版项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 调研分析
    用户反馈收集        :a1, ${d()}, 7d
    数据分析与诊断       :a2, after a1, 5d
    竞品对比分析        :a3, after a2, 5d
    改版目标确定        :milestone, after a3, 0d

    section 设计阶段
    信息架构重构        :b1, after a3, 7d
    交互原型设计        :b2, after b1, 10d
    视觉设计升级        :b3, after b2, 12d

    section 开发阶段
    前端重构开发        :c1, after b3, 20d
    后端接口适配        :c2, after b3, 15d
    数据迁移           :c3, after c2, 5d

    section 上线验证
    灰度发布           :d1, after c1, 7d
    用户反馈收集        :d2, after d1, 7d
    全量上线           :milestone, after d2, 0d`,
    },
    // ── 商业运营 ──
    {
        id: 'marketing',
        name: '市场营销计划',
        description: '市场营销活动甘特图模板',
        category: 'business',
        code: `gantt
    title 市场营销活动计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 策划阶段
    市场调研           :a1, ${d()}, 7d
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
        id: 'ecommerce',
        name: '电商运营',
        description: '电商平台运营与促销活动规划',
        category: 'business',
        code: `gantt
    title 电商运营计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 店铺筹备
    平台入驻申请        :a1, ${d()}, 5d
    店铺装修设计        :a2, after a1, 7d
    商品上架           :a3, after a2, 10d

    section 日常运营
    商品详情优化        :b1, after a3, 10d
    SEO/SEM 推广      :b2, after a3, 20d
    客服体系搭建        :b3, after a3, 7d

    section 大促活动
    活动方案策划        :c1, after b1, 5d
    促销素材制作        :c2, after c1, 7d
    活动预热           :c3, after c2, 5d
    活动正式爆发        :milestone, after c3, 0d

    section 复盘优化
    活动数据分析        :d1, after c3, 3d
    运营策略调整        :d2, after d1, 5d
    下期活动规划        :d3, after d2, 3d`,
    },
    {
        id: 'community-ops',
        name: '社区运营',
        description: '线上社区从搭建到运营的规划',
        category: 'business',
        code: `gantt
    title 社区运营计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 社区搭建
    社区平台选型        :a1, ${d()}, 5d
    社区功能配置        :a2, after a1, 7d
    视觉与品牌设计       :a3, after a2, 5d

    section 冷启动
    种子用户邀请        :b1, after a3, 10d
    初始内容填充        :b2, after a3, 7d
    社区规则制定        :b3, after b1, 3d

    section 运营推广
    内容运营           :c1, after b3, 20d
    用户增长活动        :c2, after b3, 15d
    KOL 引入          :c3, after c2, 10d

    section 生态建设
    用户等级体系        :d1, after c1, 7d
    创作者激励计划       :d2, after d1, 10d
    社区商业化探索       :d3, after d2, 10d`,
    },
    {
        id: 'supply-chain',
        name: '供应链管理',
        description: '供应链优化与物流管理项目',
        category: 'business',
        code: `gantt
    title 供应链优化项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 现状分析
    供应链诊断         :a1, ${d()}, 10d
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
    // ── 工程制造 ──
    {
        id: 'construction',
        name: '建筑工程项目',
        description: '建筑工程项目甘特图模板',
        category: 'engineering',
        code: `gantt
    title 建筑工程项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 前期准备
    地质勘察           :a1, ${d()}, 10d
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
        id: 'manufacturing',
        name: '生产制造计划',
        description: '制造业生产排程与交付管理',
        category: 'engineering',
        code: `gantt
    title 生产制造计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 订单处理
    订单评审           :a1, ${d()}, 3d
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
        id: 'office-renovation',
        name: '办公室装修',
        description: '办公空间装修改造项目',
        category: 'engineering',
        code: `gantt
    title 办公室装修项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 设计阶段
    需求沟通与量房       :a1, ${d()}, 3d
    方案设计           :a2, after a1, 7d
    施工图深化         :a3, after a2, 5d
    方案评审确认        :milestone, after a3, 0d

    section 施工准备
    招标与签约         :b1, after a3, 5d
    材料采购           :b2, after b1, 7d
    施工许可办理        :b3, after b1, 5d

    section 施工阶段
    拆除与改造         :c1, after b2, 5d
    水电工程           :c2, after c1, 7d
    吊顶与隔断         :c3, after c2, 7d
    地面与墙面         :d1, after c3, 10d

    section 收尾验收
    安装与调试         :e1, after d1, 5d
    保洁与通风         :e2, after e1, 3d
    竣工验收           :milestone, after e2, 0d`,
    },
    // ── 技术开发 ──
    {
        id: 'mobile-app',
        name: '移动应用开发',
        description: 'App从设计到上线的完整流程',
        category: 'tech',
        code: `gantt
    title 移动应用开发计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 产品设计
    用户调研           :a1, ${d()}, 7d
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
        id: 'website-dev',
        name: '网站开发项目',
        description: '企业官网或门户网站建设流程',
        category: 'tech',
        code: `gantt
    title 网站开发项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 需求与规划
    网站需求分析        :a1, ${d()}, 5d
    竞品网站调研        :a2, after a1, 3d
    功能规格文档        :a3, after a2, 5d

    section 设计阶段
    信息架构设计        :b1, after a3, 5d
    UI 视觉设计        :b2, after b1, 10d
    响应式适配设计      :b3, after b2, 5d
    设计评审           :milestone, after b3, 0d

    section 开发阶段
    前端页面开发        :c1, after b3, 15d
    后端功能开发        :c2, after b3, 18d
    CMS 系统集成       :c3, after c2, 7d

    section 测试上线
    功能测试           :d1, after c1, 5d
    兼容性与性能测试     :d2, after d1, 5d
    内容填充           :d3, after d2, 3d
    正式上线           :milestone, after d3, 0d`,
    },
    {
        id: 'game-dev',
        name: '游戏开发',
        description: '游戏从概念到上线的开发流程',
        category: 'tech',
        code: `gantt
    title 游戏开发项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 概念阶段
    游戏概念设计        :a1, ${d()}, 7d
    核心玩法验证        :a2, after a1, 10d
    GDD 文档编写       :a3, after a2, 7d

    section 原型阶段
    核心系统原型        :b1, after a3, 15d
    美术风格确定        :b2, after a3, 10d
    原型评审           :milestone, after b1, 0d

    section 开发阶段
    核心功能开发        :c1, after b1, 30d
    美术资源制作        :c2, after b2, 25d
    音效与配乐         :c3, after c1, 10d

    section 测试优化
    Alpha 测试         :d1, after c1, 10d
    Beta 测试          :d2, after d1, 15d
    性能优化           :d3, after d2, 7d

    section 上线运营
    上线准备           :e1, after d3, 5d
    正式发布           :milestone, after e1, 0d
    运营活动规划        :e2, after e1, 10d`,
    },
    {
        id: 'server-migration',
        name: '系统迁移项目',
        description: '服务器/系统迁移升级计划',
        category: 'tech',
        code: `gantt
    title 系统迁移项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 评估规划
    现有系统评估        :a1, ${d()}, 7d
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
        id: 'cloud-migration',
        name: '云迁移项目',
        description: '企业IT系统云化迁移方案',
        category: 'tech',
        code: `gantt
    title 云迁移项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 评估规划
    现有架构评估        :a1, ${d()}, 7d
    云平台选型         :a2, after a1, 5d
    迁移方案制定        :a3, after a2, 7d

    section 环境准备
    云账号与网络配置     :b1, after a3, 5d
    安全策略部署        :b2, after b1, 5d
    CI/CD 流水线搭建   :b3, after b2, 5d

    section 应用迁移
    非核心系统迁移       :c1, after b3, 10d
    核心系统改造        :c2, after c1, 15d
    数据库迁移         :c3, after c2, 7d

    section 验证切换
    功能验证测试        :d1, after c3, 7d
    性能压测           :d2, after d1, 5d
    流量切换           :d3, after d2, 3d
    稳定性观察         :d4, after d3, 7d
    迁移完成           :milestone, after d4, 0d`,
    },
    {
        id: 'ai-project',
        name: 'AI/ML项目',
        description: '人工智能与机器学习项目实施',
        category: 'tech',
        code: `gantt
    title AI/ML 项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 需求定义
    业务场景分析        :a1, ${d()}, 5d
    技术可行性评估       :a2, after a1, 5d
    项目立项           :milestone, after a2, 0d

    section 数据工程
    数据采集与标注       :b1, after a2, 15d
    数据清洗与预处理     :b2, after b1, 10d
    特征工程           :b3, after b2, 7d

    section 模型开发
    模型选型与设计       :c1, after b3, 5d
    模型训练           :c2, after c1, 15d
    模型评估与调优       :c3, after c2, 10d

    section 部署上线
    模型服务化部署       :d1, after c3, 7d
    A/B 测试          :d2, after d1, 10d
    监控与迭代         :d3, after d2, 7d
    项目验收           :milestone, after d3, 0d`,
    },
    {
        id: 'data-project',
        name: '数据分析项目',
        description: '数据分析与BI项目实施流程',
        category: 'tech',
        code: `gantt
    title 数据分析项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 需求调研
    业务需求访谈        :a1, ${d()}, 7d
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
        id: 'digital-transform',
        name: '数字化转型',
        description: '企业数字化转型实施路线图',
        category: 'tech',
        code: `gantt
    title 数字化转型项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 评估诊断
    数字化成熟度评估     :a1, ${d()}, 10d
    业务痛点梳理        :a2, after a1, 7d
    转型目标制定        :a3, after a2, 5d

    section 架构规划
    数字化架构设计       :b1, after a3, 12d
    技术选型           :b2, after b1, 7d
    实施路线图制定       :b3, after b2, 5d

    section 系统建设
    核心系统搭建        :c1, after b3, 25d
    数据中台建设        :c2, after b3, 20d
    业务系统集成        :c3, after c1, 15d

    section 推广落地
    试点部门实施        :d1, after c3, 15d
    全员培训           :d2, after d1, 10d
    全面推广           :d3, after d2, 20d
    转型验收           :milestone, after d3, 0d`,
    },
    // ── 人力资源 ──
    {
        id: 'hr-recruitment',
        name: '招聘计划',
        description: '企业人才招聘全流程管理',
        category: 'hr',
        code: `gantt
    title 人才招聘计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 需求确认
    岗位需求收集        :a1, ${d()}, 5d
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
        id: 'quality-mgmt',
        name: '质量管理项目',
        description: '质量体系建立与改进项目',
        category: 'hr',
        code: `gantt
    title 质量管理项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 现状评估
    质量体系诊断        :a1, ${d()}, 7d
    质量数据分析        :a2, after a1, 5d
    改进目标制定        :a3, after a2, 3d

    section 体系建设
    质量标准制定        :b1, after a3, 10d
    流程规范化         :b2, after b1, 12d
    检测体系搭建        :b3, after b2, 8d

    section 推行实施
    全员培训           :c1, after b3, 7d
    试运行             :c2, after c1, 15d
    问题整改           :c3, after c2, 10d

    section 认证验收
    内部审核           :d1, after c3, 5d
    管理评审           :d2, after d1, 3d
    外部认证审核        :milestone, after d2, 0d`,
    },
    {
        id: 'compliance-audit',
        name: '合规审计',
        description: '企业合规审查与整改项目',
        category: 'hr',
        code: `gantt
    title 合规审计项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 审计准备
    审计范围确定        :a1, ${d()}, 3d
    审计团队组建        :a2, after a1, 3d
    审计方案编制        :a3, after a2, 5d

    section 现场审计
    制度文件审查        :b1, after a3, 7d
    业务流程穿行测试     :b2, after b1, 10d
    访谈与取证         :b3, after b2, 5d

    section 报告阶段
    问题汇总分析        :c1, after b3, 5d
    审计报告编写        :c2, after c1, 5d
    报告沟通确认        :c3, after c2, 3d

    section 整改跟踪
    整改方案制定        :d1, after c3, 5d
    整改措施落实        :d2, after d1, 15d
    整改效果验证        :d3, after d2, 5d
    审计关闭           :milestone, after d3, 0d`,
    },
    {
        id: 'ma-due-diligence',
        name: '并购尽调',
        description: '企业并购尽职调查项目',
        category: 'hr',
        code: `gantt
    title 并购尽职调查
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 前期准备
    尽调范围确定        :a1, ${d()}, 3d
    尽调团队组建        :a2, after a1, 3d
    资料清单发送        :a3, after a2, 2d

    section 业务尽调
    业务模式分析        :b1, after a3, 7d
    市场与竞争分析       :b2, after b1, 5d
    客户与供应商访谈     :b3, after b2, 7d

    section 财务尽调
    财务报表审查        :c1, after a3, 10d
    税务合规检查        :c2, after c1, 5d
    资产评估           :c3, after c2, 7d

    section 法律尽调
    合同与诉讼审查       :d1, after a3, 10d
    知识产权核查        :d2, after d1, 5d
    合规风险评估        :d3, after d2, 5d

    section 报告决策
    尽调报告编写        :e1, after c3, 5d
    投资决策建议        :e2, after e1, 3d
    交易方案确定        :milestone, after e2, 0d`,
    },
    // ── 教育科研 ──
    {
        id: 'education-course',
        name: '教育培训课程',
        description: '课程开发与教学计划安排',
        category: 'education',
        code: `gantt
    title 教育培训课程计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 课程设计
    教学目标制定        :a1, ${d()}, 5d
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
        id: 'research-project',
        name: '科研项目',
        description: '学术研究项目进度管理',
        category: 'education',
        code: `gantt
    title 科研项目计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 课题立项
    文献综述           :a1, ${d()}, 20d
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
    // ── 活动策划 ──
    {
        id: 'event-planning',
        name: '活动策划',
        description: '大型活动/会议策划与执行',
        category: 'event',
        code: `gantt
    title 大型活动策划方案
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 前期筹备
    活动方案策划        :a1, ${d()}, 7d
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
        id: 'wedding',
        name: '婚礼策划',
        description: '婚礼筹备全流程管理',
        category: 'event',
        code: `gantt
    title 婚礼策划方案
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 前期筹备
    婚期与预算确定       :a1, ${d()}, 3d
    婚礼风格策划        :a2, after a1, 5d
    婚礼场地预订        :a3, after a2, 5d

    section 人员安排
    婚庆公司筛选        :b1, after a3, 5d
    摄影摄像预约        :b2, after a3, 3d
    伴郎伴娘确认        :b3, after a2, 3d

    section 物料准备
    婚纱礼服定制        :c1, after a3, 20d
    请柬设计与发送       :c2, after c1, 5d
    婚品采购           :c3, after c2, 7d

    section 婚礼当天
    场地布置           :d1, after c3, 2d
    彩排演练           :d2, after d1, 1d
    婚礼仪式           :milestone, after d2, 0d

    section 婚后事宜
    蜜月旅行           :e1, after d2, 10d
    致谢与回礼         :e2, after e1, 5d`,
    },
    {
        id: 'film-production',
        name: '影视制作',
        description: '影视/短视频项目制作流程',
        category: 'event',
        code: `gantt
    title 影视制作项目
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section 前期策划
    剧本创作           :a1, ${d()}, 15d
    项目立项与融资       :a2, after a1, 10d
    选角与团队组建       :a3, after a2, 7d

    section 筹备阶段
    场地勘景           :b1, after a3, 5d
    美术与服装设计       :b2, after a3, 10d
    拍摄计划制定        :b3, after b1, 5d

    section 拍摄阶段
    前期拍摄           :c1, after b3, 20d
    补拍与花絮         :c2, after c1, 5d
    杀青               :milestone, after c2, 0d

    section 后期制作
    粗剪               :d1, after c2, 10d
    精剪与调色         :d2, after d1, 10d
    音效与配乐         :d3, after d2, 7d
    特效制作           :d4, after d2, 15d

    section 发行上映
    审查与修改         :e1, after d3, 5d
    宣发推广           :e2, after e1, 10d
    正式上映           :milestone, after e2, 0d`,
    },
    // ── 规划计划 ──
    {
        id: 'annual-plan',
        name: '年度工作计划',
        description: '企业年度工作规划与目标分解',
        category: 'planning',
        code: `gantt
    title 年度工作计划
    dateFormat YYYY-MM-DD
    axisFormat %m/%d

    section Q1 规划
    年度目标制定        :a1, ${d()}, 10d
    预算编制           :a2, after a1, 7d
    团队组建与调整       :a3, after a2, 10d

    section Q2 执行
    核心项目启动        :b1, after a3, 30d
    中期检查与调整       :b2, after b1, 5d
    能力提升培训        :b3, after b2, 10d

    section Q3 攻坚
    重点任务突破        :c1, after b3, 30d
    跨部门协作         :c2, after c1, 15d
    阶段性总结         :c3, after c2, 5d

    section Q4 收官
    年度目标冲刺        :d1, after c3, 30d
    绩效考核           :d2, after d1, 10d
    年度总结与展望       :d3, after d2, 7d`,
    },
];
export function getTemplatesByCategory(category) {
    return ganttTemplates.filter(t => t.category === category);
}
export function getTemplateCount(category) {
    return ganttTemplates.filter(t => t.category === category).length;
}
