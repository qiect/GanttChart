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
    <div ref="containerRef" class="flex justify-center overflow-x-auto" v-html="svg"></div>
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

const svg = ref('')
const error = ref('')

let renderCounter = 0
let rendering = false

const render = async () => {
  if (!props.code.trim() || rendering) return

  rendering = true
  const id = `mermaid-gantt-${++renderCounter}`

  try {
    mermaid.initialize(getMermaidConfig(props.theme))
    const result = await mermaid.render(id, props.code)
    svg.value = result.svg
    error.value = ''
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '渲染失败'
    error.value = errorMessage
    const errorEl = document.getElementById(id)
    if (errorEl) errorEl.remove()
  } finally {
    rendering = false
  }
}

watch([() => props.code, () => props.theme], render, { immediate: true })
</script>
