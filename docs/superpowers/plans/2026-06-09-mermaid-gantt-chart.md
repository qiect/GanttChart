# Mermaid Gantt Chart Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, production-grade Gantt chart web application that supports Mermaid syntax with real-time preview, editing, export, and project management features.

**Architecture:** Single-page application built with Vite + React. Split-pane layout with a Mermaid syntax editor on the left and a live-rendered Gantt chart preview on the right. All rendering is client-side using Mermaid.js. State management via React hooks + localStorage for persistence. No backend required.

**Tech Stack:** Vite, React 18, TypeScript, Mermaid.js, CodeMirror 6, Tailwind CSS, html-to-image (for export)

---

## File Structure

```
/workspace/
├── index.html                          # Entry HTML
├── package.json                        # Dependencies
├── vite.config.ts                      # Vite configuration
├── tsconfig.json                       # TypeScript config
├── tailwind.config.js                  # Tailwind CSS config
├── postcss.config.js                   # PostCSS config
├── src/
│   ├── main.tsx                        # React entry point
│   ├── App.tsx                         # Root component with layout
│   ├── index.css                       # Global styles + Tailwind directives
│   ├── components/
│   │   ├── SplitPane.tsx               # Resizable split pane layout
│   │   ├── MermaidEditor.tsx           # CodeMirror-based Mermaid editor
│   │   ├── GanttPreview.tsx            # Mermaid Gantt chart renderer
│   │   ├── Toolbar.tsx                 # Top toolbar (export, theme, templates)
│   │   ├── TemplateModal.tsx           # Template selection modal
│   │   ├── ExportMenu.tsx              # Export dropdown (PNG/SVG/PDF)
│   │   ├── StatusBar.tsx               # Bottom status bar (line count, errors)
│   │   └── ErrorBoundary.tsx           # Error boundary for render failures
│   ├── hooks/
│   │   ├── useMermaidRender.ts         # Hook for Mermaid rendering logic
│   │   ├── useLocalStorage.ts          # Hook for localStorage persistence
│   │   └── useDebounce.ts             # Debounce hook for editor input
│   ├── utils/
│   │   ├── mermaidTemplates.ts         # Pre-built Gantt chart templates
│   │   ├── exportChart.ts             # Export utilities (PNG/SVG/PDF)
│   │   └── mermaidConfig.ts           # Mermaid configuration defaults
│   └── types/
│       └── index.ts                    # TypeScript type definitions
```

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/index.css`

- [ ] **Step 1: Initialize project with Vite + React + TypeScript**

Run:
```bash
cd /workspace && npm create vite@latest . -- --template react-ts
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
cd /workspace && npm install mermaid @codemirror/lang-markdown @codemirror/view @codemirror/state @codemirror/commands @codemirror/theme-one-dark codemirror html-to-image jspdf file-saver
```

Run:
```bash
cd /workspace && npm install -D tailwindcss @tailwindcss/vite @types/file-saver
```

- [ ] **Step 3: Configure Tailwind CSS**

Update `src/index.css`:
```css
@import "tailwindcss";

:root {
  --editor-bg: #1e1e2e;
  --preview-bg: #ffffff;
  --toolbar-bg: #f8f9fa;
  --border-color: #e2e8f0;
}

[data-theme="dark"] {
  --preview-bg: #1e1e2e;
  --toolbar-bg: #2d2d3f;
  --border-color: #4a4a6a;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#root {
  width: 100vw;
  height: 100vh;
}
```

- [ ] **Step 4: Update vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 5: Update index.html**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gantt Studio - Mermaid 甘特图编辑器</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Verify dev server starts**

Run: `cd /workspace && npm run dev`
Expected: Vite dev server starts without errors

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: scaffold project with Vite + React + TypeScript + Tailwind"
```

---

### Task 2: Type Definitions & Utility Modules

