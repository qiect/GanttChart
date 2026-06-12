<template>
  <div class="gantt-preview-root h-full w-full flex flex-col" style="background: var(--bg-secondary);">
    <!-- Preview Area -->
    <div class="flex-1 relative overflow-hidden">
      <!-- Subtle grid background -->
      <div class="absolute inset-0 gantt-grid-bg" />

      <!-- Loading Overlay -->
      <Transition name="fade">
        <div v-if="rendering" class="absolute inset-0 z-20 flex items-center justify-center" style="background: rgba(var(--bg-secondary-rgb, 255,255,255), 0.6); backdrop-filter: blur(4px);">
          <div class="flex flex-col items-center gap-3">
            <div class="render-spinner" />
            <span class="text-xs font-medium" style="color: var(--text-tertiary);">渲染中...</span>
          </div>
        </div>
      </Transition>

      <!-- Error State -->
      <Transition name="slide-down">
        <div v-if="error" class="absolute top-3 left-3 right-3 z-30">
          <div class="error-banner flex items-start gap-3 px-4 py-3 rounded-xl" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); backdrop-filter: blur(12px);">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style="background: rgba(239,68,68,0.12);">
              <svg class="w-4 h-4" style="color: var(--error);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold" style="color: var(--error);">语法错误</h4>
              <p class="text-xs font-mono mt-0.5 whitespace-pre-wrap break-all" style="color: var(--error); opacity: 0.75;">{{ error }}</p>
            </div>
            <button @click="error = ''" class="shrink-0 p-1 rounded-md cursor-pointer transition-colors"
              style="color: var(--text-tertiary);"
              @mouseenter="($event.target as HTMLElement).style.background = 'rgba(239,68,68,0.1)'"
              @mouseleave="($event.target as HTMLElement).style.background = 'transparent'">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>

      <!-- Empty State -->
      <div v-if="!code.trim()" class="absolute inset-0 z-10 flex items-center justify-center">
        <div class="text-center px-6 animate-fade-in">
          <div class="empty-illustration mx-auto mb-6">
            <svg width="120" height="96" viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Background shape -->
              <rect x="8" y="8" width="104" height="80" rx="12" :fill="isDark ? '#1c1f2e' : '#f1f3f7'" :stroke="isDark ? '#2a2e42' : '#e4e7ee'" stroke-width="1"/>
              <!-- Grid lines -->
              <line x1="8" y1="32" x2="112" y2="32" :stroke="isDark ? '#2a2e42' : '#e4e7ee'" stroke-width="1"/>
              <line x1="8" y1="56" x2="112" y2="56" :stroke="isDark ? '#2a2e42' : '#e4e7ee'" stroke-width="1"/>
              <line x1="40" y1="8" x2="40" y2="88" :stroke="isDark ? '#2a2e42' : '#e4e7ee'" stroke-width="1" stroke-dasharray="3 3"/>
              <line x1="72" y1="8" x2="72" y2="88" :stroke="isDark ? '#2a2e42' : '#e4e7ee'" stroke-width="1" stroke-dasharray="3 3"/>
              <!-- Task bars -->
              <rect x="44" y="16" width="36" height="10" rx="3" fill="var(--accent)" opacity="0.8">
                <animate attributeName="width" from="0" to="36" dur="0.8s" fill="freeze" begin="0.2s"/>
              </rect>
              <rect x="44" y="40" width="24" height="10" rx="3" fill="var(--accent)" opacity="0.5">
                <animate attributeName="width" from="0" to="24" dur="0.6s" fill="freeze" begin="0.5s"/>
              </rect>
              <rect x="76" y="40" width="16" height="10" rx="3" fill="var(--accent)" opacity="0.35">
                <animate attributeName="width" from="0" to="16" dur="0.5s" fill="freeze" begin="0.7s"/>
              </rect>
              <rect x="44" y="64" width="48" height="10" rx="3" fill="var(--accent)" opacity="0.25">
                <animate attributeName="width" from="0" to="48" dur="0.9s" fill="freeze" begin="0.9s"/>
              </rect>
              <!-- Milestone diamond -->
              <rect x="82" y="14" width="6" height="6" rx="1" fill="var(--warning)" transform="rotate(45 85 17)" opacity="0.9">
                <animate attributeName="opacity" from="0" to="0.9" dur="0.3s" fill="freeze" begin="1.2s"/>
              </rect>
            </svg>
          </div>
          <p class="text-base font-semibold" style="color: var(--text-secondary);">在编辑器中输入甘特图语法</p>
          <p class="text-sm mt-1.5" style="color: var(--text-tertiary);">或从工具栏选择模板快速开始</p>
        </div>
      </div>

      <!-- SVG Container -->
      <div
        v-if="svg && code.trim()"
        ref="scrollContainerRef"
        class="absolute inset-0 overflow-auto gantt-preview-scroll"
        @wheel="onWheel"
      >
        <div
          ref="containerRef"
          class="gantt-svg-wrapper"
          :style="{ transform: `scale(${zoom})`, transformOrigin: 'top left' }"
          v-html="svg"
        />
      </div>

      <!-- Floating Control Bar -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div class="floating-bar flex items-center gap-1 px-2 py-1.5 rounded-2xl">
          <!-- Chart Theme Selector -->
          <div class="flex items-center gap-0.5 px-1">
            <button
              v-for="preset in chartThemePresets"
              :key="preset.id"
              @click="$emit('chartThemeChange', preset.id)"
              class="theme-dot relative w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
              :style="chartTheme === preset.id ? {
                background: preset.swatch,
                boxShadow: `0 0 0 2px var(--bg-elevated), 0 0 0 3.5px ${preset.swatch}`,
              } : {}"
              :title="preset.name"
            >
              <span v-if="chartTheme !== preset.id" class="w-3.5 h-3.5 rounded-full transition-transform duration-200"
                :style="{ background: preset.swatch, opacity: 0.7 }"
                @mouseenter="($event.target as HTMLElement).style.transform = 'scale(1.15)'; ($event.target as HTMLElement).style.opacity = '1'"
                @mouseleave="($event.target as HTMLElement).style.transform = 'scale(1)'; ($event.target as HTMLElement).style.opacity = '0.7'" />
              <svg v-else class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>

          <div class="w-px h-5 shrink-0" style="background: var(--border-primary);" />

          <!-- Zoom Controls -->
          <button @click="zoomOut" class="bar-btn p-1.5 rounded-lg cursor-pointer" title="缩小">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
          </button>

          <div class="flex items-center gap-1.5 px-1">
            <input
              type="range"
              :min="0.3"
              :max="3"
              :step="0.05"
              :value="zoom"
              @input="onRangeInput"
              class="zoom-slider w-20"
            />
            <span class="text-[10px] font-mono font-semibold min-w-[2.5rem] text-center tabular-nums" style="color: var(--text-tertiary);">{{ Math.round(zoom * 100) }}%</span>
          </div>

          <button @click="zoomIn" class="bar-btn p-1.5 rounded-lg cursor-pointer" title="放大">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </button>

          <div class="w-px h-5 shrink-0" style="background: var(--border-primary);" />

          <!-- Fit & Reset -->
          <button @click="fitToWidth" class="bar-btn px-2 py-1 rounded-lg cursor-pointer text-[11px] font-medium" title="适应宽度">
            适应
          </button>
          <button @click="zoomReset" class="bar-btn px-2 py-1 rounded-lg cursor-pointer text-[11px] font-medium" title="重置缩放">
            1:1
          </button>

          <div class="w-px h-5 shrink-0" style="background: var(--border-primary);" />

          <!-- Render Button -->
          <button @click="render" class="bar-btn render-btn px-2.5 py-1 rounded-lg cursor-pointer text-[11px] font-semibold flex items-center gap-1"
            :style="{
              color: hasError ? 'var(--error)' : 'var(--success)',
            }"
            :title="hasError ? '重新渲染' : '手动渲染'">
            <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': rendering }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            渲染
          </button>
        </div>
      </div>

      <!-- Zoom indicator (shows briefly when zooming) -->
      <Transition name="fade">
        <div v-if="showZoomIndicator" class="absolute top-3 right-3 z-20">
          <div class="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tabular-nums"
            style="background: var(--bg-elevated); border: 1px solid var(--border-primary); color: var(--text-secondary); box-shadow: var(--shadow-md);">
            {{ Math.round(zoom * 100) }}%
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import mermaid from 'mermaid'
import { getMermaidConfig, chartThemePresets } from '../utils/mermaidConfig'
import type { ChartThemeId } from '../types'

