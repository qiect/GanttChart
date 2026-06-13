<template>
  <div class="flex items-center justify-between px-3 lg:px-5 border-b"
    :style="{
      height: isMobile ? 'auto' : '48px',
      background: theme === 'dark' ? 'var(--glass-bg)' : 'var(--glass-bg)',
      borderColor: 'var(--border-primary)',
      backdropFilter: 'blur(var(--glass-blur))',
      WebkitBackdropFilter: 'blur(var(--glass-blur))',
      boxShadow: 'var(--shadow-sm)',
      color: 'var(--text-primary)',
    }">
    <!-- 桌面端布局 (>=1024px) -->
    <template v-if="!isMobile">
      <!-- 左侧：Logo + 模式切换 -->
      <div class="flex items-center gap-3 min-w-0">
        <h1 class="text-sm md:text-base font-semibold flex items-center gap-2 shrink-0 tracking-tight" style="color: var(--text-primary);">
          <svg class="w-7 h-7" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#4f46e5"/>
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
            <rect x="1" y="1" width="46" height="46" rx="11" fill="none" stroke="white" stroke-opacity="0.15" stroke-width="1"/>
            <rect x="9" y="10" width="30" height="5" rx="2.5" fill="url(#logo-bar1)"/>
            <rect x="9" y="18.5" width="17" height="5" rx="2.5" fill="url(#logo-bar2)"/>
            <rect x="9" y="27" width="24" height="5" rx="2.5" fill="url(#logo-bar1)"/>
            <rect x="29" y="17.5" width="5.5" height="5.5" rx="1.2" fill="url(#logo-accent)" transform="rotate(45 31.75 20.25)"/>
            <circle cx="9" cy="36" r="1.5" fill="#a5b4fc" opacity="0.6"/>
            <circle cx="15" cy="36" r="1.5" fill="#a5b4fc" opacity="0.4"/>
            <circle cx="21" cy="36" r="1.5" fill="#a5b4fc" opacity="0.3"/>
          </svg>
          <span class="font-semibold tracking-tight">Gantt Studio</span>
        </h1>
        <span class="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
          :style="{
            background: 'var(--accent-subtle)',
            color: 'var(--accent)',
          }">
          Mermaid
        </span>
        <!-- 编辑模式切换 -->
        <div class="flex items-center rounded-lg p-0.5"
          :style="{ background: 'var(--bg-tertiary)' }">
          <button
            class="px-2.5 py-1 text-xs rounded-md transition-all duration-200 cursor-pointer font-medium"
            :style="editorMode === 'visual' ? {
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)',
            } : {
              color: 'var(--text-tertiary)',
            }"
            @click="$emit('editorModeChange', 'visual')"
          >
            可视化
          </button>
          <button
            class="px-2.5 py-1 text-xs rounded-md transition-all duration-200 cursor-pointer font-medium"
            :style="editorMode === 'code' ? {
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)',
            } : {
              color: 'var(--text-tertiary)',
            }"
            @click="$emit('editorModeChange', 'code')"
          >
            代码
          </button>
        </div>
      </div>

      <!-- 右侧：操作按钮 -->
      <div class="flex items-center gap-1 lg:gap-1.5">
        <!-- 文件操作组 -->
        <div class="flex items-center rounded-lg p-0.5" :style="{ background: 'var(--bg-tertiary)' }">
          <button
            class="premium-btn px-2.5 py-1 text-xs rounded-md flex items-center gap-1.5 cursor-pointer font-medium"
            :style="{ color: 'var(--text-secondary)' }"
            @click="$emit('openTemplate')"
            @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-elevated)'; ($event.target as HTMLElement).style.boxShadow = 'var(--shadow-sm)'"
            @mouseleave="($event.target as HTMLElement).style.background = 'transparent'; ($event.target as HTMLElement).style.boxShadow = 'none'"
            title="模板 (Ctrl+T)">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            模板
          </button>
          <button
            class="premium-btn px-2.5 py-1 text-xs rounded-md flex items-center gap-1.5 cursor-pointer font-medium"
            :style="{ color: 'var(--text-secondary)' }"
            @click="handleImport"
            @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-elevated)'; ($event.target as HTMLElement).style.boxShadow = 'var(--shadow-sm)'"
            @mouseleave="($event.target as HTMLElement).style.background = 'transparent'; ($event.target as HTMLElement).style.boxShadow = 'none'"
            title="导入">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            导入
          </button>
          <button
            class="premium-btn px-2.5 py-1 text-xs rounded-md flex items-center gap-1.5 cursor-pointer font-medium"
            :style="{ color: 'var(--text-secondary)' }"
            @click="handleSave"
            @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-elevated)'; ($event.target as HTMLElement).style.boxShadow = 'var(--shadow-sm)'"
            @mouseleave="($event.target as HTMLElement).style.background = 'transparent'; ($event.target as HTMLElement).style.boxShadow = 'none'"
            title="保存 (Ctrl+S)">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3h11l5 5v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 3v6h8V3" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21v-6h10v6" />
            </svg>
            保存
          </button>
        </div>

        <!-- 导出组 -->
        <ExportMenu :get-chart-element="getChartElement" :theme="theme" :code="code" />

        <!-- 主题切换 -->
        <button
          class="premium-btn px-2.5 py-1 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer font-medium"
          :style="{ color: 'var(--text-secondary)' }"
          @click="$emit('themeChange', theme === 'dark' ? 'light' : 'dark')"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-tertiary)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'transparent'"
          title="切换主题">
          <svg v-if="theme === 'dark'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          {{ theme === 'dark' ? '浅色' : '深色' }}
        </button>
      </div>
    </template>

    <!-- 移动端 + iPad 布局 (<1024px) -->
    <template v-else>
      <div class="w-full py-1.5 md:py-2">
        <!-- 第一行：Logo + 操作按钮 -->
        <div class="flex items-center justify-between">
          <h1 class="text-sm md:text-base font-semibold flex items-center gap-1.5 md:gap-2 shrink-0" style="color: var(--text-primary);">
            <svg class="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-bg-m" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#4f46e5"/>
                  <stop offset="50%" stop-color="#6d28d9"/>
                  <stop offset="100%" stop-color="#7c3aed"/>
                </linearGradient>
              </defs>
              <rect width="48" height="48" rx="12" fill="url(#logo-bg-m)"/>
              <rect x="9" y="10" width="30" height="5" rx="2.5" fill="#e0e7ff"/>
              <rect x="9" y="18.5" width="17" height="5" rx="2.5" fill="#c7d2fe"/>
              <rect x="9" y="27" width="24" height="5" rx="2.5" fill="#e0e7ff"/>
              <rect x="29" y="17.5" width="5.5" height="5.5" rx="1.2" fill="#fbbf24" transform="rotate(45 31.75 20.25)"/>
            </svg>
            Gantt Studio
          </h1>
          <div class="flex items-center gap-0.5 md:gap-1">
            <!-- iPad: 带文字的按钮 / 手机: 纯图标 -->
            <button class="premium-btn p-2 md:px-3 md:py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5"
              :style="{ color: 'var(--text-secondary)' }"
              @click="$emit('openTemplate')" title="模板">
              <svg class="w-[18px] h-[18px] md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <span class="hidden md:inline text-xs font-medium">模板</span>
            </button>
            <button class="premium-btn p-2 md:px-3 md:py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5"
              :style="{ color: 'var(--text-secondary)' }"
              @click="handleImport" title="导入">
              <svg class="w-[18px] h-[18px] md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span class="hidden md:inline text-xs font-medium">导入</span>
            </button>
            <button class="premium-btn p-2 md:px-3 md:py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5"
              :style="{ color: 'var(--text-secondary)' }"
              @click="handleSave" title="保存">
              <svg class="w-[18px] h-[18px] md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3h11l5 5v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 3v6h8V3" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21v-6h10v6" />
              </svg>
              <span class="hidden md:inline text-xs font-medium">保存</span>
            </button>
            <ExportMenu :get-chart-element="getChartElement" :theme="theme" :code="code" />
            <button class="premium-btn p-2 md:px-3 md:py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5"
              :style="{ color: 'var(--text-secondary)' }"
              @click="$emit('themeChange', theme === 'dark' ? 'light' : 'dark')" title="切换主题">
              <svg v-if="theme === 'dark'" class="w-[18px] h-[18px] md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-[18px] h-[18px] md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span class="hidden md:inline text-xs font-medium">{{ theme === 'dark' ? '浅色' : '深色' }}</span>
            </button>
          </div>
        </div>
        <!-- 第二行：Tab 切换（编辑器/预览）+ 编辑模式 -->
        <div class="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2">
          <!-- 编辑器/预览 Tab -->
          <div class="flex items-center rounded-lg p-0.5 md:p-1 flex-1"
            :style="{ background: 'var(--bg-tertiary)' }">
            <button
              class="flex-1 px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-md transition-all duration-200 cursor-pointer font-medium text-center"
              :style="mobileTab === 'editor' ? {
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
              } : {
                color: 'var(--text-tertiary)',
              }"
              @click="$emit('mobileTabChange', 'editor')"
            >
              <span class="flex items-center justify-center gap-1 md:gap-1.5">
                <svg class="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                编辑器
              </span>
            </button>
            <button
              class="flex-1 px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-md transition-all duration-200 cursor-pointer font-medium text-center"
              :style="mobileTab === 'preview' ? {
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
              } : {
                color: 'var(--text-tertiary)',
              }"
              @click="$emit('mobileTabChange', 'preview')"
            >
              <span class="flex items-center justify-center gap-1 md:gap-1.5">
                <svg class="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                预览
              </span>
            </button>
          </div>
          <!-- 编辑模式切换（仅编辑器 Tab 时显示） -->
          <div v-if="mobileTab === 'editor'" class="flex items-center rounded-lg p-0.5 md:p-1 shrink-0"
            :style="{ background: 'var(--bg-tertiary)' }">
            <button
              class="px-2 md:px-3 py-1.5 md:py-2 text-[11px] md:text-xs rounded-md transition-all duration-200 cursor-pointer font-medium"
              :style="editorMode === 'visual' ? {
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
              } : {
                color: 'var(--text-tertiary)',
              }"
              @click="$emit('editorModeChange', 'visual')"
            >
              可视化
            </button>
            <button
              class="px-2 md:px-3 py-1.5 md:py-2 text-[11px] md:text-xs rounded-md transition-all duration-200 cursor-pointer font-medium"
              :style="editorMode === 'code' ? {
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
              } : {
                color: 'var(--text-tertiary)',
              }"
              @click="$emit('editorModeChange', 'code')"
            >
              代码
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ExportMenu from './ExportMenu.vue'
import { importMermaidCode } from '../utils/exportChart'

const props = defineProps<{
  code: string
  theme: 'light' | 'dark'
  getChartElement: () => HTMLElement | null
  editorMode: 'code' | 'visual'
  mobileTab: 'editor' | 'preview'
}>()

const emit = defineEmits<{
  codeChange: [code: string]
  themeChange: [theme: 'light' | 'dark']
  openTemplate: []
  editorModeChange: [mode: 'code' | 'visual']
  save: []
  mobileTabChange: [tab: 'editor' | 'preview']
}>()

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
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

const handleSave = () => {
  emit('save')
}
</script>
