<template>
  <div class="h-full w-full flex flex-col" style="background: var(--bg-secondary);">
    <!-- Toolbar -->
    <div class="shrink-0 flex items-center justify-between px-4 py-1.5 border-b"
      style="border-color: var(--border-secondary); background: var(--bg-tertiary);">
      <!-- Left: Chart Theme Selector -->
      <div class="flex items-center gap-2.5">
        <span class="text-[10px] font-semibold tracking-widest uppercase shrink-0"
          style="color: var(--text-tertiary); letter-spacing: 0.08em;">主题</span>
        <div class="w-px h-3.5" style="background: var(--border-primary);"></div>
        <div class="flex items-center gap-1">
          <button
            v-for="preset in chartThemePresets"
            :key="preset.id"
            @click="$emit('chartThemeChange', preset.id)"
            class="relative flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-md cursor-pointer transition-all duration-200 font-medium"
            :style="chartTheme === preset.id ? {
              background: preset.swatch,
              color: '#ffffff',
              boxShadow: `0 2px 8px ${preset.swatch}40`,
            } : {
              color: 'var(--text-tertiary)',
              background: 'transparent',
            }"
            @mouseenter="chartTheme !== preset.id && (($event.target as HTMLElement).style.background = 'var(--bg-secondary)')"
            @mouseleave="chartTheme !== preset.id && (($event.target as HTMLElement).style.background = 'transparent')"
            :title="preset.name"
          >
            <span class="w-2 h-2 rounded-full shrink-0"
              :style="{ background: chartTheme === preset.id ? 'rgba(255,255,255,0.6)' : preset.swatch }"></span>
            {{ preset.name }}
          </button>
        </div>
      </div>

      <!-- Right: Zoom Controls + Render Button -->
      <div class="flex items-center gap-1">
        <button @click="zoomOut" class="premium-btn p-1.5 rounded-md cursor-pointer transition-all duration-200"
          :style="{ color: 'var(--text-tertiary)' }"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-secondary)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'"
          title="缩小">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
        </button>
        <!-- Zoom Slider with drag support -->
        <div
          class="relative w-24 mx-0.5 select-none"
          style="height: 20px; cursor: pointer;"
          ref="sliderRef"
          @mousedown="onSliderMouseDown"
        >
          <!-- Track -->
          <div class="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] rounded-full"
            style="background: var(--border-primary);">
            <!-- Filled portion -->
            <div class="absolute left-0 top-0 h-full rounded-full transition-[width] duration-75"
              :style="{ width: `${zoomRatio * 100}%`, background: 'var(--accent)' }" />
          </div>
          <!-- Thumb -->
          <div class="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-[left] duration-75"
            :style="{
              left: `${zoomRatio * 100}%`,
              transform: 'translate(-50%, -50%)',
              background: 'var(--bg-elevated)',
              border: '2px solid var(--accent)',
              boxShadow: isDragging ? '0 0 0 3px var(--accent-glow)' : '0 1px 3px rgba(0,0,0,0.12)',
              transition: isDragging ? 'none' : 'left 75ms ease, box-shadow 200ms ease',
            }" />
        </div>
        <button @click="zoomIn" class="premium-btn p-1.5 rounded-md cursor-pointer transition-all duration-200"
          :style="{ color: 'var(--text-tertiary)' }"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-secondary)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'"
          title="放大">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        </button>
        <span class="text-[11px] min-w-[2.5rem] text-center font-mono font-medium" style="color: var(--text-tertiary);">{{ Math.round(zoom * 100) }}%</span>
        <div class="w-px h-4 mx-1" :style="{ background: 'var(--border-primary)' }" />
        <button @click="fitToWidth" class="premium-btn px-2 py-1 rounded-md cursor-pointer text-[11px] font-medium transition-all duration-200"
          :style="{ color: 'var(--text-tertiary)' }"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-secondary)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'"
          title="适应宽度">
          适应
        </button>
        <button @click="zoomReset" class="premium-btn px-2 py-1 rounded-md cursor-pointer text-[11px] font-medium transition-all duration-200"
          :style="{ color: 'var(--text-tertiary)' }"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-secondary)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'"
          title="重置缩放">
          重置
        </button>
        <div class="w-px h-4 mx-1" :style="{ background: 'var(--border-primary)' }" />
        <!-- Manual Render Button -->
        <button @click="render" class="premium-btn px-2.5 py-1.5 rounded-md cursor-pointer text-[11px] font-medium transition-all duration-200 flex items-center gap-1"
          :style="{
            background: hasError ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)',
            color: hasError ? 'var(--error)' : 'var(--success)',
            border: hasError ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(16,185,129,0.25)',
          }"
          @mouseenter="($event.target as HTMLElement).style.background = hasError ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'"
          @mouseleave="($event.target as HTMLElement).style.background = hasError ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)'"
          title="手动渲染">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          渲染
        </button>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="shrink-0 mx-4 mt-4 p-4 rounded-xl" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);">
      <h3 class="font-semibold text-sm mb-1" style="color: var(--error);">语法错误</h3>
      <p class="text-xs font-mono whitespace-pre-wrap break-all" style="color: var(--error); opacity: 0.8;">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-if="!code.trim()" class="flex-1 flex items-center justify-center" style="color: var(--text-tertiary);">
      <div class="text-center px-4">
        <div class="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center" style="background: var(--accent-subtle);">
          <svg class="w-8 h-8" style="color: var(--accent);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </div>
        <p class="text-base font-medium" style="color: var(--text-secondary);">在编辑器中输入 Mermaid 甘特图语法</p>
        <p class="text-sm mt-2" style="color: var(--text-tertiary);">或从工具栏选择一个模板开始</p>
      </div>
    </div>

    <!-- SVG Container -->
    <div
      v-if="svg && code.trim()"
      ref="scrollContainerRef"
      class="flex-1 overflow-auto gantt-preview-scroll"
      @wheel.ctrl="onCtrlWheel"
    >
      <div
        ref="containerRef"
        class="p-4 md:p-6 inline-block min-w-full gantt-svg-container"
        :style="{ zoom: zoom }"
        v-html="svg"
      ></div>
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

