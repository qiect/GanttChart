<template>
  <div class="h-screen flex flex-col" :class="theme === 'dark' ? 'dark' : ''" style="height: 100dvh; background: var(--bg-primary);">
    <Toolbar
      :code="code"
      :theme="theme"
      :chart-element="chartElement"
      :editor-mode="editorMode"
      :mobile-tab="mobileTab"
      @code-change="handleCodeChange"
      @theme-change="handleThemeChange"
      @open-template="isTemplateOpen = true"
      @editor-mode-change="handleEditorModeChange"
      @save="handleSave"
      @mobile-tab-change="handleMobileTabChange"
    />

    <!-- 桌面端：分屏布局 -->
    <div v-if="!isMobile" class="flex-1 overflow-hidden">
      <SplitPane :default-ratio="0.3" @ratio-change="handleRatioChange">
        <template #left>
          <div class="h-full flex flex-col" style="background: var(--bg-secondary);">
            <div class="px-4 py-2 text-xs font-medium border-b flex items-center gap-2.5"
              style="border-color: var(--border-primary); color: var(--text-tertiary); background: var(--bg-tertiary);">
              <div class="w-5 h-5 rounded-md flex items-center justify-center" :style="{ background: 'var(--accent-subtle)' }">
                <svg v-if="editorMode === 'code'" class="w-3 h-3" :style="{ color: 'var(--accent)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <svg v-else class="w-3 h-3" :style="{ color: 'var(--accent)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <span>{{ editorMode === 'code' ? 'Mermaid 编辑器' : '可视化编辑器' }}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded font-mono" :style="{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-secondary)' }">{{ editorMode === 'code' ? 'Code' : 'Visual' }}</span>
            </div>
            <div class="flex-1 overflow-hidden">
              <MermaidEditor
                v-if="editorMode === 'code'"
                v-model="code"
                :theme="theme"
              />
              <VisualEditor
                v-else
                v-model="code"
                :theme="theme"
              />
            </div>
          </div>
        </template>
        <template #right>
          <div ref="previewContainerRef" class="h-full">
            <GanttPreview
              :code="debouncedCode"
              :theme="theme"
              :chart-theme="chartTheme"
              @error-change="hasError = $event"
              @chart-theme-change="handleChartThemeChange"
            />
          </div>
        </template>
      </SplitPane>
    </div>

    <!-- 移动端：Tab 全屏切换 -->
    <div v-else class="flex-1 overflow-hidden">
      <!-- 编辑器 Tab -->
      <div v-show="mobileTab === 'editor'" class="h-full flex flex-col" style="background: var(--bg-secondary);">
        <div class="flex-1 overflow-hidden">
          <MermaidEditor
            v-if="editorMode === 'code'"
            v-model="code"
            :theme="theme"
          />
          <VisualEditor
            v-else
            v-model="code"
            :theme="theme"
          />
        </div>
      </div>
      <!-- 预览 Tab -->
      <div v-show="mobileTab === 'preview'" ref="previewContainerRef" class="h-full">
        <GanttPreview
          :code="debouncedCode"
          :theme="theme"
          :chart-theme="chartTheme"
          @error-change="hasError = $event"
          @chart-theme-change="handleChartThemeChange"
        />
      </div>
    </div>

    <StatusBar :code="code" :has-error="hasError" :theme="theme" />

    <TemplateModal
      :is-open="isTemplateOpen"
      @close="isTemplateOpen = false"
      @select="handleTemplateSelect"
    />

    <Toast message="已保存到浏览器缓存" :show="showSaveToast" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import SplitPane from './components/SplitPane.vue'
import MermaidEditor from './components/MermaidEditor.vue'
import VisualEditor from './components/VisualEditor.vue'
import GanttPreview from './components/GanttPreview.vue'
import Toolbar from './components/Toolbar.vue'
import StatusBar from './components/StatusBar.vue'
import TemplateModal from './components/TemplateModal.vue'
import Toast from './components/Toast.vue'
import { useLocalStorage } from './composables/useLocalStorage'
import { ganttTemplates } from './utils/mermaidTemplates'
import type { GanttTemplate, ChartThemeId } from './types'

const DEFAULT_CODE = ganttTemplates[0].code

const [code, setCode] = useLocalStorage('gantt-studio-code', DEFAULT_CODE)
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('gantt-studio-theme', 'light')
const [, setSplitRatio] = useLocalStorage('gantt-studio-split', 0.3)
const [editorMode, setEditorMode] = useLocalStorage<'code' | 'visual'>('gantt-studio-editor-mode', 'visual')
const [chartTheme, setChartTheme] = useLocalStorage<ChartThemeId>('gantt-studio-chart-theme', 'aizuri')

const isTemplateOpen = ref(false)
const hasError = ref(false)
const showSaveToast = ref(false)
const previewContainerRef = ref<HTMLElement | null>(null)
const isMobile = ref(false)
const isPhone = ref(false)
const mobileTab = ref<'editor' | 'preview'>('editor')

const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const debouncedCode = ref(code.value)

watch(code, (newVal) => {
  if (debounceTimer.value) clearTimeout(debounceTimer.value)
  debounceTimer.value = setTimeout(() => {
    debouncedCode.value = newVal
  }, 300)
}, { immediate: true })

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  isPhone.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.documentElement.setAttribute('data-theme', theme.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Get chart element for export - find the SVG wrapper inside GanttPreview
const chartElement = computed(() => {
  if (!previewContainerRef.value) return null
  const svgWrapper = previewContainerRef.value.querySelector('.gantt-svg-wrapper')
    || previewContainerRef.value.querySelector('svg')?.parentElement
  return svgWrapper as HTMLElement || null
})

const handleCodeChange = (newCode: string) => {
  setCode(newCode)
}

const handleThemeChange = (newTheme: 'light' | 'dark') => {
  setTheme(newTheme)
  document.documentElement.setAttribute('data-theme', newTheme)
}

const handleRatioChange = (ratio: number) => {
  setSplitRatio(ratio)
}

const handleEditorModeChange = (mode: 'code' | 'visual') => {
  setEditorMode(mode)
}

const handleChartThemeChange = (newChartTheme: ChartThemeId) => {
  setChartTheme(newChartTheme)
}

const handleMobileTabChange = (tab: 'editor' | 'preview') => {
  mobileTab.value = tab
}

const handleSave = () => {
  try {
    window.localStorage.setItem('gantt-studio-code', JSON.stringify(code.value))
    window.localStorage.setItem('gantt-studio-theme', JSON.stringify(theme.value))
    window.localStorage.setItem('gantt-studio-chart-theme', JSON.stringify(chartTheme.value))
    window.localStorage.setItem('gantt-studio-editor-mode', JSON.stringify(editorMode.value))
  } catch {
    // localStorage may be full or unavailable
  }
  showSaveToast.value = false
  requestAnimationFrame(() => {
    showSaveToast.value = true
  })
}

const handleTemplateSelect = (template: GanttTemplate) => {
  setCode(template.code)
  isTemplateOpen.value = false
  // 选择模板后自动切到预览
  if (isMobile.value) {
    mobileTab.value = 'preview'
  }
}
</script>
