<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
    <!-- Backdrop -->
    <div class="absolute inset-0 modal-backdrop" @click="$emit('close')" />

    <!-- Modal -->
    <div class="relative w-full h-full md:h-auto md:max-h-[85vh] md:max-w-[860px] overflow-hidden flex flex-col animate-scale-in"
      :style="{
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px var(--border-primary)',
      }">

      <!-- Header -->
      <div class="px-6 pt-6 pb-4 shrink-0">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold" style="color: var(--text-primary);">选择模板</h2>
            <p class="text-xs mt-1" style="color: var(--text-tertiary);">选择一个预设模板快速开始，共 {{ ganttTemplates.length }} 个模板</p>
          </div>
          <button class="p-1.5 rounded-lg cursor-pointer transition-colors"
            style="color: var(--text-tertiary);"
            @click="$emit('close')"
            @mouseenter="($event.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'; ($event.currentTarget as HTMLElement).style.color = 'var(--text-primary)'"
            @mouseleave="($event.currentTarget as HTMLElement).style.background = 'transparent'; ($event.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Search -->
        <div class="mt-3 relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style="color: var(--text-tertiary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            placeholder="搜索模板..."
            class="search-input w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all duration-200"
            :style="{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-primary)',
            }"
            @focus="($event.target as HTMLElement).style.borderColor = 'var(--accent)'; ($event.target as HTMLElement).style.boxShadow = '0 0 0 3px var(--accent-glow)'"
            @blur="($event.target as HTMLElement).style.borderColor = 'var(--border-primary)'; ($event.target as HTMLElement).style.boxShadow = 'none'"
          />
          <button
            v-if="searchQuery"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded cursor-pointer transition-colors"
            :style="{ color: 'var(--text-tertiary)' }"
            @click="searchQuery = ''"
            @mouseenter="($event.target as HTMLElement).style.color = 'var(--text-primary)'"
            @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-tertiary)'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Body: Sidebar + Content -->
      <div class="flex-1 overflow-hidden flex min-h-0">
        <!-- Category Sidebar -->
        <nav v-if="!searchQuery.trim()" class="w-44 shrink-0 overflow-y-auto py-2 px-2 hidden md:block sidebar-scroll"
          style="border-right: 1px solid var(--border-secondary);">
          <button
            v-for="cat in templateCategories"
            :key="cat.id"
            class="cat-btn w-full text-left px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-2.5 mb-0.5"
            :style="activeCategory === cat.id ? {
              background: cat.color + '12',
              color: cat.color,
            } : {
              color: 'var(--text-secondary)',
            }"
            @click="activeCategory = cat.id"
          >
            <span class="cat-icon w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0"
              :style="activeCategory === cat.id ? { background: cat.color + '20', color: cat.color } : { background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }">
              <CatIcon :name="cat.id" />
            </span>
            <span class="text-sm font-medium truncate">{{ cat.name }}</span>
            <span class="ml-auto text-[10px] font-mono tabular-nums"
              :style="{ color: activeCategory === cat.id ? cat.color : 'var(--text-tertiary)', opacity: 0.7 }">
              {{ getTemplateCount(cat.id) }}
            </span>
          </button>
        </nav>

        <!-- Mobile Category Tabs -->
        <div v-if="!searchQuery.trim()" class="md:hidden flex overflow-x-auto gap-1 px-4 py-2 shrink-0"
          style="border-bottom: 1px solid var(--border-secondary); scrollbar-width: none;">
          <button
            v-for="cat in templateCategories"
            :key="cat.id"
            class="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-150"
            :style="activeCategory === cat.id ? {
              background: cat.color + '15',
              color: cat.color,
              border: '1px solid ' + cat.color + '30',
            } : {
              color: 'var(--text-tertiary)',
              border: '1px solid var(--border-primary)',
            }"
            @click="activeCategory = cat.id"
          >
            {{ cat.name }}
          </button>
        </div>

        <!-- Template Grid -->
        <div class="flex-1 overflow-y-auto p-4 md:p-5 content-scroll">
          <!-- Category section when not searching -->
          <template v-if="!searchQuery.trim()">
            <div class="mb-3 flex items-center gap-2">
              <span class="text-sm font-bold" :style="{ color: activeCategoryInfo.color }">{{ activeCategoryInfo.name }}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full font-mono" :style="{ background: activeCategoryInfo.color + '12', color: activeCategoryInfo.color }">{{ filteredTemplates.length }}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                v-for="template in filteredTemplates"
                :key="template.id"
                class="tmpl-card text-left p-4 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden"
                :style="{
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                }"
                @click="$emit('select', template); $emit('close')"
                @mouseenter="onCardEnter"
                @mouseleave="onCardLeave"
              >
                <!-- Accent bar -->
                <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  :style="{ background: activeCategoryInfo.color }" />
                <h3 class="font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200" style="color: var(--text-primary);">
                  {{ template.name }}
                </h3>
                <p class="text-xs mt-1.5 leading-relaxed" style="color: var(--text-tertiary);">
                  {{ template.description }}
                </p>
                <div class="mt-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span class="text-[10px] font-medium px-1.5 py-0.5 rounded" :style="{ background: activeCategoryInfo.color + '10', color: activeCategoryInfo.color }">使用模板</span>
                  <svg class="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" :style="{ color: activeCategoryInfo.color }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </template>

          <!-- Search results -->
          <template v-else>
            <div v-if="searchResults.length > 0">
              <div v-for="cat in categoriesWithResults" :key="cat.id" class="mb-5">
                <div class="mb-2.5 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" :style="{ background: cat.color }" />
                  <span class="text-sm font-bold" :style="{ color: cat.color }">{{ cat.name }}</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-mono" :style="{ background: cat.color + '12', color: cat.color }">{{ getSearchCount(cat.id) }}</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    v-for="template in getSearchResults(cat.id)"
                    :key="template.id"
                    class="tmpl-card text-left p-4 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden"
                    :style="{
                      border: '1px solid var(--border-primary)',
                      background: 'var(--bg-secondary)',
                    }"
                    @click="$emit('select', template); $emit('close')"
                    @mouseenter="onCardEnter"
                    @mouseleave="onCardLeave"
                  >
                    <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                      :style="{ background: cat.color }" />
                    <h3 class="font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200" style="color: var(--text-primary);">
                      {{ template.name }}
                    </h3>
                    <p class="text-xs mt-1.5 leading-relaxed" style="color: var(--text-tertiary);">
                      {{ template.description }}
                    </p>
                    <div class="mt-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span class="text-[10px] font-medium px-1.5 py-0.5 rounded" :style="{ background: cat.color + '10', color: cat.color }">使用模板</span>
                      <svg class="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" :style="{ color: cat.color }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-16">
              <svg class="w-12 h-12 mb-3" style="color: var(--text-tertiary); opacity: 0.4;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p class="text-sm" style="color: var(--text-tertiary);">没有找到匹配的模板</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ganttTemplates, templateCategories } from '../utils/mermaidTemplates'