const svg = ref('')
const error = ref('')
const zoom = ref(1)
const isDragging = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const scrollContainerRef = ref<HTMLElement | null>(null)
const sliderRef = ref<HTMLElement | null>(null)

let renderCounter = 0
let rendering = false

// Zoom ratio 0..1 for slider position
const zoomRatio = computed(() => (zoom.value - 0.3) / 2.7)

const zoomIn = () => { zoom.value = Math.min(3, Math.round((zoom.value + 0.1) * 10) / 10) }
const zoomOut = () => { zoom.value = Math.max(0.3, Math.round((zoom.value - 0.1) * 10) / 10) }
const zoomReset = () => { zoom.value = 1 }

const fitToWidth = () => {
  if (!scrollContainerRef.value || !containerRef.value) return
  const svgEl = containerRef.value.querySelector('svg')
  if (!svgEl) return
  const naturalWidth = svgEl.getBoundingClientRect().width / zoom.value
  const containerWidth = scrollContainerRef.value.clientWidth - 48
  if (naturalWidth > 0) {
    const newZoom = containerWidth / naturalWidth
    // Don't zoom out below 0.5 to keep chart readable for very wide charts
    zoom.value = Math.max(0.5, Math.min(3, Math.round(newZoom * 10) / 10))
  }
}

// ── Slider drag logic ──
const updateZoomFromPointer = (clientX: number) => {
  if (!sliderRef.value) return
  const rect = sliderRef.value.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  zoom.value = Math.max(0.3, Math.min(3, Math.round((0.3 + ratio * 2.7) * 100) / 100))
}

const onSliderMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging.value = true
  updateZoomFromPointer(e.clientX)

  const onMouseMove = (ev: MouseEvent) => {
    if (!isDragging.value) return
    updateZoomFromPointer(ev.clientX)
  }

  const onMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  document.body.style.cursor = 'ew-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// Ctrl+scroll to zoom
const onCtrlWheel = (e: WheelEvent) => {
  e.preventDefault()
  if (e.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

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
  } finally {
    rendering = false
  }
}

