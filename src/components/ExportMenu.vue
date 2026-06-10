<template>
  <div class="export-menu" ref="menuRef">
    <button
      class="export-menu__trigger"
      :class="{ 'export-menu__trigger--disabled': isExporting }"
      @click="isOpen = !isOpen"
      :disabled="isExporting"
    >
      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span class="export-menu__trigger-text">{{ isExporting ? '导出中...' : '导出' }}</span>
    </button>
    <Transition name="dropdown">
      <div v-if="isOpen" class="export-menu__dropdown">
        <button class="export-menu__item" @click="handleExportCode">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
          导出 Mermaid 代码
        </button>
        <div class="export-menu__divider" />
        <button class="export-menu__item" @click="handleExport('png')">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          导出 PNG
        </button>
        <button class="export-menu__item" @click="handleExport('svg')">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
          </svg>
          导出 SVG
        </button>
        <button class="export-menu__item" @click="handleExport('pdf')">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
          </svg>
          导出 PDF
        </button>
      </div>
    </Transition>
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

<style scoped>
.export-menu {
  position: relative;
}

.export-menu__trigger {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
  background: transparent;
  white-space: nowrap;
}

.export-menu__trigger--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

:root .export-menu__trigger {
  color: #64748b;
}

:root .export-menu__trigger:hover:not(:disabled) {
  background: #f1f5f9;
  color: #334155;
}

[data-theme="dark"] .export-menu__trigger {
  color: #94a3b8;
}

[data-theme="dark"] .export-menu__trigger:hover:not(:disabled) {
  background: #1e2538;
  color: #e2e8f0;
}

.export-menu__trigger-text {
  display: none;
}

@media (min-width: 640px) {
  .export-menu__trigger-text {
    display: inline;
  }
}

/* Dropdown */
.export-menu__dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 0.375rem);
  min-width: 11rem;
  padding: 0.25rem;
  border-radius: 0.75rem;
  border: 1px solid;
  z-index: 50;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -6px rgba(0, 0, 0, 0.05);
}

:root .export-menu__dropdown {
  background: #ffffff;
  border-color: #e8ecf2;
}

[data-theme="dark"] .export-menu__dropdown {
  background: #1a2035;
  border-color: #2d3748;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}

/* Item */
.export-menu__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.1s ease;
  text-align: left;
  background: transparent;
}

:root .export-menu__item {
  color: #475569;
}

:root .export-menu__item:hover {
  background: rgba(79, 140, 247, 0.06);
  color: #4F8CF7;
}

[data-theme="dark"] .export-menu__item {
  color: #94a3b8;
}

[data-theme="dark"] .export-menu__item:hover {
  background: rgba(79, 140, 247, 0.1);
  color: #6FA3FF;
}

.export-menu__divider {
  height: 1px;
  margin: 0.25rem 0.5rem;
}

:root .export-menu__divider {
  background: #f1f5f9;
}

[data-theme="dark"] .export-menu__divider {
  background: #2d3748;
}

/* Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}
</style>
