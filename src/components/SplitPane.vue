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
      :style="isMobile ? { height: `${ratio * 100}%` } : { width: `${ratio * 100}%`, minWidth: `${minLeftWidth}px` }"
      class="overflow-hidden"
      :class="isMobile ? '' : 'h-full'"
    >
      <slot name="left" />
    </div>

    <!-- 分割线：桌面端竖向，移动端横向 -->
    <div
      v-if="!isMobile"
      class="relative flex-shrink-0 group"
      style="width: 1px;"
      @mousedown="onMouseDown"
    >
      <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px transition-all duration-300"
        :style="{
          background: isDragging ? 'var(--accent)' : 'var(--border-primary)',
          width: isDragging ? '2px' : '1px',
          boxShadow: isDragging ? '0 0 8px var(--accent-glow)' : 'none',
        }" />
      <!-- Drag handle dots -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[32px] rounded-full flex flex-col items-center justify-center gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        :style="{
          background: isDragging ? 'var(--accent)' : 'var(--bg-elevated)',
          border: isDragging ? '1px solid var(--accent)' : '1px solid var(--border-primary)',
          boxShadow: isDragging ? '0 0 12px var(--accent-glow)' : 'var(--shadow-md)',
        }">
        <span class="w-[3px] h-[3px] rounded-full" :style="{ background: isDragging ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)' }"></span>
        <span class="w-[3px] h-[3px] rounded-full" :style="{ background: isDragging ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)' }"></span>
        <span class="w-[3px] h-[3px] rounded-full" :style="{ background: isDragging ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)' }"></span>
      </div>
      <!-- Invisible wider hit area -->
      <div class="absolute inset-y-0 -left-2 w-5 cursor-col-resize" />
    </div>
    <div
      v-else
      class="relative flex-shrink-0 group"
      style="height: 1px;"
      @mousedown="onRowMouseDown"
      @touchstart="onRowTouchStart"
    >
      <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px transition-all duration-300"
        :style="{
          background: isDragging ? 'var(--accent)' : 'var(--border-primary)',
          height: isDragging ? '2px' : '1px',
          boxShadow: isDragging ? '0 0 8px var(--accent-glow)' : 'none',
        }" />
      <!-- Invisible wider hit area -->
      <div class="absolute inset-x-0 -top-2 h-5 cursor-row-resize" />
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
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
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
