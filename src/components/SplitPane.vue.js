/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, onUnmounted } from 'vue';
const props = withDefaults(defineProps(), {
    defaultRatio: 0.3,
    minLeftWidth: 280,
    minRightWidth: 300,
});
const emit = defineEmits();
const ratio = ref(props.defaultRatio);
const containerRef = ref(null);
const isDragging = ref(false);
const isMobile = ref(false);
const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024;
};
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});
onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});
const onMouseDown = () => {
    if (isMobile.value)
        return;
    isDragging.value = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
};
const onRowMouseDown = () => {
    if (!isMobile.value)
        return;
    isDragging.value = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
};
const onRowTouchStart = () => {
    isDragging.value = true;
};
const updateRatio = (clientX, clientY) => {
    if (!containerRef.value)
        return;
    const rect = containerRef.value.getBoundingClientRect();
    if (isMobile.value) {
        const totalHeight = rect.height;
        const newRatio = Math.max(0.2, Math.min(0.8, (clientY - rect.top) / totalHeight));
        ratio.value = newRatio;
    }
    else {
        const totalWidth = rect.width;
        const newRatio = Math.max(props.minLeftWidth / totalWidth, Math.min(1 - props.minRightWidth / totalWidth, (clientX - rect.left) / totalWidth));
        ratio.value = newRatio;
    }
    emit('ratioChange', ratio.value);
};
const onMouseMove = (e) => {
    if (!isDragging.value)
        return;
    updateRatio(e.clientX, e.clientY);
};
const onTouchMove = (e) => {
    if (!isDragging.value)
        return;
    const touch = e.touches[0];
    updateRatio(touch.clientX, touch.clientY);
};
const onMouseUp = () => {
    if (!isDragging.value)
        return;
    isDragging.value = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
};
const __VLS_defaults = {
    defaultRatio: 0.3,
    minLeftWidth: 280,
    minRightWidth: 300,
};
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
    ...{ onMousemove: (__VLS_ctx.onMouseMove) },
    ...{ onMouseup: (__VLS_ctx.onMouseUp) },
    ...{ onMouseleave: (__VLS_ctx.onMouseUp) },
    ...{ onTouchmove: (__VLS_ctx.onTouchMove) },
    ...{ onTouchend: (__VLS_ctx.onMouseUp) },
    ...{ class: "h-full w-full flex" },
    ...{ class: (__VLS_ctx.isMobile ? 'flex-col' : 'flex-row') },
    ref: "containerRef",
});
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: (__VLS_ctx.isMobile ? { height: `${__VLS_ctx.ratio * 100}%` } : { width: `${__VLS_ctx.ratio * 100}%`, minWidth: `${__VLS_ctx.minLeftWidth}px` }) },
    ...{ class: "overflow-hidden" },
    ...{ class: (__VLS_ctx.isMobile ? '' : 'h-full') },
});
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
var __VLS_0 = {};
if (!__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onMousedown: (__VLS_ctx.onMouseDown) },
        ...{ class: "relative flex-shrink-0 group" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-y-0 left-1/2 -translate-x-1/2 w-px transition-all duration-300" },
        ...{ style: ({
                background: __VLS_ctx.isDragging ? 'var(--accent)' : 'var(--border-primary)',
                width: __VLS_ctx.isDragging ? '2px' : '1px',
                boxShadow: __VLS_ctx.isDragging ? '0 0 8px var(--accent-glow)' : 'none',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-y-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-px']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[32px] rounded-full flex flex-col items-center justify-center gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200" },
        ...{ style: ({
                background: __VLS_ctx.isDragging ? 'var(--accent)' : 'var(--bg-elevated)',
                border: __VLS_ctx.isDragging ? '1px solid var(--accent)' : '1px solid var(--border-primary)',
                boxShadow: __VLS_ctx.isDragging ? '0 0 12px var(--accent-glow)' : 'var(--shadow-md)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[32px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-[3px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "w-[3px] h-[3px] rounded-full" },
        ...{ style: ({ background: __VLS_ctx.isDragging ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-[3px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[3px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "w-[3px] h-[3px] rounded-full" },
        ...{ style: ({ background: __VLS_ctx.isDragging ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-[3px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[3px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "w-[3px] h-[3px] rounded-full" },
        ...{ style: ({ background: __VLS_ctx.isDragging ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-[3px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[3px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-y-0 -left-2 w-5 cursor-col-resize" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-y-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['-left-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-col-resize']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onMousedown: (__VLS_ctx.onRowMouseDown) },
        ...{ onTouchstart: (__VLS_ctx.onRowTouchStart) },
        ...{ class: "relative flex-shrink-0 group" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-x-0 top-1/2 -translate-y-1/2 h-px transition-all duration-300" },
        ...{ style: ({
                background: __VLS_ctx.isDragging ? 'var(--accent)' : 'var(--border-primary)',
                height: __VLS_ctx.isDragging ? '2px' : '1px',
                boxShadow: __VLS_ctx.isDragging ? '0 0 8px var(--accent-glow)' : 'none',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-px']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-x-0 -top-2 h-5 cursor-row-resize" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['-top-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-row-resize']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: (__VLS_ctx.isMobile ? { height: `${(1 - __VLS_ctx.ratio) * 100}%` } : { width: `${(1 - __VLS_ctx.ratio) * 100}%` }) },
    ...{ class: "overflow-hidden" },
    ...{ class: (__VLS_ctx.isMobile ? '' : 'h-full') },
});
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
var __VLS_2 = {};
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
// @ts-ignore
[onMouseMove, onMouseUp, onMouseUp, onMouseUp, onTouchMove, isMobile, isMobile, isMobile, isMobile, isMobile, isMobile, ratio, ratio, ratio, ratio, minLeftWidth, onMouseDown, isDragging, isDragging, isDragging, isDragging, isDragging, isDragging, isDragging, isDragging, isDragging, isDragging, isDragging, isDragging, onRowMouseDown, onRowTouchStart,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __defaults: __VLS_defaults,
    __typeProps: {},
});
const __VLS_export = {};
export default {};
