/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch } from 'vue';
import CustomSelect from './CustomSelect.vue';
import { parseMermaidGantt, generateMermaidGantt, generateTaskId } from '../utils/ganttParser';
const props = defineProps();
const emit = defineEmits();
const title = ref('项目计划');
const sections = ref([]);
const taskDurationNums = ref({});
const taskDurationUnits = ref({});
const savedDurationNums = ref({});
const collapsedSections = ref(new Set());
// Select options
const durationUnitOptions = [
    { value: 'd', label: '天' },
    { value: 'h', label: '小时' },
    { value: 'w', label: '周' },
    { value: 'M', label: '月' },
];
const statusOptions = [
    { value: '', label: '普通' },
    { value: 'active', label: '进行中' },
    { value: 'done', label: '已完成' },
    { value: 'crit', label: '关键' },
    { value: 'milestone', label: '里程碑' },
];
const getDependsOnOptions = (excludeId) => {
    const options = [{ value: '', label: '无依赖' }];
    for (const section of sections.value) {
        for (const task of section.tasks) {
            if (task.id !== excludeId) {
                options.push({ value: task.id, label: `${task.name} (${task.id})` });
            }
        }
    }
    return options;
};
const toggleSection = (si) => {
    const newSet = new Set(collapsedSections.value);
    if (newSet.has(si)) {
        newSet.delete(si);
    }
    else {
        newSet.add(si);
    }
    collapsedSections.value = newSet;
};
// Flag to prevent infinite loop: when we emit code, skip re-parsing
let isEmitting = false;
const parseCode = () => {
    if (isEmitting)
        return;
    const parsed = parseMermaidGantt(props.modelValue);
    sections.value = parsed;
    const lines = props.modelValue.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('title ')) {
            title.value = trimmed.replace('title ', '');
        }
    }
    taskDurationNums.value = {};
    taskDurationUnits.value = {};
    parsed.forEach((section, si) => {
        taskDurationNums.value[si] = {};
        taskDurationUnits.value[si] = {};
        section.tasks.forEach((task, ti) => {
            const match = task.duration.match(/^(\d+)([dhwM])$/);
            if (match) {
                taskDurationNums.value[si][ti] = parseInt(match[1]);
                taskDurationUnits.value[si][ti] = match[2];
            }
            else {
                taskDurationNums.value[si][ti] = 0;
                taskDurationUnits.value[si][ti] = 'd';
            }
        });
    });
};
const emitCode = () => {
    isEmitting = true;
    const code = generateMermaidGantt(sections.value, title.value);
    emit('update:modelValue', code);
    // Reset flag after Vue's next tick
    setTimeout(() => { isEmitting = false; }, 0);
};
const getDurationNum = (si, ti) => {
    return taskDurationNums.value[si]?.[ti] ?? 0;
};
const onDurationNumInput = (si, ti, val) => {
    const num = parseInt(val) || 0;
    if (!taskDurationNums.value[si])
        taskDurationNums.value[si] = {};
    taskDurationNums.value[si][ti] = num;
    const unit = taskDurationUnits.value[si]?.[ti] ?? 'd';
    sections.value[si].tasks[ti].duration = `${num}${unit}`;
    emitCode();
};
const onDurationUnitChange = (si, ti, val) => {
    if (!taskDurationUnits.value[si])
        taskDurationUnits.value[si] = {};
    taskDurationUnits.value[si][ti] = val;
    const num = taskDurationNums.value[si]?.[ti] ?? 0;
    sections.value[si].tasks[ti].duration = `${num}${val}`;
    emitCode();
};
// When dependsOn is set, clear startDate (they're mutually exclusive in Mermaid)
// When dependsOn is cleared, restore startDate to today
const onDependsOnChange = (task) => {
    if (task.dependsOn) {
        task.startDate = '';
    }
    else {
        task.startDate = new Date().toISOString().split('T')[0];
    }
    emitCode();
};
// When status is milestone, save and override duration to 0d
// When status changes away from milestone, restore saved duration
const onStatusChange = (si, ti, task) => {
    if (task.status === 'milestone') {
        // Save current duration number before overriding
        if (!savedDurationNums.value[si])
            savedDurationNums.value[si] = {};
        savedDurationNums.value[si][ti] = taskDurationNums.value[si]?.[ti] ?? 0;
        // Override duration for milestone (preserve unit)
        const match = task.duration.match(/^(\d+)([dhwM])$/);
        const unit = match ? match[2] : 'd';
        task.duration = `0${unit}`;
        if (!taskDurationNums.value[si])
            taskDurationNums.value[si] = {};
        taskDurationNums.value[si][ti] = 0;
    }
    else {
        // Restore saved duration when changing away from milestone
        const savedNum = savedDurationNums.value[si]?.[ti];
        if (savedNum !== undefined && savedNum > 0) {
            const unit = taskDurationUnits.value[si]?.[ti] ?? 'd';
            task.duration = `${savedNum}${unit}`;
            if (!taskDurationNums.value[si])
                taskDurationNums.value[si] = {};
            taskDurationNums.value[si][ti] = savedNum;
            delete savedDurationNums.value[si][ti];
        }
        else if (task.duration === '0d') {
            // No saved value but duration is still 0d — set a sensible default
            task.duration = '1d';
            if (!taskDurationNums.value[si])
                taskDurationNums.value[si] = {};
            taskDurationNums.value[si][ti] = 1;
        }
    }
    emitCode();
};
const addSection = () => {
    sections.value.push({ name: '新分区', tasks: [] });
    emitCode();
};
const removeSection = (index) => {
    sections.value.splice(index, 1);
    // Clean up collapsed state
    const newSet = new Set();
    collapsedSections.value.forEach(i => {
        if (i < index)
            newSet.add(i);
        else if (i > index)
            newSet.add(i - 1);
    });
    collapsedSections.value = newSet;
    emitCode();
};
const addTask = (sectionIndex) => {
    // Auto-expand when adding task
    const newSet = new Set(collapsedSections.value);
    newSet.delete(sectionIndex);
    collapsedSections.value = newSet;
    const existingIds = sections.value.flatMap(s => s.tasks.map(t => t.id));
    const newId = generateTaskId(existingIds);
    const today = new Date().toISOString().split('T')[0];
    sections.value[sectionIndex].tasks.push({
        id: newId,
        name: '新任务',
        section: sections.value[sectionIndex].name,
        startDate: today,
        duration: '7d',
        status: '',
        dependsOn: '',
    });
    const ti = sections.value[sectionIndex].tasks.length - 1;
    if (!taskDurationNums.value[sectionIndex])
        taskDurationNums.value[sectionIndex] = {};
    if (!taskDurationUnits.value[sectionIndex])
        taskDurationUnits.value[sectionIndex] = {};
    taskDurationNums.value[sectionIndex][ti] = 7;
    taskDurationUnits.value[sectionIndex][ti] = 'd';
    emitCode();
};
const removeTask = (sectionIndex, taskIndex) => {
    sections.value[sectionIndex].tasks.splice(taskIndex, 1);
    emitCode();
};
watch(() => props.modelValue, () => {
    parseCode();
}, { immediate: true });
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-full flex flex-col" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "shrink-0 flex items-center gap-2 px-3 md:px-4 py-2 border-b" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (__VLS_ctx.emitCode) },
    ...{ class: "premium-input flex-1 min-w-0 px-2.5 py-1.5 text-xs md:text-[11px] rounded-md outline-none" },
});
(__VLS_ctx.title);
/** @type {__VLS_StyleScopedClasses['premium-input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.addSection) },
    ...{ onMouseenter: (...[$event]) => {
            $event.target.style.background = 'var(--accent-hover)';
            $event.target.style.boxShadow = '0 4px 16px var(--accent-glow)';
            // @ts-ignore
            [emitCode, title, addSection,];
        } },
    ...{ onMouseleave: (...[$event]) => {
            $event.target.style.background = 'var(--accent)';
            $event.target.style.boxShadow = '0 2px 8px var(--accent-glow)';
            // @ts-ignore
            [];
        } },
    ...{ class: "premium-btn px-3 md:px-2.5 py-2 md:py-1.5 text-xs md:text-[11px] rounded-md cursor-pointer font-medium flex items-center gap-1 shrink-0" },
    ...{ style: ({
            background: 'var(--accent)',
            color: '#ffffff',
            boxShadow: '0 2px 8px var(--accent-glow)',
        }) },
});
/** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-3.5 h-3.5 md:w-3 md:h-3" },
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
});
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'stroke-width': "2.5",
    d: "M12 4v16m8-8H4",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:space-y-4']} */ ;
