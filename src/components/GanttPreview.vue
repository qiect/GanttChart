<template>
  <div class="h-full w-full overflow-auto p-4 md:p-8" style="background: var(--bg-secondary);">
    <div v-if="!code.trim()" class="flex items-center justify-center h-full" style="color: var(--text-tertiary);">
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
    <div v-if="error" class="mb-5 p-4 rounded-xl" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);">
      <h3 class="font-semibold text-sm mb-1" style="color: var(--error);">语法错误</h3>
      <p class="text-xs font-mono whitespace-pre-wrap break-all" style="color: var(--error); opacity: 0.8;">{{ error }}</p>
    </div>
    <!-- 缩放控制 -->
    <div v-if="svg && code.trim()" class="flex items-center justify-end gap-1.5 mb-4">
      <button @click="zoomOut" class="premium-btn p-1.5 rounded-lg cursor-pointer transition-all duration-200"
        :style="{ color: 'var(--text-tertiary)' }"
        @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-tertiary)'"
        @mouseleave="($event.target as HTMLElement).style.background = 'transparent'"
        title="缩小">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
      </button>
      <span class="text-xs min-w-[3rem] text-center font-medium" style="color: var(--text-tertiary);">{{ Math.round(zoom * 100) }}%</span>
      <button @click="zoomIn" class="premium-btn p-1.5 rounded-lg cursor-pointer transition-all duration-200"
        :style="{ color: 'var(--text-tertiary)' }"
        @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-tertiary)'"
        @mouseleave="($event.target as HTMLElement).style.background = 'transparent'"
        title="放大">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      </button>
      <button @click="zoomReset" class="premium-btn px-2.5 py-1 rounded-lg cursor-pointer text-xs font-medium transition-all duration-200"
        :style="{ color: 'var(--text-tertiary)' }"
        @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-tertiary)'"
        @mouseleave="($event.target as HTMLElement).style.background = 'transparent'"
        title="重置">
        重置
      </button>
    </div>
    <div ref="containerRef" class="flex justify-center overflow-x-auto" :style="{ transform: `scale(${zoom})`, transformOrigin: 'top center' }" v-html="svg"></div>
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
