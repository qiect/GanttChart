<template>
  <div class="relative" ref="menuRef">
    <button
      class="premium-btn px-2 md:px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 md:gap-1.5 disabled:opacity-50 cursor-pointer font-medium"
      :style="{ color: 'var(--text-secondary)' }"
      @click="isOpen = !isOpen"
      :disabled="isExporting"
      @mouseenter="!isOpen && (($event.target as HTMLElement).style.background = 'var(--bg-tertiary)')"
      @mouseleave="(($event.target as HTMLElement).style.background = 'transparent')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span class="hidden sm:inline">{{ isExporting ? '导出中...' : '导出' }}</span>
    </button>
    <div v-if="isOpen" class="absolute right-0 top-full mt-2 z-50 min-w-[160px] md:min-w-[180px] overflow-hidden animate-fade-in"
      :style="{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
      }">
      <div class="py-1">
        <button class="w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 font-medium"
          :style="{ color: 'var(--text-primary)' }"
          @click="handleExportCode"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--accent-subtle)'; ($event.target as HTMLElement).style.color = 'var(--accent)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'; ($event.target as HTMLElement).style.color = 'var(--text-primary)'"
        >
          导出 Mermaid 代码
        </button>
        <div style="margin: 4px 12px; border-top: 1px solid var(--border-secondary);"></div>
        <button class="w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 font-medium"
          :style="{ color: 'var(--text-primary)' }"
          @click="handleExport('png')"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--accent-subtle)'; ($event.target as HTMLElement).style.color = 'var(--accent)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'; ($event.target as HTMLElement).style.color = 'var(--text-primary)'"
        >
          导出 PNG
        </button>
        <button class="w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 font-medium"
          :style="{ color: 'var(--text-primary)' }"
          @click="handleExport('svg')"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--accent-subtle)'; ($event.target as HTMLElement).style.color = 'var(--accent)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'; ($event.target as HTMLElement).style.color = 'var(--text-primary)'"
        >
          导出 SVG
        </button>
        <button class="w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 font-medium"
          :style="{ color: 'var(--text-primary)' }"
          @click="handleExport('pdf')"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--accent-subtle)'; ($event.target as HTMLElement).style.color = 'var(--accent)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'; ($event.target as HTMLElement).style.color = 'var(--text-primary)'"
        >
          导出 PDF
        </button>
      </div>
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
      backgroundColor: props.theme === 'dark' ? '#0f1117' : '#ffffff',
    })
  } catch (err) {
    console.error('Export failed:', err)
  } finally {
    isExporting.value = false
  }
}
</script>