const props = defineProps<{
  code: string
  theme: 'light' | 'dark'
  chartTheme: ChartThemeId
}>()

const emit = defineEmits<{
  errorChange: [hasError: boolean]
  chartThemeChange: [theme: ChartThemeId]
}>()

const hasError = ref(false)
const isDark = computed(() => props.theme === 'dark')

const svg = ref('')
const error = ref('')
const zoom = ref(1)
const rendering = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const scrollContainerRef = ref<HTMLElement | null>(null)
const showZoomIndicator = ref(false)
let zoomIndicatorTimer: ReturnType<typeof setTimeout> | null = null

let renderCounter = 0

const flashZoomIndicator = () => {
  showZoomIndicator.value = true
  if (zoomIndicatorTimer) clearTimeout(zoomIndicatorTimer)
  zoomIndicatorTimer = setTimeout(() => {
    showZoomIndicator.value = false
  }, 800)
}

const zoomIn = () => {
  zoom.value = Math.min(3, Math.round((zoom.value + 0.1) * 10) / 10)
  flashZoomIndicator()
}
const zoomOut = () => {
  zoom.value = Math.max(0.3, Math.round((zoom.value - 0.1) * 10) / 10)
  flashZoomIndicator()
}
const zoomReset = () => {
  zoom.value = 1
  flashZoomIndicator()
}

