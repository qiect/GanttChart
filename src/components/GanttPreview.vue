<template>
  <div class="gantt-preview" :class="theme === 'dark' ? 'gantt-preview--dark' : 'gantt-preview--light'">
    <!-- 空状态 -->
    <div v-if="!code.trim()" class="gantt-preview__empty">
      <div class="gantt-preview__empty-icon">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="12" width="48" height="40" rx="4" :stroke="theme === 'dark' ? '#4a5568' : '#cbd5e0'" stroke-width="2" fill="none"/>
          <rect x="14" y="22" width="16" height="6" rx="2" :fill="theme === 'dark' ? '#4F8CF7' : '#4F8CF7'" opacity="0.8"/>
          <rect x="14" y="32" width="24" height="6" rx="2" :fill="theme === 'dark' ? '#7C5CFC' : '#7C5CFC'" opacity="0.8"/>
          <rect x="14" y="42" width="12" height="6" rx="2" :fill="theme === 'dark' ? '#2ECDA7' : '#2ECDA7'" opacity="0.8"/>
          <line x1="14" y1="18" x2="50" y2="18" :stroke="theme === 'dark' ? '#4a5568' : '#e2e8f0'" stroke-width="1"/>
        </svg>
      </div>
      <p class="gantt-preview__empty-title">在编辑器中输入 Mermaid 甘特图语法</p>
      <p class="gantt-preview__empty-subtitle">或从工具栏选择一个模板开始</p>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="gantt-preview__error">
      <div class="gantt-preview__error-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zM10 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div>
        <h3 class="gantt-preview__error-title">语法错误</h3>
        <p class="gantt-preview__error-msg">{{ error }}</p>
      </div>
    </div>

    <!-- 工具栏 -->
    <div v-if="svg && code.trim()" class="gantt-preview__toolbar">
      <div class="gantt-preview__toolbar-group">
        <button @click="zoomOut" class="gantt-preview__zoom-btn" title="缩小">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
        </button>
        <span class="gantt-preview__zoom-label">{{ Math.round(zoom * 100) }}%</span>
        <button @click="zoomIn" class="gantt-preview__zoom-btn" title="放大">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        </button>
        <div class="gantt-preview__toolbar-divider"></div>
        <button @click="zoomReset" class="gantt-preview__zoom-btn gantt-preview__zoom-btn--text" title="重置缩放">
          重置
        </button>
      </div>
    </div>

    <!-- 甘特图渲染区域 -->
    <div v-if="svg && code.trim()" class="gantt-preview__canvas">
      <div ref="containerRef" class="gantt-preview__svg-wrap" :style="{ transform: `scale(${zoom})`, transformOrigin: 'top center' }" v-html="svg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import mermaid from 'mermaid'
import { getMermaidConfig } from '../utils/mermaidConfig'

const props = defineProps<{
  code: string
  theme: 'light' | 'dark'
}>()

const emit = defineEmits<{
  errorChange: [hasError: boolean]
}>()

const svg = ref('')
const error = ref('')
const zoom = ref(1)

let renderCounter = 0
let rendering = false

const zoomIn = () => { zoom.value = Math.min(3, zoom.value + 0.2) }
const zoomOut = () => { zoom.value = Math.max(0.3, zoom.value - 0.2) }
const zoomReset = () => { zoom.value = 1 }

const render = async () => {
  if (!props.code.trim()) {
    svg.value = ''
    error.value = ''
    emit('errorChange', false)
    return
  }

  if (rendering) return
  rendering = true
  const id = `mermaid-gantt-${++renderCounter}`

  try {
    mermaid.initialize(getMermaidConfig(props.theme))
    const result = await mermaid.render(id, props.code)
    svg.value = result.svg
    error.value = ''
    emit('errorChange', false)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '渲染失败'
    error.value = errorMessage
    emit('errorChange', true)
    const errorEl = document.getElementById(id)
    if (errorEl) errorEl.remove()
  } finally {
    rendering = false
  }
}

watch([() => props.code, () => props.theme], render, { immediate: true })
</script>

<style scoped>
.gantt-preview {
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.gantt-preview--light {
  background: linear-gradient(165deg, #f8faff 0%, #f0f4fc 40%, #f5f0ff 100%);
}

.gantt-preview--dark {
  background: linear-gradient(165deg, #0f1320 0%, #141b2d 40%, #1a1230 100%);
}

/* 空状态 */
.gantt-preview__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  user-select: none;
}

.gantt-preview__empty-icon {
  margin-bottom: 1.25rem;
  opacity: 0.7;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.gantt-preview__empty-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.375rem;
}

.gantt-preview--light .gantt-preview__empty-title {
  color: #64748b;
}

.gantt-preview--dark .gantt-preview__empty-title {
  color: #94a3b8;
}

.gantt-preview__empty-subtitle {
  font-size: 0.8125rem;
}

.gantt-preview--light .gantt-preview__empty-subtitle {
  color: #94a3b8;
}

.gantt-preview--dark .gantt-preview__empty-subtitle {
  color: #64748b;
}

/* 错误提示 */
.gantt-preview__error {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1rem 1.5rem 0;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid;
}

.gantt-preview--light .gantt-preview__error {
  background: rgba(254, 242, 242, 0.9);
  border-color: #fecaca;
  color: #dc2626;
}

.gantt-preview--dark .gantt-preview__error {
  background: rgba(127, 29, 29, 0.3);
  border-color: rgba(220, 38, 38, 0.4);
  color: #fca5a5;
}

.gantt-preview__error-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
  opacity: 0.8;
}

.gantt-preview__error-title {
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.gantt-preview__error-msg {
  font-size: 0.75rem;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  white-space: pre-wrap;
  word-break: break-all;
  opacity: 0.85;
  line-height: 1.5;
}

/* 工具栏 */
.gantt-preview__toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1.5rem 0;
  flex-shrink: 0;
}

.gantt-preview__toolbar-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 0.625rem;
  border: 1px solid;
}

