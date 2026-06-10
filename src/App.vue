<template>
  <div class="app-root" :class="theme === 'dark' ? 'app-root--dark' : 'app-root--light'" style="height: 100dvh;">
    <Toolbar
      :code="code"
      :theme="theme"
      :chart-element="chartElement"
      :editor-mode="editorMode"
      @code-change="handleCodeChange"
      @theme-change="handleThemeChange"
      @open-template="isTemplateOpen = true"
      @editor-mode-change="handleEditorModeChange"
    />

    <div class="app-main">
      <SplitPane :default-ratio="0.4" @ratio-change="handleRatioChange">
        <template #left>
          <div class="app-panel" :class="theme === 'dark' ? 'app-panel--dark' : 'app-panel--light'">
            <div class="app-panel__tab" :class="theme === 'dark' ? 'app-panel__tab--dark' : 'app-panel__tab--light'">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity:0.5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              {{ editorMode === 'code' ? 'Mermaid 编辑器' : '可视化编辑器' }}
            </div>
            <div class="app-panel__content">
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
            <div class="app-panel" :class="theme === 'dark' ? 'app-panel--dark' : 'app-panel--light'">
              <div class="app-panel__tab" :class="theme === 'dark' ? 'app-panel__tab--dark' : 'app-panel__tab--light'">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity:0.5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                甘特图预览
              </div>
              <div class="app-panel__content">
                <GanttPreview :code="debouncedCode" :theme="theme" @error-change="hasError = $event" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import SplitPane from './components/SplitPane.vue'
import MermaidEditor from './components/MermaidEditor.vue'
import VisualEditor from './components/VisualEditor.vue'
import GanttPreview from './components/GanttPreview.vue'
import Toolbar from './components/Toolbar.vue'
import StatusBar from './components/StatusBar.vue'
import TemplateModal from './components/TemplateModal.vue'
import { useLocalStorage } from './composables/useLocalStorage'
import { ganttTemplates } from './utils/mermaidTemplates'
import type { GanttTemplate } from './types'

const DEFAULT_CODE = ganttTemplates[0].code

const [code, setCode] = useLocalStorage('gantt-studio-code', DEFAULT_CODE)
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('gantt-studio-theme', 'light')
const [, setSplitRatio] = useLocalStorage('gantt-studio-split', 0.4)
const [editorMode, setEditorMode] = useLocalStorage<'code' | 'visual'>('gantt-studio-editor-mode', 'visual')

const isTemplateOpen = ref(false)
const hasError = ref(false)
const previewContainerRef = ref<HTMLElement | null>(null)

const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const debouncedCode = ref(code.value)

watch(code, (newVal) => {
  if (debounceTimer.value) clearTimeout(debounceTimer.value)
  debounceTimer.value = setTimeout(() => {
    debouncedCode.value = newVal
  }, 300)
}, { immediate: true })

// Get chart element for export - search more broadly
const chartElement = computed(() => {
  if (!previewContainerRef.value) return null
  const svgParent = previewContainerRef.value.querySelector('.gantt-preview__svg-wrap')
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

const handleTemplateSelect = (template: GanttTemplate) => {
  setCode(template.code)
  isTemplateOpen.value = false
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

<style scoped>
.app-root {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}

.app-root--light {
  background: #f8faff;
}

.app-root--dark {
  background: #0a0e1a;
}

.app-main {
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.app-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.app-panel--light {
  background: #ffffff;
  border-right: 1px solid #eef2ff;
}

.app-panel--dark {
  background: #0f1320;
  border-right: 1px solid #1e2538;
}

.app-panel__tab {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  flex-shrink: 0;
  border-bottom: 1px solid;
}

.app-panel__tab--light {
  color: #94a3b8;
  background: #fafbfe;
  border-color: #f1f5f9;
}

.app-panel__tab--dark {
  color: #64748b;
  background: #111827;
  border-color: #1e2538;
}

.app-panel__content {
  flex: 1;
  overflow: hidden;
  min-height: 0;
}
</style>