**Files:**
- Create: `src/types/index.ts`
- Create: `src/utils/mermaidConfig.ts`
- Create: `src/utils/mermaidTemplates.ts`
- Create: `src/hooks/useLocalStorage.ts`
- Create: `src/hooks/useDebounce.ts`

- [ ] **Step 1: Create type definitions**

Create `src/types/index.ts`:
```typescript
export interface GanttTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
}

export interface ExportOptions {
  format: 'png' | 'svg' | 'pdf';
  quality: number;
  scale: number;
  backgroundColor: string;
}

export interface AppState {
  code: string;
  theme: 'light' | 'dark';
  splitRatio: number;
  activeTemplate: string | null;
}

export interface RenderResult {
  success: boolean;
  svg?: string;
  error?: string;
}
```

- [ ] **Step 2: Create Mermaid configuration**

Create `src/utils/mermaidConfig.ts`:
```typescript
import type { MermaidConfig } from 'mermaid';

export const lightConfig: MermaidConfig = {
  startOnLoad: false,
  theme: 'default',
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    sectionFontSize: 11,
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d',
  },
  securityLevel: 'loose',
};

export const darkConfig: MermaidConfig = {
  ...lightConfig,
  theme: 'dark',
};

export const getMermaidConfig = (theme: 'light' | 'dark'): MermaidConfig => {
  return theme === 'dark' ? darkConfig : lightConfig;
};
```

- [ ] **Step 3: Create Mermaid Gantt templates**

Create `src/utils/mermaidTemplates.ts`:
```typescript
import type { GanttTemplate } from '../types';

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
];
```

- [ ] **Step 4: Create useLocalStorage hook**

Create `src/hooks/useLocalStorage.ts`:
```typescript
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {
        // localStorage may be full or unavailable
      }
      return valueToStore;
    });
  }, [key]);

  return [storedValue, setValue];
}
```

- [ ] **Step 5: Create useDebounce hook**

Create `src/hooks/useDebounce.ts`:
```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add type definitions, utilities, and custom hooks"
```

---

### Task 3: Mermaid Rendering Hook

**Files:**
- Create: `src/hooks/useMermaidRender.ts`

- [ ] **Step 1: Create the Mermaid rendering hook**

Create `src/hooks/useMermaidRender.ts`:
```typescript
import { useState, useEffect, useRef, useCallback } from 'react';
import mermaid from 'mermaid';
import { getMermaidConfig } from '../utils/mermaidConfig';
import type { RenderResult } from '../types';

let renderCounter = 0;

export function useMermaidRender(code: string, theme: 'light' | 'dark'): RenderResult & { containerRef: React.RefObject<HTMLDivElement | null> } {
  const [result, setResult] = useState<RenderResult>({ success: false });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderingRef = useRef(false);

  const render = useCallback(async () => {
    if (!code.trim() || !containerRef.current || renderingRef.current) {
      return;
    }

    renderingRef.current = true;
    const id = `mermaid-gantt-${++renderCounter}`;

    try {
      mermaid.initialize(getMermaidConfig(theme));
      const { svg } = await mermaid.render(id, code);
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
      setResult({ success: true, svg });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '渲染失败';
      setResult({ success: false, error: errorMessage });
      // Clean up any partial render output
      const errorEl = document.getElementById(id);
      if (errorEl) {
        errorEl.remove();
      }
    } finally {
      renderingRef.current = false;
    }
  }, [code, theme]);

  useEffect(() => {
    render();
  }, [render]);

  return { ...result, containerRef };
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: add Mermaid rendering hook"
```

---

### Task 4: Core UI Components

**Files:**
- Create: `src/components/ErrorBoundary.tsx`
- Create: `src/components/SplitPane.tsx`
- Create: `src/components/MermaidEditor.tsx`
- Create: `src/components/GanttPreview.tsx`

- [ ] **Step 1: Create ErrorBoundary component**

