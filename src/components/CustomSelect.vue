<template>
  <div class="custom-select" ref="selectRef">
    <button
      type="button"
      class="custom-select-trigger w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-lg cursor-pointer text-left"
      :style="{
        border: isOpen ? '1px solid var(--accent)' : '1px solid var(--border-primary)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        boxShadow: isOpen ? '0 0 0 3px var(--accent-glow)' : 'none',
      }"
      @click="isOpen = !isOpen"
    >
      <span class="truncate">{{ displayValue }}</span>
      <svg
        class="w-3.5 h-3.5 shrink-0 ml-1.5 transition-transform duration-200"
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', color: isOpen ? 'var(--accent)' : 'var(--text-tertiary)' }"
        viewBox="0 0 16 16" fill="currentColor"
      >
        <path d="M4.47 5.97a.75.75 0 011.06 0L8 8.44l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z"/>
      </svg>
    </button>
    <Teleport to="body">
      <Transition name="select-dropdown">
        <div v-if="isOpen"
          class="custom-select-dropdown fixed z-[9999] overflow-hidden"
          ref="dropdownRef"
          :style="{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            ...dropdownStyle,
          }"
        >
          <div class="py-1 max-h-48 overflow-y-auto">
            <button
              v-for="option in options"
              :key="option.value"
              type="button"
              class="w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors duration-100 flex items-center gap-2"
              :style="{
                color: modelValue === option.value ? 'var(--accent)' : 'var(--text-primary)',
                background: modelValue === option.value ? 'var(--accent-subtle)' : 'transparent',
                fontWeight: modelValue === option.value ? 600 : 400,
              }"
              @mouseenter="($event.target as HTMLElement).style.background = 'var(--accent-subtle)'"
              @mouseleave="($event.target as HTMLElement).style.background = modelValue === option.value ? 'var(--accent-subtle)' : 'transparent'"
              @click="selectOption(option.value)"
            >
              <span v-if="modelValue === option.value" class="w-1 h-1 rounded-full shrink-0" :style="{ background: 'var(--accent)' }"></span>
              <span v-else class="w-1 h-1 rounded-full shrink-0" style="background: transparent;"></span>
              {{ option.label }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

interface SelectOption {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  modelValue: string
  options: SelectOption[]
  placeholder?: string
}>(), {
  placeholder: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const isOpen = ref(false)
const selectRef = ref<HTMLDivElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref<Record<string, string>>({})

const displayValue = computed(() => {
  const opt = props.options.find(o => o.value === props.modelValue)
  return opt ? opt.label : props.placeholder || props.modelValue
})

const updatePosition = () => {
  if (!selectRef.value || !isOpen.value) return
  const rect = selectRef.value.getBoundingClientRect()
  const viewportH = window.innerHeight
  const dropdownH = Math.min(props.options.length * 36 + 8, 200)
  const spaceBelow = viewportH - rect.bottom
  const openAbove = spaceBelow < dropdownH && rect.top > dropdownH

  dropdownStyle.value = {
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    ...(openAbove
      ? { bottom: `${viewportH - rect.top + 4}px` }
      : { top: `${rect.bottom + 4}px` }),
  }
}

watch(isOpen, async (val) => {
  if (val) {
    await nextTick()
    updatePosition()
  }
})

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node
  if (
    selectRef.value && !selectRef.value.contains(target) &&
    dropdownRef.value && !dropdownRef.value.contains(target)
  ) {
    isOpen.value = false
  }
}

const handleScroll = () => {
  if (isOpen.value) updatePosition()
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleScroll)
})
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleScroll)
})
</script>

<style scoped>
.custom-select {
  position: relative;
}

.select-dropdown-enter-active {
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}
.select-dropdown-leave-active {
  transition: all 0.1s ease-in;
}
.select-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
</style>
