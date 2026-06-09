<template>
  <div class="h-full flex flex-col" :class="theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'">
    <!-- Header -->
    <div class="px-3 py-1.5 text-xs font-medium border-b flex items-center justify-between"
      :class="theme === 'dark' ? 'text-gray-400 border-gray-700 bg-gray-800/50' : 'text-gray-500 border-gray-200 bg-gray-50'">
      <span>可视化编辑器</span>
      <div class="flex gap-1">
        <button @click="addSection" class="px-2 py-0.5 text-xs rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400">
          + 分区
        </button>
      </div>
    </div>

    <!-- Title & Date Format -->
    <div class="p-3 border-b space-y-2" :class="theme === 'dark' ? 'border-gray-700' : 'border-gray-200'">
      <div class="flex gap-2">
        <div class="flex-1">
          <label class="text-xs text-gray-500 block mb-1">项目标题</label>
          <input v-model="title" @input="emitCode" class="w-full px-2 py-1 text-sm border rounded"
            :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'" />
        </div>
        <div class="w-40">
          <label class="text-xs text-gray-500 block mb-1">日期格式</label>
          <select v-model="dateFormat" @change="emitCode" class="w-full px-2 py-1 text-sm border rounded"
            :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'">
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Sections & Tasks -->
    <div class="flex-1 overflow-y-auto p-3 space-y-4">
      <div v-for="(section, si) in sections" :key="si"
        class="border rounded-lg overflow-hidden" :class="theme === 'dark' ? 'border-gray-700' : 'border-gray-200'">
        <!-- Section Header -->
        <div class="flex items-center gap-2 px-3 py-2" :class="theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <input v-model="section.name" @input="emitCode" class="flex-1 px-2 py-0.5 text-sm font-medium border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-400 rounded" />
          <button @click="addTask(si)" class="px-2 py-0.5 text-xs rounded bg-blue-500 text-white hover:bg-blue-600">
            + 任务
          </button>
          <button @click="removeSection(si)" class="p-1 text-gray-400 hover:text-red-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Tasks -->
        <div class="p-3 space-y-2">
          <div v-for="(task, ti) in section.tasks" :key="ti"
            class="flex items-start gap-2 p-2 rounded border"
            :class="theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'">
            <div class="flex-1 grid grid-cols-2 gap-2">
              <div>
                <label class="text-xs text-gray-500 block mb-0.5">任务名称</label>
                <input v-model="task.name" @input="emitCode" class="w-full px-2 py-1 text-sm border rounded"
                  :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'" />
              </div>
              <div>
                <label class="text-xs text-gray-500 block mb-0.5">任务ID</label>
                <input v-model="task.id" @input="emitCode" class="w-full px-2 py-1 text-sm border rounded font-mono"
                  :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'" />
              </div>
              <div>
                <label class="text-xs text-gray-500 block mb-0.5">开始日期</label>
                <input v-model="task.startDate" @input="emitCode" type="date" class="w-full px-2 py-1 text-sm border rounded"
                  :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'" />
              </div>
              <div>
                <label class="text-xs text-gray-500 block mb-0.5">工期</label>
                <div class="flex gap-1">
                  <input :value="getDurationNum(si, ti)" @input="onDurationNumInput(si, ti, ($event.target as HTMLInputElement).value)" type="number" min="0"
                    class="w-16 px-2 py-1 text-sm border rounded"
                    :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'" />
                  <select :value="taskDurationUnits[si] ?? 'd'" @change="onDurationUnitChange(si, ti, ($event.target as HTMLSelectElement).value)" class="px-1 py-1 text-sm border rounded"
                    :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'">
                    <option value="d">天</option>
                    <option value="h">小时</option>
                    <option value="w">周</option>
                    <option value="m">月</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="text-xs text-gray-500 block mb-0.5">依赖任务</label>
                <select v-model="task.dependsOn" @change="emitCode" class="w-full px-2 py-1 text-sm border rounded"
                  :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'">
                  <option value="">无依赖</option>
                  <option v-for="t in getAllTasksExcept(task.id)" :key="t.id" :value="t.id">
                    {{ t.name }} ({{ t.id }})
                  </option>
                </select>
              </div>
              <div>
                <label class="text-xs text-gray-500 block mb-0.5">状态</label>
                <select v-model="task.status" @change="emitCode" class="w-full px-2 py-1 text-sm border rounded"
                  :class="theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'">
                  <option value="">普通</option>
                  <option value="active">进行中</option>
                  <option value="done">已完成</option>
                  <option value="crit">关键</option>
                  <option value="milestone">里程碑</option>
                </select>
              </div>
            </div>
            <button @click="removeTask(si, ti)" class="p-1 text-gray-400 hover:text-red-500 mt-5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div v-if="section.tasks.length === 0" class="text-center py-4 text-gray-400 text-sm">
            暂无任务，点击上方"+ 任务"添加
          </div>
        </div>
      </div>

      <div v-if="sections.length === 0" class="text-center py-8 text-gray-400 text-sm">
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

// Parse incoming code into sections
const parseCode = () => {
  const parsed = parseMermaidGantt(props.modelValue)
  sections.value = parsed

  // Extract title and dateFormat from code
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

  // Parse duration numbers and units
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

// Generate code from sections and emit
const emitCode = () => {
  const code = generateMermaidGantt(sections.value, title.value, dateFormat.value)
  emit('update:modelValue', code)
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
  // Update duration nums
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

// Watch for external code changes
watch(() => props.modelValue, () => {
  parseCode()
}, { immediate: true })
</script>
