<template>
  <div class="h-full flex flex-col" style="background: var(--bg-secondary); color: var(--text-primary);">
    <!-- Title & Date Format & Add Section -->
    <div class="p-3 md:p-4 border-b space-y-3" style="border-color: var(--border-primary);">
      <div class="flex flex-col sm:flex-row gap-2.5">
        <div class="flex-1">
          <label class="text-[11px] font-medium block mb-1.5 tracking-wide" style="color: var(--text-tertiary);">项目标题</label>
          <input v-model="title" @input="emitCode" class="premium-input w-full px-3 py-2 text-sm rounded-lg outline-none" />
        </div>
        <div class="sm:w-40">
          <label class="text-[11px] font-medium block mb-1.5 tracking-wide" style="color: var(--text-tertiary);">日期格式</label>
          <select v-model="dateFormat" @change="emitCode" class="premium-input w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer">
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
          </select>
        </div>
        <div class="sm:w-auto flex items-end">
          <button @click="addSection" class="premium-btn px-4 py-2 text-sm rounded-lg cursor-pointer font-medium"
            :style="{
              background: 'var(--accent)',
              color: '#ffffff',
            }"
            @mouseenter="($event.target as HTMLElement).style.background = 'var(--accent-hover)'"
            @mouseleave="($event.target as HTMLElement).style.background = 'var(--accent)'">
            + 分区
          </button>
        </div>
      </div>
    </div>

    <!-- Sections & Tasks -->
    <div class="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
      <div v-for="(section, si) in sections" :key="si"
        class="rounded-xl overflow-hidden"
        :style="{
          border: '1px solid var(--border-primary)',
          boxShadow: 'var(--shadow-sm)',
        }">
        <!-- Section Header -->
        <div class="flex items-center gap-2 px-3 md:px-4 py-2.5" style="background: var(--bg-tertiary);">
          <svg class="w-4 h-4 shrink-0" style="color: var(--text-tertiary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <input v-model="section.name" @input="emitCode" class="flex-1 min-w-0 px-2 py-0.5 text-sm font-medium bg-transparent focus:outline-none rounded-md"
            :style="{ color: 'var(--text-primary)' }" />
          <button @click="addTask(si)" class="premium-btn px-2.5 py-1 text-xs rounded-lg cursor-pointer font-medium shrink-0"
            :style="{
              background: 'var(--accent)',
              color: '#ffffff',
            }"
            @mouseenter="($event.target as HTMLElement).style.background = 'var(--accent-hover)'"
            @mouseleave="($event.target as HTMLElement).style.background = 'var(--accent)'">
            + 任务
          </button>
          <button @click="removeSection(si)" class="premium-btn p-1.5 rounded-lg shrink-0 cursor-pointer transition-colors duration-200"
            :style="{ color: 'var(--text-tertiary)' }"
            @mouseenter="($event.target as HTMLElement).style.color = 'var(--error)'; ($event.target as HTMLElement).style.background = 'rgba(239,68,68,0.08)'"
            @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-tertiary)'; ($event.target as HTMLElement).style.background = 'transparent'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Tasks -->
        <div class="p-2.5 md:p-3 space-y-2">
          <div v-for="(task, ti) in section.tasks" :key="ti"
            class="p-3 md:p-3.5 rounded-lg"
            :style="{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-secondary)',
            }">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label class="text-[11px] font-medium block mb-1 tracking-wide" style="color: var(--text-tertiary);">任务名称</label>
                <input v-model="task.name" @input="emitCode" class="premium-input w-full px-3 py-1.5 text-sm rounded-lg outline-none" />
              </div>
              <div>
                <label class="text-[11px] font-medium block mb-1 tracking-wide" style="color: var(--text-tertiary);">任务ID</label>
                <input v-model="task.id" @input="emitCode" class="premium-input w-full px-3 py-1.5 text-sm rounded-lg font-mono outline-none" />
              </div>
              <div>
                <label class="text-[11px] font-medium block mb-1 tracking-wide" style="color: var(--text-tertiary);">开始日期</label>
                <input v-model="task.startDate" @input="emitCode" type="date" class="premium-input w-full px-3 py-1.5 text-sm rounded-lg outline-none" />
              </div>
              <div>
                <label class="text-[11px] font-medium block mb-1 tracking-wide" style="color: var(--text-tertiary);">工期</label>
                <div class="flex gap-1.5">
                  <input :value="getDurationNum(si, ti)" @input="onDurationNumInput(si, ti, ($event.target as HTMLInputElement).value)" type="number" min="0"
                    class="premium-input w-20 sm:w-16 px-3 py-1.5 text-sm rounded-lg outline-none" />
                  <select :value="taskDurationUnits[si] ?? 'd'" @change="onDurationUnitChange(si, ti, ($event.target as HTMLSelectElement).value)" class="premium-input flex-1 px-2 py-1.5 text-sm rounded-lg outline-none cursor-pointer">
                    <option value="d">天</option>
                    <option value="h">小时</option>
                    <option value="w">周</option>
                    <option value="m">月</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="text-[11px] font-medium block mb-1 tracking-wide" style="color: var(--text-tertiary);">依赖任务</label>
                <select v-model="task.dependsOn" @change="onDependsOnChange(task)" class="premium-input w-full px-3 py-1.5 text-sm rounded-lg outline-none cursor-pointer">
                  <option value="">无依赖</option>
                  <option v-for="t in getAllTasksExcept(task.id)" :key="t.id" :value="t.id">
                    {{ t.name }} ({{ t.id }})
                  </option>
                </select>
              </div>
              <div class="flex items-end gap-1.5">
                <div class="flex-1">
                  <label class="text-[11px] font-medium block mb-1 tracking-wide" style="color: var(--text-tertiary);">状态</label>
                  <select v-model="task.status" @change="onStatusChange(task)" class="premium-input w-full px-3 py-1.5 text-sm rounded-lg outline-none cursor-pointer">
                    <option value="">普通</option>
                    <option value="active">进行中</option>
                    <option value="done">已完成</option>
                    <option value="crit">关键</option>
                    <option value="milestone">里程碑</option>
                  </select>
                </div>
                <button @click="removeTask(si, ti)" class="premium-btn p-1.5 rounded-lg shrink-0 cursor-pointer transition-colors duration-200"
                  :style="{
                    color: 'var(--text-tertiary)',
                    border: '1px solid var(--border-primary)',
                  }"
                  @mouseenter="($event.target as HTMLElement).style.color = 'var(--error)'; ($event.target as HTMLElement).style.borderColor = 'var(--error)'; ($event.target as HTMLElement).style.background = 'rgba(239,68,68,0.08)'"
                  @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-tertiary)'; ($event.target as HTMLElement).style.borderColor = 'var(--border-primary)'; ($event.target as HTMLElement).style.background = 'transparent'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-if="section.tasks.length === 0" class="text-center py-6 text-sm" style="color: var(--text-tertiary);">
            暂无任务，点击上方"+ 任务"添加
          </div>
        </div>
      </div>

      <div v-if="sections.length === 0" class="text-center py-10 text-sm" style="color: var(--text-tertiary);">
        暂无分区，点击上方"+ 分区"添加
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { parseMermaidGantt, generateMermaidGantt, generateTaskId } from '../utils/ganttParser'
import type { GanttSection, GanttTask } from '../types'

