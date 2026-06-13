<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 modal-backdrop" @click="$emit('close')" />

    <!-- Modal — 底部弹出(手机) / 居中弹窗(平板+) -->
    <div class="relative w-full sm:max-w-[860px] overflow-hidden flex flex-col modal-container animate-slide-up sm:animate-scale-in"
      :style="{
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      }"
      style="--sm-radius: var(--radius-xl);">

      <!-- Header -->
      <div class="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 shrink-0">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base sm:text-lg font-bold" style="color: var(--text-primary);">选择模板</h2>
            <p class="text-[11px] sm:text-xs mt-0.5" style="color: var(--text-tertiary);">共 {{ ganttTemplates.length }} 个模板</p>
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
        <div class="mt-2.5 sm:mt-3 relative">
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

      <!-- Category Tabs — 手机/平板横向滚动，桌面端侧栏 -->
      <div v-if="!searchQuery.trim()" class="shrink-0 lg:hidden overflow-x-auto cat-tabs-scroll"
        style="border-top: 1px solid var(--border-secondary); border-bottom: 1px solid var(--border-secondary);">
        <div class="flex gap-1 px-3 sm:px-4 py-2">
          <button
            v-for="cat in templateCategories"
            :key="cat.id"
            class="cat-pill shrink-0 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-150 whitespace-nowrap"
            :style="activeCategory === cat.id ? {
              background: cat.color + '15',
              color: cat.color,
              border: '1px solid ' + cat.color + '30',
            } : {
              color: 'var(--text-tertiary)',
              border: '1px solid var(--border-primary)',
              background: 'transparent',
            }"
            @click="activeCategory = cat.id"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-hidden flex min-h-0" style="max-height: 60vh;">

        <!-- Desktop Sidebar (lg+) -->
        <nav v-if="!searchQuery.trim()" class="w-44 shrink-0 overflow-y-auto py-2 px-2 hidden lg:block sidebar-scroll"
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

        <!-- Template Grid -->
        <div class="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 content-scroll">
          <!-- Category section when not searching -->
          <template v-if="!searchQuery.trim()">
            <div class="mb-2.5 flex items-center gap-2">
              <span class="text-sm font-bold" :style="{ color: activeCategoryInfo.color }">{{ activeCategoryInfo.name }}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full font-mono" :style="{ background: activeCategoryInfo.color + '12', color: activeCategoryInfo.color }">{{ filteredTemplates.length }}</span>
            </div>
            <!-- Blank template card -->
            <button
              class="tmpl-card text-left p-3 sm:p-4 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden mb-2.5 sm:mb-3"
              :style="{
                border: '1px dashed var(--border-primary)',
                background: 'var(--bg-secondary)',
              }"
              @click="$emit('select', blankTemplate); $emit('close')"
              @mouseenter="onBlankEnter"
              @mouseleave="onBlankLeave"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  :style="{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)' }">
                  <svg class="w-4.5 h-4.5" style="color: var(--text-tertiary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <h3 class="font-semibold text-sm" style="color: var(--text-primary);">空白模板</h3>
                  <p class="text-xs mt-0.5" style="color: var(--text-tertiary);">从零开始创建甘特图</p>
                </div>
              </div>
            </button>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <button
                v-for="template in filteredTemplates"
                :key="template.id"
                class="tmpl-card text-left p-3 sm:p-4 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden"
                :style="{
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                }"
                @click="$emit('select', template); $emit('close')"
                @mouseenter="onCardEnter"
                @mouseleave="onCardLeave"
              >
                <!-- Accent bar -->
                <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-100"
                  :style="{ background: activeCategoryInfo.color }" />
                <h3 class="font-semibold text-sm group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-200" style="color: var(--text-primary);">
                  {{ template.name }}
                </h3>
                <p class="text-xs mt-1 leading-relaxed" style="color: var(--text-tertiary);">
                  {{ template.description }}
                </p>
                <!-- Hover hint (desktop) / Active hint (touch) -->
                <div class="mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-active:opacity-60 transition-opacity duration-200">
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
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    v-for="template in getSearchResults(cat.id)"
                    :key="template.id"
                    class="tmpl-card text-left p-3 sm:p-4 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden"
                    :style="{
                      border: '1px solid var(--border-primary)',
                      background: 'var(--bg-secondary)',
                    }"
                    @click="$emit('select', template); $emit('close')"
                    @mouseenter="onCardEnter"
                    @mouseleave="onCardLeave"
                  >
                    <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-100"
                      :style="{ background: cat.color }" />
                    <h3 class="font-semibold text-sm group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-200" style="color: var(--text-primary);">
                      {{ template.name }}
                    </h3>
                    <p class="text-xs mt-1 leading-relaxed" style="color: var(--text-tertiary);">
                      {{ template.description }}
                    </p>
                    <div class="mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-active:opacity-60 transition-opacity duration-200">
                      <span class="text-[10px] font-medium px-1.5 py-0.5 rounded" :style="{ background: cat.color + '10', color: cat.color }">使用模板</span>
                      <svg class="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" :style="{ color: cat.color }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-12">
              <svg class="w-10 h-10 mb-2" style="color: var(--text-tertiary); opacity: 0.35;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { ganttTemplates, templateCategories, blankTemplate } from '../utils/mermaidTemplates'
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

const onBlankEnter = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  el.style.borderColor = 'var(--accent)'
  el.style.borderStyle = 'solid'
  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px var(--accent-glow)'
}

const onBlankLeave = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  el.style.borderColor = 'var(--border-primary)'
  el.style.borderStyle = 'dashed'
  el.style.boxShadow = 'none'
}
</script>

<style scoped>
.modal-backdrop {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* ── Modal Container ── */
.modal-container {
  max-height: 85vh;
  box-shadow: 0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px var(--border-primary);
}

@media (min-width: 640px) {
  .modal-container {
    border-radius: var(--radius-xl) !important;
    max-height: 85vh;
  }
}

/* ── Phone: bottom sheet, max 75% screen ── */
@media (max-width: 639px) {
  .modal-container {
    max-height: 75vh;
    border-radius: 20px 20px 0 0 !important;
  }
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

/* ── Category Tabs Scroll ── */
.cat-tabs-scroll {
  scrollbar-width: none;
}
.cat-tabs-scroll::-webkit-scrollbar {
  display: none;
}

/* ── Category button ── */
.cat-btn:hover {
  background: var(--bg-tertiary);
}

/* ── Category pill active press ── */
.cat-pill:active {
  transform: scale(0.95);
}

/* ── Template card ── */
.tmpl-card:hover {
  background: var(--bg-tertiary) !important;
}
.tmpl-card:active {
  transform: scale(0.98);
  background: var(--bg-tertiary) !important;
}

/* ── Scrollbars ── */
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

/* ── Animations ── */
/* Phone: slide up from bottom */
.animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tablet/Desktop: scale in from center */
@media (min-width: 640px) {
  .animate-scale-in {
    animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
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
