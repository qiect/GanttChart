<template>
  <div class="h-full w-full overflow-auto p-3 md:p-6" :class="theme === 'dark' ? 'bg-gray-900' : 'bg-white'">
    <div v-if="!code.trim()" class="flex items-center justify-center h-full text-gray-400">
      <div class="text-center px-4">
        <div class="text-4xl md:text-5xl mb-4">📋</div>
        <p class="text-base md:text-lg">在编辑器中输入 Mermaid 甘特图语法</p>
        <p class="text-xs md:text-sm mt-2">或从工具栏选择一个模板开始</p>
      </div>
    </div>
    <div v-if="error" class="mb-4 p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <h3 class="text-red-600 dark:text-red-400 font-semibold text-sm mb-1">语法错误</h3>
      <p class="text-red-500 dark:text-red-300 text-xs font-mono whitespace-pre-wrap break-all">{{ error }}</p>
    </div>
    <!-- 缩放控制 -->
    <div v-if="svg && code.trim()" class="flex items-center justify-end gap-2 mb-3">
      <button @click="zoomOut" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="缩小">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
      </button>
      <span class="text-xs text-gray-500 min-w-[3rem] text-center">{{ Math.round(zoom * 100) }}%</span>
      <button @click="zoomIn" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="放大">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      </button>
      <button @click="zoomReset" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs text-gray-500" title="重置">
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