Create `src/components/ErrorBoundary.tsx`:
```typescript
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-semibold text-red-500 mb-2">渲染错误</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              {this.state.error}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => this.setState({ hasError: false, error: '' })}
            >
              重试
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
```

- [ ] **Step 2: Create SplitPane component**

Create `src/components/SplitPane.tsx`:
```typescript
import { useState, useRef, useCallback, type ReactNode } from 'react';

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
  defaultRatio?: number;
  onRatioChange?: (ratio: number) => void;
  minLeftWidth?: number;
  minRightWidth?: number;
}

export function SplitPane({
  left,
  right,
  defaultRatio = 0.4,
  onRatioChange,
  minLeftWidth = 280,
  minRightWidth = 300,
}: SplitPaneProps) {
  const [ratio, setRatio] = useState(defaultRatio);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalWidth = rect.width;
    const newRatio = Math.max(
      minLeftWidth / totalWidth,
      Math.min(1 - minRightWidth / totalWidth, (e.clientX - rect.left) / totalWidth)
    );
    setRatio(newRatio);
    onRatioChange?.(newRatio);
  }, [minLeftWidth, minRightWidth, onRatioChange]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ width: `${ratio * 100}%` }} className="h-full overflow-hidden">
        {left}
      </div>
      <div
        className="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 transition-colors flex-shrink-0"
        onMouseDown={handleMouseDown}
      />
      <div style={{ width: `${(1 - ratio) * 100}%` }} className="h-full overflow-hidden">
        {right}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create MermaidEditor component**

Create `src/components/MermaidEditor.tsx`:
```typescript
import { useEffect, useRef } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';
import { type Extension } from '@codemirror/state';

interface MermaidEditorProps {
  value: string;
  onChange: (value: string) => void;
  theme: 'light' | 'dark';
}

export function MermaidEditor({ value, onChange, theme }: MermaidEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!editorRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString());
      }
    });

    const themeExtensions: Extension[] = theme === 'dark'
      ? [oneDark]
      : [];

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        history(),
        bracketMatching(),
        syntaxHighlighting(defaultHighlightStyle),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        updateListener,
        EditorView.lineWrapping,
        ...themeExtensions,
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto' },
          '.cm-content': { fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace", fontSize: '13px' },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [theme]); // Re-create editor on theme change

  // Sync external value changes (e.g., template loading)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentValue = view.state.doc.toString();
    if (currentValue !== value) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div
      ref={editorRef}
      className="h-full w-full"
    />
  );
}
```

- [ ] **Step 4: Create GanttPreview component**

Create `src/components/GanttPreview.tsx`:
```typescript
import { useMermaidRender } from '../hooks/useMermaidRender';
import { ErrorBoundary } from './ErrorBoundary';

interface GanttPreviewProps {
  code: string;
  theme: 'light' | 'dark';
}

