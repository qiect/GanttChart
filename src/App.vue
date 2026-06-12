<template>
  <div class="h-screen flex flex-col" :class="theme === 'dark' ? 'dark' : ''" style="height: 100dvh; background: var(--bg-primary);">
    <Toolbar
      :code="code"
      :theme="theme"
      :chart-element="chartElement"
      :editor-mode="editorMode"
      :mobile-tab="mobileTab"
      :layout-mode="layoutMode"
      @code-change="handleCodeChange"
      @theme-change="handleThemeChange"
      @open-template="isTemplateOpen = true"
      @editor-mode-change="handleEditorModeChange"
      @save="handleSave"
      @mobile-tab-change="handleMobileTabChange"
    />

    <!-- 手机端：Tab 全屏切换 -->
    <div v-if="layoutMode === 'mobile'" class="flex-1 overflow-hidden">
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
      <div v-show="mobileTab === 'preview'" class="h-full">
        <div ref="previewContainerRef" class="h-full flex flex-col" style="background: var(--bg-secondary);">
          <div class="flex-1 overflow-hidden">
            <GanttPreview
              :code="debouncedCode"
              :theme="theme"
              :chart-theme="chartTheme"
              @error-change="hasError = $event"
              @chart-theme-change="handleChartThemeChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- iPad / 桌面端：分屏布局 -->
    <div v-else class="flex-1 overflow-hidden">
      <SplitPane
        :default-ratio="layoutMode === 'tablet' ? 0.4 : 0.3"
        :min-left-width="layoutMode === 'tablet' ? 260 : 280"
        :min-right-width="layoutMode === 'tablet' ? 280 : 300"
        @ratio-change="handleRatioChange"
      >
        <template #left>
          <div class="h-full flex flex-col" style="background: var(--bg-secondary);">
            <div class="px-3 md:px-4 py-2 text-xs font-medium border-b flex items-center gap-2"
              style="border-color: var(--border-primary); color: var(--text-tertiary); background: var(--bg-tertiary);">
              <span class="w-1.5 h-1.5 rounded-full" :style="{ background: 'var(--accent)' }"></span>
              {{ editorMode === 'code' ? 'Mermaid 编辑器' : '可视化编辑器' }}
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
            <div class="h-full flex flex-col" style="background: var(--bg-secondary);">
              <div class="px-3 md:px-4 py-2 text-xs font-medium border-b flex items-center gap-2"
                style="border-color: var(--border-primary); color: var(--text-tertiary); background: var(--bg-tertiary);">
                <span class="w-1.5 h-1.5 rounded-full" :style="{ background: 'var(--success)' }"></span>
                甘特图预览
              </div>
              <div class="flex-1 overflow-hidden">
                <GanttPreview
                  :code="debouncedCode"
                  :theme="theme"
                  :chart-theme="chartTheme"
                  @error-change="hasError = $event"
                  @chart-theme-change="handleChartThemeChange"
                />
              </div>
            </div>
          </div>
        </template>
      </SplitPane>
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

type LayoutMode = 'mobile' | 'tablet' | 'desktop'

const DEFAULT_CODE = ganttTemplates[0].code

const [code, setCode] = useLocalStorage('gantt-studio-code', DEFAULT_CODE)
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('gantt-studio-theme', 'light')
const [, setSplitRatio] = useLocalStorage('gantt-studio-split', 0.3)
const [editorMode, setEditorMode] = useLocalStorage<'code' | 'visual'>('gantt-studio-editor-mode', 'visual')
const [chartTheme, setChartTheme] = useLocalStorage<ChartThemeId>('gantt-studio-chart-theme', 'indigo')

const isTemplateOpen = ref(false)
const hasError = ref(false)
const showSaveToast = ref(false)
const previewContainerRef = ref<HTMLElement | null>(null)
const layoutMode = ref<LayoutMode>('desktop')
const mobileTab = ref<'editor' | 'preview'>('editor')

const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const debouncedCode = ref(code.value)

watch(code, (newVal) => {
  if (debounceTimer.value) clearTimeout(debounceTimer.value)
  debounceTimer.value = setTimeout(() => {
    debouncedCode.value = newVal
  }, 300)
}, { immediate: true })

const checkLayout = () => {
  const w = window.innerWidth
  if (w < 640) {
    layoutMode.value = 'mobile'
  } else if (w < 1024) {
    layoutMode.value = 'tablet'
  } else {
    layoutMode.value = 'desktop'
  }
}

onMounted(() => {
  checkLayout()
  window.addEventListener('resize', checkLayout)
  document.documentElement.setAttribute('data-theme', theme.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkLayout)
})

// Get chart element for export - search more broadly
const chartElement = computed(() => {
  if (!previewContainerRef.value) return null
  const svgParent = previewContainerRef.value.querySelector('.flex.justify-center')
    || previewContainerRef.value.querySelector('svg')?.parentElement
    || previewContainerRef.value.querySelector('[class*="mermaid"]')
    || previewContainerRef.value.querySelector('.overflow-auto')
  return svgParent as HTMLElement || null
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
  // 手机端选择模板后自动切到预览
  if (layoutMode.value === 'mobile') {
    mobileTab.value = 'preview'
  }
}
</script>
