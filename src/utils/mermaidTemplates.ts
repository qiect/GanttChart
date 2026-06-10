import type { GanttTemplate } from '../types'

export const ganttTemplates: GanttTemplate[] = [
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
]