const props = defineProps<{
  modelValue: string
  theme: 'light' | 'dark'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const title = ref('项目计划')
const dateFormat = ref('YYYY-MM-DD')
const sections = ref<GanttSection[]>([])
const taskDurationNums = ref<Record<number, Record<number, number>>>({})
const taskDurationUnits = ref<Record<number, string>>({})

// Flag to prevent infinite loop: when we emit code, skip re-parsing
let isEmitting = false

const parseCode = () => {
  if (isEmitting) return

  const parsed = parseMermaidGantt(props.modelValue)
  sections.value = parsed

  const lines = props.modelValue.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('title ')) {
      title.value = trimmed.replace('title ', '')
    }
    if (trimmed.startsWith('dateFormat ')) {
      dateFormat.value = trimmed.replace('dateFormat ', '')
    }
  }

  taskDurationNums.value = {}
  taskDurationUnits.value = {}
  parsed.forEach((section, si) => {
    taskDurationNums.value[si] = {}
    section.tasks.forEach((task, ti) => {
      const match = task.duration.match(/^(\d+)([dhwm])$/)
      if (match) {
        taskDurationNums.value[si][ti] = parseInt(match[1])
        taskDurationUnits.value[si] = match[2]
      } else {
        taskDurationNums.value[si][ti] = 0
        taskDurationUnits.value[si] = 'd'
      }
    })
  })
}

