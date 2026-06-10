<template>
  <div class="toolbar" :class="theme === 'dark' ? 'toolbar--dark' : 'toolbar--light'">
    <!-- 左侧：Logo + 模式切换 -->
    <div class="toolbar__left">
      <h1 class="toolbar__logo">
        <svg class="toolbar__logo-icon" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="url(#logo-grad)" stroke-width="2"/>
          <rect x="6" y="8" width="8" height="3" rx="1.5" fill="url(#logo-grad)"/>
          <rect x="6" y="13" width="12" height="3" rx="1.5" fill="url(#logo-grad)" opacity="0.6"/>
          <defs>
            <linearGradient id="logo-grad" x1="3" y1="3" x2="21" y2="21">
              <stop stop-color="#4F8CF7"/>
              <stop offset="1" stop-color="#7C5CFC"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="toolbar__logo-text">Gantt Studio</span>
      </h1>
      <span class="toolbar__badge">Mermaid</span>
      <!-- 编辑模式切换 -->
      <div class="toolbar__mode-switch" :class="theme === 'dark' ? 'toolbar__mode-switch--dark' : 'toolbar__mode-switch--light'">
        <button
          class="toolbar__mode-btn"
          :class="{ 'toolbar__mode-btn--active': editorMode === 'visual', 'toolbar__mode-btn--active-dark': editorMode === 'visual' && theme === 'dark' }"
          @click="$emit('editorModeChange', 'visual')"
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
          可视化
        </button>
        <button
          class="toolbar__mode-btn"
          :class="{ 'toolbar__mode-btn--active': editorMode === 'code', 'toolbar__mode-btn--active-dark': editorMode === 'code' && theme === 'dark' }"
          @click="$emit('editorModeChange', 'code')"
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
          代码
        </button>
      </div>
    </div>

    <!-- 右侧：操作按钮 -->
    <div class="toolbar__right">
      <!-- 桌面端 -->
      <template v-if="!isMobile">
        <button class="toolbar__action" @click="$emit('openTemplate')">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          模板
        </button>
        <button class="toolbar__action" @click="handleImport">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          导入
        </button>
        <button class="toolbar__action" @click="handleExportCode">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          保存
        </button>
        <div class="toolbar__divider" />
        <ExportMenu :chart-element="chartElement" :theme="theme" :code="code" />
        <div class="toolbar__divider" />
        <button class="toolbar__action toolbar__action--theme" @click="$emit('themeChange', theme === 'dark' ? 'light' : 'dark')">
          <svg v-if="theme === 'dark'" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          {{ theme === 'dark' ? '浅色' : '深色' }}
        </button>
      </template>

      <!-- 移动端 -->
      <template v-else>
        <button class="toolbar__icon-btn" @click="$emit('openTemplate')" title="模板">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </button>
        <button class="toolbar__icon-btn" @click="handleImport" title="导入">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>
        <ExportMenu :chart-element="chartElement" :theme="theme" :code="code" />
        <button class="toolbar__icon-btn" @click="$emit('themeChange', theme === 'dark' ? 'light' : 'dark')" title="切换主题">
          <svg v-if="theme === 'dark'" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

<style scoped>
.toolbar {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;
  flex-shrink: 0;
  border-bottom: 1px solid;
  backdrop-filter: blur(12px);
  z-index: 10;
}

.toolbar--light {
  background: rgba(255, 255, 255, 0.85);
  border-color: #eef2ff;
  color: #1e293b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.toolbar--dark {
  background: rgba(15, 19, 32, 0.85);
  border-color: #1e2538;
  color: #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.toolbar__left {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  min-width: 0;
}

.toolbar__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.toolbar--light .toolbar__logo {
  color: #1e293b;
}

.toolbar--dark .toolbar__logo {
  color: #e2e8f0;
}

.toolbar__logo-icon {
  width: 1.375rem;
  height: 1.375rem;
}

.toolbar__logo-text {
  display: none;
}

@media (min-width: 640px) {
  .toolbar__logo-text {
    display: inline;
  }
}

.toolbar__badge {
  font-size: 0.5625rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  flex-shrink: 0;
}

.toolbar--light .toolbar__badge {
  background: linear-gradient(135deg, rgba(79, 140, 247, 0.1), rgba(124, 92, 252, 0.1));
  color: #4F8CF7;
}

.toolbar--dark .toolbar__badge {
  background: linear-gradient(135deg, rgba(79, 140, 247, 0.15), rgba(124, 92, 252, 0.15));
  color: #6FA3FF;
}

/* Mode Switch */
.toolbar__mode-switch {
  display: flex;
  align-items: center;
  padding: 0.1875rem;
  border-radius: 0.5rem;
  gap: 0.125rem;
}

.toolbar__mode-switch--light {
  background: #f1f5f9;
}

.toolbar__mode-switch--dark {
  background: #1e2538;
}

.toolbar__mode-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3125rem 0.5625rem;
  font-size: 0.6875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease;
  background: transparent;
}

.toolbar--light .toolbar__mode-btn {
  color: #94a3b8;
}

.toolbar--light .toolbar__mode-btn:hover {
  color: #64748b;
}

.toolbar--dark .toolbar__mode-btn {
  color: #64748b;
}

.toolbar--dark .toolbar__mode-btn:hover {
  color: #94a3b8;
}

.toolbar__mode-btn--active {
  background: #ffffff;
  color: #1e293b !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  font-weight: 600;
}

.toolbar__mode-btn--active-dark {
  background: #2d3748;
  color: #e2e8f0 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  font-weight: 600;
}

/* Right side */
.toolbar__right {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

.toolbar__action {
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

.toolbar--light .toolbar__action {
  color: #64748b;
}

.toolbar--light .toolbar__action:hover {
  background: #f1f5f9;
  color: #334155;
}

.toolbar--dark .toolbar__action {
  color: #94a3b8;
}

.toolbar--dark .toolbar__action:hover {
  background: #1e2538;
  color: #e2e8f0;
}

.toolbar__icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
  background: transparent;
}

.toolbar--light .toolbar__icon-btn {
  color: #64748b;
}

.toolbar--light .toolbar__icon-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

.toolbar--dark .toolbar__icon-btn {
  color: #94a3b8;
}

.toolbar--dark .toolbar__icon-btn:hover {
  background: #1e2538;
  color: #e2e8f0;
}

.toolbar__divider {
  width: 1px;
  height: 1.25rem;
  margin: 0 0.25rem;
}

.toolbar--light .toolbar__divider {
  background: #e2e8f0;
}

.toolbar--dark .toolbar__divider {
  background: #2d3748;
}
</style>
