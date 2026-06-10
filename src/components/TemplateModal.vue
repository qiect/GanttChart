<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
    <!-- Backdrop with blur -->
    <div class="absolute inset-0" style="background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);" @click="$emit('close')" />
    <!-- Modal -->
    <div class="relative w-full h-full md:h-auto md:max-h-[80vh] md:max-w-2xl overflow-hidden flex flex-col animate-scale-in"
      :style="{
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-primary)',
      }">
      <!-- Header -->
      <div class="p-5 md:p-7 shrink-0" style="border-bottom: 1px solid var(--border-secondary);">
        <h2 class="text-lg md:text-xl font-semibold" style="color: var(--text-primary);">选择模板</h2>
        <p class="text-sm mt-1.5" style="color: var(--text-tertiary);">选择一个预设模板快速开始</p>
      </div>
      <!-- Grid -->
      <div class="p-4 md:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <button
          v-for="template in ganttTemplates"
          :key="template.id"
          class="text-left p-4 md:p-5 rounded-xl transition-all duration-200 group cursor-pointer"
          :style="{
            border: '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)',
          }"
          @click="$emit('select', template); $emit('close')"
          @mouseenter="($event.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; ($event.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-glow)'"
          @mouseleave="($event.currentTarget as HTMLElement).style.borderColor = 'var(--border-primary)'; ($event.currentTarget as HTMLElement).style.boxShadow = 'none'"
        >
          <h3 class="font-semibold text-sm md:text-base group-hover:text-[var(--accent)] transition-colors" style="color: var(--text-primary);">
            {{ template.name }}
          </h3>
          <p class="text-xs md:text-sm mt-1.5" style="color: var(--text-tertiary);">
            {{ template.description }}
          </p>
        </button>
      </div>
      <!-- Footer -->
      <div class="p-4 md:p-5 flex justify-end shrink-0" style="border-top: 1px solid var(--border-secondary);">
        <button
          class="premium-btn px-5 py-2 text-sm rounded-lg cursor-pointer font-medium transition-all duration-200"
          :style="{
            color: 'var(--text-secondary)',
            background: 'var(--bg-tertiary)',
          }"
          @click="$emit('close')"
          @mouseenter="($event.target as HTMLElement).style.background = 'var(--border-primary)'"
          @mouseleave="($event.target as HTMLElement).style.background = 'var(--bg-tertiary)'"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ganttTemplates } from '../utils/mermaidTemplates'
import type { GanttTemplate } from '../types'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
  select: [template: GanttTemplate]
}>()
</script>
