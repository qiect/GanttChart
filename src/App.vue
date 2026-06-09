<template>
  <div class="h-screen flex flex-col" :class="theme === 'dark' ? 'dark' : ''" style="height: 100dvh;">
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

    <div class="flex-1 overflow-hidden">
      <SplitPane :default-ratio="0.4" @ratio-change="handleRatioChange">
        <template #left>
          <div class="h-full flex flex-col" :class="theme === 'dark' ? 'bg-gray-900' : 'bg-white'">
            <div class="px-2 md:px-3 py-1.5 text-xs font-medium border-b"
              :class="theme === 'dark' ? 'text-gray-400 border-gray-700 bg-gray-800/50' : 'text-gray-500 border-gray-200 bg-gray-50'">
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
            <div class="h-full flex flex-col" :class="theme === 'dark' ? 'bg-gray-900' : 'bg-white'">
              <div class="px-2 md:px-3 py-1.5 text-xs font-medium border-b"
                :class="theme === 'dark' ? 'text-gray-400 border-gray-700 bg-gray-800/50' : 'text-gray-500 border-gray-200 bg-gray-50'">
                预览
              </div>
              <div class="flex-1 overflow-hidden">
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
const [editorMode, setEditorMode] = useLocalStorage<'code' | 'visual'>('gantt-studio-editor-mode', 'code')

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
  // Try multiple selectors to find the rendered chart
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

const handleTemplateSelect = (template: GanttTemplate) => {
  setCode(template.code)
  isTemplateOpen.value = false
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>
