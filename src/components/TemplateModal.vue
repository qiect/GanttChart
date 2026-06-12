<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 modal-backdrop" @click="$emit('close')" />

    <!-- Modal -->
    <div class="relative w-full h-full md:h-auto md:max-h-[85vh] md:max-w-3xl overflow-hidden flex flex-col modal-container"
      :style="{
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-primary)',
      }">
      <!-- Header -->
      <div class="shrink-0 px-5 pt-5 md:px-7 md:pt-6 pb-0">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg md:text-xl font-bold" style="color: var(--text-primary);">选择模板</h2>
            <p class="text-sm mt-0.5" style="color: var(--text-tertiary);">从预设模板快速创建甘特图</p>
          </div>
          <button @click="$emit('close')" class="p-2 rounded-lg cursor-pointer transition-colors"
            style="color: var(--text-tertiary);"
            @mouseenter="($event.target as HTMLElement).style.background = 'var(--bg-tertiary)'; ($event.target as HTMLElement).style.color = 'var(--text-primary)'"
            @mouseleave="($event.target as HTMLElement).style.background = 'transparent'; ($event.target as HTMLElement).style.color = 'var(--text-tertiary)'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Search -->
        <div class="mt-4 relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style="color: var(--text-tertiary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            placeholder="搜索模板名称或描述..."
            class="search-input w-full pl-9 pr-9 py-2.5 text-sm rounded-xl outline-none"
            :style="{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-primary)',
            }"
          />
          <button
            v-if="searchQuery"
            class="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded cursor-pointer transition-colors"
            style="color: var(--text-tertiary);"
            @click="searchQuery = ''"
            @mouseenter="($event.target as HTMLElement).style.color = 'var(--text-primary)'"
            @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-tertiary)'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Category Tabs -->
        <div class="mt-4 flex items-center gap-1 overflow-x-auto category-scroll pb-3">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="category-tab flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200 shrink-0"
            :style="activeCategory === cat.id ? {
              background: 'var(--accent)',
              color: '#ffffff',
              boxShadow: '0 2px 8px var(--accent-glow)',
            } : {
              color: 'var(--text-tertiary)',
              background: 'transparent',
            }"
            @mouseenter="activeCategory !== cat.id && (($event.target as HTMLElement).style.background = 'var(--bg-tertiary)')"
            @mouseleave="activeCategory !== cat.id && (($event.target as HTMLElement).style.background = 'transparent')"
          >
            <span class="text-sm">{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
            <span class="text-[10px] font-semibold px-1 py-0.5 rounded-md"
              :style="activeCategory === cat.id ? { background: 'rgba(255,255,255,0.2)' } : { background: 'var(--bg-tertiary)' }">
              {{ getCategoryCount(cat.id) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Template Grid -->
      <div class="flex-1 overflow-y-auto px-5 md:px-7 pb-5 md:pb-7">
        <div v-if="filteredTemplates.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          <button
            v-for="(template, index) in filteredTemplates"
            :key="template.id"
            class="template-card text-left rounded-xl transition-all duration-200 cursor-pointer group overflow-hidden"
            :style="{
              border: '1px solid var(--border-primary)',
              background: 'var(--bg-secondary)',
              animationDelay: `${index * 30}ms`,
            }"
            @click="$emit('select', template); $emit('close')"
          >
            <!-- Card top accent -->
            <div class="h-1 w-full" :style="{ background: categoryAccentMap[template.category] || 'var(--accent)' }" />
            <div class="p-4">
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-lg"
                  :style="{ background: categoryBgMap[template.category] || 'var(--accent-subtle)' }">
                  {{ template.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-sm leading-snug group-hover:text-[var(--accent)] transition-colors truncate" style="color: var(--text-primary);">
                    {{ template.name }}
                  </h3>
                  <p class="text-xs mt-1 line-clamp-2 leading-relaxed" style="color: var(--text-tertiary);">
                    {{ template.description }}
                  </p>
                </div>
              </div>
              <div class="mt-3 flex items-center gap-2">
                <span class="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                  :style="{ background: categoryBgMap[template.category], color: categoryTextMap[template.category] }">
                  {{ getCategoryLabel(template.category) }}
                </span>
              </div>
            </div>
          </button>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-16">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style="background: var(--bg-tertiary);">
            <svg class="w-6 h-6" style="color: var(--text-tertiary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p class="text-sm font-medium" style="color: var(--text-secondary);">没有找到匹配的模板</p>
          <p class="text-xs mt-1" style="color: var(--text-tertiary);">试试其他关键词或切换分类</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ganttTemplates } from '../utils/mermaidTemplates'
import type { GanttTemplate, TemplateCategory } from '../types'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
  select: [template: GanttTemplate]
}>()

const searchQuery = ref('')
const activeCategory = ref<TemplateCategory | 'all'>('all')

const categories: { id: TemplateCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: '全部', icon: '📋' },
  { id: 'software', label: '软件研发', icon: '💻' },
  { id: 'business', label: '商业运营', icon: '📈' },
  { id: 'engineering', label: '工程制造', icon: '🏗️' },
  { id: 'life', label: '生活策划', icon: '🎉' },
  { id: 'education', label: '教育人力', icon: '📚' },
]

const categoryAccentMap: Record<string, string> = {
  software: '#6366f1',
  business: '#059669',
  engineering: '#d97706',
  life: '#e11d48',
  education: '#0891b2',
}

const categoryBgMap: Record<string, string> = {
  software: 'rgba(99, 102, 241, 0.1)',
  business: 'rgba(5, 150, 105, 0.1)',
  engineering: 'rgba(217, 119, 6, 0.1)',
  life: 'rgba(225, 29, 72, 0.1)',
  education: 'rgba(8, 145, 178, 0.1)',
}

const categoryTextMap: Record<string, string> = {
  software: '#6366f1',
  business: '#059669',
  engineering: '#d97706',
  life: '#e11d48',
  education: '#0891b2',
}

const categoryLabelMap: Record<TemplateCategory, string> = {
  software: '软件研发',
  business: '商业运营',
  engineering: '工程制造',
  life: '生活策划',
  education: '教育人力',
}

const getCategoryLabel = (cat: TemplateCategory) => categoryLabelMap[cat] || cat

const getCategoryCount = (catId: TemplateCategory | 'all') => {
  if (catId === 'all') return ganttTemplates.length
  return ganttTemplates.filter(t => t.category === catId).length
}

const filteredTemplates = computed(() => {
  let result = ganttTemplates

  if (activeCategory.value !== 'all') {
    result = result.filter(t => t.category === activeCategory.value)
  }

  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    result = result.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      categoryLabelMap[t.category]?.toLowerCase().includes(query)
    )
  }

  return result
})
</script>

<style scoped>
/* ── Backdrop ── */
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* ── Modal Container ── */
.modal-container {
  animation: modal-enter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* ── Search Input ── */
.search-input {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

/* ── Category Scroll ── */
.category-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

/* ── Template Card ── */
.template-card {
  animation: card-enter 0.3s ease-out both;
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.template-card:hover {
  border-color: var(--accent) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px var(--accent-glow);
  transform: translateY(-1px);
}

.template-card:active {
  transform: translateY(0);
}

/* ── Line Clamp ── */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
