<template>
  <div class="statusbar" :class="theme === 'dark' ? 'statusbar--dark' : 'statusbar--light'">
    <div class="statusbar__left">
      <span class="statusbar__label">Mermaid Gantt</span>
      <span v-if="hasError" class="statusbar__status statusbar__status--error">
        <span class="statusbar__dot statusbar__dot--error" />
        <span class="statusbar__status-text">语法错误</span>
      </span>
      <span v-else-if="code.trim()" class="statusbar__status statusbar__status--ok">
        <span class="statusbar__dot statusbar__dot--ok" />
        <span class="statusbar__status-text">渲染成功</span>
      </span>
    </div>
    <div class="statusbar__right">
      <span class="statusbar__stat">行 {{ lineCount }}</span>
      <span class="statusbar__stat">字符 {{ charCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: string
  hasError: boolean
  theme: 'light' | 'dark'
}>()

const lineCount = computed(() => props.code.split('\n').length)
const charCount = computed(() => props.code.length)
</script>

<style scoped>
.statusbar {
  height: 1.625rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;
  font-size: 0.6875rem;
  flex-shrink: 0;
  border-top: 1px solid;
}

.statusbar--light {
  background: #fafbfe;
  border-color: #f1f5f9;
  color: #94a3b8;
}

.statusbar--dark {
  background: #111827;
  border-color: #1e2538;
  color: #4a5568;
}

.statusbar__left,
.statusbar__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.statusbar__label {
  font-weight: 600;
  letter-spacing: 0.02em;
}

.statusbar__status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.statusbar__dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
}

.statusbar__dot--error {
  background: #ef4444;
  box-shadow: 0 0 4px rgba(239, 68, 68, 0.4);
}

.statusbar__dot--ok {
  background: #22c55e;
  box-shadow: 0 0 4px rgba(34, 197, 94, 0.4);
}

.statusbar__status--error {
  color: #ef4444;
}

.statusbar__status--ok {
  color: #22c55e;
}

.statusbar__status-text {
  display: none;
}

@media (min-width: 640px) {
  .statusbar__status-text {
    display: inline;
  }
}

.statusbar__stat {
  font-variant-numeric: tabular-nums;
}
</style>