export function GanttPreview({ code, theme }: GanttPreviewProps) {
  const { containerRef, success, error } = useMermaidRender(code, theme);

  return (
    <ErrorBoundary>
      <div
        className={`h-full w-full overflow-auto p-6 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {!code.trim() && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-lg">在左侧编辑器中输入 Mermaid 甘特图语法</p>
              <p className="text-sm mt-2">或从工具栏选择一个模板开始</p>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-red-600 dark:text-red-400 font-semibold text-sm mb-1">语法错误</h3>
            <p className="text-red-500 dark:text-red-300 text-xs font-mono whitespace-pre-wrap">{error}</p>
          </div>
        )}
        <div
          ref={containerRef}
          className="flex justify-center"
        />
      </div>
    </ErrorBoundary>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add core UI components (SplitPane, Editor, Preview, ErrorBoundary)"
```

---

### Task 5: Export Utilities

**Files:**
- Create: `src/utils/exportChart.ts`

- [ ] **Step 1: Create export utilities**

Create `src/utils/exportChart.ts`:
```typescript
import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import type { ExportOptions } from '../types';

export async function exportChart(
  element: HTMLElement,
  options: ExportOptions
): Promise<void> {
  const { format, quality, scale, backgroundColor } = options;

  switch (format) {
    case 'png':
      await exportAsPng(element, quality, scale, backgroundColor);
      break;
    case 'svg':
      await exportAsSvg(element, backgroundColor);
      break;
    case 'pdf':
      await exportAsPdf(element, scale, backgroundColor);
      break;
  }
}

async function exportAsPng(
  element: HTMLElement,
  quality: number,
  scale: number,
  backgroundColor: string
): Promise<void> {
  const dataUrl = await toPng(element, {
    quality,
    pixelRatio: scale,
    backgroundColor,
  });
  saveAs(dataUrl, 'gantt-chart.png');
}

async function exportAsSvg(
  element: HTMLElement,
  backgroundColor: string
): Promise<void> {
  const dataUrl = await toSvg(element, { backgroundColor });
  // Convert data URL to blob and save
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  saveAs(blob, 'gantt-chart.svg');
}

async function exportAsPdf(
  element: HTMLElement,
  scale: number,
  backgroundColor: string
): Promise<void> {
  const dataUrl = await toPng(element, {
    quality: 1,
    pixelRatio: scale,
    backgroundColor,
  });

  const img = new Image();
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
    img.src = dataUrl;
  });

  const imgWidth = img.width;
  const imgHeight = img.height;

  // Use landscape A4 if chart is wider than tall
  const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait';
  const pdf = new jsPDF(orientation, 'px', [imgWidth, imgHeight]);
  pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save('gantt-chart.pdf');
}

export function exportMermaidCode(code: string): void {
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'gantt-chart.mmd');
}

export function importMermaidCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mmd,.mermaid,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('未选择文件'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsText(file);
    };
    input.click();
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: add export utilities (PNG/SVG/PDF) and file import/export"
```

---

### Task 6: Toolbar & Modal Components

**Files:**
- Create: `src/components/ExportMenu.tsx`
- Create: `src/components/TemplateModal.tsx`
- Create: `src/components/Toolbar.tsx`
- Create: `src/components/StatusBar.tsx`

- [ ] **Step 1: Create ExportMenu component**

Create `src/components/ExportMenu.tsx`:
```typescript
import { useState, useRef, useEffect } from 'react';
import { exportChart } from '../utils/exportChart';
import type { ExportOptions } from '../types';

interface ExportMenuProps {
  chartElement: HTMLElement | null;
  theme: 'light' | 'dark';
}

export function ExportMenu({ chartElement, theme }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = async (format: ExportOptions['format']) => {
    if (!chartElement || isExporting) return;
    setIsExporting(true);
    setIsOpen(false);
    try {
      await exportChart(chartElement, {
        format,
        quality: 1,
        scale: 2,
        backgroundColor: theme === 'dark' ? '#1e1e2e' : '#ffffff',
      });
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {isExporting ? '导出中...' : '导出'}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[140px]">
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-t-lg"
            onClick={() => handleExport('png')}
          >
            📷 导出 PNG
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => handleExport('svg')}
          >
            🖼️ 导出 SVG
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-b-lg"
            onClick={() => handleExport('pdf')}
          >
            📄 导出 PDF
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create TemplateModal component**

Create `src/components/TemplateModal.tsx`:
```typescript
import { ganttTemplates } from '../utils/mermaidTemplates';
import type { GanttTemplate } from '../types';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: GanttTemplate) => void;
}

export function TemplateModal({ isOpen, onClose, onSelect }: TemplateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">选择模板</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">选择一个预设模板快速开始</p>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ganttTemplates.map((template) => (
            <button
              key={template.id}
              className="text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
              onClick={() => {
                onSelect(template);
                onClose();
              }}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-500">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {template.description}
              </p>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            onClick={onClose}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Toolbar component**

Create `src/components/Toolbar.tsx`:
```typescript
import { ExportMenu } from './ExportMenu';
import { TemplateModal } from './TemplateModal';
import { exportMermaidCode, importMermaidCode } from '../utils/exportChart';
import { ganttTemplates } from '../utils/mermaidTemplates';
import type { GanttTemplate } from '../types';
import { useState, useRef } from 'react';

interface ToolbarProps {
  code: string;
  onCodeChange: (code: string) => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
  chartElement: HTMLElement | null;
}

export function Toolbar({ code, onCodeChange, theme, onThemeChange, chartElement }: ToolbarProps) {
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleTemplateSelect = (template: GanttTemplate) => {
    onCodeChange(template.code);
  };

  const handleImport = async () => {
    try {
      const importedCode = await importMermaidCode();
      onCodeChange(importedCode);
    } catch (err) {
      console.error('Import failed:', err);
    }
  };

  const handleExportCode = () => {
    exportMermaidCode(code);
  };

  return (
    <>
      <div className={`h-12 flex items-center justify-between px-4 border-b ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700 text-gray-200'
          : 'bg-white border-gray-200 text-gray-800'
      }`}>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Gantt Studio
          </h1>
          <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
            Mermaid
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
            onClick={() => setIsTemplateOpen(true)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            模板
          </button>

          <button
            className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
            onClick={handleImport}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            导入
          </button>

          <button
            className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
            onClick={handleExportCode}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            保存 .mmd
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          <ExportMenu chartElement={chartElement} theme={theme} />

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          <button
            className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
            {theme === 'dark' ? '浅色' : '深色'}
          </button>
        </div>
      </div>

      <TemplateModal
        isOpen={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        onSelect={handleTemplateSelect}
      />
    </>
  );
}
```

- [ ] **Step 4: Create StatusBar component**

Create `src/components/StatusBar.tsx`:
```typescript
interface StatusBarProps {
  code: string;
  hasError: boolean;
  theme: 'light' | 'dark';
}

export function StatusBar({ code, hasError, theme }: StatusBarProps) {
  const lines = code.split('\n').length;
  const chars = code.length;

  return (
    <div className={`h-7 flex items-center justify-between px-4 text-xs border-t ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700 text-gray-400'
        : 'bg-gray-50 border-gray-200 text-gray-500'
    }`}>
      <div className="flex items-center gap-4">
        <span>Mermaid Gantt</span>
        {hasError && (
          <span className="text-red-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
            语法错误
          </span>
        )}
        {!hasError && code.trim() && (
          <span className="text-green-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
            渲染成功
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span>行: {lines}</span>
        <span>字符: {chars}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Toolbar, ExportMenu, TemplateModal, and StatusBar components"
```

---

### Task 7: App Root & Final Integration

**Files:**
- Create: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create App component**

Create `src/App.tsx`:
```typescript
import { useState, useRef, useCallback } from 'react';
import { SplitPane } from './components/SplitPane';
import { MermaidEditor } from './components/MermaidEditor';
import { GanttPreview } from './components/GanttPreview';
import { Toolbar } from './components/Toolbar';
import { StatusBar } from './components/StatusBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { ganttTemplates } from './utils/mermaidTemplates';

const DEFAULT_CODE = ganttTemplates[0].code;

export default function App() {
  const [code, setCode] = useLocalStorage('gantt-studio-code', DEFAULT_CODE);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('gantt-studio-theme', 'light');
  const [splitRatio, setSplitRatio] = useLocalStorage('gantt-studio-split', 0.4);
  const [hasError, setHasError] = useState(false);

  const debouncedCode = useDebounce(code, 300);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, [setCode]);

  const handleThemeChange = useCallback((newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [setTheme]);

  const handleErrorChange = useCallback((error: boolean) => {
    setHasError(error);
  }, []);

  // Get the chart element for export
  const chartElement = previewContainerRef.current?.querySelector('.mermaid') as HTMLElement
    || previewContainerRef.current?.firstChild as HTMLElement
    || null;

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <Toolbar
        code={code}
        onCodeChange={handleCodeChange}
        theme={theme}
        onThemeChange={handleThemeChange}
        chartElement={chartElement}
      />
      <div className="flex-1 overflow-hidden">
        <SplitPane
          defaultRatio={splitRatio}
          onRatioChange={setSplitRatio}
          left={
            <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
              <div className={`px-3 py-1.5 text-xs font-medium border-b ${
                theme === 'dark'
                  ? 'text-gray-400 border-gray-700 bg-gray-800/50'
                  : 'text-gray-500 border-gray-200 bg-gray-50'
              }`}>
                Mermaid 编辑器
              </div>
              <div className="flex-1 overflow-hidden">
                <MermaidEditor value={code} onChange={handleCodeChange} theme={theme} />
              </div>
            </div>
          }
          right={
            <div ref={previewContainerRef} className="h-full">
              <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <div className={`px-3 py-1.5 text-xs font-medium border-b ${
                  theme === 'dark'
                    ? 'text-gray-400 border-gray-700 bg-gray-800/50'
                    : 'text-gray-500 border-gray-200 bg-gray-50'
                }`}>
                  预览
                </div>
                <div className="flex-1 overflow-hidden">
                  <GanttPreview code={debouncedCode} theme={theme} />
                </div>
              </div>
            </div>
          }
        />
      </div>
      <StatusBar code={code} hasError={hasError} theme={theme} />
    </div>
  );
}
```

- [ ] **Step 2: Update main.tsx**

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 3: Verify the app builds and runs**

Run: `cd /workspace && npm run build`
Expected: Build completes without errors

Run: `cd /workspace && npm run dev`
Expected: Dev server starts, app is accessible

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: integrate all components into App root"
```

---

### Task 8: Polish & Responsive Design

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Toolbar.tsx`
- Modify: `src/components/SplitPane.tsx`

- [ ] **Step 1: Add responsive styles and polish**

Update `src/index.css` to add:
```css
@import "tailwindcss";

:root {
  --editor-bg: #1e1e2e;
  --preview-bg: #ffffff;
  --toolbar-bg: #f8f9fa;
  --border-color: #e2e8f0;
}

[data-theme="dark"] {
  --preview-bg: #1e1e2e;
  --toolbar-bg: #2d2d3f;
  --border-color: #4a4a6a;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#root {
  width: 100vw;
  height: 100vh;
}

/* Mermaid chart responsive */
.mermaid svg {
  max-width: 100%;
  height: auto;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4a4a6a;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #5a5a7a;
}

/* Mobile responsive: stack layout */
@media (max-width: 768px) {
  .split-pane-mobile {
    flex-direction: column !important;
  }
}
```

- [ ] **Step 2: Verify build**

Run: `cd /workspace && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add responsive styles and polish"
```

---

## Feature Summary

| 功能 | 说明 |
|------|------|
| Mermaid 语法编辑 | CodeMirror 编辑器，支持语法高亮、行号、自动缩进 |
| 实时预览 | 输入防抖 300ms 后自动渲染甘特图 |
| 分栏布局 | 可拖拽调整左右分栏比例 |
| 深色/浅色主题 | 一键切换，编辑器和预览同步切换 |
| 模板系统 | 4 个预设模板（软件开发、市场营销、建筑工程、空白） |
| 导出 PNG/SVG/PDF | 高清导出，支持 2x 缩放 |
| 导入/导出 .mmd 文件 | 支持 Mermaid 文件的导入和导出 |
| 本地持久化 | 代码、主题、分栏比例自动保存到 localStorage |
| 语法错误提示 | 实时检测 Mermaid 语法错误并显示 |
| 状态栏 | 显示行数、字符数、渲染状态 |
| 响应式设计 | 适配桌面和移动端 |