for (const [section, si] of __VLS_vFor((__VLS_ctx.sections))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (si),
        ...{ class: "section-card rounded-xl overflow-hidden" },
        ...{ style: ({
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-sm)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['section-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggleSection(si);
                // @ts-ignore
                [sections, toggleSection,];
            } },
        ...{ class: "section-header flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 cursor-pointer select-none" },
        ...{ style: ({ background: 'var(--bg-tertiary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['section-header']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-1 h-4 rounded-full shrink-0" },
        ...{ style: ({ background: 'var(--accent)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (__VLS_ctx.emitCode) },
        ...{ onClick: () => { } },
        ...{ class: "flex-1 min-w-0 px-2 py-1 text-sm font-semibold bg-transparent focus:outline-none rounded-md" },
        ...{ style: ({ color: 'var(--text-primary)' }) },
    });
    (section.name);
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[10px] font-medium px-1.5 py-0.5 rounded-md shrink-0" },
        ...{ style: ({ background: 'var(--accent-subtle)', color: 'var(--accent)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    (section.tasks.length);
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4 shrink-0 transition-transform duration-200" },
        ...{ style: ({ transform: __VLS_ctx.collapsedSections.has(si) ? 'rotate(-90deg)' : 'rotate(0)', color: 'var(--text-tertiary)' }) },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M19 9l-7 7-7-7",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.addTask(si);
                // @ts-ignore
                [emitCode, collapsedSections, addTask,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                $event.target.style.background = 'var(--accent)';
                $event.target.style.color = '#ffffff';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                $event.target.style.background = 'var(--accent-subtle)';
                $event.target.style.color = 'var(--accent)';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn px-2.5 md:px-2.5 py-1.5 md:py-1 text-xs rounded-lg cursor-pointer font-medium shrink-0 flex items-center gap-1" },
        ...{ style: ({
                background: 'var(--accent-subtle)',
                color: 'var(--accent)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-3 h-3" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2.5",
        d: "M12 4v16m8-8H4",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "md:hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "hidden md:inline" },
    });
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:inline']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.removeSection(si);
                // @ts-ignore
                [removeSection,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                $event.target.style.color = 'var(--error)';
                $event.target.style.background = 'rgba(239,68,68,0.08)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                $event.target.style.color = 'var(--text-tertiary)';
                $event.target.style.background = 'transparent';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn p-2 md:p-1.5 rounded-lg shrink-0 cursor-pointer transition-colors duration-200" },
        ...{ style: ({ color: 'var(--text-tertiary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "section-tasks-wrapper" },
        ...{ style: ({ maxHeight: __VLS_ctx.collapsedSections.has(si) ? '0px' : '2000px', overflow: 'hidden', transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['section-tasks-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-2.5 md:p-3 space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    for (const [task, ti] of __VLS_vFor((section.tasks))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (ti),
            ...{ class: "task-card p-3 md:p-3.5 rounded-lg relative" },
            ...{ style: ({
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-secondary)',
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['task-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:p-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['relative']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "absolute left-0 top-2 bottom-2 w-0.5 rounded-full" },
            ...{ style: ({
                    background: task.status === 'done' ? 'var(--success)' :
                        task.status === 'active' ? 'var(--accent)' :
                            task.status === 'crit' ? 'var(--error)' :
                                task.status === 'milestone' ? 'var(--warning)' :
                                    'var(--border-primary)'
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['bottom-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-2" },
        });
        /** @type {__VLS_StyleScopedClasses['grid']} */ ;
        /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "text-[10px] font-semibold block mb-1 tracking-widest uppercase" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['block']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
        /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onInput: (__VLS_ctx.emitCode) },
            ...{ class: "premium-input w-full px-3 py-1.5 text-sm rounded-lg outline-none" },
        });
        (task.name);
        /** @type {__VLS_StyleScopedClasses['premium-input']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "text-[10px] font-semibold block mb-1 tracking-widest uppercase" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['block']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
        /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onInput: (__VLS_ctx.emitCode) },
            ...{ class: "premium-input w-full px-3 py-1.5 text-sm rounded-lg font-mono outline-none" },
        });
        (task.id);
        /** @type {__VLS_StyleScopedClasses['premium-input']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "text-[10px] font-semibold block mb-1 tracking-widest uppercase" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['block']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
        /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onInput: (__VLS_ctx.emitCode) },
            type: "date",
            ...{ class: "premium-input w-full px-3 py-1.5 text-sm rounded-lg outline-none" },
        });
        (task.startDate);
        /** @type {__VLS_StyleScopedClasses['premium-input']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "text-[10px] font-semibold block mb-1 tracking-widest uppercase" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['block']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
        /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex gap-1.5" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onInput: (...[$event]) => {
                    __VLS_ctx.onDurationNumInput(si, ti, $event.target.value);
                    // @ts-ignore
                    [emitCode, emitCode, emitCode, collapsedSections, onDurationNumInput,];
                } },
            value: (__VLS_ctx.getDurationNum(si, ti)),
            type: "number",
            min: "0",
            ...{ class: "premium-input w-20 sm:w-16 px-3 py-1.5 text-sm rounded-lg outline-none" },
        });
        /** @type {__VLS_StyleScopedClasses['premium-input']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-20']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:w-16']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex-1" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        const __VLS_0 = CustomSelect;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (__VLS_ctx.taskDurationUnits[si]?.[ti] ?? 'd'),
            options: (__VLS_ctx.durationUnitOptions),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (__VLS_ctx.taskDurationUnits[si]?.[ti] ?? 'd'),
            options: (__VLS_ctx.durationUnitOptions),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_5;
        const __VLS_6 = {
            ...{ 'update:modelValue': {} },
            'onUpdate:modelValue': (...[$event]) => {
                __VLS_ctx.onDurationUnitChange(si, ti, $event);
                // @ts-ignore
                [getDurationNum, taskDurationUnits, durationUnitOptions, onDurationUnitChange,];
            },
        };
        var __VLS_3;
        var __VLS_4;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "text-[10px] font-semibold block mb-1 tracking-widest uppercase" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['block']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
        /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
        const __VLS_7 = CustomSelect;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
            ...{ 'onChange': {} },
            modelValue: (task.dependsOn),
            options: (__VLS_ctx.getDependsOnOptions(task.id)),
        }));
        const __VLS_9 = __VLS_8({
            ...{ 'onChange': {} },
            modelValue: (task.dependsOn),
            options: (__VLS_ctx.getDependsOnOptions(task.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        let __VLS_12;
        const __VLS_13 = {
            ...{ change: {} },
            onChange: (...[$event]) => {
                __VLS_ctx.onDependsOnChange(task);
                // @ts-ignore
                [getDependsOnOptions, onDependsOnChange,];
            },
        };
        var __VLS_10;
        var __VLS_11;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-end gap-1.5" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex-1" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "text-[10px] font-semibold block mb-1 tracking-widest uppercase" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['block']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
        /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
        const __VLS_14 = CustomSelect;
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
            ...{ 'onChange': {} },
            modelValue: (task.status),
            options: (__VLS_ctx.statusOptions),
        }));
        const __VLS_16 = __VLS_15({
            ...{ 'onChange': {} },
            modelValue: (task.status),
            options: (__VLS_ctx.statusOptions),
        }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        let __VLS_19;
        const __VLS_20 = {
            ...{ change: {} },
            onChange: (...[$event]) => {
                __VLS_ctx.onStatusChange(si, ti, task);
                // @ts-ignore
                [statusOptions, onStatusChange,];
            },
        };
        var __VLS_17;
        var __VLS_18;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.removeTask(si, ti);
                    // @ts-ignore
                    [removeTask,];
                } },
            ...{ onMouseenter: (...[$event]) => {
                    $event.target.style.color = 'var(--error)';
                    $event.target.style.borderColor = 'var(--error)';
                    $event.target.style.background = 'rgba(239,68,68,0.08)';
                    // @ts-ignore
                    [];
                } },
            ...{ onMouseleave: (...[$event]) => {
                    $event.target.style.color = 'var(--text-tertiary)';
                    $event.target.style.borderColor = 'var(--border-primary)';
                    $event.target.style.background = 'transparent';
                    // @ts-ignore
                    [];
                } },
            ...{ class: "premium-btn p-2 md:p-1.5 rounded-lg shrink-0 cursor-pointer transition-colors duration-200" },
            ...{ style: ({
                    color: 'var(--text-tertiary)',
                    border: '1px solid var(--border-primary)',
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:p-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-4 h-4" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d: "M6 18L18 6M6 6l12 12",
        });
        // @ts-ignore
        [];
    }
    if (section.tasks.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-center py-6 text-sm" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    }
    // @ts-ignore
    [];
}
if (__VLS_ctx.sections.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-10 text-sm" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
}
// @ts-ignore
[sections,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
