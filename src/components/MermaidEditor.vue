<template>
  <div class="h-full w-full flex flex-col" :class="theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'">
    <div class="px-2 md:px-3 py-1.5 text-xs font-medium border-b"
      :class="theme === 'dark' ? 'text-gray-400 border-gray-700 bg-gray-800/50' : 'text-gray-500 border-gray-200 bg-gray-50'">
      Mermaid 编辑器
    </div>
    <div ref="editorRef" class="flex-1 overflow-hidden" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { EditorState, type Extension } from '@codemirror/state'
import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands'
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language'
import { oneDark } from '@codemirror/theme-one-dark'

const props = defineProps<{
  modelValue: string
  theme: 'light' | 'dark'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorRef = ref<HTMLDivElement | null>(null)
let view: EditorView | null = null
// Flag to skip emitting when the change comes from external value sync
let isExternalUpdate = false

const createEditor = () => {
  if (!editorRef.value) return

  if (view) {
    view.destroy()
    view = null
  }

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged && !isExternalUpdate) {
      emit('update:modelValue', update.state.doc.toString())
    }
  })

  const themeExtensions: Extension[] = props.theme === 'dark' ? [oneDark] : []

  const state = EditorState.create({
    doc: props.modelValue,
    extensions: [
      lineNumbers(),
      highlightActiveLine(),
      history(),
      bracketMatching(),
      syntaxHighlighting(defaultHighlightStyle),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      updateListener,
      EditorView.lineWrapping,
      ...themeExtensions,
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': {
          fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
          fontSize: '13px',
        },
      }),
    ],
  })

  view = new EditorView({
    state,
    parent: editorRef.value,
  })
}

onMounted(() => {
  createEditor()
})

onUnmounted(() => {
  if (view) {
    view.destroy()
    view = null
  }
})

watch(() => props.theme, () => {
  createEditor()
})

watch(() => props.modelValue, (newVal) => {
  if (!view) return
  const currentValue = view.state.doc.toString()
  if (currentValue !== newVal) {
    isExternalUpdate = true
    view.dispatch({
      changes: { from: 0, to: currentValue.length, insert: newVal },
    })
    isExternalUpdate = false
  }
})
</script>
