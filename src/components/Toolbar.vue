<template>
  <div class="h-12 flex items-center justify-between px-2 md:px-4 border-b shadow-sm"
    :class="theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'">
    <!-- 左侧：Logo + 模式切换 -->
    <div class="flex items-center gap-2 md:gap-3 min-w-0">
      <h1 class="text-base md:text-lg font-bold flex items-center gap-1.5 md:gap-2 shrink-0">
        <svg class="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#4338ca"/>
              <stop offset="50%" stop-color="#6d28d9"/>
              <stop offset="100%" stop-color="#7c3aed"/>
            </linearGradient>
            <linearGradient id="logo-bar1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#e0e7ff"/>
              <stop offset="100%" stop-color="#c7d2fe"/>
            </linearGradient>
            <linearGradient id="logo-bar2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#c7d2fe"/>
              <stop offset="100%" stop-color="#a5b4fc"/>
            </linearGradient>
            <linearGradient id="logo-accent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fbbf24"/>
              <stop offset="100%" stop-color="#f59e0b"/>
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="12" fill="url(#logo-bg)"/>
          <rect x="1" y="1" width="46" height="46" rx="11" fill="none" stroke="white" stroke-opacity="0.1" stroke-width="1"/>
          <rect x="9" y="10" width="30" height="5" rx="2.5" fill="url(#logo-bar1)"/>
          <rect x="9" y="18.5" width="17" height="5" rx="2.5" fill="url(#logo-bar2)"/>
          <rect x="9" y="27" width="24" height="5" rx="2.5" fill="url(#logo-bar1)"/>
          <rect x="29" y="17.5" width="5.5" height="5.5" rx="1.2" fill="url(#logo-accent)" transform="rotate(45 31.75 20.25)"/>
          <circle cx="9" cy="36" r="1.5" fill="#a5b4fc" opacity="0.6"/>
          <circle cx="15" cy="36" r="1.5" fill="#a5b4fc" opacity="0.4"/>
          <circle cx="21" cy="36" r="1.5" fill="#a5b4fc" opacity="0.3"/>
        </svg>
        <span class="hidden sm:inline">Gantt Studio</span>
      </h1>
      <span class="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full shrink-0">
        Mermaid
      </span>
      <!-- 编辑模式切换：可视化优先 -->
      <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-0.5">
        <button
          class="px-2 py-1 text-xs rounded transition-colors cursor-pointer"
          :class="editorMode === 'visual' ? 'bg-white dark:bg-gray-600 shadow-sm font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          @click="$emit('editorModeChange', 'visual')"
        >
          可视化
        </button>
        <button
          class="px-2 py-1 text-xs rounded transition-colors cursor-pointer"
          :class="editorMode === 'code' ? 'bg-white dark:bg-gray-600 shadow-sm font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          @click="$emit('editorModeChange', 'code')"
        >
          代码
        </button>
      </div>
    </div>

    <!-- 右侧：操作按钮 -->
    <div class="flex items-center gap-0.5 md:gap-1">
      <!-- 桌面端：完整按钮 -->
      <template v-if="!isMobile">
        <button
          class="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          @click="$emit('openTemplate')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          模板
        </button>
        <button
          class="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          @click="handleImport"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          导入
        </button>
        <button
          class="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          @click="handleExportCode"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          保存
        </button>
        <div class="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-0.5" />
        <ExportMenu :chart-element="chartElement" :theme="theme" :code="code" />
        <div class="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-0.5" />
        <button
          class="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
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
      </template>

      <!-- 移动端：图标按钮 -->
      <template v-else>
        <button class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer" @click="$emit('openTemplate')" title="模板">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </button>
        <button class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer" @click="handleImport" title="导入">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>
        <ExportMenu :chart-element="chartElement" :theme="theme" :code="code" />
        <button class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer" @click="$emit('themeChange', theme === 'dark' ? 'light' : 'dark')" title="切换主题">
          <svg v-if="theme === 'dark'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

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
