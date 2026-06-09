<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
    <div class="absolute inset-0 bg-black/50" @click="$emit('close')" />
    <!-- 移动端全屏，桌面端居中弹窗 -->
    <div class="relative bg-white dark:bg-gray-800 shadow-2xl w-full h-full md:h-auto md:max-h-[80vh] md:max-w-2xl md:rounded-xl md:mx-4 overflow-hidden flex flex-col">
      <div class="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <h2 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white">选择模板</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">选择一个预设模板快速开始</p>
      </div>
      <div class="p-4 md:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <button
          v-for="template in ganttTemplates"
          :key="template.id"
          class="text-left p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
          @click="$emit('select', template); $emit('close')"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 text-sm md:text-base">
            {{ template.name }}
          </h3>
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ template.description }}
          </p>
        </button>
      </div>
      <div class="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end shrink-0">
        <button
          class="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          @click="$emit('close')"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ganttTemplates } from '../utils/mermaidTemplates'
import type { GanttTemplate } from '../types'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
  select: [template: GanttTemplate]
}>()
</script>
