import { ref, watch, type Ref } from 'vue'
import mermaid from 'mermaid'
import { getMermaidConfig } from '../utils/mermaidConfig'
import type { ChartThemeId } from '../types'

let renderCounter = 0

export function useMermaidRender(code: Ref<string>, chartTheme: Ref<ChartThemeId>) {
  const svg = ref<string>('')
  const error = ref<string>('')
  const success = ref(false)
  const rendering = ref(false)

  const render = async () => {
    if (!code.value.trim() || rendering.value) return

    rendering.value = true
    const id = `mermaid-gantt-${++renderCounter}`

    try {
      mermaid.initialize(getMermaidConfig(chartTheme.value))
      const result = await mermaid.render(id, code.value)
      svg.value = result.svg
      error.value = ''
      success.value = true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '渲染失败'
      error.value = errorMessage
      success.value = false
      // Clean up any partial render output
      const errorEl = document.getElementById(id)
      if (errorEl) errorEl.remove()
    } finally {
      rendering.value = false
    }
  }

  watch([code, chartTheme], render, { immediate: true })

  return { svg, error, success, rendering, render }
}