import type { GanttTemplate, TemplateCategory } from '../types'
import CatIcon from './CatIcon.vue'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
  select: [template: GanttTemplate]
}>()

const searchQuery = ref('')
const activeCategory = ref<TemplateCategory>('project')

const activeCategoryInfo = computed(() =>
  templateCategories.find(c => c.id === activeCategory.value) || templateCategories[0]
)

const filteredTemplates = computed(() => {
  return ganttTemplates.filter(t => t.category === activeCategory.value)
})

const searchResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return []
  return ganttTemplates.filter(t =>
    t.name.toLowerCase().includes(query) ||
    t.description.toLowerCase().includes(query)
  )
})

const categoriesWithResults = computed(() => {
  const catIds = new Set(searchResults.value.map(t => t.category))
  return templateCategories.filter(c => catIds.has(c.id))
})

const getTemplateCount = (catId: TemplateCategory) =>
  ganttTemplates.filter(t => t.category === catId).length

const getSearchCount = (catId: TemplateCategory) =>
  searchResults.value.filter(t => t.category === catId).length

const getSearchResults = (catId: TemplateCategory) =>
  searchResults.value.filter(t => t.category === catId)

const onCardEnter = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  el.style.borderColor = 'var(--accent)'
  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px var(--accent-glow)'
}

const onCardLeave = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  el.style.borderColor = 'var(--border-primary)'
  el.style.boxShadow = 'none'
}
</script>

<style scoped>
.modal-backdrop {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

/* Category button */
.cat-btn:hover {
  background: var(--bg-tertiary);
}

/* Template card */
.tmpl-card:hover {
  background: var(--bg-tertiary) !important;
}

/* Scrollbars */
.sidebar-scroll::-webkit-scrollbar,
.content-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track,
.content-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-scroll::-webkit-scrollbar-thumb,
.content-scroll::-webkit-scrollbar-thumb {
  background: var(--border-primary);
  border-radius: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb:hover,
.content-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}

/* Animation */
.animate-scale-in {
  animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
