<template>
  <div class="h-7 flex items-center justify-between px-2 md:px-4 text-xs border-t"
    :class="theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'">
    <div class="flex items-center gap-2 md:gap-4 min-w-0">
      <span class="shrink-0">Mermaid Gantt</span>
      <span v-if="hasError" class="text-red-500 flex items-center gap-1 shrink-0">
        <span class="w-2 h-2 bg-red-500 rounded-full inline-block" />
        <span class="hidden sm:inline">语法错误</span>
      </span>
      <span v-else-if="code.trim()" class="text-green-500 flex items-center gap-1 shrink-0">
        <span class="w-2 h-2 bg-green-500 rounded-full inline-block" />
        <span class="hidden sm:inline">渲染成功</span>
      </span>
    </div>
    <div class="flex items-center gap-2 md:gap-4 shrink-0">
      <span>行: {{ lineCount }}</span>
      <span>字符: {{ charCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: string
  hasError: boolean
  theme: 'light' | 'dark'
}>()

const lineCount = computed(() => props.code.split('\n').length)
const charCount = computed(() => props.code.length)
</script>
