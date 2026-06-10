<template>
  <div class="ve" :class="theme === 'dark' ? 've--dark' : 've--light'">
    <!-- Title & Date Format & Add Section -->
    <div class="ve__header">
      <div class="ve__header-row">
        <div class="ve__field ve__field--grow">
          <label class="ve__label">项目标题</label>
          <input v-model="title" @input="emitCode" class="ve__input" />
        </div>
        <div class="ve__field ve__field--sm">
          <label class="ve__label">日期格式</label>
          <select v-model="dateFormat" @change="emitCode" class="ve__input ve__input--select">
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
          </select>
        </div>
        <div class="ve__field ve__field--btn">
          <button @click="addSection" class="ve__add-section-btn">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>分区</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Sections & Tasks -->
    <div class="ve__body">
      <div v-for="(section, si) in sections" :key="si" class="ve__section">
        <!-- Section Header -->
        <div class="ve__section-header">
          <div class="ve__section-drag">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <input v-model="section.name" @input="emitCode" class="ve__section-name" />
          <button @click="addTask(si)" class="ve__add-task-btn">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            任务
          </button>
          <button @click="removeSection(si)" class="ve__delete-btn" title="删除分区">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Tasks -->
        <div class="ve__tasks">
          <div v-for="(task, ti) in section.tasks" :key="ti" class="ve__task">
            <div class="ve__task-grid">
              <div class="ve__field">
                <label class="ve__label">任务名称</label>
                <input v-model="task.name" @input="emitCode" class="ve__input" />
              </div>
              <div class="ve__field">
                <label class="ve__label">任务ID</label>
                <input v-model="task.id" @input="emitCode" class="ve__input ve__input--mono" />
              </div>
              <div class="ve__field">
                <label class="ve__label">开始日期</label>
                <input v-model="task.startDate" @input="emitCode" type="date" class="ve__input" />
              </div>
              <div class="ve__field">
                <label class="ve__label">工期</label>
                <div class="ve__duration">
                  <input :value="getDurationNum(si, ti)" @input="onDurationNumInput(si, ti, ($event.target as HTMLInputElement).value)" type="number" min="0"
                    class="ve__input ve__input--num" />
                  <select :value="taskDurationUnits[si] ?? 'd'" @change="onDurationUnitChange(si, ti, ($event.target as HTMLSelectElement).value)" class="ve__input ve__input--select ve__input--unit">
                    <option value="d">天</option>
                    <option value="h">小时</option>
                    <option value="w">周</option>
                    <option value="m">月</option>
                  </select>
                </div>
              </div>
              <div class="ve__field">
                <label class="ve__label">依赖任务</label>
                <select v-model="task.dependsOn" @change="onDependsOnChange(task)" class="ve__input ve__input--select">
                  <option value="">无依赖</option>
                  <option v-for="t in getAllTasksExcept(task.id)" :key="t.id" :value="t.id">
                    {{ t.name }} ({{ t.id }})
                  </option>
                </select>
              </div>
              <div class="ve__field ve__field--status">
                <label class="ve__label">状态</label>
                <div class="ve__status-row">
                  <select v-model="task.status" @change="onStatusChange(task)" class="ve__input ve__input--select">
                    <option value="">普通</option>
                    <option value="active">进行中</option>
                    <option value="done">已完成</option>
                    <option value="crit">关键</option>
                    <option value="milestone">里程碑</option>
                  </select>
                  <button @click="removeTask(si, ti)" class="ve__task-delete-btn" title="删除任务">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="section.tasks.length === 0" class="ve__empty-tasks">
            暂无任务，点击上方"+ 任务"添加
          </div>
        </div>
      </div>

      <div v-if="sections.length === 0" class="ve__empty-sections">
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

<style scoped>
.ve {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  min-height: 0;
  overflow: hidden;
}

.ve--light {
  background: #ffffff;
  color: #1e293b;
}

.ve--dark {
  background: #0f1320;
  color: #e2e8f0;
}

/* Header */
.ve__header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid;
  flex-shrink: 0;
}

.ve--light .ve__header {
  border-color: #f1f5f9;
  background: #fafbfe;
}

.ve--dark .ve__header {
  border-color: #1e2538;
  background: #111827;
}

.ve__header-row {
  display: flex;
  gap: 0.625rem;
  align-items: flex-end;
}

.ve__field {
  flex: 1;
  min-width: 0;
}

.ve__field--grow {
  flex: 2;
}

.ve__field--sm {
  max-width: 10rem;
}

.ve__field--btn {
  flex: 0 0 auto;
}

.ve__field--status {
  min-width: 0;
}

.ve__label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.ve--light .ve__label {
  color: #94a3b8;
}

.ve--dark .ve__label {
  color: #64748b;
}

.ve__input {
  width: 100%;
  padding: 0.4375rem 0.625rem;
  font-size: 0.8125rem;
  border: 1px solid;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.15s ease;
  line-height: 1.4;
}

.ve__input--mono {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.75rem;
}

.ve__input--num {
  width: 4.5rem;
  flex-shrink: 0;
}

.ve__input--unit {
  flex: 1;
  min-width: 3.5rem;
}

.ve__input--select {
  cursor: pointer;
}

.ve--light .ve__input {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #1e293b;
}

.ve--light .ve__input:focus {
  border-color: #4F8CF7;
  box-shadow: 0 0 0 3px rgba(79, 140, 247, 0.1);
}

