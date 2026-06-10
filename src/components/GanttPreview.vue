<template>
  <div class="h-full w-full flex flex-col" style="background: var(--bg-secondary);">
    <!-- Toolbar -->
    <div v-if="svg && code.trim()" class="shrink-0 flex items-center justify-between px-4 py-1.5 border-b"
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

      <!-- Right: Zoom Controls -->
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
      class="flex-1 overflow-auto"
      @wheel.ctrl="onCtrlWheel"
    >
      <div
        ref="containerRef"
        class="p-4 md:p-6 inline-block min-w-full"
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
    zoom.value = Math.max(0.3, Math.min(3, Math.round(newZoom * 10) / 10))
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

watch([() => props.code, () => props.chartTheme], render, { immediate: true })

// Auto fit on first render
watch(svg, (newSvg) => {
  if (newSvg) {
    nextTick(() => {
      fitToWidth()
    })
  }
})
</script>
