<template>
  <div
    class="split-pane"
    :class="isMobile ? 'split-pane--col' : 'split-pane--row'"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
    @touchmove.prevent="onTouchMove"
    @touchend="onMouseUp"
    ref="containerRef"
  >
    <!-- 左侧/上方面板 -->
    <div
      :style="isMobile ? { height: `${ratio * 100}%` } : { width: `${ratio * 100}%` }"
      class="split-pane__panel split-pane__panel--left"
    >
      <slot name="left" />
    </div>

    <!-- 分割线 -->
    <div
      v-if="!isMobile"
      class="split-pane__divider split-pane__divider--col"
      @mousedown="onMouseDown"
    >
      <div class="split-pane__divider-line split-pane__divider-line--col" />
    </div>
    <div
      v-else
      class="split-pane__divider split-pane__divider--row"
      @mousedown="onRowMouseDown"
      @touchstart="onRowTouchStart"
    >
      <div class="split-pane__divider-line split-pane__divider-line--row" />
    </div>

    <!-- 右侧/下方面板 -->
    <div
      :style="isMobile ? { height: `${(1 - ratio) * 100}%` } : { width: `${(1 - ratio) * 100}%` }"
      class="split-pane__panel split-pane__panel--right"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const onMouseDown = () => {
  if (isMobile.value) return
  isDragging.value = true
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const onRowMouseDown = () => {
  if (!isMobile.value) return
  isDragging.value = true
  document.body.style.cursor = 'row-resize'
  document.body.style.userSelect = 'none'
}

const onRowTouchStart = () => {
  isDragging.value = true
}

const updateRatio = (clientX: number, clientY: number) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()

  if (isMobile.value) {
    const totalHeight = rect.height
    const newRatio = Math.max(0.2, Math.min(0.8, (clientY - rect.top) / totalHeight))
    ratio.value = newRatio
  } else {
    const totalWidth = rect.width
    const newRatio = Math.max(
      props.minLeftWidth / totalWidth,
      Math.min(1 - props.minRightWidth / totalWidth, (clientX - rect.left) / totalWidth),
    )
    ratio.value = newRatio
  }
  emit('ratioChange', ratio.value)
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  updateRatio(e.clientX, e.clientY)
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  const touch = e.touches[0]
  updateRatio(touch.clientX, touch.clientY)
}

const onMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}
</script>

<style scoped>
.split-pane {
  height: 100%;
  width: 100%;
  display: flex;
}

.split-pane--row {
  flex-direction: row;
}

.split-pane--col {
  flex-direction: column;
}

.split-pane__panel {
  overflow: hidden;
  min-height: 0;
  min-width: 0;
}

.split-pane--row .split-pane__panel {
  height: 100%;
}

/* Divider */
.split-pane__divider {
  position: relative;
  flex-shrink: 0;
  z-index: 1;
}

.split-pane__divider--col {
  width: 5px;
  cursor: col-resize;
}

.split-pane__divider--row {
  height: 5px;
  cursor: row-resize;
}

.split-pane__divider-line {
  position: absolute;
  transition: background 0.15s ease;
}

.split-pane__divider-line--col {
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  background: #e2e8f0;
}

.split-pane__divider-line--row {
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1px;
  background: #e2e8f0;
}

[data-theme="dark"] .split-pane__divider-line--col,
[data-theme="dark"] .split-pane__divider-line--row {
  background: #1e2538;
}

.split-pane__divider:hover .split-pane__divider-line--col,
.split-pane__divider:hover .split-pane__divider-line--row {
  background: #4F8CF7;
  width: 2px;
}

.split-pane__divider:hover .split-pane__divider-line--row {
  height: 2px;
}
</style>
