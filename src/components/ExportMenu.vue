<template>
  <div class="relative" ref="menuRef">
    <button
      class="px-2 md:px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 md:gap-1.5 disabled:opacity-50 cursor-pointer"
      @click="isOpen = !isOpen"
      :disabled="isExporting"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span class="hidden sm:inline">{{ isExporting ? '导出中...' : '导出' }}</span>
    </button>
    <div v-if="isOpen" class="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[140px] md:min-w-[160px] overflow-hidden">
      <button class="w-full text-left px-3 md:px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" @click="handleExportCode">
        导出 Mermaid 代码
      </button>
      <div class="border-t border-gray-100 dark:border-gray-700"></div>
      <button class="w-full text-left px-3 md:px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" @click="handleExport('png')">
        导出 PNG
      </button>
      <button class="w-full text-left px-3 md:px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" @click="handleExport('svg')">
        导出 SVG
      </button>
      <button class="w-full text-left px-3 md:px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" @click="handleExport('pdf')">
        导出 PDF
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { exportChart, exportMermaidCode } from '../utils/exportChart'
import type { ExportOptions } from '../types'

const props = defineProps<{
  chartElement: HTMLElement | null
  theme: 'light' | 'dark'
  code: string
}>()

const isOpen = ref(false)
const isExporting = ref(false)
const menuRef = ref<HTMLDivElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))

const handleExportCode = () => {
  isOpen.value = false
  exportMermaidCode(props.code)
}

const handleExport = async (format: ExportOptions['format']) => {
  if (!props.chartElement || isExporting.value) return
  isExporting.value = true
  isOpen.value = false
  try {
    await exportChart(props.chartElement, {
      format,
      quality: 1,
      scale: 2,
      backgroundColor: props.theme === 'dark' ? '#1e1e2e' : '#ffffff',
    })
  } catch (err) {
    console.error('Export failed:', err)
  } finally {
    isExporting.value = false
  }
}
</script>
