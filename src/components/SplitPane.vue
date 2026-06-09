<template>
  <!-- 移动端：上下堆叠；桌面端：左右分栏 -->
  <div
    class="h-full w-full md:flex"
    :class="isMobile ? 'flex flex-col' : ''"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
    ref="containerRef"
  >
    <!-- 左侧/上方面板 -->
    <div
      :style="isMobile ? { height: `${ratio * 100}%` } : { width: `${ratio * 100}%` }"
      class="h-full overflow-hidden"
    >
      <slot name="left" />
    </div>

    <!-- 分割线：桌面端竖向，移动端横向 -->
    <div
      v-if="!isMobile"
      class="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 transition-colors flex-shrink-0"
      @mousedown="onMouseDown"
    />
    <div
      v-else
      class="h-1 bg-gray-300 dark:bg-gray-600 cursor-row-resize hover:bg-blue-400 dark:hover:bg-blue-500 transition-colors flex-shrink-0"
      @mousedown="onRowMouseDown"
    />

    <!-- 右侧/下方面板 -->
    <div
      :style="isMobile ? { height: `${(1 - ratio) * 100}%` } : { width: `${(1 - ratio) * 100}%` }"
      class="h-full overflow-hidden"
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

// 桌面端：列方向拖拽
const onMouseDown = () => {
  if (isMobile.value) return
  isDragging.value = true
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

// 移动端：行方向拖拽
const onRowMouseDown = () => {
  if (!isMobile.value) return
  isDragging.value = true
  document.body.style.cursor = 'row-resize'
  document.body.style.userSelect = 'none'
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()

  if (isMobile.value) {
    // 上下拖拽
    const totalHeight = rect.height
    const newRatio = Math.max(
      0.2,
      Math.min(0.8, (e.clientY - rect.top) / totalHeight),
    )
    ratio.value = newRatio
  } else {
    // 左右拖拽
    const totalWidth = rect.width
    const newRatio = Math.max(
      props.minLeftWidth / totalWidth,
      Math.min(1 - props.minRightWidth / totalWidth, (e.clientX - rect.left) / totalWidth),
    )
    ratio.value = newRatio
  }
  emit('ratioChange', ratio.value)
}

const onMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}
</script>
