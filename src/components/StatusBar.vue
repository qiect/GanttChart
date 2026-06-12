<template>
  <div class="h-7 flex items-center justify-between px-3 md:px-5 text-xs border-t font-medium"
    :style="{
      background: 'var(--bg-tertiary)',
      borderColor: 'var(--border-primary)',
      color: 'var(--text-tertiary)',
    }">
    <div class="flex items-center gap-2 md:gap-4 min-w-0">
      <span class="shrink-0 tracking-wide">Mermaid Gantt</span>
      <span v-if="hasError" class="flex items-center gap-1.5 shrink-0" style="color: var(--error);">
        <span class="w-1.5 h-1.5 rounded-full pulse-dot" style="background: var(--error);" />
        <span class="hidden sm:inline">语法错误</span>
      </span>
      <span v-else-if="code.trim()" class="flex items-center gap-1.5 shrink-0" style="color: var(--success);">
        <span class="w-1.5 h-1.5 rounded-full pulse-dot" style="background: var(--success);" />
        <span class="hidden sm:inline">渲染成功</span>
      </span>
      <!-- 桌面端快捷键提示 -->
      <div class="hidden lg:flex items-center gap-3 ml-2" style="color: var(--text-tertiary); opacity: 0.6;">
        <span class="flex items-center gap-1">
          <kbd class="px-1 py-0.5 rounded text-[9px] font-mono" :style="{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }">Ctrl+S</kbd>
          保存
        </span>
        <span class="flex items-center gap-1">
          <kbd class="px-1 py-0.5 rounded text-[9px] font-mono" :style="{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }">Ctrl+T</kbd>
          模板
        </span>
      </div>
    </div>
    <div class="flex items-center gap-3 md:gap-5 shrink-0" style="color: var(--text-tertiary);">
      <span>行 {{ lineCount }}</span>
      <span>字符 {{ charCount }}</span>
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
