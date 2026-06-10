# Gantt Studio

基于 Vue 3 + TypeScript + Vite 构建的在线甘特图编辑器，使用 Mermaid 语法渲染，支持可视化编辑与代码编辑双模式。

## 功能特性

- **双模式编辑** — 可视化拖拽编辑 & Mermaid 代码编辑，实时同步预览
- **6 种图表主题** — 靛蓝、翡翠、深海、黑曜、琥珀、石墨，一键切换
- **深色/浅色模式** — 全局主题切换，编辑器与预览同步适配
- **甘特图预览** — 缩放控制（滑块拖拽 + 键盘快捷键）、主题切换、实时渲染
- **可视化编辑器** — 分区折叠/展开、任务状态色标、自定义下拉框、依赖关系管理
- **浏览器缓存保存** — 一键保存到 localStorage，下次打开自动加载
- **多格式导出** — 支持 PNG / SVG / PDF / Mermaid 代码导出
- **模板系统** — 内置甘特图模板，快速开始
- **导入功能** — 支持 .mmd / .mermaid / .txt 文件导入

## 技术栈

- Vue 3 + TypeScript
- Vite
- Mermaid.js
- CodeMirror 6
- html-to-image + jsPDF + file-saver
- Tailwind CSS

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 项目结构

```
src/
├── components/
│   ├── Toolbar.vue          # 顶部工具栏
│   ├── MermaidEditor.vue    # 代码编辑器（CodeMirror）
│   ├── VisualEditor.vue     # 可视化编辑器
│   ├── GanttPreview.vue     # 甘特图预览
│   ├── CustomSelect.vue     # 自定义下拉框
│   ├── ExportMenu.vue       # 导出菜单
│   ├── SplitPane.vue        # 分栏面板
│   ├── StatusBar.vue        # 状态栏
│   ├── TemplateModal.vue    # 模板选择弹窗
│   └── Toast.vue            # 提示消息
├── composables/
│   └── useLocalStorage.ts   # localStorage 响应式钩子
├── utils/
│   ├── mermaidConfig.ts     # Mermaid 主题配置
│   ├── mermaidTemplates.ts  # 甘特图模板
│   ├── ganttParser.ts       # Mermaid 语法解析/生成
│   └── exportChart.ts       # 图表导出工具
├── types/
│   └── index.ts             # 类型定义
├── App.vue                  # 应用入口
├── style.css                # 全局样式 & 设计系统
└── main.ts                  # 启动入口
```
