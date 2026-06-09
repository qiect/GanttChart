<template>
  <div ref="editorRef" class="h-full w-full" />
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

const createEditor = () => {
  if (!editorRef.value) return

  // Destroy existing editor
  if (view) {
    view.destroy()
    view = null
  }

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
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

// Re-create editor on theme change
watch(() => props.theme, () => {
  createEditor()
})

// Sync external value changes (e.g., template loading)
watch(() => props.modelValue, (newVal) => {
  if (!view) return
  const currentValue = view.state.doc.toString()
  if (currentValue !== newVal) {
    view.dispatch({
      changes: { from: 0, to: currentValue.length, insert: newVal },
    })
  }
})
</script>
