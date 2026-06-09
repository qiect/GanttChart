<template>
  <div class="flex h-full w-full" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp" ref="containerRef">
    <div :style="{ width: `${ratio * 100}%` }" class="h-full overflow-hidden">
      <slot name="left" />
    </div>
    <div
      class="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 transition-colors flex-shrink-0"
      @mousedown="onMouseDown"
    />
    <div :style="{ width: `${(1 - ratio) * 100}%` }" class="h-full overflow-hidden">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  defaultRatio?: number
  minLeftWidth?: number
  minRightWidth?: number
}>(), {
  defaultRatio: 0.4,
  minLeftWidth: 280,
  minRightWidth: 300,
})

const emit = defineEmits<{
  ratioChange: [ratio: number]
}>()

const ratio = ref(props.defaultRatio)
const containerRef = ref<HTMLDivElement | null>(null)
const isDragging = ref(false)

const onMouseDown = () => {
  isDragging.value = true
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const totalWidth = rect.width
  const newRatio = Math.max(
    props.minLeftWidth / totalWidth,
    Math.min(1 - props.minRightWidth / totalWidth, (e.clientX - rect.left) / totalWidth),
  )
  ratio.value = newRatio
  emit('ratioChange', newRatio)
}

const onMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}
</script>