// Post-process SVG to fix text visibility and bar width issues
const postProcessSvg = () => {
  if (!containerRef.value) return
  const svgEl = containerRef.value.querySelector('svg')
  if (!svgEl) return

  // 1. Ensure SVG overflow is visible so text isn't clipped
  svgEl.setAttribute('overflow', 'visible')

  // 2. Build a map of task rect positions for text repositioning
  const rects = svgEl.querySelectorAll('rect')
  const rectMap = new Map<string, { x: number; y: number; width: number; height: number; el: SVGRectElement }>()

  rects.forEach(rect => {
    const w = parseFloat(rect.getAttribute('width') || '0')
    const x = parseFloat(rect.getAttribute('x') || '0')
    const y = parseFloat(rect.getAttribute('y') || '0')
    const h = parseFloat(rect.getAttribute('height') || '0')

    // Set minimum width for task bars that are too narrow
    if (w > 0 && w < 6) {
      rect.setAttribute('width', '6')
    }

    // Store rect info keyed by approximate y position for matching with text
    if (w > 0 && h > 0) {
      rectMap.set(`${Math.round(y)}`, { x, y, width: w, height: h, el: rect })
    }
  })

  // 3. Handle task text: reposition text outside narrow bars, add tooltips
  const MIN_BAR_WIDTH_FOR_TEXT = 40 // Minimum bar width to show text inside
  const TEXT_OFFSET_RIGHT = 6 // Gap between bar end and text start

  const textElements = svgEl.querySelectorAll('text')
  textElements.forEach(textEl => {
    const parent = textEl.parentElement
    if (parent && parent.hasAttribute('clip-path')) {
      parent.removeAttribute('clip-path')
    }
    textEl.setAttribute('overflow', 'visible')

    const textY = parseFloat(textEl.getAttribute('y') || '0')
    const textContent = textEl.textContent?.trim() || ''

    // Try to find the matching rect by y-position proximity
    let matchedRect: { x: number; y: number; width: number; height: number; el: SVGRectElement } | null = null
    for (const [key, rectInfo] of rectMap) {
      if (Math.abs(rectInfo.y - textY) < rectInfo.height) {
        matchedRect = rectInfo
        break
      }
    }

    if (matchedRect) {
      const barWidth = matchedRect.width
      const barRight = matchedRect.x + barWidth

      // Add tooltip title element for hover
      const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title')
      titleEl.textContent = textContent
      // Insert title as first child of the parent group or the rect
      const targetParent = matchedRect.el.parentElement || matchedRect.el
      targetParent.insertBefore(titleEl, targetParent.firstChild)

      if (barWidth < MIN_BAR_WIDTH_FOR_TEXT && textContent) {
        // Bar is too narrow: move text to the right of the bar
        const currentX = parseFloat(textEl.getAttribute('x') || '0')
        // Only reposition if text is currently inside the bar
        if (currentX >= matchedRect.x && currentX <= barRight) {
          textEl.setAttribute('x', String(barRight + TEXT_OFFSET_RIGHT))
          // Use CSS variable so it adapts to site light/dark theme
          textEl.style.fill = 'var(--text-secondary, #5c6170)'
          textEl.style.fontSize = '11px'
          textEl.style.fontWeight = '500'
        }
      } else if (barWidth >= MIN_BAR_WIDTH_FOR_TEXT && textContent) {
        // Text inside bar: check if it overflows and truncate if needed
        const textLen = textContent.length
        const approxCharWidth = 7 // rough estimate for 12px font
        const maxChars = Math.floor((barWidth - 8) / approxCharWidth)
        if (textLen > maxChars && maxChars > 2) {
          textEl.textContent = textContent.slice(0, maxChars - 1) + '…'
        }
      }

      // Add hover class to the task group for highlight effect
      const group = matchedRect.el.parentElement
      if (group && group.tagName === 'g') {
        group.classList.add('gantt-task-group')
        group.style.cursor = 'pointer'
      }
    }
  })

  // 4. Handle very wide charts: ensure the SVG has a reasonable viewBox
  const svgWidth = parseFloat(svgEl.getAttribute('width') || '0')
  const viewBox = svgEl.getAttribute('viewBox')
  if (svgWidth > 5000 && viewBox) {
    svgEl.setAttribute('width', '5000')
  }
}

watch([() => props.code, () => props.chartTheme], () => {
  render()
}, { immediate: true })

// Auto fit on first render, with SVG post-processing
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
.gantt-svg-container :deep(svg) {
  overflow: visible !important;
}

.gantt-svg-container :deep(svg text) {
  overflow: visible !important;
}

.gantt-svg-container :deep(svg .taskText) {
  overflow: visible !important;
}

/* ── Force all SVG text to use CSS variable colors so it adapts to site theme ── */
.gantt-svg-container :deep(svg .tick text),
.gantt-svg-container :deep(svg .axis text),
.gantt-svg-container :deep(svg .sectionTitle),
.gantt-svg-container :deep(svg .taskTextOutside),
.gantt-svg-container :deep(svg text:not(.taskText)) {
  fill: var(--text-secondary, #5c6170) !important;
}

/* Task text inside bars: keep theme-provided color or force dark on light bg */
.gantt-svg-container :deep(svg .taskText) {
  fill: var(--text-primary, #1a1d26) !important;
}

/* Section titles slightly bolder */
.gantt-svg-container :deep(svg .sectionTitle) {
  fill: var(--text-primary, #1a1d26) !important;
  font-weight: 600 !important;
}

/* Grid lines softer */
.gantt-svg-container :deep(svg .grid .tick line) {
  stroke: var(--border-primary, #e4e7ee) !important;
}

/* Hover highlight for task groups */
.gantt-svg-container :deep(.gantt-task-group) rect {
  transition: filter 0.15s ease, opacity 0.15s ease;
}

.gantt-svg-container :deep(.gantt-task-group:hover) rect {
  filter: brightness(1.12);
  stroke-width: 1.5;
  stroke: currentColor;
  stroke-opacity: 0.4;
}

/* Subtle scale on hover for better affordance */
.gantt-svg-container :deep(.gantt-task-group:hover) {
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12));
}

.gantt-preview-scroll {
  scrollbar-width: thin;
}
</style>
