<template>
  <Transition name="toast">
    <div v-if="visible"
      class="fixed top-16 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg pointer-events-none"
      :style="{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-primary)',
        color: 'var(--text-primary)',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(var(--glass-blur))',
      }"
    >
      <svg class="w-4 h-4 shrink-0" :style="{ color: 'var(--success)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      {{ message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  message: string
  show: boolean
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.show, (val) => {
  if (val) {
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, 1800)
  }
})
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: all 0.25s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px);
}
</style>