const fitToWidth = () => {
  if (!scrollContainerRef.value || !containerRef.value) return
  const svgEl = containerRef.value.querySelector('svg')
  if (!svgEl) return
  const naturalWidth = svgEl.getBoundingClientRect().width / zoom.value
  const containerWidth = scrollContainerRef.value.clientWidth - 48
  if (naturalWidth > 0) {
    const newZoom = containerWidth / naturalWidth
    zoom.value = Math.max(0.5, Math.min(3, Math.round(newZoom * 10) / 10))
    flashZoomIndicator()
  }
}

const onRangeInput = (e: Event) => {
  zoom.value = parseFloat((e.target as HTMLInputElement).value)
  flashZoomIndicator()
}

// Scroll to zoom: mouse wheel zooms in/out centered on cursor
const onWheel = (e: WheelEvent) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.08 : 0.08
    zoom.value = Math.max(0.3, Math.min(3, Math.round((zoom.value + delta) * 100) / 100))
    flashZoomIndicator()
  }
}

const render = async () => {
  if (!props.code.trim()) {
    svg.value = ''
    error.value = ''
    hasError.value = false
    emit('errorChange', false)
    return
  }

  if (rendering.value) return
  rendering.value = true
  const id = `mermaid-gantt-${++renderCounter}`

  // Clean up any leftover mermaid render elements
  document.querySelectorAll('[id^="mermaid-gantt-"]').forEach(el => {
    if (el.id !== id) el.remove()
  })
  document.querySelectorAll('.d3-tip, .mermaidTooltip').forEach(el => el.remove())

  try {
    mermaid.initialize(getMermaidConfig(props.chartTheme))
    const result = await mermaid.render(id, props.code)
    svg.value = result.svg
    error.value = ''
    hasError.value = false
    emit('errorChange', false)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '渲染失败'
    error.value = errorMessage
    hasError.value = true
    emit('errorChange', true)
    const errorEl = document.getElementById(id)
    if (errorEl) errorEl.remove()
    const d3ErrorEl = document.getElementById(`d3-${id}`)
    if (d3ErrorEl) d3ErrorEl.remove()
  } finally {
    rendering.value = false
  }
}

// Post-process SVG to fix text visibility and bar width issues
const postProcessSvg = () => {
  if (!containerRef.value) return
  const svgEl = containerRef.value.querySelector('svg')
  if (!svgEl) return

  svgEl.setAttribute('overflow', 'visible')

  const rects = svgEl.querySelectorAll('rect')
  const rectMap = new Map<string, { x: number; y: number; width: number; height: number; el: SVGRectElement }>()

  rects.forEach(rect => {
    const w = parseFloat(rect.getAttribute('width') || '0')
    const x = parseFloat(rect.getAttribute('x') || '0')
    const y = parseFloat(rect.getAttribute('y') || '0')
    const h = parseFloat(rect.getAttribute('height') || '0')

    if (w > 0 && w < 6) {
      rect.setAttribute('width', '6')
    }

    if (w > 0 && h > 0) {
      rectMap.set(`${Math.round(y)}`, { x, y, width: w, height: h, el: rect })
    }
  })

  const MIN_BAR_WIDTH_FOR_TEXT = 40
  const TEXT_OFFSET_RIGHT = 6

  const textElements = svgEl.querySelectorAll('text')
  textElements.forEach(textEl => {
    const parent = textEl.parentElement
    if (parent && parent.hasAttribute('clip-path')) {
      parent.removeAttribute('clip-path')
    }
    textEl.setAttribute('overflow', 'visible')

    const textY = parseFloat(textEl.getAttribute('y') || '0')
    const textContent = textEl.textContent?.trim() || ''

    let matchedRect: { x: number; y: number; width: number; height: number; el: SVGRectElement } | null = null
    for (const [, rectInfo] of rectMap) {
      if (Math.abs(rectInfo.y - textY) < rectInfo.height) {
        matchedRect = rectInfo
        break
      }
    }

    if (matchedRect) {
      const barWidth = matchedRect.width
      const barRight = matchedRect.x + barWidth

      const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title')
      titleEl.textContent = textContent
      const targetParent = matchedRect.el.parentElement || matchedRect.el
      targetParent.insertBefore(titleEl, targetParent.firstChild)

      if (barWidth < MIN_BAR_WIDTH_FOR_TEXT && textContent) {
        const currentX = parseFloat(textEl.getAttribute('x') || '0')
        if (currentX >= matchedRect.x && currentX <= barRight) {
          textEl.setAttribute('x', String(barRight + TEXT_OFFSET_RIGHT))
          textEl.style.fill = 'var(--text-secondary, #5c6170)'
          textEl.style.fontSize = '11px'
          textEl.style.fontWeight = '500'
        }
      } else if (barWidth >= MIN_BAR_WIDTH_FOR_TEXT && textContent) {
        const textLen = textContent.length
        const approxCharWidth = 7
        const maxChars = Math.floor((barWidth - 8) / approxCharWidth)
        if (textLen > maxChars && maxChars > 2) {
          textEl.textContent = textContent.slice(0, maxChars - 1) + '…'
        }
      }

      const group = matchedRect.el.parentElement
      if (group && group.tagName === 'g') {
        group.classList.add('gantt-task-group')
        group.style.cursor = 'pointer'
      }
    }
  })

  const svgWidth = parseFloat(svgEl.getAttribute('width') || '0')
  const viewBox = svgEl.getAttribute('viewBox')
  if (svgWidth > 5000 && viewBox) {
    svgEl.setAttribute('width', '5000')
  }
}

