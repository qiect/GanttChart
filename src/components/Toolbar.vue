<template>
  <div class="h-12 flex items-center justify-between px-4 border-b"
    :class="theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'">
    <div class="flex items-center gap-3">
      <h1 class="text-lg font-bold flex items-center gap-2">
        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Gantt Studio
      </h1>
      <span class="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
        Mermaid
      </span>
    </div>

    <div class="flex items-center gap-1">
      <!-- Editor Mode Toggle -->
      <div class="flex items-center mr-2 bg-gray-100 dark:bg-gray-700 rounded-md p-0.5">
        <button
          class="px-2.5 py-1 text-xs rounded transition-colors"
          :class="editorMode === 'code' ? 'bg-white dark:bg-gray-600 shadow-sm font-medium' : 'text-gray-500'"
          @click="$emit('editorModeChange', 'code')"
        >
          代码
        </button>
        <button
          class="px-2.5 py-1 text-xs rounded transition-colors"
          :class="editorMode === 'visual' ? 'bg-white dark:bg-gray-600 shadow-sm font-medium' : 'text-gray-500'"
          @click="$emit('editorModeChange', 'visual')"
        >
          可视化
        </button>
      </div>

      <button
        class="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
        @click="$emit('openTemplate')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        模板
      </button>

      <button
        class="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
        @click="handleImport"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        导入
      </button>

      <button
        class="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
        @click="handleExportCode"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        保存 .mmd
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

      <ExportMenu :chart-element="chartElement" :theme="theme" />

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

      <button
        class="px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
        @click="$emit('themeChange', theme === 'dark' ? 'light' : 'dark')"
      >
        <svg v-if="theme === 'dark'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        {{ theme === 'dark' ? '浅色' : '深色' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExportMenu from './ExportMenu.vue'
import { exportMermaidCode, importMermaidCode } from '../utils/exportChart'

const props = defineProps<{
  code: string
  theme: 'light' | 'dark'
  chartElement: HTMLElement | null
  editorMode: 'code' | 'visual'
}>()

const emit = defineEmits<{
  codeChange: [code: string]
  themeChange: [theme: 'light' | 'dark']
  openTemplate: []
  editorModeChange: [mode: 'code' | 'visual']
}>()

const handleImport = async () => {
  try {
    const importedCode = await importMermaidCode()
    emit('codeChange', importedCode)
  } catch (err) {
    console.error('Import failed:', err)
  }
}

const handleExportCode = () => {
  exportMermaidCode(props.code)
}
</script>
