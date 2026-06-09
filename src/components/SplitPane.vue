<template>
  <!-- 移动端：上下堆叠；桌面端：左右分栏 -->
  <div
    class="h-full w-full flex"
    :class="isMobile ? 'flex-col' : 'flex-row'"
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
      class="overflow-hidden"
      :class="isMobile ? '' : 'h-full'"
    >
      <slot name="left" />
    </div>

    <!-- 分割线：桌面端竖向，移动端横向。加宽拖拽区域 -->
    <div
      v-if="!isMobile"
      class="relative flex-shrink-0 group"
      style="width: 5px;"
      @mousedown="onMouseDown"
    >
      <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-500 transition-colors cursor-col-resize" />
    </div>
    <div
      v-else
      class="relative flex-shrink-0 group"
      style="height: 5px;"
      @mousedown="onRowMouseDown"
      @touchstart="onRowTouchStart"
    >
      <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-500 transition-colors cursor-row-resize" />
    </div>

    <!-- 右侧/下方面板 -->
    <div
      :style="isMobile ? { height: `${(1 - ratio) * 100}%` } : { width: `${(1 - ratio) * 100}%` }"
      class="overflow-hidden"
      :class="isMobile ? '' : 'h-full'"
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
