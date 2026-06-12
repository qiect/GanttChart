<template>
  <div
    class="h-full w-full flex flex-row"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
    @touchmove.prevent="onTouchMove"
    @touchend="onMouseUp"
    ref="containerRef"
  >
    <!-- 左侧面板 -->
    <div
      :style="{ width: `${ratio * 100}%` }"
      class="overflow-hidden h-full"
    >
      <slot name="left" />
    </div>

    <!-- 分割线 -->
    <div
      class="relative flex-shrink-0 group"
      style="width: 1px;"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
    >
      <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px transition-all duration-300"
        :style="{
          background: isDragging ? 'var(--accent)' : 'var(--border-primary)',
          width: isDragging ? '2px' : '1px',
          boxShadow: isDragging ? '0 0 8px var(--accent-glow)' : 'none',
        }" />
      <!-- 触摸友好的更宽点击区域 -->
      <div class="absolute inset-y-0 -left-2 w-5 cursor-col-resize" />
    </div>

    <!-- 右侧面板 -->
    <div
      :style="{ width: `${(1 - ratio) * 100}%` }"
      class="overflow-hidden h-full"
    >
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
  defaultRatio: 0.3,
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

const onTouchStart = () => {
  isDragging.value = true
}

const updateRatio = (clientX: number) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const totalWidth = rect.width
  const newRatio = Math.max(
    props.minLeftWidth / totalWidth,
    Math.min(1 - props.minRightWidth / totalWidth, (clientX - rect.left) / totalWidth),
  )
  ratio.value = newRatio
  emit('ratioChange', ratio.value)
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  updateRatio(e.clientX)
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  const touch = e.touches[0]
  updateRatio(touch.clientX)
}

const onMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}
</script>
