<template>
  <div ref="editorRef" class="h-full w-full" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view'
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

const lightTheme = EditorView.theme({
  '&': {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
  },
  '.cm-content': {
    fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
    fontSize: '13px',
    lineHeight: '1.6',
    padding: '0.5rem 0',
  },
  '.cm-gutters': {
    backgroundColor: '#fafbfe',
    borderRight: '1px solid #f1f5f9',
    color: '#94a3b8',
    fontSize: '11px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#f0f4ff',
    color: '#64748b',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(79, 140, 247, 0.04)',
  },
  '.cm-selectionMatch': {
    backgroundColor: 'rgba(79, 140, 247, 0.08)',
  },
  '.cm-cursor': {
    borderLeftColor: '#4F8CF7',
    borderLeftWidth: '2px',
  },
  '.cm-selectionBackground': {
    backgroundColor: 'rgba(79, 140, 247, 0.15) !important',
  },
  '.cm-focused .cm-selectionBackground': {
    backgroundColor: 'rgba(79, 140, 247, 0.2) !important',
  },
  '.cm-line': {
    padding: '0 0.75rem',
  },
  '.cm-foldGutter': {
    color: '#94a3b8',
  },
})

const darkThemeOverrides = EditorView.theme({
  '&': {
    backgroundColor: '#0f1320',
  },
  '.cm-gutters': {
    backgroundColor: '#111827',
    borderRight: '1px solid #1e2538',
    color: '#4a5568',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#1a2340',
    color: '#94a3b8',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(79, 140, 247, 0.06)',
  },
  '.cm-selectionMatch': {
    backgroundColor: 'rgba(79, 140, 247, 0.12)',
  },
  '.cm-cursor': {
    borderLeftColor: '#4F8CF7',
  },
  '.cm-selectionBackground': {
    backgroundColor: 'rgba(79, 140, 247, 0.2) !important',
  },
  '.cm-focused .cm-selectionBackground': {
    backgroundColor: 'rgba(79, 140, 247, 0.25) !important',
  },
})

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

  const themeExtensions: Extension[] = props.theme === 'dark'
    ? [oneDark, darkThemeOverrides]
    : [lightTheme]

  const state = EditorState.create({
    doc: props.modelValue,
    extensions: [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      history(),
      bracketMatching(),
      syntaxHighlighting(defaultHighlightStyle),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      updateListener,
      EditorView.lineWrapping,
      ...themeExtensions,
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