.gantt-preview--light .gantt-preview__toolbar-group {
  background: rgba(255, 255, 255, 0.7);
  border-color: #e2e8f0;
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.gantt-preview--dark .gantt-preview__toolbar-group {
  background: rgba(30, 37, 56, 0.7);
  border-color: #2d3748;
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.gantt-preview__zoom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  background: transparent;
}

.gantt-preview--light .gantt-preview__zoom-btn {
  color: #64748b;
}

.gantt-preview--light .gantt-preview__zoom-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

.gantt-preview--dark .gantt-preview__zoom-btn {
  color: #94a3b8;
}

.gantt-preview--dark .gantt-preview__zoom-btn:hover {
  background: #2d3748;
  color: #e2e8f0;
}

.gantt-preview__zoom-btn--text {
  width: auto;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.gantt-preview__zoom-label {
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 2.75rem;
  text-align: center;
  user-select: none;
}

.gantt-preview--light .gantt-preview__zoom-label {
  color: #64748b;
}

.gantt-preview--dark .gantt-preview__zoom-label {
  color: #94a3b8;
}

.gantt-preview__toolbar-divider {
  width: 1px;
  height: 1rem;
  margin: 0 0.25rem;
}

.gantt-preview--light .gantt-preview__toolbar-divider {
  background: #e2e8f0;
}

.gantt-preview--dark .gantt-preview__toolbar-divider {
  background: #4a5568;
}

/* 画布区域 */
.gantt-preview__canvas {
  flex: 1;
  overflow: auto;
  padding: 1rem 1.5rem 2rem;
  display: flex;
  justify-content: center;
}

.gantt-preview__svg-wrap {
  transition: transform 0.2s ease;
}

/* 自定义 mermaid 甘特图 SVG 样式 */
.gantt-preview__canvas :deep(svg) {
  max-width: none;
}

/* 条形圆角 + 阴影 */
.gantt-preview__canvas :deep(.task) {
  border-radius: 4px !important;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.08));
}

.gantt-preview--dark .gantt-preview__canvas :deep(.task) {
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
}

/* 条形 rect 圆角 */
.gantt-preview__canvas :deep(rect.task) {
  rx: 4;
  ry: 4;
}

/* 活跃任务条 */
.gantt-preview__canvas :deep(rect.task.active0),
.gantt-preview__canvas :deep(rect.task.active1),
.gantt-preview__canvas :deep(rect.task.active2),
.gantt-preview__canvas :deep(rect.task.active3) {
  rx: 4;
  ry: 4;
}

/* 已完成任务条 */
.gantt-preview__canvas :deep(rect.task.done0),
.gantt-preview__canvas :deep(rect.task.done1),
.gantt-preview__canvas :deep(rect.task.done2),
.gantt-preview__canvas :deep(rect.task.done3) {
  rx: 4;
  ry: 4;
}

/* 关键任务条 */
.gantt-preview__canvas :deep(rect.task.crit0),
.gantt-preview__canvas :deep(rect.task.crit1),
.gantt-preview__canvas :deep(rect.task.crit2),
.gantt-preview__canvas :deep(rect.task.crit3) {
  rx: 4;
  ry: 4;
}

/* 里程碑菱形 */
.gantt-preview__canvas :deep(rect.task.milestone) {
  rx: 0;
  ry: 0;
}

/* 分区标题样式 */
.gantt-preview__canvas :deep(.sectionTitle) {
  font-weight: 600 !important;
  letter-spacing: 0.01em;
}

/* 网格线样式 */
.gantt-preview--light .gantt-preview__canvas :deep(.grid .tick line) {
  stroke: #e8ecf2;
}

.gantt-preview--dark .gantt-preview__canvas :deep(.grid .tick line) {
  stroke: #2d3748;
}

/* 今日线 */
.gantt-preview__canvas :deep(line.today) {
  stroke-dasharray: 6 3;
  stroke-width: 1.5;
}

/* 任务文字 */
.gantt-preview__canvas :deep(.taskText) {
  font-weight: 500;
}

/* 标题样式 */
.gantt-preview__canvas :deep(.titleText) {
  font-weight: 700 !important;
  letter-spacing: -0.01em;
}
</style>