watch([() => props.code, () => props.chartTheme], () => {
  render()
}, { immediate: true })

watch(svg, (newSvg) => {
  if (newSvg) {
    nextTick(() => {
      postProcessSvg()
      fitToWidth()
    })
  }
})
</script>

<style scoped>
/* ── Root ── */
.gantt-preview-root {
  position: relative;
}

/* ── Grid Background ── */
.gantt-grid-bg {
  background-image:
    linear-gradient(var(--border-secondary) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-secondary) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
  pointer-events: none;
}

/* ── SVG Wrapper ── */
.gantt-svg-wrapper {
  padding: 32px;
  display: inline-block;
  min-width: 100%;
  transition: transform 0.15s ease-out;
}

.gantt-svg-wrapper :deep(svg) {
  overflow: visible !important;
}

.gantt-svg-wrapper :deep(svg text) {
  overflow: visible !important;
}

.gantt-svg-wrapper :deep(svg .taskText) {
  overflow: visible !important;
}

/* Force all SVG text to use CSS variable colors */
.gantt-svg-wrapper :deep(svg .tick text),
.gantt-svg-wrapper :deep(svg .axis text),
.gantt-svg-wrapper :deep(svg .sectionTitle),
.gantt-svg-wrapper :deep(svg .taskTextOutside),
.gantt-svg-wrapper :deep(svg text:not(.taskText)) {
  fill: var(--text-secondary, #5c6170) !important;
}

.gantt-svg-wrapper :deep(svg .taskText) {
  fill: var(--text-primary, #1a1d26) !important;
}

.gantt-svg-wrapper :deep(svg .sectionTitle) {
  fill: var(--text-primary, #1a1d26) !important;
  font-weight: 600 !important;
}

.gantt-svg-wrapper :deep(svg .grid .tick line) {
  stroke: var(--border-primary, #e4e7ee) !important;
}

/* Hover highlight for task groups */
.gantt-svg-wrapper :deep(.gantt-task-group) rect {
  transition: filter 0.15s ease, opacity 0.15s ease;
}

.gantt-svg-wrapper :deep(.gantt-task-group:hover) rect {
  filter: brightness(1.12);
  stroke-width: 1.5;
  stroke: currentColor;
  stroke-opacity: 0.4;
}

.gantt-svg-wrapper :deep(.gantt-task-group:hover) {
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12));
}

/* ── Floating Control Bar ── */
.floating-bar {
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

[data-theme="dark"] .floating-bar {
  background: rgba(30, 33, 50, 0.92);
  border-color: var(--border-primary);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.04);
}

/* ── Bar Button ── */
.bar-btn {
  color: var(--text-tertiary);
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar-btn:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.bar-btn:active {
  transform: scale(0.95);
}

/* ── Render Button ── */
.render-btn:hover {
  background: var(--bg-tertiary);
}

/* ── Zoom Slider ── */
.zoom-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--border-primary);
  outline: none;
  cursor: pointer;
}

.zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 2px solid var(--accent);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.zoom-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 3px var(--accent-glow), 0 1px 4px rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.zoom-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 2px solid var(--accent);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* ── Theme Dot ── */
.theme-dot {
  transition: all 0.2s ease;
}

.theme-dot:hover {
  transform: scale(1.15);
}

/* ── Render Spinner ── */
.render-spinner {
  width: 28px;
  height: 28px;
  border: 2.5px solid var(--border-primary);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Scrollbar ── */
.gantt-preview-scroll {
  scrollbar-width: thin;
}

/* ── Animations ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slide-down-leave-active {
  transition: all 0.15s ease-in;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Empty Illustration ── */
.empty-illustration {
  opacity: 0.9;
}

/* ── Error Banner ── */
.error-banner {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}
</style>