.ve--dark .ve__input {
  background: #1a2035;
  border-color: #2d3748;
  color: #e2e8f0;
}

.ve--dark .ve__input:focus {
  border-color: #4F8CF7;
  box-shadow: 0 0 0 3px rgba(79, 140, 247, 0.15);
}

/* Add Section Button */
.ve__add-section-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.4375rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  color: #ffffff;
  background: linear-gradient(135deg, #4F8CF7 0%, #7C5CFC 100%);
  box-shadow: 0 1px 3px rgba(79, 140, 247, 0.3);
}

.ve__add-section-btn:hover {
  box-shadow: 0 2px 8px rgba(79, 140, 247, 0.4);
  transform: translateY(-1px);
}

.ve__add-section-btn:active {
  transform: translateY(0);
}

/* Body */
.ve__body {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
}

/* Section */
.ve__section {
  border: 1px solid;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: box-shadow 0.15s ease;
}

.ve--light .ve__section {
  border-color: #e8ecf2;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.ve--light .ve__section:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.ve--dark .ve__section {
  border-color: #1e2538;
  background: #141b2d;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.ve--dark .ve__section:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Section Header */
.ve__section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.ve--light .ve__section-header {
  background: linear-gradient(135deg, #f8faff 0%, #f5f0ff 100%);
  border-bottom: 1px solid #eef2ff;
}

.ve--dark .ve__section-header {
  background: linear-gradient(135deg, #1a2340 0%, #251a40 100%);
  border-bottom: 1px solid #1e2538;
}

.ve__section-drag {
  flex-shrink: 0;
  opacity: 0.35;
  cursor: grab;
}

.ve__section-name {
  flex: 1;
  min-width: 0;
  padding: 0.25rem 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border: none;
  background: transparent;
  outline: none;
  border-radius: 0.375rem;
  transition: all 0.15s ease;
  letter-spacing: -0.01em;
}

.ve--light .ve__section-name {
  color: #1e293b;
}

.ve--light .ve__section-name:focus {
  background: rgba(79, 140, 247, 0.06);
  box-shadow: 0 0 0 2px rgba(79, 140, 247, 0.15);
}

.ve--dark .ve__section-name {
  color: #e2e8f0;
}

.ve--dark .ve__section-name:focus {
  background: rgba(79, 140, 247, 0.1);
  box-shadow: 0 0 0 2px rgba(79, 140, 247, 0.2);
}

.ve__add-task-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.6875rem;
  font-weight: 500;
  border: 1px solid;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.ve--light .ve__add-task-btn {
  color: #4F8CF7;
  border-color: rgba(79, 140, 247, 0.3);
  background: rgba(79, 140, 247, 0.06);
}

.ve--light .ve__add-task-btn:hover {
  background: rgba(79, 140, 247, 0.12);
  border-color: rgba(79, 140, 247, 0.5);
}

.ve--dark .ve__add-task-btn {
  color: #6FA3FF;
  border-color: rgba(79, 140, 247, 0.25);
  background: rgba(79, 140, 247, 0.08);
}

.ve--dark .ve__add-task-btn:hover {
  background: rgba(79, 140, 247, 0.15);
  border-color: rgba(79, 140, 247, 0.4);
}

.ve__delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.15s ease;
}

.ve--light .ve__delete-btn {
  color: #cbd5e0;
}

.ve--light .ve__delete-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.06);
}

.ve--dark .ve__delete-btn {
  color: #4a5568;
}

.ve--dark .ve__delete-btn:hover {
  color: #f87171;
  background: rgba(239, 68, 68, 0.1);
}

/* Tasks */
.ve__tasks {
  padding: 0.625rem 0.75rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ve__task {
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid;
  transition: all 0.15s ease;
}

.ve--light .ve__task {
  background: #fafbfe;
  border-color: #f1f5f9;
}

.ve--light .ve__task:hover {
  border-color: #e2e8f0;
  background: #f8faff;
}

.ve--dark .ve__task {
  background: rgba(20, 27, 45, 0.5);
  border-color: #1e2538;
}

.ve--dark .ve__task:hover {
  border-color: #2d3748;
  background: rgba(26, 35, 64, 0.5);
}

.ve__task-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .ve__task-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.ve__status-row {
  display: flex;
  gap: 0.375rem;
  align-items: center;
}

.ve__status-row .ve__input {
  flex: 1;
  min-width: 0;
}

.ve__task-delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border: 1px solid;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ve--light .ve__task-delete-btn {
  color: #cbd5e0;
  border-color: #e2e8f0;
}

.ve--light .ve__task-delete-btn:hover {
  color: #ef4444;
  border-color: #fecaca;
  background: rgba(239, 68, 68, 0.04);
}

.ve--dark .ve__task-delete-btn {
  color: #4a5568;
  border-color: #2d3748;
}

.ve--dark .ve__task-delete-btn:hover {
  color: #f87171;
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
}

.ve__duration {
  display: flex;
  gap: 0.375rem;
}

/* Empty states */
.ve__empty-tasks,
.ve__empty-sections {
  text-align: center;
  padding: 1.5rem 1rem;
  font-size: 0.8125rem;
}

.ve--light .ve__empty-tasks,
.ve--light .ve__empty-sections {
  color: #94a3b8;
}

.ve--dark .ve__empty-tasks,
.ve--dark .ve__empty-sections {
  color: #4a5568;
}
</style>