const emitCode = () => {
  isEmitting = true
  const code = generateMermaidGantt(sections.value, title.value, dateFormat.value)
  emit('update:modelValue', code)
  // Reset flag after Vue's next tick
  setTimeout(() => { isEmitting = false }, 0)
}

const getDurationNum = (si: number, ti: number): number => {
  return taskDurationNums.value[si]?.[ti] ?? 0
}

const onDurationNumInput = (si: number, ti: number, val: string) => {
  const num = parseInt(val) || 0
  if (!taskDurationNums.value[si]) taskDurationNums.value[si] = {}
  taskDurationNums.value[si][ti] = num
  const unit = taskDurationUnits.value[si] ?? 'd'
  sections.value[si].tasks[ti].duration = `${num}${unit}`
  emitCode()
}

const onDurationUnitChange = (si: number, ti: number, val: string) => {
  taskDurationUnits.value[si] = val
  const num = taskDurationNums.value[si]?.[ti] ?? 0
  sections.value[si].tasks[ti].duration = `${num}${val}`
  emitCode()
}

// When dependsOn is set, clear startDate (they're mutually exclusive in Mermaid)
const onDependsOnChange = (task: GanttTask) => {
  if (task.dependsOn) {
    task.startDate = ''
  }
  emitCode()
}

// When status is milestone, set duration to 0d
const onStatusChange = (task: GanttTask) => {
  if (task.status === 'milestone') {
    task.duration = '0d'
  }
  emitCode()
}

const getAllTasksExcept = (excludeId: string): GanttTask[] => {
  const all: GanttTask[] = []
  for (const section of sections.value) {
    for (const task of section.tasks) {
      if (task.id !== excludeId) {
        all.push(task)
      }
    }
  }
  return all
}

const addSection = () => {
  sections.value.push({ name: '新分区', tasks: [] })
  emitCode()
}

const removeSection = (index: number) => {
  sections.value.splice(index, 1)
  emitCode()
}

const addTask = (sectionIndex: number) => {
  const existingIds = sections.value.flatMap(s => s.tasks.map(t => t.id))
  const newId = generateTaskId(existingIds)
  const today = new Date().toISOString().split('T')[0]
  sections.value[sectionIndex].tasks.push({
    id: newId,
    name: '新任务',
    section: sections.value[sectionIndex].name,
    startDate: today,
    duration: '7d',
    status: '',
    dependsOn: '',
  })
  const ti = sections.value[sectionIndex].tasks.length - 1
  if (!taskDurationNums.value[sectionIndex]) taskDurationNums.value[sectionIndex] = {}
  taskDurationNums.value[sectionIndex][ti] = 7
  taskDurationUnits.value[sectionIndex] = 'd'
  emitCode()
}

const removeTask = (sectionIndex: number, taskIndex: number) => {
  sections.value[sectionIndex].tasks.splice(taskIndex, 1)
  emitCode()
}

watch(() => props.modelValue, () => {
  parseCode()
}, { immediate: true })
</script>
